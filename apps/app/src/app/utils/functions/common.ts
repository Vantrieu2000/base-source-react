import { FormInstance, message, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import languageText from "apps/app/src/locales/en-US";
import JapaneseHolidays from "japanese-holidays";
import moment, { Moment } from "moment";
import React from "react";
import { createIntl, createIntlCache } from "react-intl";
import { AVATAR_DEFAULT, DATE_FORMAT_TWO } from "../constants";
import { TypeUser } from "../enum/common";

const locale = navigator.language;
const intlCache = createIntlCache();

export const flattenMessages = (nestedMessages, prefix = "") => {
  if (nestedMessages === null) {
    return {};
  }
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      Object.assign(messages, { [prefixedKey]: value });
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};

export const intlInstance = createIntl(
  {
    locale: locale,
    messages: languageText,
  },
  intlCache
);

export const beforeUpload = (
  file,
  fileList,
  form?: FormInstance,
  fileName?: string,
  defaultAvatar: string = ""
) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error(intlInstance.formatMessage({ id: "error_image_file" }));
    fileName && form?.resetFields([fileName]);
    return false;
  }

  // const isLt4M = file.size / 2048 / 2048 < 2;
  const isLt4M = file?.size < 1024 * 1024 * 10;

  if (!isLt4M) {
    message.error({
      content: intlInstance.formatMessage(
        { id: "error_image_size" },
        { number: 10 }
      ),
      // style: { zIndex: 1500 },
      // duration: 10000000
    });
    form?.setFieldsValue({
      [fileName as string]: form.getFieldValue(fileName as string),
    });
    return false;
  }
  return (isJpgOrPng && isLt4M) || Upload.LIST_IGNORE;
  // }
};

type RouteParams<T extends string> =
  T extends `${infer _Prefix}:${infer Param}/:${infer Rest}`
    ? { [L in Param | keyof RouteParams<Rest>]: string }
    : {};

export const RouteFormat = <T extends string>(
  route: T,
  params: RouteParams<T>
) => {
  let formatRoute = route.replace("/:id", "");
  Object.keys(params).map(
    (id) => (formatRoute = formatRoute.concat("/", params[id]))
  );
  return formatRoute;
};

export function updateElementByObject(array, object) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].key === object.key) {
      array[i] = { ...object };
      break;
    }
  }
  return array;
}

export function avatarUrl(imgUrl) {
  return imgUrl
    ? process.env.NX_API_BASE_URL + imgUrl.replace(".pdf", ".jpg")
    : AVATAR_DEFAULT;
}

type HandleChangeFormProps = {
  form: FormInstance;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  typeUser?: TypeUser;
  optionalFields?: string[];
};

export const handleChangeForm = ({
  form,
  setDisabled,
}: HandleChangeFormProps): void => {
  const formValues = form.getFieldsValue();
  const fieldNames = Object.keys(formValues);
  const fieldErrors = form.getFieldsError();
  const isTouched = Object.values(form.getFieldsValue()).some(
    (field) => field !== undefined && field !== null && field !== ""
  );

  setDisabled(
    !isTouched ||
      !fieldNames.every(
        (name) => formValues[name] !== undefined && formValues[name] !== ""
      ) ||
      !!fieldErrors.filter(({ errors }) => errors.length).length
  );
};

export const handleDisableButton = ({
  form,
  setDisabled,
  optionalFields,
}: HandleChangeFormProps): void => {
  const formValues = form.getFieldsValue();
  const fieldNames = Object.keys(formValues);
  const fieldErrors = form.getFieldsError();
  const defaultOptionalFields = ["province", "address", "district", "avatar"];
  const allOptionalFields = mergeArrays(optionalFields, defaultOptionalFields);
  setDisabled(
    !fieldNames
      .filter((name) => !allOptionalFields.includes(name))
      .every(
        (name) => formValues[name] !== undefined && formValues[name] !== ""
      ) || !!fieldErrors.filter(({ errors }) => errors.length).length
  );
};

export const handleChangeFormCreateTrainer = ({
  form,
  setDisabled,
  typeUser,
}: HandleChangeFormProps): void => {
  const formValues = form.getFieldsValue();
  const fieldErrors = form.getFieldsError();
  const requiredInputs = [
    "fullName",
    "email",
    "gender",
    "phoneNumber",
    "userCode",
    "password",
    "skills",
  ];
  if (typeUser === TypeUser.ADMIN) {
    requiredInputs.push("storeId");
  }
  const filteredFields = requiredInputs.filter(
    (field) => formValues[field] === undefined || formValues[field] === ""
  );
  setDisabled(
    filteredFields?.length > 0 ||
      !!fieldErrors.filter(({ errors }) => errors.length).length
  );
};

