export const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const REGEX_URL_STORE = /^[A-Za-z0-9]+$/;

export const REGEX_LOGIN_ID = /^[A-Za-z0-9_-]*$/;

export const REGEX_NUMBER = /^0\d{9}$/;

export const REGEX_ID = /^[A-Za-z]{6,}$/;

export const DATE_FORMAT = "YYYY/MM/DD";

export const DATE_FORMAT_WITH_WEEKDAY = "YYYY年MM月DD日 (ddd)";

export const DATE_FORMAT_TWO = "YYYY-MM-DD";

export const DATE_TIME_FORMAT = "YYYY/MM/DD HH:mm:ss";

export const DATE_TIME_STRING_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const DATE_TIME_FORMAT_TWO = "YYYY/MM/DD HH:mm";

export const DATE_TIME_FORMAT_THREE = "YYYY-MM-DD HH:mm";

export const TIME_FORMAT = "HH:mm";

export const AVATAR_DEFAULT = "/assets/images/ph_user.png";

export const REGEX_URL =
  "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";

export const SUPER_ROLE = "スーパー管理者";

export const REGEX_PHONE_NUMBER =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const POSTAL_CODE = /^\d{3}-\d{4}$/;

export const CALENDAR_WIDTH_UNIT = 100 / 15; //15 cells in 100% width

export const CALENDAR_OFFSET = 2.03; //division unit to reduce width of label

export const COUNTRY_LANG = [
  { value: "vi", label: "VietNam" },
  { value: "en", label: "English" },
  { value: "ko", label: "Korean" },
];

export const CALENDAR_TIME = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "13:00 PM",
  "14:00 PM",
  "15:00 PM",
  "16:00 PM",
  "17:00 PM",
  "18:00 PM",
  "19:00 PM",
  "20:00 PM",
  "21:00 PM",
];

export const CALENDAR_WORK_TIME = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];
