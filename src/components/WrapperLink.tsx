import React from "react";
import { Link } from "gatsby";

const WrapperLink = ({
  condition,
  to,
  label,
}: {
  condition: boolean;
  to: string;
  label: string;
}): any => (condition ? <Link to={to}>{label}</Link> : label);

export default WrapperLink;
