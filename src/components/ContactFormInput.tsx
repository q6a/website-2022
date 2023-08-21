// @ts-nocheck
import React, { useEffect } from "react";
import { withPrefix } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const RecaptchaLazy = React.lazy(() => import("react-google-recaptcha"));

import encode from "../utils/encodeForm";

interface ContactFormInputProps {
  isEmbed?: boolean;
}

const contactSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    message: z.string().min(30),
    attributes: z.string(),
    subscribeInfo: z.boolean(),
    subscribeNewsletter: z.boolean(),
  })
  .required();

const sendpulseParamsSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  subscribeInfo: z.boolean(),
  subscribeNewsletter: z.boolean(),
  locale: z.enum(["en", "id"]),
});

const ContactFormInput = ({ isEmbed = false }: ContactFormInputProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const recaptchaRef = React.createRef();
  const { t } = useTranslation();
  const { language } = useI18next();
  const watchCheckboxes = watch(["subscribeInfo", "subscribeNewsletter"]);

  useEffect(() => {
    const [info, newsletter] = watchCheckboxes;
    setValue(
      "attributes",
      `subscribeInfo: ${info} | subscribeNewsletter: ${newsletter} | locale: ${language}`
    );
  }, [JSON.stringify(watchCheckboxes)]);

  const sendMessage = (data: any) => {
    const recaptchaValue = recaptchaRef.current.getValue();
    const sendpulseParams = {
      name: data.name,
      email: data.email,
      subscribeInfo: data.subscribeInfo,
      subscribeNewsletter: data.subscribeNewsletter,
      locale: language,
    };

    if (data.subscribeInfo || data.subscribeNewsletter) {
      const paramsValidation = sendpulseParamsSchema.safeParse(sendpulseParams);

      if (!paramsValidation.success) {
        console.warn(paramsValidation.error);
      } else {
        fetch(
          `${withPrefix(
            "/api/newsletter/contact-feedback"
          )}?${new URLSearchParams(sendpulseParams)}`
        );
      }
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: encode({
        "form-name": "contact",
        "g-recaptcha-response": recaptchaValue,
        ...data,
      }),
    })
      .then(() => {
        setIsSubmit(true);
        reset();
      })
      .finally(() => {
        setBtnDisabled(true);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <div className={isEmbed ? "bg-light p-4 p-lg-5 rounded-2 shadow" : ""}>
      <form onSubmit={handleSubmit(sendMessage)} data-netlify-recaptcha="true">
        <input type="hidden" name="form-name" value="contact" />
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder={t("placeholderName")}
            {...register("name")}
          />
          {errors.name && (
            <div className="invalid-feedback">
              {errors?.name?.message?.toString()}
            </div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder={t("placeholderEmail")}
            required
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">
              {errors?.email?.message?.toString()}
            </div>
          )}
        </div>
        <div className="mb-3">
          <textarea
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            placeholder={t("placeholderMessage")}
            rows={5}
            required
            {...register("message")}
          ></textarea>
          {errors.message && (
            <div className="invalid-feedback">
              {errors?.message?.message?.toString()}
            </div>
          )}
        </div>
        <div className="form-check">
          <label
            className={`fs-14 form-check-label ${isEmbed ? "text-black" : ""}`}
          >
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="subscribeInfo"
              defaultChecked={true}
              {...register("subscribeInfo")}
            />
            {t("subscribeInfoCheck")}
          </label>
        </div>
        <div className="form-check mb-3">
          <label
            className={`fs-14 form-check-label ${isEmbed ? "text-black" : ""}`}
            htmlFor="subscribeNewsletter"
          >
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="subscribeNewsletter"
              defaultChecked={true}
              {...register("subscribeNewsletter")}
            />
            {t("subscribeNewsletterCheck")}
          </label>
        </div>
        <div className="mb-3">
          <RecaptchaLazy
            ref={recaptchaRef}
            sitekey={process.env.GATSBY_RECAPTCHA_KEY}
            size="normal"
            id="recaptcha-google"
            onChange={() => setBtnDisabled(false)}
          />
        </div>
        <div className="d-grid">
          <input
            type="text"
            style={{ display: "none" }}
            {...register("attributes")}
          />
          <button
            type="submit"
            className="btn btn-secondary"
            disabled={btnDisabled}
          >
            {t("buttonSubmit")}
          </button>
        </div>
      </form>
      {isSubmit && (
        <div className="alert alert-success mt-4" role="alert">
          {t("successNotification")}
        </div>
      )}
    </div>
  );
};

export default ContactFormInput;
