import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { Link } from 'react-router-dom';

type RowActionMenuItem = {
  text: string;
} & ({ type: 'link'; goto: string } | { type: 'action'; action: (e) => any });

export type RowActionsProps = {
  menuItems: RowActionMenuItem[];
};

export const RowActions = ({ menuItems }: RowActionsProps) => {
  return (
    <Space size="middle" className="d-flex justify-center">
      <Dropdown
        trigger={['click']}
        placement="bottom"
        overlayClassName="table-dropdown"
        getPopupContainer={(trigger: any) => trigger.parentNode}
        overlay={
          <Menu>
            {menuItems.map((item, index) => {
              switch (item.type) {
                case 'link':
                  return (
                    <Menu.Item key={index}>
                      <Link to={item.goto}>{item.text}</Link>
                    </Menu.Item>
                  );

                case 'action':
                  return (
                    <Menu.Item key={index}>
                      <Link to={''} onClick={item.action}>
                        {item.text}
                      </Link>
                    </Menu.Item>
                  );
                default:
                  return <></>;
              }
            })}
          </Menu>
        }
      >
        <span className="row-action">
          <Space>
            <MoreOutlined style={{ fontSize: '20px', fontWeight: 'bold' }} />
          </Space>
        </span>
      </Dropdown>
    </Space>
  );
};
