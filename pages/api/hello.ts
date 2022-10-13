// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: string;
  time?: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (new Date().getTime() > 1665646183214) {
    res.status(200).json({ result: "completed", time: new Date().getTime() });
  } else {
    res.status(200).json({ result: "processing", time: new Date().getTime() });
  }
}
