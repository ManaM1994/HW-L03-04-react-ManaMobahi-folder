import Report from "../pages/Report";
import Transaction from "../pages/Transaction";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../LayOut";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Report />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
    ],
  },
]);
