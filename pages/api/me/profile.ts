// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type metaData = {
  code: number;
  status: string;
  message: string;
};
type Data = {
  meta: metaData;
  data: {
    email: string;
    name: string;
    picture: string;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    meta: {
      code: 200,
      status: "sucess",
      message: "Articles fetched successfully",
    },
    data: {
      name: "John Doe",
      email: "john@gmail.com",
      picture: "/images/dummy-avatar.png",
    },
  });
}
