import React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

import { BodyContentText } from "../components/Typography";

const ContactFormAddress = () => {
  const { t } = useTranslation();

  return (
    <BodyContentText classes="lh-lg">
      <span className="fw-bolder">{t("officeLocation")}:</span>
      <br />
      180 Katoomba Street
      <br />
      Katoomba NSW 2780
      <br />
      Australia
      <br />
      <br />
      <span className="fw-bolder">{t("email")}:</span>
      <br />
      hello@videotranslator.ai
    </BodyContentText>
  );
};

export default ContactFormAddress;
