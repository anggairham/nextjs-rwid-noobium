// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type metaData = {
  code: number;
  status: string;
  message: string;
};
type articleData = {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  slug: string;
  content_preview: string;
  content: string;
  feature_image: string;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
    picture: string;
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
      id: 1,
      user_id: 1,
      category_id: 1,
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus voluptas dolorum illum",
      slug: "lorem-ipsum",
      content_preview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sit porro sapiente non aut quaerat veniam expedita dolor, aliquam dolores impedit voluptates architecto, temporibus libero. Autem accusantium illum molestias magnam illo, adipisci deleniti vero eos magni suscipit neque cupiditate, veritatis veniam temporibus! Earum assumenda laborum eius excepturi sint recusandae quas.",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. At maxime dicta corrupti sunt nesciunt, consequuntur beatae aliquid earum ipsam, natus quae iste, porro reprehenderit. Nihil voluptatibus accusantium, natus hic aperiam eum aliquid, quidem in sequi dolore quia earum nam illo. Quasi, corrupti? Doloremque quas, expedita accusantium voluptates amet, aspernatur perferendis accusamus quisquam asperiores enim doloribus unde. At laudantium quas sint architecto, deserunt nulla inventore doloremque, repudiandae officiis similique, ratione molestias laboriosam illo quo autem delectus modi explicabo? Error blanditiis quas dolorum eum voluptatibus ipsum ab consequatur nobis laborum. Nesciunt recusandae ipsam veniam temporibus perspiciatis nostrum commodi, cumque est ipsum eaque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. At maxime dicta corrupti sunt nesciunt, consequuntur beatae aliquid earum ipsam, natus quae iste, porro reprehenderit. Nihil voluptatibus accusantium, natus hic aperiam eum aliquid, quidem in sequi dolore quia earum nam illo. Quasi, corrupti? Doloremque quas, expedita accusantium voluptates amet, aspernatur perferendis accusamus quisquam asperiores enim doloribus unde. At laudantium quas sint architecto, deserunt nulla inventore doloremque, repudiandae officiis similique, ratione molestias laboriosam illo quo autem delectus modi explicabo? Error blanditiis quas dolorum eum voluptatibus ipsum ab consequatur nobis laborum. Nesciunt recusandae ipsam veniam temporibus perspiciatis nostrum commodi, cumque est ipsum eaque.",
      feature_image: "/images/dummy-article-thumbnail.png",
      created_at: "2022-09-20 18:00:00",
      updated_at: "2022-09-20 18:00:00",
      category: {
        id: 1,
        name: "Technology",
        slug: "technology",
      },
      user: {
        id: 1,
        name: "John Doe",
        email: "john@gmail.com",
        picture: "/images/dummy-avatar.png",
      },
    },
  });
}
