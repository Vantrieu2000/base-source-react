type Props = {
  children?: any;
  title?: string;
};

export const ToolBar: React.FC<Props> = (props) => {
  const { children, title } = props;
  return (
    <div className="toolbar" id="kt_toolbar">
      <div
        className="container-fluid d-flex flex-stack"
        id="kt_toolbar_container"
      >
        <div className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
          <h2 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">
            {title}
          </h2>
        </div>
        <div className="d-flex align-items-center py-1">{children}</div>
      </div>
    </div>
  );
};

export default ToolBar;
