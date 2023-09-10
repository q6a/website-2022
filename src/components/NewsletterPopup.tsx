import React, { useContext, useEffect, useRef, useState } from "react";
import { withPrefix } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import EmailContext from "../context/EmailContext";
import app from "../../package.json";

const newsletterSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  subscribeInfo: z.boolean(),
  locale: z.enum(["en", "id"]),
});

const NewsletterPopup = () => {
  const userEmail = useContext(EmailContext);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ip, setIp] = useState("");
  const { language } = useI18next();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsletterSchema),
  });
  const { t } = useTranslation();
  const buttonRef = useRef(null);
  const browserLang =
    typeof navigator !== "undefined" ? navigator.language : "unknown";

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIp(data.ip));
  }, []);

  useEffect(() => {
    const newsletterPopup = document.getElementById("newsletterPopup");

    newsletterPopup?.addEventListener("show.bs.modal", () => {
      reset();
      setIsError(false);
      setIsSuccess(false);
    });

    return () => {
      newsletterPopup?.removeEventListener("show.bs.modal", () => {});
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const notifTimeout = setTimeout(() => {
        // @ts-ignore
        buttonRef.current.click();
      }, 2500);
      return () => {
        clearTimeout(notifTimeout);
      };
    }
  }, [isSuccess]);

  const subscribeNewsletter = (data: any) => {
    try {
      const dataAttr = {
        ...data,
        app_version: app.version,
        browser_language: browserLang,
        ip_address: ip,
      };
      fetch(
        `${withPrefix("/api/newsletter/subscribe")}?${new URLSearchParams(
          dataAttr
        )}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to subscribe");
          }
          return response.json();
        })
        .then((response) => {
          if (response.status === 200) {
            reset();
            userEmail.setUserEmail("");
            setIsError(false);
            setIsSuccess(true);
          } else {
            setIsError(true);
            setIsSuccess(false);
          }
        });
    } catch (err) {
      setIsError(true);
      setIsSuccess(false);
    }
  };

  return (
    <div className="modal fade text-body" id="newsletterPopup" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit(subscribeNewsletter)}>
            <div className="modal-header">
              <h5 className="modal-title">{t("newsletterPopupTitle")}</h5>
              <button
                ref={buttonRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="hidden"
                {...register("locale")}
                defaultValue={language}
              />
              <div className="mb-1">
                <label className="form-label w-100">
                  {t("placeholderName")}
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors?.name?.message?.toString()}
                    </div>
                  )}
                </label>
              </div>
              <div className="mb-1">
                <label className="form-label w-100">
                  {t("placeholderEmail")}
                  <input
                    type="email"
                    defaultValue={userEmail.userEmail}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    required
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors?.email?.message?.toString()}
                    </div>
                  )}
                </label>
              </div>
              <div className="form-check">
                <label className="fs-14 form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="subscribeInfo"
                    defaultChecked={false}
                    {...register("subscribeInfo")}
                  />
                  {t("subscribeInfoCheck")}
                </label>
              </div>
              {isSuccess && (
                <div className="alert alert-success mt-4" role="alert">
                  Thank you for subscribe!
                </div>
              )}
              {isError && (
                <div className="alert alert-danger mt-4" role="alert">
                  Failed to subscribe
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                {t("subscribe")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
