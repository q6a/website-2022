import { graphql, useStaticQuery } from "gatsby";

const useSocialLinks = () => {
  const data = useStaticQuery(graphql`
    query {
      strapiSocialLink {
        facebookActive
        facebookUrl
        linkedinActive
        linkedinUrl
        twitterActive
        twitterUrl
        youtubeActive
        youtubeUrl
        instagramActive
        instagramUrl
      }
    }
  `);

  return data?.strapiSocialLink;
};

export default useSocialLinks;
