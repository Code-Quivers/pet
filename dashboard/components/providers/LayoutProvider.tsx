"use client";
import store from "@/redux/store";
import { Provider } from "react-redux";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <div>{children}</div>
    </Provider>
  );
};

export default LayoutProvider;
