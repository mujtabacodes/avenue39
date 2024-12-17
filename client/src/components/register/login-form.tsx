'use client';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaRegUser } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useFormik } from 'formik';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import showToast from '../Toaster/Toaster';
import Loader from '../Loader/Loader';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loggedInUserAction } from '@/redux/slices/user/userSlice';
import Cookies from 'js-cookie';


interface TabsProps {
  onTabChange?: (value: string) => void;
}

export function LoginForm({ onTabChange }: TabsProps) {
  const Navigate = useRouter();
  const dispatch = useDispatch();
  const SignupInitialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
  };
  const singinInitialValues = {
    email: '',
    password: '',
  };

  const signupMutation = useMutation({
    mutationFn: (formData: typeof SignupInitialValues) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup`, formData,
        { withCredentials: true }

      );
    },
    onSuccess: (res) => {
      if (res.data.status == 409) {
        showToast('warn', res.data.message + '!');
      } else {
        Signup.resetForm();
        showToast('success', 'Account created Successfully🎉');
      }
    },
    onError: (error: any) => {
      showToast('error', 'Ensure name, email and password filled.');
      console.error('Error signing up:', error);
    },
  });

  const signinMutation = useMutation({
    mutationFn: (formData: typeof singinInitialValues) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,
        formData,
        { withCredentials: true }
      );
    },
    onSuccess: (res) => {
      if (res.data.status == 403) {
        showToast('warn', res.data.message + ' ☹');
      } else {
        Signin.resetForm();
        showToast('success', `${res.data.message}🎉`);
        dispatch(loggedInUserAction(res.data.user));
        Cookies.set('user_token', res.data.token, {
          expires: 24 * 60 * 60 * 1000,
          path: '/'
        });
        Navigate.push('/');
      }
    },
    onError: (error: any) => {
      showToast('error', error.message);
      console.log(error);
    },
  });

  const Signup = useFormik({
    initialValues: SignupInitialValues,
    onSubmit: (values) => {
      const { first_name, last_name, confirm_password, ...rest } = values;
  
      if (!first_name || !last_name || !values.password || !values.email) {
        showToast('warn', 'Ensure name, email, and password are filled.');
      } else if (values.password !== confirm_password) {
        showToast('warn', 'Passwords do not match.');
      } else {
        const modifiedValues: any = {
          ...rest,
          name: `${first_name} ${last_name}`.trim(),
        };
  
        signupMutation.mutate(modifiedValues);
      }
    },
  });

  const Signin = useFormik({
    initialValues: singinInitialValues,
    onSubmit: (values) => {
      if (values.password === '' || values.email === '') {
        showToast('warn', 'Email and Password is required!');
      } else {
        signinMutation.mutate(values);
      }
    },
  });

  return (
    <Tabs defaultValue="login" onValueChange={onTabChange} className="p-2">
      <TabsList className=" w-full text-center space-x-4  flex justify-center items-center">
        <TabsTrigger className="sm:text-2xl whitespace-nowrap font-bold " value="login">
          <FaRegUser />
          Sign in
        </TabsTrigger>
        <span className="h-10 border border-black" />
        <TabsTrigger className="sm:text-2xl font-bold whitespace-nowrap " value="register">
          <FaRegUser />
          Sign up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <form onSubmit={Signin.handleSubmit} className="space-y-5 mt-10">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={Signin.handleChange}
            value={Signin.values.email}
          />

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={Signin.handleChange}
            value={Signin.values.password}
          />
          <div className="text-center sm:text-end pr-4 text-sm">
            <Link href={'/forgot-password'}>Forget Passowrd?</Link>
          </div>
          <Button
            type="submit"
            variant={'login'}
            disabled={signinMutation.isPending ? true : false}
            className="w-full h-[76px] "
          >
            {signinMutation.isPending ? (
              <Loader color="white" />
            ) : (
              'Login to Continue'
            )}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="register">
        <form onSubmit={Signup.handleSubmit} className="mt-10">
          <div className='space-y-5 sm:space-y-0 sm:grid grid-cols-2 gap-5 mb-5'>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="Enter First Name"
              onChange={Signup.handleChange}
              value={Signup.values.first_name}
            />
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Enter Last Name"
              onChange={Signup.handleChange}
              value={Signup.values.last_name}
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={Signup.handleChange}
              value={Signup.values.email}
            />
            <Input
              id="phone"
              name="phone"
              type="phone"
              placeholder="Enter Phone Number"
              onChange={Signup.handleChange}
              value={Signup.values.phone}
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={Signup.handleChange}
              value={Signup.values.password}
            />
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              onChange={Signup.handleChange}
              value={Signup.values.confirm_password}
            />
            <div className="flex items-center space-x-2 px-2 col-span-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm text-gray-400 flex flex-col gap-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span>By creating your account you agree to our</span><span className='text-black'>Terms and Conditions</span>
              </label>
            </div>
          </div>
          <Button
            type="submit"
            variant={'login'}
            disabled={signupMutation.isPending ? true : false}
            className="w-full h-[76px] "
          >
            {signupMutation.isPending ? (
              <Loader color="white" />
            ) : (
              'Signup to Continue'
            )}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
