import Head from "next/head";
import { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";

import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import PhotoPicker from "../components/PhotoPicker";
import { useRouter } from "next/router";
import useUserQuery from "../hooks/query/use-user-query";
import { useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import useEditProfileMutation from "../hooks/mutations/use-edit-profile-mutation";
import toast from "react-hot-toast";
import Loading from "react-spinners/BeatLoader";

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

const MyProfilePage: NextPage = () => {
  const router = useRouter();
  const userQuery = useUserQuery();
  const editProfileMutation = useEditProfileMutation();
  const queryClient = useQueryClient();

  const initialValues: FormValues = {
    fullname: "",
    photo: null,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: MyProfileSchema,
    validateOnMount: true, //validasi dijalankan ketika halaman dibuka
    onSubmit: async (values) => {
      try {
        const response = await editProfileMutation.mutateAsync({
          name: values.fullname,
          picture: values.photo,
        });

        toast.success("Edit profile success");
        queryClient.setQueriesData(["user"], response);
        router.push("/");
      } catch (error) {
        toast.error("Failed to edit profile");
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      fullname: userQuery.data?.name || "",
      photo: null,
    });
  }, [userQuery.data]);

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
      {editProfileMutation.isLoading && (
        <div className='h-screen flex justify-center items-center'>
          <Loading size={16} color='rgb(30 64 175)' />
        </div>
      )}
      {!editProfileMutation.isLoading && (
        <div className='w-[400px] mx-auto py-24 flex flex-col items-center'>
          <PhotoPicker
            preview={userQuery.data?.name}
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
      )}
    </div>
  );
};
export default MyProfilePage;
