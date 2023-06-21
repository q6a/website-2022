// @ts-nocheck
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Recaptcha from "react-google-recaptcha";
import { useTranslation } from "gatsby-plugin-react-i18next";

import { H1, BodyContentText } from "../components/Typography";
import encode from "../utils/encodeForm";

const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string(),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const recaptchaRef = React.createRef();
  const { t } = useTranslation();

  const sendMessage = (data: any) => {
    const recaptchaValue = recaptchaRef.current.getValue();

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
      .catch((error) => console.warn(error));
  };

  return (
    <div className="section-sm join text-white">
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-md-4">
            <H1 classes="mb-3">{t("contactUs")}</H1>
            <BodyContentText classes="lh-lg">
              <span className="fw-bolder">{t("officeLocation")}:</span>
              <br />
              105/166D Glebel Point Road
              <br />
              Glebel, 2037
              <br />
              Sydney, NSW, Australia.
              <br />
              <br />
              <span className="fw-bolder">{t("email")}:</span>
              <br />
              hello@videotranslator.ai
            </BodyContentText>
          </div>
          <div className="col-12 col-md-8">
            <div className="bg-light p-4 p-lg-5 rounded-2 shadow">
              <form
                onSubmit={handleSubmit(sendMessage)}
                data-netlify-recaptcha="true"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
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
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder={t("placeholderEmail")}
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
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
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
                <div className="mb-3">
                  <Recaptcha
                    ref={recaptchaRef}
                    sitekey={process.env.GATSBY_RECAPTCHA_KEY}
                    size="normal"
                    id="recaptcha-google"
                    onChange={() => setBtnDisabled(false)}
                  />
                </div>
                <div className="d-grid">
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
                <div className="alert alert-success" role="alert">
                  {t("successNotification")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
