// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type metaData = {
  code: number;
  status: string;
  message: string;
};
type articleData = {
  user: {
    name: string;
    email: string;
    picture: string;
  };
  access_token: {
    token: string;
    type: string;
    expires_in: number;
  };
};
type Data = {
  meta: metaData;
  data: articleData;
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
      user: {
        name: "John Doe",
        email: "john@gmail.com",
        picture: "/images/dummy-avatar.png",
      },
      access_token: {
        token: "dasjiou2131892kjasdhjkash",
        type: "Bearer",
        expires_in: 3600,
      },
    },
  });
}
