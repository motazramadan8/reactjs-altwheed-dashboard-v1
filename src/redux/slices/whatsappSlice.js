import { createSlice } from "@reduxjs/toolkit";

const whatsappSlice = createSlice({
  name: "whatsapp",
  initialState: {
    whatsapp: "",
  },
  reducers: {
    setWhatsapp(state, action) {
      state.whatsapp = action.payload;
    },
    updateWhatsapp(state, action) {
      state.whatsapp = action.payload;
    },
    deleteWhatsapp(state) {
      state.whatsapp = "";
    },
  },
});

const whatsappReducer = whatsappSlice.reducer;
const whatsappActions = whatsappSlice.actions;

export { whatsappReducer, whatsappActions };
