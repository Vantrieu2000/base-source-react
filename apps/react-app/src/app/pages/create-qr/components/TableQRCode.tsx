import { DownloadOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { useIntl } from "react-intl";

const TableQRCode = () => {
  const intl = useIntl();

  return (
    <div className="table-qr-code">
      <div className="table-list">
        <div className="table-list__item">
          <div className="table-list__item__head">
            <div className="table-list__item__head__checkbox">
              <Checkbox />
            </div>
            <div className="table-list__item__head__name">Table 01</div>
          </div>
          <div className="table-list__item__tail">
            <div className="table-list__item__tail__code">
              <QrcodeOutlined style={{ fontSize: "24px" }} />
            </div>
            <div className="table-list__item__tail__download">
              <DownloadOutlined style={{ fontSize: "24px" }} />
            </div>
          </div>
        </div>
        <div className="table-list__item">huhu</div>
        <div className="table-list__item">huhu</div>
        <div className="table-list__item">huhu</div>
        <div className="table-list__item">huhu</div>
        <div className="table-list__item">huhu</div>
      </div>
    </div>
  );
};

export default TableQRCode;
