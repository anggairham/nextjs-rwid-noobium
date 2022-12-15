import Head from "next/head";
import { useRef } from "react";
import Navbar from "../../components/Navbar";
import ThumnailPicker from "../../components/ThumbnailPicker";
import Category from "../../components/Category";

import { useFormik } from "formik";
import * as Yup from "yup";
import useCreateArticleMutation from "../../hooks/mutations/use-create-article-mutation";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Loading from "react-spinners/BeatLoader";
import useCategoriesQuery from "../../hooks/query/use-categories-query";

const CreateArticleSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  thumbnail: Yup.mixed().nullable().required("Thumbnail is required"),
  categoryId: Yup.number().nullable().required("Category is required"),
});

export default function CreateArticlePage() {
  const refContentInput = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const categoriesQuery = useCategoriesQuery();
  const createArticleMutation = useCreateArticleMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      thumbnail: null,
      categoryId: null,
    },
    validationSchema: CreateArticleSchema,
    validateOnMount: true, //validasi dijalankan ketika halaman dibuka
    onSubmit: async (values) => {
      if (!values.categoryId || !values.thumbnail) return;
      try {
        const response = await createArticleMutation.mutateAsync({
          title: values.title,
          content: values.content,
          category_id: values.categoryId,
          featured_image: values.thumbnail,
        });

        router.push("/my-articles");
        toast.success("Create article success");
      } catch (error) {
        toast.error("Failed to create article");
      }
    },
  });

  const hasError =
    !!formik.errors.title ||
    !!formik.errors.content ||
    !!formik.errors.thumbnail ||
    !!formik.errors.categoryId;

  const handleContentInputGrow = () => {
    if (!refContentInput.current) return;
    refContentInput.current.style.height = "auto";
    refContentInput.current.style.height =
      refContentInput.current.scrollHeight + "px";
  };
  return (
    <div>
      <Head>
        <title>Create Articles | Noobium</title>
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
      {createArticleMutation.isLoading && (
        <div className='h-screen flex justify-center items-center'>
          <Loading size={16} color='rgb(30 64 175)' />
        </div>
      )}
      {!createArticleMutation.isLoading && (
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
            {categoriesQuery.isSuccess && (
              <>
                <p className='font-sans text-slate-900 text-sm mb-4'>
                  Choose a categories
                </p>
                <div className='flex flex-wrap gap-3'>
                  {categoriesQuery.data.map((category) => (
                    <Category
                      key={category.id}
                      label={category.name}
                      // Jika kategori id yang dipilih sama dengan kategori id yang dilooping maka selected
                      isSelected={formik.values.categoryId === category.id}
                      onClick={() =>
                        formik.setFieldValue("categoryId", category.id)
                      }
                    />
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
        </div>
      )}
    </div>
  );
}
