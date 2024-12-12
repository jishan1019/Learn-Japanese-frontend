import React from "react";

import { TChildren } from "@/types";
import { Footer } from "./(share)/footer";
import { Header } from "./(share)/header";

const WithLayout = ({ children }: TChildren) => {
  return (
    <div className="container mx-auto">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default WithLayout;
