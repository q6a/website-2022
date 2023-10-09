import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import * as z from "zod";

const msgSchema = z
  .object({
    message: z.string(),
  })
  .required();

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.SITE_URL}`);

    const paramsValidation = await msgSchema.safeParse(req.query);

    if (!paramsValidation.success) {
      res.status(200).json({
        status: 400,
        data: "Invalid parameters",
      });
    } else {
      const { message } = req.query;
      const detectLang = await fetch(
        `https://ws.detectlanguage.com/0.2/detect`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.DETECTLANGUAGE_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: message,
          }),
        }
      )
        .then((response) => response.json())
        .then((response) => response?.data);

      res.status(200).json({
        status: 200,
        data: detectLang,
      });
    }
  } catch (e: any) {
    res.status(400).json({ status: 400, data: { message: e.message } });
  }
}
