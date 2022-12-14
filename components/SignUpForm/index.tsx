import { useCallback, useEffect } from 'react';
import Input from '../Input';
import { SignUpValues } from '../../types';
import { User } from '@prisma/client';
import { axios } from '../../utils';
import { signUpSchema } from '../../schemas';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUpForm = () => {
  const { control, handleSubmit, setError, watch } = useForm<SignUpValues>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      username: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });
  const email = watch('email');
  const username = watch('username');
  const getEmailTaken = useCallback(async () => {
    const { data } = await axios.get('/users', {
      params: {
        email,
      },
    });

    return Boolean(data.length);
  }, [email]);
  const getUsernameTaken = useCallback(async () => {
    const { data } = await axios.get('/users', {
      params: {
        username,
      },
    });

    return Boolean(data.length);
  }, [username]);

  useEffect(() => {
    if (email) {
      getEmailTaken().then((emailTaken) => {
        if (emailTaken) {
          setError('email', {
            message: 'Email taken',
          });
        }
      });
    }
  }, [email, getEmailTaken, setError]);

  useEffect(() => {
    if (username) {
      getUsernameTaken().then((usernameTaken) => {
        if (usernameTaken) {
          setError('username', {
            message: 'Username taken',
          });
        }
      });
    }
  }, [getUsernameTaken, setError, username]);

  const signUp = async (data: SignUpValues) => {
    const response = await axios.post<User>('/sign-up', data);

    return response.data;
  };

  const { mutate } = useMutation(signUp);

  const onSubmit = (data: SignUpValues) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        id="firstName"
        label="First name"
        name="firstName"
      />
      <Input
        control={control}
        id="lastName"
        label="Last name"
        name="lastName"
      />
      <Input
        control={control}
        id="email"
        label="Email"
        name="email"
        type="email"
      />
      <Input control={control} id="username" label="Username" name="username" />
      <Input
        control={control}
        id="password"
        label="Password"
        name="password"
        type="password"
      />
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpForm;
