import React from "react";

import { H1 } from "../components/Typography";

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <div className="page-header-bg py-5">
      <div className="container my-5">
        <H1 classes="mb-3 text-center text-white">{title}</H1>
      </div>
    </div>
  );
};

export default PageHeader;
