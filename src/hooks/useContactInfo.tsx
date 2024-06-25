import { graphql, useStaticQuery } from "gatsby";

const useContactInfo = () => {
  const data = useStaticQuery(graphql`
    query {
      strapiContact {
        address {
          data {
            address
          }
        }
        email
      }
    }
  `);

  return data?.strapiContact;
};

export default useContactInfo;
