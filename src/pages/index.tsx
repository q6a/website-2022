import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/Layout";
import Helper from "../components/Helper";
import HomeHero from "../components/HomeHero";
import HomeDemo from "../components/HomeDemo";
import HomeContents from "../components/HomeContents";
import HomeClients from "../components/HomeClients";
import BottomCta from "../components/BottomCta";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <HomeHero />
      <HomeDemo />
      <HomeContents />
      <Helper />
      <HomeClients />
      <BottomCta />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
