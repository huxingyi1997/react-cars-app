import { Action } from "@reduxjs/toolkit";
import { GetCars_cars } from "../../services/carService/__generated__/GetCars";

export interface IHomePageState {
  topCars: GetCars_cars[];
}

export interface IHomePageAction extends Action {
  payload: GetCars_cars[];
}
