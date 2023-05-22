import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Layout from "../../components/Layout";
import Helper from "../../components/Helper";
import { H1 } from "../../components/Typography";

const AvailableLanguagesPage: React.FC<PageProps> = ({ data }: any) => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [dubbingData, setDubbingData] = useState(data.dubbingLang.edges || []);
  const [toggle, setToggle] = useState(false);

  const filterData = () => {
    if (input.length > 0) {
      const filteredDubbing = data.dubbingLang.edges.filter(({ node }: any) =>
        node?.language?.toLowerCase()?.includes(input.toLowerCase())
      );
      setDubbingData(filteredDubbing);
    } else {
      setDubbingData(data.dubbingLang.edges);
    }
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterData();
  };

  const onClickLanguage = (language: string) => {
    setInput(language);
    setToggle(!toggle);
  };

  useEffect(() => {
    filterData();
  }, [toggle]);

  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <div className="pricing-content text-center text-white my-5 p-5 rounded-2">
          <H1 classes="mb-3 text-center">{t("alSectionTitle")}</H1>
          <div className="d-flex flex-column align-items-center justify-content-center gap-4">
            <span className="fs-5">{t("alSectionDescription")}</span>
          </div>
          <form
            onSubmit={onSearch}
            className="input-search-language input-group mt-4 mx-auto"
          >
            <input
              type="text"
              className="form-control"
              placeholder={t("typeHere") || ""}
              aria-label={t("typeHere") || ""}
              aria-describedby="button-addon2"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button
              className="btn btn-primary"
              type="submit"
              id="button-addon2"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-4"></div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="mb-3 fw-bold">{t("dubbing")}</div>
            <div className="d-flex flex-column gap-1">
              {dubbingData.map(({ node }: any) => (
                <button
                  key={`dubbing-${node?.id}`}
                  className="btn btn-outline-dark text-start"
                  onClick={() => onClickLanguage(node?.language)}
                >
                  {node?.language}
                </button>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4"></div>
        </div>
      </div>
      <Helper />
    </Layout>
  );
};

export const query = graphql`
  query ($language: String!) {
    dubbingLang: allStrapiAvailableLanguage(
      filter: { dubbing: { eq: true } }
      sort: { language: ASC }
    ) {
      edges {
        node {
          id
          language
          transcription
          translation
          dubbing
        }
      }
    }
    locales: allLocale(
      filter: {
        ns: { in: ["index", "available-languages"] }
        language: { eq: $language }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default AvailableLanguagesPage;

export const Head: HeadFC = () => <title>Available Languages</title>;
