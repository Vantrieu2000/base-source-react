import { createSelector, createSlice } from '@reduxjs/toolkit';

export const UI_FEATURE_KEY = 'ui';

export interface UiState {
  language?: string;
  spinning: boolean;
}

const language = localStorage.getItem('_language') || 'ko';

export const initialUiState: UiState = {
  language,
  spinning: false
};

export const uiSlice = createSlice({
  name: UI_FEATURE_KEY,
  initialState: initialUiState,
  reducers: {
    setLanguage(state, action) {
      localStorage.setItem('_language', action.payload);
      state.language = action.payload;
    },
    setSpinning(state, action) {
      state.spinning = action.payload;
    }
  },
});

export const uiReducer = uiSlice.reducer;

export const uiActions = uiSlice.actions;

export const getUiState = (rootState: any): UiState =>
  rootState[UI_FEATURE_KEY];

export const selectLanguage = createSelector(getUiState, (state) => {
  return state.language;
});

export const spinning = createSelector(getUiState, (state) => {
  return state.spinning;
});


export const uiSelectors = {
  selectLanguage,
  spinning,
};
