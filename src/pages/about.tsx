import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/Layout";
import { H1, BodyContentText } from "../components/Typography";

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes="mb-3">About us</H1>
        <BodyContentText classes="lh-lg">
          In et excepteur exercitation non excepteur ipsum. Ipsum ut pariatur
          nisi id officia excepteur occaecat minim minim magna. Veniam magna
          aliqua est anim elit incididunt et quis commodo. Irure ipsum Lorem
          incididunt fugiat sunt cillum est fugiat duis mollit adipisicing. Amet
          aliquip mollit do labore eu ea velit cillum. Eu consectetur sint duis
          id proident cillum sit deserunt consectetur minim exercitation
          voluptate irure exercitation.
        </BodyContentText>
        <BodyContentText classes="lh-lg">
          Est eiusmod adipisicing est excepteur officia aute incididunt magna
          reprehenderit duis mollit culpa aute. Lorem esse irure duis pariatur
          excepteur anim. Velit reprehenderit aliquip anim veniam.
        </BodyContentText>
        <BodyContentText classes="lh-lg">
          Laboris nulla labore sit aliquip amet quis labore dolor culpa sit amet
          quis duis dolor. Mollit ad dolor laborum cupidatat sint id culpa
          excepteur anim et. Exercitation dolore tempor elit pariatur elit.
          Laborum qui officia irure occaecat proident laboris aliqua nulla
          voluptate consequat. Reprehenderit mollit nostrud incididunt labore
          aliqua tempor. Exercitation ullamco sunt incididunt incididunt cillum.
        </BodyContentText>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>About Page</title>;
