import { createSlice } from "@reduxjs/toolkit";

const gmailSlice = createSlice({
  name: "gmail",
  initialState: {
    gmail: "",
  },
  reducers: {
    setGmail(state, action) {
      state.gmail = action.payload;
    },
    updateGmail(state, action) {
      state.gmail = action.payload;
    },
    deleteGmail(state) {
      state.gmail = "";
    },
  },
});

const gmailReducer = gmailSlice.reducer;
const gmailActions = gmailSlice.actions;

export { gmailReducer, gmailActions };
