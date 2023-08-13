// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
type Data = {
  simulations?: any[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let simulations;
  try {
    simulations = await axios.post(
      `${process.env.NEXT_PUBLIC_TEMPLATE_MODEl_API_URL!}/simulation/control`,
      {
        ...req.body,
        time_horizon: req.body.time_horizon[0] || 365,
      }
    );
    res.status(200).json({ simulations: simulations.data });
  } catch (error) {
    console.log("simulations?.data");
    console.log(error);
    if (simulations?.status === 400) {
      return res.status(400).json({ error: simulations.data });
    }
    res.status(500).json({ simulations: [] });
  }
}
