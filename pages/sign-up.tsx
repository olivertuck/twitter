import Head from 'next/head';
import { NextPage } from 'next';
import { SignUpForm } from '../components';

const SignUp: NextPage = () => (
  <>
    <Head>
      <title>Sign up</title>
    </Head>
    <SignUpForm />
  </>
);

export default SignUp;
