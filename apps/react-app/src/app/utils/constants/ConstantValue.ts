export const TIPS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const CURRENCY = [
  { value: "usd", label: "USD" },
  { value: "vnd", label: "VND" },
  { value: "krw", label: "KRW" },
];

export const FOODS_LABEL = [
  { value: "none", label: "None" },
  { value: "recommend", label: "recommend" },
  { value: "new", label: "New" },
  { value: "best", label: "Best" },
];

export const FOODS_TARGET = [
  { value: "store", label: "Store" },
  { value: "takeout", label: "Takeouts" },
];

export const SPICY_UNIT = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
];

export const NUMBER_OF_TABLE = Array.from({ length: 50 }, (_, index) => ({
  value: index + 1,
  label: `${index + 1} table${index === 0 ? "" : "s"}`,
}));

export const CUSTOM_EXCEL_FIELD_NAME = {
  category: "categoryName",
  "Menu name": "name",
  Description: "des",
  size: "size",
  price: "price",
  "Ingredient  warning": "ingredientWarning",
  ingredient: "ingredient",
  origin: "origin",
  "Spicy unit": "spicyUnit",
  "Labels ": "labels",
  Target: "target",
  "Sold out sign": "soldOutSign",
  "add options": "options",
  photo: "photo",
};

export const PERMISSION_CONSTANTS = {
  owner: [
    "select_store",
    "dashboard",
    "store_preferences",
    "create_qr",
    "open_hours",
    "category_setting",
    "add_options",
    "menu_setting",
    "edit_menu",
    "staff_registration",
    "order_list",
    "alert_list",
    "statistics",
    "customer_center",
  ],
  manager: [
    "select_store",
    "dashboard",
    "category_setting",
    "add_options",
    "menu_setting",
    "edit_menu",
    "staff_registration",
    "order_list",
    "alert_list",
  ],
  staff: ["select_store", "dashboard", "order_list", "alert_list"],
};

export const ACCESS_LEVEL = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "manager",
    label: "Manager",
  },
  {
    value: "staff",
    label: "Staff",
  },
];

export const STAFF_STATUS = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
];
