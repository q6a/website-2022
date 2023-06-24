import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import queryString from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import BlogCard from "../components/BlogCard";
import BlogSearch from "../components/BlogSearch";
import EditorPick from "../components/EditorPick";
import Layout from "../components/Layout";
import Helper from "../components/Helper";
import Seo from "../components/Seo";
import { H1 } from "../components/Typography";
import pagination from "../utils/pagination";

const sortByData = ["Newer to older", "Older to newer"];

const BlogPage: React.FC<PageProps> = ({ data, location }: any) => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const blogPostDataDesc = data?.blogPostDataDesc?.nodes;
  const blogPostDataAsc = data?.blogPostDataAsc?.nodes;
  const postPerLoad = 12;
  const editorPick = data?.editorPicks?.nodes;
  const [blogPosts, setBlogPosts] = React.useState([]);
  const [activePage, setActivePage] = React.useState(0);
  const [sortAsc, setSortAsc] = React.useState(false);
  const [totalPage, setTotalPage] = React.useState(1);
  const [numPage, setNumPage] = React.useState([]);
  const blogPostData = sortAsc ? blogPostDataAsc : blogPostDataDesc;
  const { page, sort } = queryString.parse(location.search);

  React.useEffect(() => {
    if (!page) {
      setActivePage(1);
    } else {
      setActivePage(parseInt(page.toString()));
    }

    if (!sort) {
      setSortAsc(false);
    } else {
      setSortAsc(sort === "asc");
    }
  }, []);

  React.useEffect(() => {
    if (activePage > 0) {
      setActivePage(1);
      setSortAsc(false);
    }
  }, [language]);

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
    const filterByLang = blogPostData.filter(({ strapi_id }: any) =>
      activePage > 1 ? true : strapi_id !== editorPick[0]?.strapi_id
    );
    const filterByLimit =
      activePage > 1 && !sortAsc
        ? filterByLang.slice(indexStart + 1, indexEnd + 1)
        : filterByLang.slice(indexStart, indexEnd);
    const total = Math.ceil(filterByLang.length / postPerLoad);
    // @ts-ignore
    setBlogPosts(filterByLimit);
    setTotalPage(total);
    setNumPage(pagination(activePage, total));
  };

  const generateQueryString = (page: number, isAsc: boolean) =>
    `?page=${page}&sort=${isAsc ? "asc" : "desc"}`;

  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes={`mb-3 text-left`}>{t("vtaiBlog")}</H1>
        <div className="custom-page-content fw-light lh-lg py-3">
          {activePage === 1 && (
            <div className="row mb-5">
              <EditorPick
                cover={editorPick[0]?.cover}
                coverAlt={editorPick[0]?.coverAlt}
                title={editorPick[0]?.title}
                slug={editorPick[0]?.slug}
                description={editorPick[0]?.description}
                postedDate={editorPick[0]?.postedDate}
              />
            </div>
          )}
          <div className="row">
            <div className="d-flex justify-content-between pb-3">
              <BlogSearch placeholder={t("typeHere") || ""} />
              <div className="dropdown text-end">
                <button
                  type="button"
                  className="btn btn-outline-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-offset="10,20"
                >
                  Sort by{" "}
                  {!sortAsc
                    ? sortByData[0].toLowerCase()
                    : sortByData[1].toLowerCase()}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className={`dropdown-item ${sortAsc ? "" : "active"}`}
                      onClick={() => {
                        setSortAsc(false);
                        window.location.href = "?sort=desc";
                      }}
                    >
                      {sortByData[0]}
                    </button>
                  </li>
                  <li>
                    <button
                      className={`dropdown-item ${sortAsc ? "active" : ""}`}
                      onClick={() => {
                        setSortAsc(true);
                        window.location.href = "?sort=asc";
                      }}
                    >
                      {sortByData[1]}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {blogPosts &&
              blogPosts.map(
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
        </div>
        {totalPage > 1 && blogPosts.length > 0 && (
          <nav aria-label="Blog pagination" className="my-5">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${activePage === 1 ? "disabled" : ""}`}>
                <a
                  className="page-link"
                  href={generateQueryString(activePage - 1, sortAsc)}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </span>
                </a>
              </li>
              {numPage.map((x, i) => (
                <li
                  key={`page-${x}`}
                  className={`page-item ${activePage === x ? "active" : ""}`}
                >
                  {x !== "..." ? (
                    <a
                      className="page-link"
                      href={generateQueryString(x, sortAsc)}
                    >
                      {x}
                    </a>
                  ) : (
                    <span className="page-link">{x}</span>
                  )}
                </li>
              ))}
              <li
                className={`page-item ${
                  activePage === totalPage ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href={generateQueryString(activePage + 1, sortAsc)}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </a>
              </li>
            </ul>
          </nav>
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
    editorPicks: allStrapiBlog(
      filter: { locale: { eq: $language } }
      limit: 1
      sort: { postedDate: DESC }
    ) {
      nodes {
        id
        strapi_id
        title
        slug
        description
        cover {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        coverAlt
        postedDate(formatString: "MMM DD, YYYY")
      }
    }
    blogPostDataDesc: allStrapiBlog(
      filter: { locale: { eq: $language } }
      sort: { postedDate: DESC }
      limit: 1000
    ) {
      nodes {
        id
        strapi_id
        title
        slug
        description
        cover {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        coverAlt
        postedDate(formatString: "MMM DD, YYYY")
        blogCategories {
          categoryName
        }
      }
    }
    blogPostDataAsc: allStrapiBlog(
      filter: { locale: { eq: $language } }
      sort: { postedDate: ASC }
      limit: 1000
    ) {
      nodes {
        id
        strapi_id
        title
        slug
        description
        cover {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        coverAlt
        postedDate(formatString: "MMM DD, YYYY")
        blogCategories {
          categoryName
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <Seo title="Blog" />;
