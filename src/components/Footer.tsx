import React from "react";
import { withPrefix } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "gatsby-plugin-react-i18next";

import WrapperLink from "./WrapperLink";
import useFooterCompanyNavigation from "../hooks/useFooterCompanyNav";
import useFooterProductNavigation from "../hooks/useFooterProductNav";
import useFooterResourcesNavigation from "../hooks/useFooterResourcesNav";

const socials = [
  {
    id: "social-1",
    icon: faFacebookF,
    name: "Facebook",
    href: "https://www.facebook.com/",
  },
  {
    id: "social-2",
    icon: faLinkedinIn,
    name: "Linkedin",
    href: "https://linkedin.com/",
  },
  {
    id: "social-3",
    icon: faTwitter,
    name: "Twitter",
    href: "https://twitter.com/",
  },
  {
    id: "social-4",
    icon: faYoutube,
    name: "Youtube",
    href: "https://youtube.com/",
  },
  {
    id: "social-5",
    icon: faInstagram,
    name: "Instagram",
    href: "https://instagram.com/",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyNavigation = useFooterCompanyNavigation();
  const productNavigation = useFooterProductNavigation();
  const resourcesNavigation = useFooterResourcesNavigation();
  const { t } = useTranslation();

  return (
    <>
      <footer className="bg-brand-purple text-white">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column gap-3">
                <img
                  src={withPrefix("images/logo-white.png")}
                  alt="VideoTranslator"
                  className="footer-logo"
                />
                <span className="fs-14">{t("tagline")}</span>
                <span className="fs-14 fw-semibold">
                  {t("subscribeNewsletter")}
                </span>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder={t("inputNewsletterPlaceholder") || ""}
                    aria-label={t("inputNewsletterPlaceholder") || ""}
                    aria-describedby="button-subscribe"
                  />
                  <button
                    className="btn btn-gradient"
                    type="button"
                    id="button-subscribe"
                  >
                    {t("subscribe")}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 ps-3 ps-lg-5 mt-5 mt-lg-0">
              <span className="footer-title fw-semibold">{t("company")}</span>
              <ul className="footer-menu">
                {companyNavigation?.map(({ node }: any) => (
                  <li key={node?.id}>
                    <WrapperLink
                      condition={node?.menuAttached}
                      to={node?.path}
                      label={node?.title}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-lg-3 ps-3 ps-lg-5 mt-5 mt-lg-0">
              <span className="footer-title fw-semibold">{t("product")}</span>
              <ul className="footer-menu">
                {productNavigation?.map(({ node }: any) => (
                  <li key={node?.id}>
                    <WrapperLink
                      condition={node?.menuAttached}
                      to={node?.path}
                      label={node?.title}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-lg-3 ps-3 ps-lg-5 mt-5 mt-lg-0">
              <span className="footer-title fw-semibold">{t("resources")}</span>
              <ul className="footer-menu">
                {resourcesNavigation?.map(({ node }: any) => (
                  <li key={node?.id}>
                    <WrapperLink
                      condition={node?.menuAttached}
                      to={node?.path}
                      label={node?.title}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-subfooter text-white">
        <div className="container py-3">
          <div className="d-flex flex-column flex-lg-row justify-content-between">
            <span className="fs-12">
              &copy; Video Translator {currentYear} - All Rights Reserved
            </span>
            <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
              {socials.map(({ id, icon, href }) => (
                <a
                  key={id}
                  href={href}
                  className="text-white"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
