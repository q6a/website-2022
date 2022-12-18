import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/Layout";
import Section from "../components/Section";
import Helper from "../components/Helper";
import HomeHero from "../components/HomeHero";
import HomeDemo from "../components/HomeDemo";
import HomeContents from "../components/HomeContents";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <HomeHero />
      <HomeDemo />
      <HomeContents />
      <Helper />
      <Section title="Bottom CTA" hasGradient />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
