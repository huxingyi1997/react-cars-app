import { createSlice } from "@reduxjs/toolkit";
import { IHomePageAction, IHomePageState } from "./type";

const initialState: IHomePageState = {
  topCars: [],
};

export const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTopCars: (state: IHomePageState, action: IHomePageAction) => {
      state.topCars = action.payload;
    },
  },
});

export const { setTopCars } = homePageSlice.actions;
export default homePageSlice.reducer;
