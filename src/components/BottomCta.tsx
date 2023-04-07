import React from "react";
import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next";

import { BodyText } from "../components/Typography";

const BottomCta = () => {
  const { t } = useTranslation();

  return (
    <div className="section-md join text-white text-center">
      <div className="container py-5">
        <div className="fs-2 fw-semibold">
          <Trans
            i18nKey="bottomCtaTitle"
            components={[<span className="text-brand-green fw-900" />]}
          />
        </div>
        <BodyText classes="brand-text my-3">
          <Trans
            i18nKey="bottomCtaDescription"
            components={[<br />, <span className="fw-semibold" />]}
          />
        </BodyText>
        <Link className="btn btn-primary mt-3" to="/available-languages">
          {t("bottomCtaButtonLabel")}
        </Link>
      </div>
    </div>
  );
};

export default BottomCta;
