import { createSlice } from "@reduxjs/toolkit";

const facebookSlice = createSlice({
  name: "facebook",
  initialState: {
    facebook: "",
  },
  reducers: {
    setFacebook(state, action) {
      state.facebook = action.payload;
    },
    updateFaceebook(state, action) {
      state.facebook = action.payload;
    },
    deleteFacebook(state) {
      state.facebook = "";
    },
  },
});

const facebookReducer = facebookSlice.reducer;
const facebookActions = facebookSlice.actions;

export { facebookReducer, facebookActions };
