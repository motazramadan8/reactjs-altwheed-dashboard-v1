import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    registerMessage: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.registerMessage = null;
    },
    logout(state) {
      state.user = null;
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    setFirstName(state, action) {
      state.user.firstName = action.payload;
    },
    setLastName(state, action) {
      state.user.lastName = action.payload;
    },
    setEmail(state, action) {
      state.user.email = action.payload;
    },
    setPhone(state, action) {
      state.user.phone = action.payload;
    },
    setProfilePhoto(state, action) {
      state.user.image = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, authActions };
