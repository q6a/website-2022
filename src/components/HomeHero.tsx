import React from "react";
import { withPrefix } from "gatsby";
import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next";

import { H1, BodyText } from "./Typography";

const HomeHero = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-brand-light pt-3">
      <div className="section-sm bg-hero text-white rounded-2 mx-3">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center gap-3">
              <H1>
                <Trans i18nKey="heroTitle" components={[<span />]} />
              </H1>
              <BodyText>
                <Trans i18nKey="heroDescription" components={[<br />]} />
              </BodyText>
              {/* <div className="d-flex gap-3">
                <Link className="btn btn-light text-primary" to="/">
                  {t("login")}
                </Link>
                <Link className="btn btn-primary" to="/">
                  {t("signUp")}
                </Link>
              </div> */}
            </div>
            <div className="col-12 col-lg-6 bg-focus-hero d-flex align-items-center justify-content-center">
              <img
                src={withPrefix("images/img-hero.png")}
                alt="Play video"
                className="img-hero"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
