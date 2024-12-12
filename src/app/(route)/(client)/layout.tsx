import React from "react";

import { TChildren } from "@/types";
import { Footer } from "./(share)/footer";
import { Header } from "./(share)/header";

const WithLayout = ({ children }: TChildren) => {
  return (
    <div className="container mx-auto">
      <Header />
      <div style={{ minHeight: "calc(100vh - 240px)" }}>{children}</div>
      <Footer />
    </div>
  );
};

export default WithLayout;
