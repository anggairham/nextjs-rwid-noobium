import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import Loading from "react-spinners/BeatLoader";
import toast from "react-hot-toast";
import Article from "../../components/Article";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import useDeleteArticleMutation from "../../hooks/mutations/use-delete-article-mutation";
import useMyArticlesQuery from "../../hooks/query/use-my-articles-query";

export default function MyArticlePage() {
  const router = useRouter();
  const myArticlesQuery = useMyArticlesQuery();
  const deleteArticleMutation = useDeleteArticleMutation();

  const deleteArticle = async (articleId: number) => {
    try {
      const response = await deleteArticleMutation.mutateAsync({
        id: articleId,
      });

      myArticlesQuery.refetch(); //fetching again after article being delete
      toast.success("delete article success");
    } catch (error) {
      toast.error("Failed to delete article");
    }
  };

  useEffect(() => {
    const handler = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      const isScrollBottom = scrollHeight - scrollTop === clientHeight;

      if (isScrollBottom) {
        if (
          myArticlesQuery.hasNextPage &&
          !myArticlesQuery.isFetchingNextPage
        ) {
          myArticlesQuery.fetchNextPage();
        }
      }
    };
    document.addEventListener("scroll", handler);

    return () => {
      document.addEventListener("scroll", handler);
    };
  }, [myArticlesQuery.isSuccess, myArticlesQuery.data]);
  return (
    <div>
      <Head>
        <title>My Articles | Noobium</title>
        <meta name='description' content='Noobium' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar hasSearchInput={false} />
      <div className='w-[720px] mx-auto py-24'>
        <div className='mb-16 flex items-center justify-between'>
          <p className='font-sans font-bold text-slate-900 text-5xl'>
            My Articles
          </p>
          <Link href='/my-articles/create'>
            <Button type='button' size='large'>
              Write an Article
            </Button>
          </Link>
        </div>
        {myArticlesQuery.isSuccess && (
          <>
            {myArticlesQuery.data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((article) => (
                  <Article
                    key={article.id}
                    url={`/articles/${article.slug}`}
                    editUrl={`/my-articles/${article.id}`}
                    title={article.title}
                    content={article.content_preview}
                    thumbnail={article.feature_image}
                    category={article.category.name}
                    date={article.created_at}
                    author={{
                      name: article.user.name,
                      photo: article.user.picture,
                    }}
                    hasOptions
                    onClickDelete={() => {
                      const isConfirmed = confirm(
                        "Are you sure want to delete?"
                      );
                      if (isConfirmed) {
                        deleteArticle(article.id);
                      }
                    }}
                  />
                ))}
              </Fragment>
            ))}

            {myArticlesQuery.isFetchingNextPage && (
              // Diberi margin karena loadingnya terlalu mepet dengan card article
              <div className='flex justify-center mt-8'>
                <Loading size={16} color='rgb(30 66 175)' />
              </div>
            )}
          </>
        )}
        {myArticlesQuery.isLoading && (
          <div className='flex justify-center'>
            <Loading size={16} color='rgb(30 66 175)' />
          </div>
        )}
      </div>
    </div>
  );
}
