import Head from "next/head";
import Link from "next/link";
import Loading from "react-spinners/BeatLoader";
import Article from "../components/Article";
import Category from "../components/Category";
import Navbar from "../components/Navbar";
import useCategoriesQuery from "../hooks/query/use-categories-query";
import useArticlesQuery from "../hooks/query/use-article-query";
import { useEffect, Fragment } from "react";

export default function Home() {
  const categoriesQuery = useCategoriesQuery();
  const articlesQuery = useArticlesQuery();
  useEffect(() => {
    const handler = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      const isScrollBottom = scrollHeight - scrollTop === clientHeight;

      if (isScrollBottom) {
        if (articlesQuery.hasNextPage && !articlesQuery.isFetchingNextPage) {
          articlesQuery.fetchNextPage();
        }
      }
    };
    document.addEventListener("scroll", handler);

    return () => {
      document.addEventListener("scroll", handler);
    };
  }, [articlesQuery.isSuccess, articlesQuery.data]);

  return (
    <div>
      <Head>
        <title>Noobium</title>
        <meta name='description' content='Noobium' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <div className='w-[720px] mx-auto py-24'>
        <div className='mb-16'>
          {categoriesQuery.isSuccess && (
            <>
              <p className='font-sans text-slate-900 text-sm mb-4'>
                Your Categories
              </p>
              <div className='flex flex-wrap gap-3'>
                {categoriesQuery.data.map((category) => (
                  <Link key={category.id} href={`/categories/${category.slug}`}>
                    <Category key={category.id} label={category.name} />
                  </Link>
                ))}
              </div>
            </>
          )}
          {categoriesQuery.isLoading && (
            <div className='flex justify-center'>
              <Loading size={16} color='rgb(30 66 175)' />
            </div>
          )}
        </div>
        {articlesQuery.isSuccess && (
          <>
            {articlesQuery.data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((article) => (
                  <Article
                    key={article.id}
                    url={`/articles/${article.slug}`}
                    title={article.title}
                    content={article.content_preview}
                    thumbnail={article.feature_image}
                    category={article.category.name}
                    date={article.created_at}
                    author={{
                      name: article.user.name,
                      photo: article.user.picture,
                    }}
                  />
                ))}
              </Fragment>
            ))}

            {articlesQuery.isFetchingNextPage && (
              // Diberi margin karena loadingnya terlalu mepet dengan card article
              <div className='flex justify-center mt-8'>
                <Loading size={16} color='rgb(30 66 175)' />
              </div>
            )}
          </>
        )}
        {articlesQuery.isLoading && (
          <div className='flex justify-center'>
            <Loading size={16} color='rgb(30 66 175)' />
          </div>
        )}
      </div>
    </div>
  );
}
