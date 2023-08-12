// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
type Data = {
  simulations: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const simulations = await axios.post(
    `${process.env.NEXT_PUBLIC_TEMPLATE_MODEl_API_URL!}/simulation/control`,
    {}
  );
  res.status(200).json({ simulations: simulations.data });
}
