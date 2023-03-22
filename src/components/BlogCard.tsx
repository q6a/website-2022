import React from "react";
import { withPrefix } from "gatsby";
import { Link } from "gatsby-plugin-react-i18next";
import dayjs from "dayjs";

interface IBlogCard {
  title: string;
  slug: string;
  description: string;
  cover?: string;
  coverAlt: string;
  postedDate: string;
}

const BlogCard = ({
  title,
  slug,
  description,
  cover = withPrefix("/images/no-image.jpg"),
  coverAlt,
  postedDate,
}: IBlogCard) => {
  return (
    <div className="blog-card">
      <Link className="pb-3" to={`/blog/${slug}`}>
        <div className="rounded-2 overflow-hidden">
          <img src={cover} alt={coverAlt} width="100%" loading="lazy" />
        </div>
        <div className="blog-card-text">
          <div className="fs-5 fw-bold fs-5 pt-3 pb-2">{title}</div>
          <p className="mb-2">{description}</p>
          <span className="blog-card-date">
            {dayjs(postedDate).format("MMM DD, YYYY")}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
