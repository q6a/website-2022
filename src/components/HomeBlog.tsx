import React from "react";
import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next";

import BlogCard from "./BlogCard";
import { H2 } from "./Typography";

const HomeBlog = ({ data }: any) => {
  const { t } = useTranslation();

  return (
    <div className="section-sm bg-brand-light">
      <div className="container">
        <H2 classes="text-gray text-center" hasSeparator>
          <Trans i18nKey="blogSectionHomeTitle" components={[<br />]} />
        </H2>
        <div className="mt-5">
          <div className="row">
            <code>{JSON.stringify(data.nodes)}</code>
            {data &&
              data.map(
                ({
                  id,
                  cover,
                  coverAlt,
                  title,
                  slug,
                  description,
                  postedDate,
                }: any) => (
                  <div
                    key={`post-${id}`}
                    className="col-12 col-md-6 col-lg-4 mb-4"
                  >
                    <BlogCard
                      cover={cover}
                      coverAlt={coverAlt}
                      title={title}
                      slug={slug}
                      description={description}
                      postedDate={postedDate}
                    />
                  </div>
                )
              )}
          </div>
          <div className="mt-3">
            <div className="text-center">
              <Link to="/blog">
                <button type="button" className="btn btn-outline-primary">
                  {t("more")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBlog;
