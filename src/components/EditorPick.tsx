import React from "react";
import { withPrefix } from "gatsby";
import { Link } from "gatsby-plugin-react-i18next";
import dayjs from "dayjs";

interface IEditorPick {
  title: string;
  slug: string;
  description: string;
  cover?: string;
  coverAlt: string;
  postedDate: string;
}

const EditorPick = ({
  title,
  slug,
  description,
  cover = withPrefix("/images/no-image.jpg"),
  coverAlt,
  postedDate,
}: IEditorPick) => {
  return (
    <div className="blog-card editors-pick">
      <Link className="pb-3" to={`/blog/${slug}`}>
        <div className="d-flex flex-column flex-lg-row align-items-center rounded-2 shadow">
          <div className="rounded-2 overflow-hidden">
            <img src={cover} alt={coverAlt} width="100%" loading="lazy" />
          </div>
          <div className="blog-card-text px-3 px-lg-5 pt-3">
            <span className="badge fw-semibold bg-secondary">
              Editor's pick
            </span>
            <div className="fs-4 fw-bold fs-5 pb-2 lh-md">{title}</div>
            <p>{description}</p>
            <span className="blog-card-date">
              {dayjs(postedDate).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EditorPick;
