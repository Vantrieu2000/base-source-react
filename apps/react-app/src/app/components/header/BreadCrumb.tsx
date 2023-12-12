import { Link } from 'react-router-dom';

interface BreadCrumbProps {
  title?: string;
  breadcrumb?: { name: string; link: string }[];
}

const BreadCrumb = (props: BreadCrumbProps) => {
  const { title, breadcrumb } = props;
  return (
    <div className="page-breadcrumb d-flex">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {/* <li className="breadcrumb-item">
            <a href="/dashboard">Dashboard</a>
          </li> */}
          {breadcrumb &&
            breadcrumb.map((breadcrumb) => (
              <li className="breadcrumb-item" key={Math.random()}>
                <Link to={`${breadcrumb.link}`}>{breadcrumb.name}</Link>
              </li>
            ))}
        </ol>
      </nav>
      <div className="page-title"></div>
    </div>
  );
};

export default BreadCrumb;
