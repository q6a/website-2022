import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import * as z from "zod";
import sendpulse from "sendpulse-api";

const emailSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    subscribeInfo: z.enum(["true", "false"]),
    subscribeNewsletter: z.enum(["true", "false"]),
    locale: z.enum(["en", "id"]),
  })
  .required();

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.SITE_URL}`);

    const paramsValidation = await emailSchema.safeParse(req.query);
    const TOKEN_STORAGE = "/tmp/";

    if (!paramsValidation.success) {
      res.status(400).json({
        status: 400,
        data: "Bad request",
      });
    } else {
      const { name, email, subscribeInfo, subscribeNewsletter, locale } =
        req.query;
      const callbackHandler = (data: any) => {
        if ("result" in data && data.result) {
          res.status(200).json({
            status: 200,
            data: data,
          });
        } else {
          console.info("validation", data);
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

          // Sendpulse add email to GENERAL campaign
          if (subscribeInfo === "true") {
            sendpulse.addEmails(
              callbackHandler,
              process.env.SENDPULSE_EMAIL_NEWS_ID,
              [
                {
                  email,
                  variables: {
                    Name: name,
                    Locale: locale,
                  },
                },
              ]
            );
          }

          // Sendpulse add email to NEWSLETTER campaign
          if (subscribeNewsletter === "true") {
            sendpulse.addEmails(
              callbackHandler,
              process.env.SENDPULSE_EMAIL_PRODUCT_ID,
              [
                {
                  email,
                  variables: {
                    Name: name,
                    Locale: locale,
                  },
                },
              ]
            );
          }
        }
      );
    }
  } catch (e: any) {
    res.status(400).json({ status: 400, data: { message: e.message } });
  }
}
