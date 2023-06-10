import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby-plugin-react-i18next";

import { H1, BodyContentText } from "./Typography";

interface HomeContentItemProps {
  img: any;
  imgAlt: string;
  title: any;
  description: string;
  link: string;
  authorName: string;
  authorRoles: string;
  authorOrg: string;
}

const HomeContentItem = ({
  img,
  imgAlt,
  title,
  description,
  link,
  authorName,
  authorRoles,
  authorOrg,
}: HomeContentItemProps) => {
  const image = getImage(img?.localFile);
  return (
    <Link
      to={link}
      className="content-link text-white text-decoration-none fw-semibold"
    >
      <div className="mx-0 mx-md-5 mt-3">
        <div className="content-item rounded-2 text-white mx-4">
          <div className="row h-100">
            <div className="col-12 col-lg-6 d-flex">
              <div className="px-4 py-4 w-100">
                <div className="rounded-2 overflow-hidden">
                  {/* @ts-ignore */}
                  <GatsbyImage image={image} alt={imgAlt} />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 text-end d-flex flex-column align-items-end justify-content-around gap-5 p-5 h-100">
              <div className="w-75 text-right">
                <H1>{title}</H1>
              </div>
              <BodyContentText>{description}</BodyContentText>
              <span>Read the story</span>
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
    </Link>
  );
};

export default HomeContentItem;
