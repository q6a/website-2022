import React from "react";
import { withPrefix } from "gatsby";
import { Link } from "gatsby-plugin-react-i18next";

const Card = ({ icon }: any) => (
  <div
    className="enterprise-box rounded-2 shadow text-center p-5 d-flex flex-column align-items-center gap-4"
    style={{
      backgroundImage: `url(${withPrefix(icon)})`,
    }}
  />
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
