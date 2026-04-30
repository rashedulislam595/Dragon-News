"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaGithub, FaGoogle } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const [isShow,setIsShow] = useState(true)

    const handelLogin = async (data) => {
        // console.log(data);
        const { email, password } = data;

        const { data: res, error } = await authClient.signIn.email({
            email: email,
            password: password,
            rememberMe: true,
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message, { theme: "dark" })
        }
        if (res) {
            toast.success("Login Successful!", { theme: "dark" })
        }

    }

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
          provider: "google",
        });
        // console.log("google data :",data)
        if(data){
          toast.success("Login Successful!",{theme:'dark'})
        }
      }
    
      const handleGithubSignIn = async()=>{
        const data = await authClient.signIn.social({
            provider: "github"
        })
        if(data){
          toast.success("Login Successful!",{theme:'dark'})
        }
      }

    return (
        <div className='h-[90vh] p-20 flex justify-center items-center bg-slate-200'>
            <div className='bg-white p-16 rounded-2xl'>
                <h2 className='text-4xl font-semibold text-[#403F3F] mb-12'>Login your account</h2>

                <form onSubmit={handleSubmit(handelLogin)}>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-xl font-semibold text-[#403F3F]">Email Address</legend>
                        <input type="email" className="input w-full rounded-md"
                            {...register("email", { required: "Password filed is required!" })} placeholder="Enter your email address" />
                        {errors.email && (<p className='text-red-600 font-bold mt-1'>{errors.email.message}</p>)}
                    </fieldset>

                    <fieldset className="fieldset mt-2 relative">
                        <legend className="fieldset-legend text-xl font-semibold text-[#403F3F]">Password</legend>
                        <input type={isShow?"password":"text"} className="input w-full rounded-md"
                            {...register("password", { required: "Password filed is required!" })} placeholder="Enter your Password" />
                            <span className='absolute right-2 top-3.5 text-lg' onClick={()=>setIsShow(!isShow)}>
                                {isShow?<IoEyeOff />:<FaEye />
                                }
                            </span>
                        {errors.password && (<p className='text-red-600 font-bold mt-1'>{errors.password.message}</p>)}
                    </fieldset>
                    <button className='btn bg-[#403F3F] mt-5 w-full text-white text-lg font-bold'>Login</button>
                </form>
                <p className='text-[#706F6F] font-semibold my-4 text-center'>Do not Have An Account ? <Link href={'/register'} className='text-blue-600'>Register</Link></p>
                <div className="flex flex-col gap-2">
                    <button className="btn border-blue-500 text-blue-500" onClick={handleGoogleSignIn}>
                      <FaGoogle />
                      Login with google
                    </button>
                    <button className="btn border border-black" onClick={handleGithubSignIn}>
                      <FaGithub />
                      Login with github
                    </button>
                  </div>
            </div>
            
        </div>
    );
};

export default LoginPage;