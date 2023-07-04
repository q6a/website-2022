import React from "react";
import { withPrefix } from "gatsby";
import { Link } from "gatsby-plugin-react-i18next";

const Card = ({ bg, title, icon }: any) => (
  <div className="enterprise-box rounded-2 shadow text-center p-5 d-flex flex-column align-items-center justify-content-center">
    <img
      src={withPrefix(bg)}
      alt={`bg-${title}`}
      className="enterprise-box-bg"
    />
    <div className="enterprise-box-content d-flex flex-column align-items-center gap-2">
      <img
        src={withPrefix(icon)}
        alt={title}
        width={80}
        height={80}
        loading="lazy"
      />
      <span className="fs-5 fw-bold">{title}</span>
    </div>
  </div>
);

const EnterpriseBox = (item: any) => {
  if (!item.link) {
    return <Card {...item} />;
  }

  return (
    <Link to={item.link} className="text-decoration-none">
      <Card {...item} />
    </Link>
  );
};

export default EnterpriseBox;
