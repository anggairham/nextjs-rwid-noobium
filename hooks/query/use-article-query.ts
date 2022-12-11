import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../helpers/axios";

type Response = {
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
  current_page: number;
  last_page: number;
  per_page: number;
};

type Payload = {
  search?: string;
  category?: string;
};
const action = async (page: number, payload?: Payload): Promise<Response> => {
  let res;
  if (payload?.category) {
    // Note by Angga, tidak menggunakan url api seperti ini untuk search category
    // res = await axios.get(`/articles/${payload.category}`, {
    //   params: {
    //     page,
    //   },
    // });
    // gunakan biasa seperti ini, atau gunakan payload json bukan pasang di url
    res = await axios.get(`/articles`, {
      params: {
        page,
        category: payload?.category,
      },
    });
  } else {
    res = await axios.get("/articles", {
      params: {
        page,
        search: payload?.search,
      },
    });
  }
  return res.data.data;
};

export default function useArticlesQuery(payload?: Payload) {
  return useInfiniteQuery(
    ["articles", payload],
    ({ pageParam = 1 }) => action(pageParam, payload),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.current_page === lastPage.last_page) {
          return undefined;
        }
        return lastPage.current_page + 1;
      },
    }
  );
}
