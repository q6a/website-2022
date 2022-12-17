import React from "react";

interface SectionProps {
  hasGradient?: boolean;
  title?: string;
  classes?: string;
}

const Section = ({
  hasGradient = false,
  title = "Title goes here",
  classes = "",
}: SectionProps) => {
  return (
    <div
      className={`section ${
        hasGradient ? "section-gradient text-white" : "text-gradient"
      } ${classes}`}
    >
      <div className="container my-5 text-center">
        <h1 className="fs-1 fw-bold">{title}</h1>
      </div>
    </div>
  );
};

export default Section;
