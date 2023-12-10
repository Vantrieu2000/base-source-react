import { rootStore } from "@my-app/store";
import "antd-css-utilities/utility.min.css";

// import "antd/dist/antd.min.css";

import * as ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./styles.pages.css";
import "./styles.scss";

const queryClient = new QueryClient();
ReactDOM.render(
  <Provider store={rootStore}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>,

  document.getElementById("root")
);
