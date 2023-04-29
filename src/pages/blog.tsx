import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";

import BlogCard from "../components/BlogCard";
import EditorPick from "../components/EditorPick";
import Layout from "../components/Layout";
import Helper from "../components/Helper";
import Seo from "../components/Seo";
import { H1 } from "../components/Typography";

const sortByData = ["Newer to older", "Older to newer"];

const BlogPage: React.FC<PageProps> = ({ data }: any) => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const blogPostDataDesc = data?.blogPostDataDesc?.blogs?.data;
  const blogPostDataAsc = data?.blogPostDataAsc?.blogs?.data;
  const editorPickId = data?.editorPicksId?.blogs?.data;
  const editorPickEn = data?.editorPicksEn?.blogs?.data;
  const postPerLoad = 6;
  const editorPick = language === "en" ? editorPickEn : editorPickId;
  const [blogPosts, setBlogPosts] = React.useState([]);
  const [activePage, setActivePage] = React.useState(0);
  const [sortAsc, setSortAsc] = React.useState(true);
  const blogPostData = sortAsc ? blogPostDataDesc : blogPostDataAsc;

  React.useEffect(() => {
    setActivePage(1);
  }, []);

  React.useEffect(() => {
    setActivePage(1);
    generatePosts();
  }, [language]);

  React.useEffect(() => {
    if (activePage > 0) {
      setBlogPosts([]);
      setActivePage(1);
    }
  }, [sortAsc]);

  React.useEffect(() => {
    if (activePage > 0) {
      generatePosts();
    }
  }, [activePage]);

  React.useEffect(() => {
    if (activePage > 0) {
      if (blogPosts.length === 0) {
        generatePosts();
      }
    }
  }, [JSON.stringify(blogPosts)]);

  const generatePosts = () => {
    const indexStart = (activePage - 1) * postPerLoad;
    const indexEnd = activePage * postPerLoad;
    const filterByLang = blogPostData.filter(
      ({ id, attributes }: any) =>
        attributes.locale === language && id !== editorPick[0]?.id
    );
    const filterByLimit = filterByLang.slice(indexStart, indexEnd);
    // @ts-ignore
    setBlogPosts([...blogPosts, ...filterByLimit]);
  };

  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes={`mb-3 text-left`}>{t("vtaiBlog")}</H1>
        <div className="custom-page-content fw-light lh-lg py-3">
          <div className="row mb-5">
            <EditorPick
              cover={editorPick[0]?.attributes?.cover?.data?.attributes?.url}
              coverAlt={editorPick[0]?.attributes?.coverAlt}
              title={editorPick[0]?.attributes?.title}
              slug={editorPick[0]?.attributes?.slug}
              description={editorPick[0]?.attributes?.description}
              postedDate={editorPick[0]?.attributes?.postedDate}
            />
          </div>
          <div className="row">
            <div className="dropdown text-end pb-3">
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
            {blogPosts &&
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
              ))}
          </div>
        </div>
        {blogPostData.filter(
          ({ attributes }: any) => attributes.locale === language
        ).length -
          1 >
          blogPosts.length && (
          <div className="text-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => setActivePage(activePage + 1)}
            >
              {t("loadMore")}
            </button>
          </div>
        )}
      </div>
      <Helper />
    </Layout>
  );
};

export default BlogPage;

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
    editorPicksId: strapiQueries {
      blogs(
        locale: "id"
        publicationState: LIVE
        pagination: { limit: 1 }
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
            postedDate
          }
        }
      }
    }
    editorPicksEn: strapiQueries {
      blogs(
        locale: "en"
        publicationState: LIVE
        pagination: { limit: 1 }
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
            postedDate
          }
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

export const Head: HeadFC = () => <Seo title="Blog" />;