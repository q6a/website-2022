import React, { useEffect, useState } from "react";
import { withPrefix } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import * as yup from "yup";

import WrapperLink from "./WrapperLink";
import useFooterCompanyNavigation from "../hooks/useFooterCompanyNav";
import useFooterProductNavigation from "../hooks/useFooterProductNav";
import useFooterResourcesNavigation from "../hooks/useFooterResourcesNav";
import useFooterEnterpriseNavigation from "../hooks/useFooterEnterpriseNav";
import useSocialLinks from "../hooks/useSocialLinks";

const emailSchema = yup.string().email().required();

const Footer = () => {
  const { language } = useI18next();
  const currentYear = new Date().getFullYear();
  const companyNavigation = useFooterCompanyNavigation();
  const productNavigation = useFooterProductNavigation();
  const resourcesNavigation = useFooterResourcesNavigation();
  const enterpriseNavigation = useFooterEnterpriseNavigation();
  const socialLinks = useSocialLinks();
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subscribeNewUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isValid = await emailSchema.isValid(inputEmail);
      if (isValid) {
        fetch(
          `${withPrefix("/api/newsletter/subscribe")}?${new URLSearchParams({
            email: inputEmail,
            locale: language,
          })}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to subsribe");
            }
            return response.json();
          })
          .then((response) => {
            if (response.status === 200) {
              setInputEmail("");
              setIsSuccess(true);
            }
          });
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    }
  };

  return (
    <>
      <footer className="bg-brand-purple text-white">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="d-flex flex-column gap-3 pe-lg-3">
                <img
                  src={withPrefix("images/logo-white.png")}
                  alt="VideoTranslator"
                  className="footer-logo"
                  loading="lazy"
                />
                <span className="fs-14">{t("tagline")}</span>
                <span className="fs-14 fw-semibold">
                  {t("subscribeNewsletter")}
                </span>
                <form onSubmit={(e: React.FormEvent) => subscribeNewUser(e)}>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder={t("inputNewsletterPlaceholder") || ""}
                      aria-label={t("inputNewsletterPlaceholder") || ""}
                      aria-describedby="button-subscribe"
                      value={inputEmail}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInputEmail(e.target.value)
                      }
                    />
                    <button
                      className="btn btn-gradient"
                      type="submit"
                      id="button-subscribe"
                    >
                      {t("subscribe")}
                    </button>
                  </div>
                </form>
                {isSuccess && (
                  <span className="fs-14 fw-semibold text-success mb-3">
                    Thank you for subscribing!
                  </span>
                )}
                {isError && (
                  <span className="fs-14 fw-semibold text-danger mb-3">
                    Failed to subscribing
                  </span>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-2 ps-3 ps-lg-5 mt-5 mt-lg-0">
              <span className="footer-title fw-semibold">{t("company")}</span>
              <ul className="footer-menu">
                {companyNavigation?.map(({ node }: any) => (
                  <li key={node?.id}>
                    <WrapperLink
                      condition={node?.menuAttached}
                      to={node?.path}
                      label={t(`footerMenu${node?.title}`)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-lg-2 ps-3 ps-lg-5 mt-5 mt-lg-0">
              <span className="footer-title fw-semibold">{t("product")}</span>
              <ul className="footer-menu">
                {productNavigation?.map(({ node }: any) => (
                  <li key={node?.id}>
                    <WrapperLink
                      condition={node?.menuAttached}
                      to={node?.path}
                      label={t(`footerMenu${node?.title}`)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-lg-2 ps-3 ps-lg-5 mt-5 mt-lg-0">
              <span className="footer-title fw-semibold">
                {t("menuEnterprise")}
              </span>
              <ul className="footer-menu">
                {enterpriseNavigation?.map(({ node }: any) => (
                  <li key={node?.id}>
                    <WrapperLink
                      condition={node?.menuAttached}
                      to={node?.path}
                      label={t(`footerMenu${node?.title}`)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-lg-2 ps-3 ps-lg-5 mt-5 mt-lg-0">
              <span className="footer-title fw-semibold">{t("resources")}</span>
              <ul className="footer-menu">
                {resourcesNavigation?.map(({ node }: any) => (
                  <li key={node?.id}>
                    <WrapperLink
                      condition={node?.menuAttached}
                      to={node?.path}
                      label={t(`footerMenu${node?.title}`)}
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
              &copy; Video Translator {currentYear} (ABN: 73 602 663 141) -{" "}
              {t("allRights")}
            </span>
            <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
              {socialLinks?.facebookActive && (
                <a
                  href={socialLinks?.facebookUrl}
                  className="text-white"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              )}
              {socialLinks?.linkedinActive && (
                <a
                  href={socialLinks?.linkedinUrl}
                  className="text-white"
                  rel="noopener noreferrer"
                  aria-label="Linkedin"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              )}
              {socialLinks?.twitterActive && (
                <a
                  href={socialLinks?.twitterUrl}
                  className="text-white"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              )}
              {socialLinks?.youtubeActive && (
                <a
                  href={socialLinks?.youtubeUrl}
                  className="text-white"
                  rel="noopener noreferrer"
                  aria-label="Youtube"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              )}
              {socialLinks?.instagramActive && (
                <a
                  href={socialLinks?.instagramUrl}
                  className="text-white"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
