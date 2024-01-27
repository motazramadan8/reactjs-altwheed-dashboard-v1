import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    services: [],
  },
  reducers: {
    setServices(state, action) {
      state.services = action.payload;
    },
    createService(state, action) {
      state.services = action.payload;
    },
    deleteProfiles(state, action) {
      state.services = state.services.filter((s) => s._id !== action.payload);
    },
    
  },
});

const serviceReducer = serviceSlice.reducer;
const serviceActions = serviceSlice.actions;

export { serviceReducer, serviceActions };
