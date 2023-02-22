import React from "react";
import { withPrefix } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import { H2 } from "./Typography";

const HomeDemo = () => {
  const { t } = useTranslation();

  return (
    <div className="section-sm bg-brand-light">
      <div className="container text-center">
        <H2 classes="text-gray" hasSeparator>
          {t("tryEditor")}
        </H2>
        <div className="d-flex align-items-center justify-content-center gap-3 mt-5">
          <button
            className="btn btn-outline-primary text-primary"
            type="button"
            disabled
          >
            {t("transcribe")}
          </button>
          <button className="btn btn-primary" type="button" disabled>
            {t("translate")}
          </button>
        </div>
        <img
          src={withPrefix("images/demo.webp")}
          alt="Editor demo"
          className="img-editor"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default HomeDemo;
