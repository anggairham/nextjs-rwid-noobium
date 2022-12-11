import Head from "next/head";
import Link from "next/link";
import Article from "../components/Article";
import Button from "../components/Button";
import Category from "../components/Category";
import Navbar from "../components/Navbar";

export default function NotFoundPage() {
  const categories = [...Array(10)].map((_, index) => {
    return {
      id: index + 1,
      slug: "technology",
      label: "Technology",
    };
  });
  const articles = [...Array(4)].map((_, index) => {
    return {
      id: index + 1,
      title: "Learnign Redugx",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus voluptas dolorum illum incidunt quis? Enim officia odio consequuntur adipisci nemo.",
      url: "how-to-learn-redux",
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
        <title>404 | Noobium</title>
        <meta name='description' content='Noobium' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar hasSearchInput={false} />
      <div
        style={{ height: "calc(100vh - 4rem" }}
        className='w-[720px] mx-auto py-24 flex flex-col items-center justify-center'
      >
        <h1 className='text-8xl text-slate-900 font-sans text-center font-bold mb-6'>
          404
        </h1>
        <p className='font-sans text-slate-900 text-center mb-14'>
          There&lsquo;s no content here.
        </p>
        <Link href='/'>
          <Button type='button' size='large'>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
