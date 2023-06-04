import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Trans } from "gatsby-plugin-react-i18next";

import { H2 } from "./Typography";
import HomeContentItem from "./HomeContentItem";

const HomeContents = ({ data }: any) => {
  return (
    <div className="section-sm">
      <div className="container">
        <H2 classes="text-gray text-center" hasSeparator>
          <Trans i18nKey="caseStudiesTitle" components={[<br />]} />
        </H2>
        <div className="mt-5">
          <Splide
            options={{ type: "loop", autoplay: true, rewind: true }}
            aria-label="Contents"
          >
            {data &&
              data.map(
                ({ id, cover, coverAlt, title, slug, description }: any) => (
                  <SplideSlide key={`content-${id}`}>
                    <HomeContentItem
                      img={cover}
                      imgAlt={coverAlt}
                      title={title}
                      description={description}
                      link={`/blog/${slug}`}
                      authorName="Jeff Dormish"
                      authorRoles="President"
                      authorOrg="Slovenian Genealogy Society International"
                    />
                  </SplideSlide>
                )
              )}
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default HomeContents;
