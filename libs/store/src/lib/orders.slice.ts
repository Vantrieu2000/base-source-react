import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState } from "@reduxjs/toolkit";
import type * as API from "@my-app/services";
import { orderApi } from "@my-app/services";

export const ORDERS_FEATURE_KEY = "orders";

export interface OrdersEntity extends API.OrderDto {
  id: number;
  price: number;
  grossProfit: number;
}

export interface OrdersState extends EntityState<OrdersEntity> {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  error: string | undefined | null;
  total: number;
}

export const ordersAdapter = createEntityAdapter<OrdersEntity>();

export const fetchOrders = createAsyncThunk(
  "orders/fetchStatus",
  async (params: API.FindOrderDto, { rejectWithValue }) => {
    return orderApi.orderControllerFind(params).catch((e) => rejectWithValue(e));
  }
);

export const createOrder = createAsyncThunk("orders/create", async (data: API.CreateOrderDto, { rejectWithValue }) => {
  return orderApi.orderControllerCreate(data).catch((e) => rejectWithValue(e));
});

export const depositOrder = createAsyncThunk(
  "orders/depositOrder",
  async (data: API.OrderDepositDto, { rejectWithValue }) => {
    return orderApi.orderControllerDepositOrder(data).catch((e) => rejectWithValue(e));
  }
);

export const updateOrder = createAsyncThunk(
  "orders/update",
  async (data: { id: number } & API.UpdateOrderDto, { rejectWithValue }) => {
    return orderApi.orderControllerUpdateById(data.id, data).catch((e) => rejectWithValue(e));
  }
);

const getOrderDetail = createAsyncThunk("orders/getOrderDetail", async (id: number, { rejectWithValue }) => {
  return orderApi.orderControllerFindByIdOrFail(id).catch((e) => rejectWithValue(e));
});

export const getOrderStatistic = createAsyncThunk(
  "orders/getOrderStatistic",
  async (data: API.StatisticOrderDto, { rejectWithValue }) => {
    return orderApi.orderControllerStatistic(data).catch((e) => rejectWithValue(e));
  }
);

export const deleteOrder = createAsyncThunk("orders/delete", async (id: number, { rejectWithValue }) => {
  await orderApi.orderControllerDeleteById(id).catch((e) => rejectWithValue(e));
  return id;
});

export const initialOrdersState: OrdersState = ordersAdapter.getInitialState({
  loadingStatus: "not loaded",
  error: null,
  total: 0,
});

export const ordersSlice = createSlice({
  name: ORDERS_FEATURE_KEY,
  initialState: initialOrdersState,
  reducers: {
    add: ordersAdapter.addOne,
    remove: ordersAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state: OrdersState, action: any) => {
        ordersAdapter.setAll(state, action.payload.data);
        state.total = action.payload.total;
        state.loadingStatus = "loaded";
      })
      .addCase(fetchOrders.rejected, (state: OrdersState, action) => {
        state.loadingStatus = "error";
        state.error = action.error.message;
      })
      .addCase(deleteOrder.fulfilled, (state: OrdersState, action) => {
        ordersAdapter.removeOne(state, action.payload);
      })
      .addCase(updateOrder.fulfilled, (state: OrdersState, { payload }: any) => {
        const { id, ...order } = payload;
        ordersAdapter.updateOne(state, { id, changes: order });
      });
  },
});

export const ordersReducer = ordersSlice.reducer;

export const ordersActions = {
  fetchOrders,
  createOrder,
  getOrderDetail,
  depositOrder,
  updateOrder,
  deleteOrder,
  getOrderStatistic,
  ...ordersSlice.actions,
};

const { selectAll, selectEntities, selectById } = ordersAdapter.getSelectors();

export const getOrdersState = (rootState: any): OrdersState => rootState[ORDERS_FEATURE_KEY];

export const selectAllOrders = createSelector(getOrdersState, selectAll);

export const selectOrderById = (id = -1) => {
  return createSelector(getOrdersState, (state) => selectById(state, id));
};

const selectTotal = createSelector(getOrdersState, (state) => state.total);

export const selectOrdersEntities = createSelector(getOrdersState, selectEntities);

export const ordersSelectors = {
  selectAllOrders,
  selectOrderById,
  selectTotal,
};
