import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

import ContactFormAddress from "./ContactFormAddress";
import ContactFormInput from "./ContactFormInput";
import { H1 } from "./Typography";

const ContactForm = () => {
  const { t } = useTranslation();

  return (
    <div className="section-sm join text-white">
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-md-4">
            <H1 classes="mb-3">{t("contactUs")}</H1>
            <ContactFormAddress />
          </div>
          <div className="col-12 col-md-8">
            <ContactFormInput isEmbed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
