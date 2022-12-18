import React from "react";

interface TypographyProps {
  children: JSX.Element | JSX.Element[] | any;
  classes?: string;
}

export const H1 = ({ children, classes = "" }: TypographyProps) => {
  return <div className={`hero-title fs-2 fw-bold ${classes}`}>{children}</div>;
};

export const H2 = ({ children, classes = "" }: TypographyProps) => {
  return <div className={`hero-title fs-3 fw-bold ${classes}`}>{children}</div>;
};

export const BodyText = ({ children, classes = "" }: TypographyProps) => {
  return <p className={`fs-5 fw-light ${classes}`}>{children}</p>;
};
