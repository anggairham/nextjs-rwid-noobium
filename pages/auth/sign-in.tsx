import { useFormik } from "formik";
import Head from "next/head";
import Link from "next/link";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import TextInput from "../../components/TextInput";
import * as Yup from "yup";

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email format is invalid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
type Props = {};

const SignInPage = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
    onSubmit: () => {
      alert("Sign In Succes");
    },
  });
  return (
    <div>
      <Head>
        <title>Sign In | Noobium</title>
      </Head>
      <Navbar />
      <div className='w-[400px] mx-auto py-24'>
        <h1 className='font-sans font-bold text-slate-900 text-5xl text-center mb-4'>
          Sign In
        </h1>
        <p className='font-sans text-slate-900 text-center mb-16'>
          Fill the form to sign in to your account.
        </p>
        <TextInput
          name='email'
          label='Email Address'
          type='text'
          placeholder='Enter your email address'
          value={formik.values.email}
          onChange={formik.handleChange}
          hasError={!!formik.errors.email}
          errorMessage={formik.errors.email}
        />
        <div className='h-4'></div>
        <TextInput
          name='password'
          label='Password'
          type='password'
          placeholder='Enter your password'
          value={formik.values.password}
          onChange={formik.handleChange}
          hasError={!!formik.errors.password}
          errorMessage={formik.errors.password}
        />
        <div className='h-10'></div>
        <Button size='large' isFullWidth onClick={() => formik.handleSubmit()}>
          Sign in
        </Button>
        <p className='font-sans text-slate-900 text-sm text-center mt-8'>
          Don&lsquo;t have an account ?
          <Link href='auth/sign-up'>
            <span className='text-blue-800'>Sign up here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
