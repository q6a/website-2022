import React from "react";
import { Link, withPrefix } from "gatsby";

import { H2, BodyContentText } from "./Typography";

interface HomeContentItemProps {
  img: string;
  title: any;
  link: string;
  authorName: string;
  authorRoles: string;
  authorOrg: string;
}

const HomeContentItem = ({
  img,
  title,
  link,
  authorName,
  authorRoles,
  authorOrg,
}: HomeContentItemProps) => {
  return (
    <div className="mx-5 mt-3">
      <div className="content-item rounded-2 text-white mx-4">
        <div className="row">
          <div className="col">
            <img
              src={withPrefix(img)}
              alt={title}
              className="pt-4"
              width="100%"
              loading="lazy"
            />
          </div>
          <div className="col text-end d-flex flex-column justify-content-around gap-5 p-5">
            <H2>{title}</H2>
            <Link
              to={link}
              className="content-link text-white text-decoration-none fw-semibold"
            >
              <span>Read the story</span>
            </Link>
            <BodyContentText classes="mb-0">
              {authorName}
              <br />
              {authorRoles},
              <br />
              {authorOrg}
            </BodyContentText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContentItem;
