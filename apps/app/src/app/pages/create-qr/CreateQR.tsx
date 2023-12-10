import { Tabs } from "antd";
import { injectIntl, WrappedComponentProps } from "react-intl";

export const CreateQR = (props: WrappedComponentProps) => {
  return (
    <div className="create-qr" id="create-qr">
      <div className="create-qr__container">
        <div className="create-qr__container__title">Create QR</div>
        <div className="create-qr__container__content">
          <Tabs type="card">
            <Tabs.TabPane tab="Tab 1" key="item-1">
              Content 1
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="item-2">
              Content 2
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 3" key="item-3">
              Content 3
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(CreateQR);
