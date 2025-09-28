import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    role: null, // consumer | provider | admin
    consumer: null, // consumer profile data
    provider: null, // provider profile data
    location: {
      name: "",
      coordinates: null, //  lat, lon
    },
  },
  reducers: {
    setUser: (state, action) => {
      // expect action.payload = { role, consumer, provider }
      state.role = action.payload.role || null;
      state.consumer = action.payload.consumer || null;
      state.provider = action.payload.provider || null;
    },
    clearUser: (state) => {
      state.role = null;
      state.consumer = null;
      state.provider = null;
      state.location = { name: "", coordinates: null };
    },
    updateConsumerLocation: (state, action) => {
      if (state.consumer) {
        state.consumer.location = action.payload;
      }
    },
    updateProviderData: (state, action) => {
      if (state.provider) {
        state.provider = { ...state.provider, ...action.payload };
      }
    },
    setUserLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  updateConsumerLocation,
  updateProviderData,
  setUserLocation,
} = userSlice.actions;

export default userSlice.reducer;
