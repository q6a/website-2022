import React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

import { BodyContentText } from "../components/Typography";
import useContactInfo from "../hooks/useContactInfo";

const ContactFormAddress = () => {
  const { t } = useTranslation();
  const contactInfo = useContactInfo();

  return (
    <BodyContentText classes="lh-lg whitespace-pre-line">
      <span className="fw-bolder">{t("officeLocation")}:</span>
      <br />
      {contactInfo?.address?.data?.address}
      <br />
      <br />
      <span className="fw-bolder">{t("email")}:</span>
      <br />
      {contactInfo?.email}
    </BodyContentText>
  );
};

export default ContactFormAddress;
