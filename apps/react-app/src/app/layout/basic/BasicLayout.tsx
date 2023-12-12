import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Aside from './aside/Aside';
import Header from './header/Header';
import './style.scss';

export type BasicLayoutProps = {
  children: JSX.Element;
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className="d-flex flex-column flex-root">
      <div className="page d-flex flex-row flex-column-fluid">
        <Aside></Aside>
        <div
          className="wrapper d-flex flex-column flex-row-fluid"
          id="kt_wrapper"
        >
          <Header></Header>
          <div
            className="content d-flex flex-column flex-column-fluid component-container"
            id="kt_content"
          >
            {children}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
      ></ToastContainer>
    </div>
  );
};

export default BasicLayout;
