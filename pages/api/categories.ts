// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type metaData = {
  code: number;
  status: string;
  message: string;
};
type categoryData = {
  id: number;
  name: string;
  slug: string;
};
type Data = {
  meta: metaData;
  data: Array<categoryData>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    meta: {
      code: 200,
      status: "sucess",
      message: "Categories fetched successfully",
    },
    data: [
      {
        id: 1,
        name: "Technology",
        slug: "technology",
      },
      {
        id: 2,
        name: "Programming",
        slug: "programming",
      },
      {
        id: 3,
        name: "Startup",
        slug: "startup",
      },
      {
        id: 4,
        name: "Life",
        slug: "life",
      },
      {
        id: 5,
        name: "Life Lessons",
        slug: "life-lessons",
      },
      {
        id: 6,
        name: "Politics",
        slug: "politics",
      },
      {
        id: 7,
        name: "Travel",
        slug: "travel",
      },
      {
        id: 8,
        name: "Writing",
        slug: "writing",
      },
    ],
  });
}
