import { validator } from "@my-app/validate";
import { Rule, RuleObject } from "antd/lib/form";
import { IntlShape } from "react-intl";
import {
  POSTAL_CODE,
  REGEX_ID,
  REGEX_PASSWORD,
  REGEX_PHONE_NUMBER,
  REGEX_URL,
  REGEX_URL_STORE,
} from "../../utils/constants";
interface Validate {
  [key: string]: Rule[];
}

export const ValidateLibrary: (intl: IntlShape) => Validate = (intl) => {
  return {
    email: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
      {
        validator: validator({
          space: intl.formatMessage({
            id: "validate.space",
          }),
          email: intl.formatMessage({
            id: "validate.email",
          }),
        }),
      },
    ],
    password: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
      {
        validator(_: RuleObject, value: string) {
          const regex = new RegExp(REGEX_PASSWORD);
          if (regex.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(
            intl.formatMessage({
              id: "validate.password",
            })
          );
        },
      },
    ],
    editPassword: [
      {
        validator: validator({
          space: intl.formatMessage({
            id: "validate.space",
          }),
          password: intl.formatMessage({
            id: "validate.password",
          }),
        }),
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
      {
        validator(_: RuleObject, value: string) {
          const regex = new RegExp(REGEX_PHONE_NUMBER);
          if (regex.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(
            intl.formatMessage({
              id: "validate.phone",
            })
          );
        },
      },
    ],
    dob: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
    ],
    name: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
      {
        validator(_: RuleObject, value: string) {
          const regex = new RegExp(REGEX_ID);
          if (regex.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(
            intl.formatMessage({
              id: "validate.id",
            })
          );
        },
      },
      {
        min: 6,
        message: intl.formatMessage({ id: "validate.min_6_char" }),
      },
    ],
    nameService: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
      {
        min: 2,
        message: intl.formatMessage({ id: "validate.min_2_char" }),
      },
    ],
    age: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
    ],
    image: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
    ],
    required: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
    ],
    urlStore: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
      {
        min: 3,
        message: intl.formatMessage({ id: "validate.min_3_char" }),
      },
      {
        validator(_: RuleObject, value: string) {
          const regex = new RegExp(REGEX_URL_STORE);
          if (regex.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(
            intl.formatMessage({
              id: "validate.store_url",
            })
          );
        },
      },
    ],
    userCode: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
      {
        validator(_: RuleObject, value: string) {
          if (value && value.trimStart() !== value) {
            return Promise.reject(
              intl.formatMessage({
                id: "validate.space",
              })
            );
          }
          return Promise.resolve();
        },
      },
    ],
    space: [
      {
        validator(_: RuleObject, value: string) {
          if (value && value.trimStart() !== value) {
            return Promise.reject(
              intl.formatMessage({
                id: "validate.space",
              })
            );
          }
          return Promise.resolve();
        },
      },
    ],
    url: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
      {
        validator(_: RuleObject, value: string) {
          const regex = new RegExp(REGEX_URL);
          if (regex.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(
            intl.formatMessage({
              id: "validate.isUrl",
            })
          );
        },
      },
    ],
    postalCode: [
      {
        required: true,
        message: intl.formatMessage({ id: "validate.required" }),
      },
      {
        validator(_: RuleObject, value: string) {
          const regex = new RegExp(POSTAL_CODE);
          if (regex.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(
            intl.formatMessage({
              id: "validate.postalCode",
            })
          );
        },
      },
    ],
  };
};
