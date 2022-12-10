import { useFormik } from "formik";
import Head from "next/head";
import Link from "next/link";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import TextInput from "../../components/TextInput";
import * as Yup from "yup";

const SigninSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(8, "Full name should have at least 8 characters")
    .max(30, "Full name should have maximun 30 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Email format is invalid")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should have at least 8 characters")
    .max(50, "Password should have maximun 30 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confirm Password is mismatch")
    .required("Confirm Password is required"),
});
type Props = {};

const SignUpPage = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SigninSchema,
    onSubmit: () => {
      alert("Sign In Succes");
    },
  });
  return (
    <div>
      <Head>
        <title>Sign Up | Noobium</title>
      </Head>
      <Navbar />
      <div className='w-[400px] mx-auto py-24'>
        <h1 className='font-sans font-bold text-slate-900 text-5xl text-center mb-4'>
          Sign Up
        </h1>
        <p className='font-sans text-slate-900 text-center mb-16'>
          Fill the form to create an account.
        </p>
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
        <div className='h-4'></div>
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
        <div className='h-4'></div>
        <TextInput
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          placeholder='Enter your confirm password'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          hasError={!!formik.errors.confirmPassword}
          errorMessage={formik.errors.confirmPassword}
        />
        <div className='h-10'></div>
        <Button size='large' isFullWidth onClick={() => formik.handleSubmit()}>
          Sign Up
        </Button>
        <p className='font-sans text-slate-900 text-sm text-center mt-8'>
          Already have an account ?
          <Link href='/auth/sign-in'>
            <span className='text-blue-800'>Sign in here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;