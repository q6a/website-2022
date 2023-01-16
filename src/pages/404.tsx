import * as React from "react";
import { Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/Layout";
import Helper from "../components/Helper";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="container my-5 text-center">
        <div className="d-flex flex-column align-items-center justify-content-center gap-3 min-h-page">
          <span className="text-404 fw-bold">404</span>
          <span className="fs-4">Oops, page not found!</span>
          <Link to="/">
            <button className="btn btn-link" type="button">
              Back to homepage
            </button>
          </Link>
        </div>
      </div>
      <Helper />
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
