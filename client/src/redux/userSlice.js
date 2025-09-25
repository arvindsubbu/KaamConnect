import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    role: null, // consumer | provider | admin
    consumer: null, // consumer profile data
    provider: null, // provider profile data
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
  },
});

export const {
  setUser,
  clearUser,
  updateConsumerLocation,
  updateProviderData,
} = userSlice.actions;

export default userSlice.reducer;
