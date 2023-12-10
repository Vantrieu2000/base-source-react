import { uiActions, uiSelectors, useAppDispatch } from "@my-app/store";
import * as _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";

const languages = [
  {
    code: "vi",
    name: "Vietnamese",
    icon: "assets/media/flags/vietnam.svg",
  },
  {
    code: "jp",
    name: "Japanese",
    icon: "assets/media/flags/japan.svg",
  },
];

export const SelecLanguage = () => {
  const dispatch = useAppDispatch();
  const languageCode = useSelector(uiSelectors.selectLanguage);
  const language =
    _.find(languages, (iem) => {
      return iem.code === languageCode;
    }) || languages[1];
  return (
    <div style={{ position: "relative" }} className="menu-item px-5 menu-dropdown">
      <div className="menu-link px-5">
        <span className="menu-title position-relative">
          Language
          <span className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">
            {language.name}
            <img className="w-15px h-15px rounded-1 ms-2" src={language.icon} alt="" />
          </span>
        </span>
      </div>

      <div
        className="menu-sub menu-sub-dropdown w-175px py-4"
        style={{
          zIndex: 106,
          position: "absolute",
          left: "-175px",
          top: "0px",
        }}
      >
        {languages.map((item) => {
          return (
            <div
              key={item.code}
              className="menu-item px-3"
              onClick={() => {
                dispatch(uiActions.setLanguage(item.code));
              }}
            >
              <div className="menu-link d-flex px-5">
                <span className="symbol symbol-20px me-4">
                  <img className="rounded-1" src={item.icon} alt="" />
                </span>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
