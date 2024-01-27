import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./slices/profilesSlice";
import { authReducer } from "./slices/authSlice";
import { serviceReducer } from "./slices/servicesSlice";
import { productReducer } from "./slices/productsSlice";
import { facebookReducer } from "./slices/facebookSlice";
import { linkedinReducer } from "./slices/linkedinSlice";
import { whatsappReducer } from "./slices/whatsappSlice";
import { gmailReducer } from "./slices/gmailSlice";

const store = configureStore({
  reducer: {
    profiles: profileReducer,
    services: serviceReducer,
    auth: authReducer,
    products: productReducer,
    facebook: facebookReducer,
    linkedin: linkedinReducer,
    whatsapp: whatsappReducer,
    gmail: gmailReducer,
  },
});

export default store;
