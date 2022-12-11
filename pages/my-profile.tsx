import Head from "next/head";
import { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";

import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import PhotoPicker from "../components/PhotoPicker";

type FormValues = {
  fullname: string;
  photo: File | null;
};
const MyProfileSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(8, "Full name should have at least 8 characters")
    .max(30, "Full name should have maximun 30 characters")
    .required("Full name is required"),
});
const initialValues: FormValues = {
  fullname: "",
  photo: null,
};
export default function MyProfilePage() {
  const refContentInput = useRef<HTMLTextAreaElement>(null);
  const formik = useFormik({
    initialValues,
    validationSchema: MyProfileSchema,
    validateOnMount: true, //validasi dijalankan ketika halaman dibuka
    onSubmit: () => {
      alert("Saved");
    },
  });

  const user = {
    fullname: "John Doe",
    photo: "/images/dummy-avatar.png",
  };

  useEffect(() => {
    formik.setValues({
      fullname: user.fullname,
      photo: null,
    });
  }, []);

  return (
    <div>
      <Head>
        <title>My Profile | Noobium</title>
        <meta name='description' content='Noobium' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar
        hasSearchInput={false}
        hasSubmitButton={true}
        isSubmitDisabled={!!formik.errors.fullname}
        submitLabel='Save'
        onClickSubmit={formik.handleSubmit}
      />
      <div className='w-[400px] mx-auto py-24 flex flex-col items-center'>
        <PhotoPicker
          preview={user.photo}
          onPick={(file) => formik.setFieldValue("photo", file)}
        />
        <div className='h-16'></div>
        <TextInput
          name='fullname'
          label='Full Name'
          type='text'
          placeholder='Enter your full name'
          value={formik.values.fullname}
          onChange={formik.handleChange}
          hasError={!!formik.errors.fullname}
          errorMessage={formik.errors.fullname}
        />
      </div>
    </div>
  );
}
