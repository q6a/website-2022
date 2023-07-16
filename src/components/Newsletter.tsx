import React, { useState } from "react";
import { withPrefix } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import * as z from "zod";

const emailSchema = z
  .object({
    email: z.string().email(),
    locale: z.enum(["en", "id"]),
  })
  .required();

type NewsletterProps = {
  showNotify?: boolean;
};

const Newsletter = ({ showNotify = false }: NewsletterProps) => {
  const [inputEmail, setInputEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { language } = useI18next();
  const { t } = useTranslation();

  const subscribeNewUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newsletterParams = {
        email: inputEmail,
        locale: language,
      };

      const paramsValidation = emailSchema.safeParse(newsletterParams);

      if (!paramsValidation.success) {
        setIsError(true);
      } else {
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
      }
    } catch (err) {
      setIsError(true);
    }
  };

  return (
    <>
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
            {showNotify ? t("notifyMe") : t("subscribe")}
          </button>
        </div>
      </form>
      {isSuccess && (
        <span className="fs-14 fw-semibold text-light mb-3">
          Thank you for subscribing!
        </span>
      )}
      {isError && (
        <span className="fs-14 fw-semibold text-danger mb-3">
          Failed to subscribing
        </span>
      )}
    </>
  );
};

export default Newsletter;
