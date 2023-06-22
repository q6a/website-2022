import React from "react";
import { withPrefix } from "gatsby";
import { Link } from "gatsby-plugin-react-i18next";

const Card = ({ title, desc, icon }: any) => (
  <div className="enterprise-box rounded-2 shadow text-center p-5 d-flex flex-column align-items-center gap-4">
    <img
      src={withPrefix(icon)}
      alt={title}
      width={80}
      height={80}
      loading="lazy"
    />
    <span className="fs-5 fw-bold">{title}</span>
    <p className="mb-0">{desc}</p>
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
