import React from "react";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";

const EmptyState = ({ title = "", subtitle = "" }: any) => {
  const { t } = useTranslation();

  return (
    <div className="container text-center">
      <div className="d-flex flex-column align-items-center justify-content-center gap-3 min-h-page">
        <span className="text-404 fw-bold">{!title ? "404" : title}</span>
        <span className="fs-4">{!subtitle ? t("oops") : subtitle}</span>
        <Link to="/">
          <button className="btn btn-link" type="button">
            {t("backToHomepage")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
