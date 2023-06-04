import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby-plugin-react-i18next";
import dayjs from "dayjs";

interface IBlogCard {
  title: string;
  slug: string;
  description: string;
  cover?: any;
  coverAlt: string;
  postedDate: string;
}

const BlogCard = ({
  title,
  slug,
  description,
  cover,
  coverAlt,
  postedDate,
}: IBlogCard) => {
  const image = getImage(cover?.localFile);
  const imageAlt = coverAlt.trim();
  return (
    <div className="blog-card rounded-2 border border-1">
      <Link className="pb-3" to={`/blog/${slug}`}>
        <div className="rounded-2 overflow-hidden">
          {/* @ts-ignore */}
          <GatsbyImage image={image} alt={!imageAlt ? title : imageAlt} />
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
