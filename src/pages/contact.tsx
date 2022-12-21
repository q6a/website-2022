import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/Layout";
import { H1, BodyContentText } from "../components/Typography";

const ContactPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes="mb-3">Contact us</H1>
        <div className="row">
          <div className="col-12 col-md-4">
            <BodyContentText classes="lh-lg">
              <span className="fw-bolder">Office location:</span>
              <br />
              105/166D Glebel Point Road
              <br />
              Glebel, 2037
              <br />
              Sydney, NSW, Australia.
              <br />
              <br />
              <span className="fw-bolder">Email:</span>
              <br />
              hello@videotranslator.ai
            </BodyContentText>
          </div>
          <div className="col-12 col-md-8">
            <div className="mb-3">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="mb-3">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Talk to us - what language would you like your content in? Can we help you in a different way?"
                rows={5}
              ></textarea>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-secondary mb-3">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

export const Head: HeadFC = () => <title>Contact Page</title>;
