import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import { navigate } from "@reach/router";
import queryString from "query-string";

import BlogCard from "../components/BlogCard";
import BlogSearch from "../components/BlogSearch";
import Layout from "../components/Layout";
import Helper from "../components/Helper";
import Seo from "../components/Seo";
import { H2 } from "../components/Typography";

const sortByData = ["Newer to older", "Older to newer"];

const SearchPage: React.FC<PageProps> = ({ data, location }: any) => {
  const { t } = useTranslation();
  const blogPostDataDesc = data?.blogPostDataDesc?.blogs?.data;
  const blogPostDataAsc = data?.blogPostDataAsc?.blogs?.data;
  const [blogPosts, setBlogPosts] = React.useState([]);
  const [sortAsc, setSortAsc] = React.useState(true);
  const blogPostData = sortAsc ? blogPostDataDesc : blogPostDataAsc;
  const [totalData, setTotalData] = React.useState(0);
  const params = queryString.parse(location.search);

  React.useEffect(() => {
    if (!params?.q) {
      navigate(`/blog/`);
    } else {
      // @ts-ignore
      const filterData = blogPostData.filter(
        ({ attributes }: any) =>
          attributes.title.match(new RegExp(`\\b${params.q}\\b`, "i")) ||
          attributes.description.match(new RegExp(`\\b${params.q}\\b`, "i"))
      );
      setTotalData(filterData.length);
      setBlogPosts(filterData);
    }
  }, []);

  React.useEffect(() => {
    const filterData = blogPostData.filter(
      ({ attributes }: any) =>
        attributes.title.match(new RegExp(`\\b${params.q}\\b`, "i")) ||
        attributes.description.match(new RegExp(`\\b${params.q}\\b`, "i"))
    );
    setBlogPosts(filterData);
  }, [sortAsc]);

  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H2 classes={`mb-3 text-left`}>
          {t("vtaiBlogSeach", { keyword: params?.q })}
        </H2>
        <div className="custom-page-content fw-light lh-lg py-3">
          <div className="row">
            <div className="d-flex justify-content-between pb-3">
              <BlogSearch
                placeholder={t("typeHere") || ""}
                defaultValue={params?.q}
              />
              <div className="dropdown text-end">
                <button
                  type="button"
                  className="btn btn-outline-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-offset="10,20"
                >
                  Sort by{" "}
                  {sortAsc
                    ? sortByData[0].toLowerCase()
                    : sortByData[1].toLowerCase()}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className={`dropdown-item ${sortAsc ? "active" : ""}`}
                      onClick={() => setSortAsc(true)}
                    >
                      {sortByData[0]}
                    </button>
                  </li>
                  <li>
                    <button
                      className={`dropdown-item ${sortAsc ? "" : "active"}`}
                      onClick={() => setSortAsc(false)}
                    >
                      {sortByData[1]}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {totalData > 0 ? (
              blogPosts.map(({ id, attributes }: any) => (
                <div
                  key={`post-${id}`}
                  className="col-12 col-md-6 col-lg-4 mb-4"
                >
                  <BlogCard
                    cover={attributes?.cover?.data?.attributes?.url}
                    coverAlt={attributes?.coverAlt}
                    title={attributes?.title}
                    slug={attributes?.slug}
                    description={attributes?.description}
                    postedDate={attributes?.postedDate}
                  />
                </div>
              ))
            ) : (
              <div className="mx-0">
                <div className="border rounded col-12 py-5 mx-auto text-center">
                  <div className="d-flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <span className="text-404 fw-bold">404</span>
                    <span className="fs-4">{t("emptyResult")}</span>
                    <Link to="/">
                      <button className="btn btn-link" type="button">
                        {t("backToHomepage")}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Helper />
    </Layout>
  );
};

export default SearchPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["index", "blog"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    blogPostDataDesc: strapiQueries {
      blogs(
        locale: "all"
        publicationState: LIVE
        pagination: { limit: 1000 }
        sort: "postedDate:desc"
      ) {
        data {
          id
          attributes {
            title
            slug
            description
            cover {
              data {
                attributes {
                  url
                }
              }
            }
            coverAlt
            locale
            createdAt
            postedDate
          }
        }
      }
    }
    blogPostDataAsc: strapiQueries {
      blogs(
        locale: "all"
        publicationState: LIVE
        pagination: { limit: 1000 }
        sort: "postedDate:asc"
      ) {
        data {
          id
          attributes {
            title
            slug
            description
            cover {
              data {
                attributes {
                  url
                }
              }
            }
            coverAlt
            locale
            createdAt
            postedDate
          }
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <Seo title="Blog Search" />;
