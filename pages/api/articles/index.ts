// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type metaData = {
  code: number;
  status: string;
  message: string;
};
type articleData = {
  current_page: number;
  data: {
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    slug: string;
    content_preview: string;
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
  }[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  link: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
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
      current_page: 1,
      data: [
        {
          id: 1,
          user_id: 1,
          category_id: 1,
          title:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus voluptas dolorum illum",
          slug: "lorem-ipsum",
          content_preview:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sit porro sapiente non aut quaerat veniam expedita dolor, aliquam dolores impedit voluptates architecto, temporibus libero. Autem accusantium illum molestias magnam illo, adipisci deleniti vero eos magni suscipit neque cupiditate, veritatis veniam temporibus! Earum assumenda laborum eius excepturi sint recusandae quas.",
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
        {
          id: 2,
          user_id: 1,
          category_id: 1,
          title:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus voluptas dolorum illum",
          slug: "lorem-ipsum",
          content_preview:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sit porro sapiente non aut quaerat veniam expedita dolor, aliquam dolores impedit voluptates architecto, temporibus libero. Autem accusantium illum molestias magnam illo, adipisci deleniti vero eos magni suscipit neque cupiditate, veritatis veniam temporibus! Earum assumenda laborum eius excepturi sint recusandae quas.",
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
      ],
      first_page_url: "http://localhost:3000/api/articles?page=1",
      from: 1,
      last_page: 1,
      last_page_url: "http://localhost:3000/api/articles?page=1",
      link: [
        {
          url: null,
          label: "Previous",
          active: false,
        },
      ],
      next_page_url: "http://localhost:3000/api/articles?page=2",
      path: "http://localhost:3000/api/articles",
      per_page: 15,
      prev_page_url: null,
      to: 15,
      total: 54,
    },
  });
}
