import { parseISO, format } from "date-fns";
import Head from "next/head";
import Navbar from "../../components/Navbar";
export default function ArticleDetailPage() {
  const article = {
    id: 1,
    title: "Learnign Redugx",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, unde velit asperiores magni corporis dicta aut ipsa eum officiis repellendus quos ipsam assumenda earum corrupti distinctio commodi. \n\nNeque accusantium minima amet laboriosam. Sapiente illum aspernatur expedita natus, consectetur maxime ipsa vel ea dolorum, iste veritatis ducimus ut odit a facere voluptate corporis excepturi! Reiciendis ipsa quis rerum, saepe mollitia fugiat error tempore voluptas necessitatibus animi fuga quod aspernatur corporis aut magni qui architecto ab? Excepturi totam dolorum facilis mollitia corrupti?",
    url: `/article/how-to-learn-redux`,
    thumbnail: "/images/dummy-article-thumbnail.png",
    category: "Technology",
    date: "2022-09-20 18:00:00",
    author: {
      name: "Joh Doe",
      photo: "/images/dummy-avatar.png",
    },
  };
  const formattedDate = format(parseISO(article.date), "MMM dd");
  return (
    <div>
      <Head>
        <title>{article.title} Noobium</title>
        <meta name='description' content='Noobium' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <div className='w-[720px] mx-auto py-24'>
        <div className='flex items-center mb-8'>
          <img
            className='w-12 h-12 rounded-full object-contain mr-4'
            src={article.author.photo}
            alt={article.author.name}
          />
          <div>
            <p className='text-sm font-sans text-slate-900 mb-1'>
              {article.author.name}
            </p>
            <p className='text-sm font-sans text-slate-400'>{formattedDate}</p>
          </div>
        </div>
        <h1 className='font-bold font-sans text-slate-900 text-5xl mb-4'>
          {article.title}
        </h1>
        <div className='px-3 bg-slate-200 rounded-full w-fit h-6 flex items-center mb-12'>
          <p className='text-slate-900 font-sans text-xs'>{article.category}</p>
        </div>
        <img
          className='w-full aspect-video object-cover mb-12'
          src={article.thumbnail}
          alt={article.title}
        />
        <p className='font-serif text-slate-900 whitespace-pre-line'>
          {article.content}
        </p>
      </div>
    </div>
  );
}
