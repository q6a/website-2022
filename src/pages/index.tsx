import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/Layout";
import Section from "../components/Section";
import Helper from "../components/Helper";
import HomeHero from "../components/HomeHero";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <HomeHero />
      <Section title="Try out our editor demo" classes="bg-brand-light" />
      <Section title="Find out how users create meaningful contents" />
      <Section
        title="Find out how users use VideoTranslator to create meaningful contents"
        classes="bg-clients"
      />
      <Helper />
      <Section title="Bottom CTA" hasGradient />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
