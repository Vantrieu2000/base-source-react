type Props = {
  children?: JSX.Element;
  className?: string;
};

export const ContentContainer = (props: Props) => {
  const { children } = props;
  return (
    <div
      className={`post d-flex flex-column-fluid ${props.className}`}
      id="kt_post"
    >
      <div id="kt_content_container" className="container-xxl">
        {children}
      </div>
    </div>
  );
};

export default ContentContainer;
