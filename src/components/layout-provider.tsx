"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function LayoutProvider({ children }) {
  return (
    <>
      <Provider store={store}>
        {children}
        <Toaster />
      </Provider>
    </>
  );
}
