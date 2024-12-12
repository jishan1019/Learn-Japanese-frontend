import React from "react";
import Header from "./(share)/header";

import { TChildren } from "@/types";
import { Footer } from "./(share)/footer";

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
