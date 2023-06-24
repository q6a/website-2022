import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";

import BlogCard from "../components/BlogCard";
import Layout from "../components/Layout";
import Helper from "../components/Helper";
import Seo from "../components/Seo";
import { H1, H2 } from "../components/Typography";
import slugify from "../utils/slugify";

const BlogSinglePage: React.FC<PageProps> = ({ data }: any) => {
  const { t } = useTranslation();
  const blogData = data?.blogData;
  const relatedBlogPost = data?.relatedBlogPost?.nodes;
  const image = getImage(blogData?.cover?.localFile);

  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes="mb-3 text-center blog-title">{blogData?.title}</H1>
        <div className="text-center">
          <span className="blog-authors">
            by <strong>{blogData?.authors}</strong>
          </span>
          <span className="blog-posted-date ms-1">
            | {blogData?.postedDate}
          </span>
        </div>
        <div className="blog-cover">
          <div className="rounded-2 overflow-hidden">
            {/* @ts-ignore */}
            <GatsbyImage image={image} alt={blogData?.coverAlt} />
          </div>
        </div>
        <div className="blog-single fw-light lh-lg py-5">
          <div
            dangerouslySetInnerHTML={{
              __html: blogData?.richContent?.data?.richContent,
            }}
          />
          <div className="pt-5">
            <div className="d-flex flex-wrap gap-2">
              {blogData?.blogCategories.map((category: any) => (
                <Link
                  to={`/blog/category/${slugify(category.categoryName)}`}
                  key={`${blogData?.id}-${category.categoryName}`}
                  className="btn btn-sm btn-outline-dark"
                >
                  {category.categoryName}
                </Link>
              ))}
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
              {relatedBlogPost.map(
                ({
                  id,
                  cover,
                  coverAlt,
                  title,
                  slug,
                  description,
                  postedDate,
                }: any) => (
                  <div key={`post-${id}`} className="col-12 col-lg-4">
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
        </div>
      )}
      <Helper />
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!, $language: String!, $category: String) {
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
    blogData: strapiBlog(id: { eq: $id }) {
      id
      locale
      title
      slug
      description
      authors
      blogCategories {
        categoryName
      }
      blogTags {
        tagName
      }
      keywords
      cover {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        formats {
          small {
            url
          }
        }
      }
      coverAlt
      richContent {
        data {
          richContent
        }
      }
      postedDate(formatString: "MMM DD, YYYY")
    }
    relatedBlogPost: allStrapiBlog(
      filter: {
        blogCategories: { elemMatch: { categoryName: { eq: $category } } }
        id: { ne: $id }
        locale: { eq: $language }
      }
      sort: { postedDate: DESC }
      limit: 3
    ) {
      nodes {
        id
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

export default BlogSinglePage;

export const Head: HeadFC = ({ data }: any) => {
  const blogData = data?.blogData;

  return (
    <Seo
      title={blogData?.title}
      description={blogData?.description}
      keywords={blogData?.keywords}
      url={
        blogData?.locale === "en"
          ? `/blog/${blogData?.slug}`
          : `/${blogData?.locale}/blog/${blogData?.slug}`
      }
      image={`${blogData?.cover?.formats?.small?.url}`}
    />
  );
};
