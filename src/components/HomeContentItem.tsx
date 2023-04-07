import React from "react";
import { Link, withPrefix } from "gatsby";

import { H1, BodyContentText } from "./Typography";

interface HomeContentItemProps {
  img: string;
  title: any;
  description: string;
  link: string;
  authorName: string;
  authorRoles: string;
  authorOrg: string;
}

const HomeContentItem = ({
  img,
  title,
  description,
  link,
  authorName,
  authorRoles,
  authorOrg,
}: HomeContentItemProps) => {
  return (
    <div className="mx-0 mx-md-5 mt-3">
      <div className="content-item rounded-2 text-white mx-4">
        <div className="row">
          <div className="col-12 col-lg-6 d-flex align-items-end">
            <div className="px-4 py-4">
              <div className="rounded-2 overflow-hidden">
                <img
                  src={withPrefix(img)}
                  alt={title}
                  width="100%"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 text-end d-flex flex-column align-items-end justify-content-around gap-5 p-5">
            <div className="w-75 text-right">
              <H1>{title}</H1>
            </div>
            <BodyContentText>{description}</BodyContentText>
            <Link
              to={link}
              className="content-link text-white text-decoration-none fw-semibold"
            >
              <span>Read the story</span>
            </Link>
            {/* <BodyContentText classes="mb-0">
              {authorName}
              <br />
              {authorRoles},
              <br />
              {authorOrg}
            </BodyContentText> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContentItem;
