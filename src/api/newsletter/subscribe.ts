import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import * as yup from "yup";
import sendpulse from "sendpulse-api";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  locale: yup.mixed().oneOf(["en", "id"]).required(),
});

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.SITE_URL}`);

    const { email, locale } = await schema.validate(req.query);
    const TOKEN_STORAGE = "/tmp/";

    const callbackHandler = (data: any) => {
      if ("result" in data && data.result) {
        res.status(200).json({
          status: 200,
          data: data,
        });
      } else {
        res.status(400).json({
          status: 400,
          data: "Bad request",
        });
      }
    };

    // Sendpulse initialization
    sendpulse.init(
      process.env.SENDPULSE_CLIENT_ID,
      process.env.SENDPULSE_CLIENT_SECRET,
      TOKEN_STORAGE,
      (token: any) => {
        if (token && token.is_error) {
          res
            .status(401)
            .json({ status: 401, data: { message: token.message } });
        }

        // Sendpulse add email to list
        sendpulse.addEmails(callbackHandler, process.env.SENDPULSE_EMAIL_ID, [
          {
            email,
            variables: {
              locale,
            },
          },
        ]);
      }
    );
  } catch (e: any) {
    res.status(400).json({ status: 400, data: { message: e.message } });
  }
}
