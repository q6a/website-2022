import React, { useContext, useState } from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

import EmailContext from "../context/EmailContext";

const Newsletter = () => {
  const userEmail = useContext(EmailContext);
  const [inputEmail, setInputEmail] = useState("");
  const { t } = useTranslation();

  const validateInput = (e: React.FormEvent) => {
    e.preventDefault();
    userEmail.setUserEmail(inputEmail);
  };

  return (
    <>
      <form onSubmit={(e: React.FormEvent) => validateInput(e)}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder={t("inputNewsletterPlaceholder") || ""}
            aria-label={t("inputNewsletterPlaceholder") || ""}
            aria-describedby="input-subscribe"
            value={inputEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputEmail(e.target.value)
            }
          />
          <button
            className="btn btn-gradient"
            type="submit"
            id="button-subscribe"
            data-bs-toggle="modal"
            data-bs-target="#newsletterPopup"
          >
            {t("subscribe")}
          </button>
        </div>
      </form>
    </>
  );
};

export default Newsletter;