export const handleChangeFormUpdate = ({
  form,
  setDisabled,
}: HandleChangeFormProps): void => {
  const fieldErrors = form.getFieldsError();
  setDisabled(!!fieldErrors.filter(({ errors }) => errors.length).length);
};

export const disabledFutureDate = (current: Moment | undefined) => {
  if (current) {
    const currentDate = current.clone().startOf("day");
    const today = moment().startOf("day");
    return currentDate.isAfter(today);
  }
  return false;
};

export const disabledPastDate = (current: Moment | undefined) => {
  if (current) {
    const currentDate = current.clone().startOf("day");
    const today = moment().startOf("day");
    return currentDate.isBefore(today);
  }
  return false;
};

// replacement for: functRandomId
export function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

// export function mergeArrays(arr1: any[], arr2: any[]): any[] {
//   const mergedArray = arr1?.concat(arr2);
//   const uniqueArray = mergedArray?.filter((item, index) => mergedArray.indexOf(item) === index);
//   return uniqueArray;
// }

export function mergeArrays(...arrays: any[]): any[] {
  const mergedArray = arrays.reduce(
    (result, array) => result.concat(array),
    []
  );
  const uniqueArray = mergedArray.filter(
    (item, index) => mergedArray.indexOf(item) === index
  );
  return uniqueArray;
}

export const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // Return the width so we can use it in our components
  return {
    width,
    isSP: width <= 768,
    isTablet: width > 768 && width <= 1199,
    isPC: width > 1199,
  };
};

export const getDateOfMonth = (monthOfYear: string, month: number) => {
  const dayInMonth = moment(monthOfYear).daysInMonth();
  let monday: any = [];
  let tuesday: any = [];
  let wednesday: any = [];
  let thursday: any = [];
  let friday: any = [];
  let saturday: any = [];
  let sunday: any = [];
  let holidayJP: any = [];
  let nationalday: any = [];

  const today = new Date(monthOfYear);
  const holidays = JapaneseHolidays.getHolidaysOf(today.getFullYear());
  holidays.forEach((holiday) => {
    if (month === holiday.month) {
      const holidayOfMonth =
        today.getFullYear() + "/" + holiday.month + "/" + holiday.date;
      holidayJP.push(holidayOfMonth);
    }
  });
  for (let i = 1; i <= dayInMonth; i++) {
    const numOfDay = moment(monthOfYear + "/" + i).day();
    const date = moment(monthOfYear + "/" + i).format(DATE_FORMAT_TWO);
    switch (numOfDay) {
      case 0:
        sunday.push(date);
        break;
      case 1:
        monday.push(date);
        break;
      case 2:
        tuesday.push(date);
        break;
      case 3:
        wednesday.push(date);
        break;
      case 4:
        thursday.push(date);
        break;
      case 5:
        friday.push(date);
        break;
      case 6:
        saturday.push(date);
        break;
      default:
        break;
    }
  }
  return {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    holidayJP,
    nationalday,
  };
};

export const handleKeyDownNotAllowSpace = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  if (e.key === " ") {
    e.preventDefault();
  }
};

export const addKey = (item, index, array) => {
  return {
    ...item,
    key: guidGenerator(),
  };
};
export interface DataItemChart {
  name: string;
  data: (number | null)[];
  type: string;
  key: string;
}

export const replaceZerosWithOnes = (array) => {
  return array?.map((obj) => {
    const isAllZeros = obj?.data?.every((value) => value === 0);
    return {
      ...obj,
      data: isAllZeros ? obj?.data?.map(() => 0) : obj.data,
    };
  });
};

export const moveColumnsToEnd = (array: DataItemChart[]): DataItemChart[] => {
  const columns: DataItemChart[] = [];
  const lines: DataItemChart[] = [];

  array?.forEach((obj) => {
    if (obj.type === "column") {
      columns.push(obj);
    } else {
      lines.push(obj);
    }
  });

  return [...lines, ...columns];
};

export const processDataItems = (array: DataItemChart[]): DataItemChart[] => {
  const columns: DataItemChart[] = [];
  const lines: DataItemChart[] = [];

  array?.forEach((obj) => {
    const isAllZeros = obj.data.every((value) => value === 0);
    const data = isAllZeros ? obj.data.map(() => null) : obj.data;

    if (obj.type === "column") {
      columns.push({ ...obj, data });
    } else {
      lines.push({ ...obj, data });
    }
  });

  return [...lines, ...columns];
};

export const getLastChildInString = (str: string): string => {
  return str.substring(str.lastIndexOf("/") + 1);
};

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
