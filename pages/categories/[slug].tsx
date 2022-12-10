import Head from "next/head";
import { useRouter } from "next/router";
import Article from "../../components/Article";
import Navbar from "../../components/Navbar";

export default function CategoryArticlePage() {
  const router = useRouter();
  const articles = [...Array(4)].map((_, index) => {
    return {
      id: index + 1,
      title: "Learnign Redugx",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus voluptas dolorum illum incidunt quis? Enim officia odio consequuntur adipisci nemo.",
      url: `/article/how-to-learn-redux`,
      thumbnail: "/images/dummy-article-thumbnail.png",
      category: "Technology",
      date: "2022-09-20 18:00:00",
      author: {
        name: "Joh Doe",
        photo: "/images/dummy-avatar.png",
      },
    };
  });
  return (
    <div>
      <Head>
        <title>Technology Noobium</title>
        <meta name='description' content='Noobium' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <div className='w-[720px] mx-auto py-24'>
        <div className='mb-16'>
          <p className='font-sans font-bold text-slate-400 mb-3'>Category</p>
          <p className='font-sans font-bold text-slate-900 text-5xl'>
            {router.query.slug}
          </p>
        </div>
        {articles.map((article) => (
          <Article
            key={article.id}
            url={`articles/${article.url}`}
            title={article.title}
            content={article.content}
            thumbnail={article.thumbnail}
            category={article.category}
            date={article.date}
            author={article.author}
          />
        ))}
      </div>
    </div>
  );
}
