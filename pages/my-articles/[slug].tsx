import Head from "next/head";
import { useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ThumnailPicker from "../../components/ThumbnailPicker";
import Category from "../../components/Category";

import { useFormik } from "formik";
import * as Yup from "yup";

type FormValues = {
  title: string;
  content: string;
  thumbnail: File | null;
  categoryId: number | null;
};
const EditArticleSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  categoryId: Yup.number().nullable().required("Category is required"),
});
const initialValues: FormValues = {
  title: "",
  content: "",
  thumbnail: null,
  categoryId: null,
};
export default function EditArticlePage() {
  const refContentInput = useRef<HTMLTextAreaElement>(null);
  const formik = useFormik({
    initialValues,
    validationSchema: EditArticleSchema,
    validateOnMount: true, //validasi dijalankan ketika halaman dibuka
    onSubmit: () => {
      alert("Submitted");
    },
  });

  const article = {
    id: 1,
    title: "Learnign Redugx",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, unde velit asperiores magni corporis dicta aut ipsa eum officiis repellendus quos ipsam assumenda earum corrupti distinctio commodi. \n\nNeque accusantium minima amet laboriosam. Sapiente illum aspernatur expedita natus, consectetur maxime ipsa vel ea dolorum, iste veritatis ducimus ut odit a facere voluptate corporis excepturi! Reiciendis ipsa quis rerum, saepe mollitia fugiat error tempore voluptas necessitatibus animi fuga quod aspernatur corporis aut magni qui architecto ab? Excepturi totam dolorum facilis mollitia corrupti? \n\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Quam maiores tempore, ullam perferendis quisquam cumque ad minus quas! Natus, voluptatibus facilis aut aliquid inventore accusantium! Corporis labore facere nulla consectetur repellendus hic quibusdam similique eveniet exercitationem? Ratione magni quae quidem veniam alias perspiciatis sed molestiae perferendis ipsam, atque sapiente et quod saepe, aliquam eaque, modi porro! Saepe vitae odio vero ex, quae eos nisi soluta dignissimos corporis aliquid ducimus alias doloribus et quam ad laborum omnis molestias commodi tenetur. Officia!",
    url: `/article/how-to-learn-redux`,
    thumbnail: "/images/dummy-article-thumbnail.png",
    category: { id: 1, label: "Technology" },
    date: "2022-09-20 18:00:00",
    author: {
      name: "Joh Doe",
      photo: "/images/dummy-avatar.png",
    },
  };
  const hasError =
    !!formik.errors.title ||
    !!formik.errors.content ||
    !!formik.errors.thumbnail ||
    !!formik.errors.categoryId;

  const categories = [...Array(10)].map((_, index) => {
    return {
      id: index + 1,
      slug: "technology",
      label: "Technology",
    };
  });
  const handleContentInputGrow = () => {
    if (!refContentInput.current) return;
    refContentInput.current.style.height = "auto";
    refContentInput.current.style.height =
      refContentInput.current.scrollHeight + "px";
  };

  useEffect(() => {
    formik.setValues({
      title: article.title,
      content: article.content,
      thumbnail: null,
      categoryId: article.category.id,
    });
    setTimeout(() => {
      handleContentInputGrow();
    }, 100);
  }, []);

  return (
    <div>
      <Head>
        <title>Edit Articles | Noobium</title>
        <meta name='description' content='Noobium' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar
        hasSearchInput={false}
        hasSubmitButton={true}
        isSubmitDisabled={hasError}
        submitLabel='Publish'
        onClickSubmit={formik.handleSubmit}
      />
      <div className='w-[720px] mx-auto py-24'>
        <input
          className='font-sans font-bold text-5xl placeholder-slate-200 text-slate-900 w-full outline-none mb-12'
          type='text'
          placeholder='Title'
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <ThumnailPicker
          preview={article.thumbnail}
          onPick={(file) => formik.setFieldValue("thumbnail", file)}
        />
        <textarea
          ref={refContentInput}
          className='w-full outline-none mt-12 font-serif text-slate-900 placeholder-slate-400 resize-none'
          placeholder='Write an article here....'
          onInput={handleContentInputGrow}
          name='content'
          value={formik.values.content}
          onChange={formik.handleChange}
        ></textarea>
        <div className='pt-12 mt-40 border-t border-slate-200'>
          <p className='font-sans text-slate-900 text-sm mb-4'>
            Choose a categories
          </p>
          <div className='flex flex-wrap gap-3'>
            {categories.map((category) => (
              <Category
                key={category.id}
                label={category.label}
                // Jika kategori id yang dipilih sama dengan kategori id yang dilooping maka selected
                isSelected={formik.values.categoryId === category.id}
                onClick={() => formik.setFieldValue("categoryId", category.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
