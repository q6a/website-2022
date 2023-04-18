import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql, withPrefix } from "gatsby";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "gatsby-plugin-react-i18next";
import dayjs from "dayjs";

import BlogCard from "../components/BlogCard";
import Layout from "../components/Layout";
import Helper from "../components/Helper";
import Seo from "../components/Seo";
import { H1, H2 } from "../components/Typography";

const BlogSinglePage: React.FC<PageProps> = ({ data }: any) => {
  const { t } = useTranslation();
  const blogData = data?.blogData?.blog?.data;
  const relatedBlogPost = data?.relatedBlogPost?.blogs?.data;

  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes="mb-3 text-center">{blogData?.attributes?.title}</H1>
        <div className="text-center">
          <span className="blog-authors">
            by <strong>{blogData?.attributes?.authors}</strong>
          </span>
          <span className="blog-posted-date ms-1">
            | {dayjs(blogData?.attributes?.postedDate).format("MMM DD, YYYY")}
          </span>
        </div>
        <div className="blog-cover">
          <div className="rounded-2 overflow-hidden">
            <img
              src={
                blogData?.attributes?.cover?.data?.attributes?.url ||
                withPrefix("/images/no-image.jpg")
              }
              alt={blogData?.attributes?.coverAlt}
              width="100%"
              loading="lazy"
            />
          </div>
        </div>
        <div className="blog-single fw-light lh-lg py-5">
          <div
            dangerouslySetInnerHTML={{
              __html: blogData?.attributes?.richContent,
            }}
          />
          <div className="pt-5">
            <div className="d-flex flex-wrap gap-2">
              {blogData?.attributes?.blogCategories?.data.map(
                (category: any) => (
                  <div className="btn btn-sm btn-outline-dark">
                    {category.attributes.categoryName}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {relatedBlogPost && relatedBlogPost.length > 0 && (
        <div className="bg-clients py-5">
          <div className="container">
            <H2 classes="text-gray text-center mb-5" hasSeparator>
              {t("relatedBlogPost")}
            </H2>
            <div className="row">
              {relatedBlogPost.map(({ id, attributes }: any) => (
                <div key={`post-${id}`} className="col-12 col-lg-4">
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
        </div>
      )}
      <Helper />
    </Layout>
  );
};

export const query = graphql`
  query ($id: ID!, $language: String!, $category: String) {
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
    blogData: strapiQueries {
      blog(id: $id) {
        data {
          id
          attributes {
            locale
            title
            slug
            description
            authors
            blogCategories {
              data {
                attributes {
                  categoryName
                }
              }
            }
            blogTags {
              data {
                attributes {
                  tagName
                }
              }
            }
            keywords
            cover {
              data {
                attributes {
                  url
                }
              }
            }
            coverAlt
            updatedAt
            richContent
            postedDate
          }
        }
      }
    }
    relatedBlogPost: strapiQueries {
      blogs(
        filters: {
          blogCategories: { categoryName: { eq: $category } }
          id: { ne: $id }
          locale: { eq: $language }
        }
        publicationState: LIVE
        pagination: { limit: 3 }
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
  }
`;

export default BlogSinglePage;

export const Head: HeadFC = ({ data }: any) => {
  const blogData = data?.blogData?.blog?.data;

  return (
    <Seo
      title={blogData?.attributes?.title}
      description={blogData?.attributes?.description}
      keywords={blogData?.attributes?.keywords}
      url={
        blogData?.attributes?.locale === "en"
          ? `/blog/${blogData?.attributes?.slug}`
          : `/${blogData?.attributes?.locale}/blog/${blogData?.attributes?.slug}`
      }
      image={`${blogData?.attributes?.cover?.data?.attributes?.url}`}
    />
  );
};
