import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import { H2 } from "./Typography";
import HomeContentItem from "./HomeContentItem";

const HomeContents = () => {
  return (
    <div className="section-sm">
      <div className="container">
        <H2 classes="text-gray text-center" hasSeparator>
          Find our how users use VideoTanslator
          <br />
          to create meaningful contents
        </H2>
        <div className="mt-5">
          <Splide options={{ autoplay: true }} aria-label="Contents">
            <SplideSlide>
              <HomeContentItem
                img="images/family-photo.png"
                title={
                  <>
                    Leaving A Long-Lasting Legacy: <br />
                    Curating Your Family’s History
                  </>
                }
                link="/"
                authorName="Jeff Dormish"
                authorRoles="President"
                authorOrg="Slovenian Genealogy Society International"
              />
            </SplideSlide>
            <SplideSlide>
              <HomeContentItem
                img="images/family-photo.png"
                title="How This Catering Solutions Is Reaching Clients In A Tough Market"
                link="/"
                authorName="David Cox"
                authorRoles="CEO"
                authorOrg="QAChef"
              />
            </SplideSlide>
            <SplideSlide>
              <HomeContentItem
                img="images/family-photo.png"
                title="How This University Is Fighting Covid With Video Translation"
                link="/"
                authorName="Pradesh Kumar"
                authorRoles="Head of Health"
                authorOrg="VYASA University"
              />
            </SplideSlide>
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default HomeContents;
