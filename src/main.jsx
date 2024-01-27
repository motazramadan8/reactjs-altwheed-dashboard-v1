import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Dashboard from "./page/dashboard/Dashboard";
import Team from "./page/team/Team";
import Contacts from "./page/contacts/Contacts";
import CreateProduct from "./page/create product/CreateProduct";
import Services from "./page/services/Services";
import CreateProducts from "./page/create products/CreateProductPage";
import Facebook from "./page/Facebook/Facebook";
import NotFound from "./page/notFound/NotFound";
import { Provider } from "react-redux";
import store from "./redux/store";
import Products from "./page/products/Products";
import Linkedin from "./page/Linkedin/Linkedin";
import Whatsapp from "./page/whatsapp/WhatsApp";
import Gmail from "./page/gmail/Gmail";
import Login from "./page/login/Login";
import Profile from "./page/Profile/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="team" element={<Team />} />
      <Route path="profile" element={<Profile />} />
      <Route path="services" element={<Contacts />} />
      <Route path="products" element={<Products />} />
      <Route path="form" element={<CreateProduct />} />
      <Route path="create-services" element={<Services />} />
      <Route path="create-products" element={<CreateProducts />} />
      <Route path="facebook" element={<Facebook />} />
      <Route path="linkedin" element={<Linkedin />} />
      <Route path="whatsapp" element={<Whatsapp />} />
      <Route path="gmail" element={<Gmail />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
