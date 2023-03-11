import React from "react";
import { withPrefix } from "gatsby";
import { Link } from "gatsby-plugin-react-i18next";

import { H2 } from "./Typography";

interface IBlogCard {
  title: string;
  slug: string;
  description: string;
  cover?: string;
  coverAlt: string;
}

const BlogCard = ({
  title,
  slug,
  description,
  cover = withPrefix("/images/no-image.jpg"),
  coverAlt,
}: IBlogCard) => {
  return (
    <div className="blog-card">
      <Link className="pb-3" to={`/blog/${slug}`}>
        <div className="rounded-2 overflow-hidden">
          <img src={cover} alt={coverAlt} width="100%" loading="lazy" />
        </div>
        <div className="blog-card-text">
          <div className="fs-5 fw-bold fs-5 pt-3 pb-2 ">{title}</div>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
