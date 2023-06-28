// @ts-nocheck
import * as React from "react";
import Recaptcha from "react-google-recaptcha";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Formik, Form, FastField } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import * as z from "zod";

import encode from "../utils/encodeForm";

interface ContactFormInputProps {
  isEmbed?: boolean;
}

const contactSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    message: z.string().min(20),
    "g-recaptcha-response": z.string(),
  })
  .required();

const ContactFormInput = ({ isEmbed = false }: ContactFormInputProps) => {
  const [isSubmit, setIsSubmit] = React.useState(false);
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        message: "",
        "g-recaptcha-response": "",
      }}
      onSubmit={(values, { resetForm }) => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          // @ts-ignore
          body: encode({
            "form-name": "contact",
            ...values,
          }),
        })
          .then(() => {
            setIsSubmit(true);
            resetForm();
          })
          .catch((error) => console.warn(error));
      }}
      validationSchema={toFormikValidationSchema(contactSchema)}
    >
      {({ errors, values, setFieldValue }) => (
        <div className={isEmbed ? "bg-light p-4 p-lg-5 rounded-2 shadow" : ""}>
          <Form data-netlify-recaptcha="true">
            <input type="hidden" name="form-name" value="contact" />
            <div className="mb-3">
              <FastField
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder={t("placeholderName")}
              />

              {!!errors.name && (
                <div className="invalid-feedback">{errors?.name}</div>
              )}
            </div>
            <div className="mb-3">
              <FastField
                type="text"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder={t("placeholderEmail")}
              />
              {!!errors.email && (
                <div className="invalid-feedback">{errors?.email}</div>
              )}
            </div>
            <div className="mb-3">
              <FastField
                as="textarea"
                type="text"
                name="message"
                className={`form-control ${errors.message ? "is-invalid" : ""}`}
                placeholder={t("placeholderMessage")}
              />
              {!!errors.message && (
                <div className="invalid-feedback">{errors?.message}</div>
              )}
            </div>
            <div className="mb-3">
              {values.name && values.email && values.message && (
                <FastField
                  as={Recaptcha}
                  name="g-recaptcha-response"
                  sitekey={process.env.GATSBY_RECAPTCHA_KEY}
                  size="normal"
                  id="recaptcha-google"
                  onChange={(value) =>
                    setFieldValue("g-recaptcha-response", value)
                  }
                />
              )}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-secondary">
                {t("buttonSubmit")}
              </button>
            </div>
          </Form>
          {isSubmit && (
            <div className="alert alert-success mt-4" role="alert">
              {t("successNotification")}
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default ContactFormInput;
