import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profiles: [],
  },
  reducers: {
    setProfiles(state, action) {
      state.profiles = action.payload;
    },
    deleteProfiles(state, action) {
      state.profiles = state.profiles.filter((p) => p._id !== action.payload);
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileReducer, profileActions };
