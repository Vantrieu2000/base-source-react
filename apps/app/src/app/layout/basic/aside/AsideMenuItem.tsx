/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-types */
import { SVGIcon } from "@my-app/components";
import clsx from "clsx";
import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import IconSVG from "../../../components/icons/Icons";
import { PermissionDto } from "../../../utils/dto/permission.dto";
import type { SubItem } from "./AsideMenuSubItem";
import { AsideMenuSubItem } from "./AsideMenuSubItem";

interface Item {
  key: number;
  icon: any;
  label: string;
  path?: string;
  subItems?: SubItem[];
}

interface Props {
  item: Item;
  active?: boolean;
  defaultOpenKeys?: number[];
  onClick?: Function;
  permissions?: PermissionDto[];
}

export const AsideMenuItem = (props: Props) => {
  const { active, item } = props;
  const { icon, label, path, subItems } = item;
  const intl = useIntl();

  const [state, setState] = useState({
    showing: true,
    show: true,
    hiding: false,
  });

  // useEffect(() => {
  //   let timer: any;
  //   if (!active) {
  //     setState({ ...state, hiding: true, show: true });
  //     timer = setTimeout(
  //       () => setState({ ...state, hiding: false, show: false }),
  //       300
  //     );
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }

  //   setState({ ...state, showing: true, show: true });

  //   timer = setTimeout(
  //     () => setState({ ...state, showing: false, show: true }),
  //     300
  //   );
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [active]);

  return (
    <div
      className={clsx("menu-item menu-accordion custom-menu-item", {
        hover: state.show || state.showing,
        showing: state.showing,
        hiding: state.hiding,
        active,
      })}
    >
      <Link
        to={path ? path : "#"}
        className={`menu-link `}
        onClick={() => {
          props.onClick && props.onClick();
        }}
      >
        <span className="menu-icon">{icon}</span>
        <span className="menu-title">{intl.formatMessage({ id: label })}</span>
        {subItems && active ? <IconSVG type="arrow-up" /> : subItems && <IconSVG type="arrow-down" />}
      </Link>
      {subItems && (
        <AnimateHeight
          height={active ? 10 + 35 * subItems.length : 0}
          style={{ width: "215px" }}
          // height={60 * subItems.filter((item: any) => item.show).length}
          // height={10 + 46 * subItems.length}
          duration={300}
        >
          <div
            className={clsx("menu-sub menu-sub-accordion menu-active-bg", {
              show: true || state.show,
            })}
          >
            {subItems.map((childItem, index) => (
              <AsideMenuSubItem key={index} item={childItem}></AsideMenuSubItem>
            ))}
          </div>
        </AnimateHeight>
      )}
    </div>
  );
};
