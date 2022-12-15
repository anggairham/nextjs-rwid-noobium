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
const action = async (page: number): Promise<Response> => {
  let res;
  const token = localStorage.getItem("access_token");

  res = await axios.get("/articles", {
    params: {
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

const useMyArticlesQuery = () => {
  return useInfiniteQuery(
    ["my-articles"],
    ({ pageParam = 1 }) => action(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.current_page === lastPage.last_page) {
          return undefined;
        }
        return lastPage.current_page + 1;
      },
    }
  );
};
export default useMyArticlesQuery;
