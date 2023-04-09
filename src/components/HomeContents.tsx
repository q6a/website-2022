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
              data.map(({ id, attributes }: any) => (
                <SplideSlide key={`content-${id}`}>
                  <HomeContentItem
                    img={attributes?.cover?.data?.attributes?.url}
                    title={attributes?.title}
                    description={attributes?.description}
                    link={`/blog/${attributes?.slug}`}
                    authorName="Jeff Dormish"
                    authorRoles="President"
                    authorOrg="Slovenian Genealogy Society International"
                  />
                </SplideSlide>
              ))}
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default HomeContents;
