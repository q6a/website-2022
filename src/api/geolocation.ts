import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import * as z from "zod";

const ipSchema = z
  .object({
    ip: z.string(),
  })
  .required();

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.SITE_URL}`);

    const paramsValidation = await ipSchema.safeParse(req.query);

    if (!paramsValidation.success) {
      res.status(200).json({
        status: 400,
        data: "Invalid parameters",
      });
    } else {
      const { ip } = req.query;
      const geo = await fetch(
        `http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_KEY}`
      ).then((response) => response.json());

      res.status(200).json({
        status: 200,
        data: geo,
      });
    }
  } catch (e: any) {
    res.status(400).json({ status: 400, data: { message: e.message } });
  }
}
