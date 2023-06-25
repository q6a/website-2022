import React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

import { BodyContentText } from "../components/Typography";

const ContactFormAddress = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default ContactFormAddress;
