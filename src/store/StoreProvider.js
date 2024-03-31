"use client";
import { Provider } from "react-redux";
import appStore from "./appStore";

const StoreProvider = ({ children }) => {
  return <Provider store={appStore}>{children}</Provider>;
};

export default StoreProvider;
