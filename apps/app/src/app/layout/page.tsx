import { useEffect } from 'react';
import { useIntl } from 'react-intl';

const Page = (props: {
  children: JSX.Element;
  title?: string;
  permission?: string;
}) => {
  const intl = useIntl();

  useEffect(() => {
    document.title =
      (props.title
        ? `${intl.formatMessage({ id: `title.${props.title}` })} - `
        : '') + intl.formatMessage({ id: 'project.name' });

    return () => {
      document.title = intl.formatMessage({ id: 'project.name' });
    };
  }, [props.title]);
  return props.children;
};

export default Page;
