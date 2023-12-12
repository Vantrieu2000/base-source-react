/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-types */
import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

export interface SubItem {
  label: string;
  path: string;
  icon: string;
}

interface Props {
  item: SubItem;
  active?: boolean;
}

export const AsideMenuSubItem = (props: Props) => {
  const { item } = props;
  const { label, path, icon } = item;
  const location = useLocation();
  const intl = useIntl();

  return (
    <div className="menu-item menu-accordion">
      <Link
        to={path}
        className={clsx('menu-link', { active: location.pathname === path })}
      >
        {/* <span className="menu-icon">
          <SVGIcon path={icon} className="svg-icon-2" />
        </span> */}
        <ul>
          <li>
            <span className="menu-title">
              {intl.formatMessage({ id: label })}
            </span>
          </li>
        </ul>
      </Link>
    </div>
  );
};
