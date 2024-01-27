import { createSlice } from "@reduxjs/toolkit";

const linkedinSlice = createSlice({
  name: "linkedin",
  initialState: {
    linkedin: "",
  },
  reducers: {
    setLinkedin(state, action) {
      state.linkedin = action.payload;
    },
    updateLinkedin(state, action) {
      state.linkedin = action.payload;
    },
    deleteLinkedin(state) {
      state.linkedin = "";
    },
  },
});

const linkedinReducer = linkedinSlice.reducer;
const linkedinActions = linkedinSlice.actions;

export { linkedinReducer, linkedinActions };
