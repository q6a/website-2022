import React from "react";
import { withPrefix } from "gatsby";
import { H2 } from "./Typography";

const HomeDemo = () => {
  return (
    <div className="section-sm bg-brand-light">
      <div className="container text-center">
        <H2 classes="text-gray">Try out our editor demo</H2>
        <img
          src={withPrefix("images/demo.webp")}
          alt="Editor demo"
          className="img-editor"
          loading="lazy"
        />
        <div className="d-flex align-items-center justify-content-center gap-3">
          <button
            className="btn btn-outline-primary text-primary"
            type="button"
            disabled
          >
            Transcribe
          </button>
          <button className="btn btn-primary" type="button" disabled>
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDemo;
