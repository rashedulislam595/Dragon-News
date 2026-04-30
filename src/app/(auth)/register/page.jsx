"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isShow,setIsShow] = useState(true)

    const handelRegister = async (data) => {
        const { name, photoUrl, email, password } = data;
        // console.log(name,photoUrl,email,password)

        const { data: res, error } = await authClient.signUp.email({
            name: name,
            email: email,
            password: password,
            image: photoUrl,
            callbackURL: "/",
        });
        // console.log("response form database",{res,error})
        if (error) {
            toast.error(error.message, { theme: "dark" })
        }
        if (res) {
            toast.success("SignUp Successful!", { theme: "dark" })
        }
    }

    return (
        <div className='h-[90vh] p-20 flex justify-center items-center bg-slate-200'>
            <div className='bg-white p-16 rounded-2xl'>
                <h2 className='text-4xl font-semibold text-[#403F3F] mb-12'>Register your account</h2>

                <form onSubmit={handleSubmit(handelRegister)}>
                    <fieldset className="fieldset mb-2">
                        <legend className="fieldset-legend text-xl font-semibold text-[#403F3F]">Your Name</legend>
                        <input type="text" className="input w-full rounded-md"
                            {...register("name", { required: "write your name" })} placeholder="Enter your name" />
                        {errors.name && (<p className='text-red-600 font-bold mt-1'>{errors.name.message}</p>)}
                    </fieldset>
                    {/* photo url */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-xl font-semibold text-[#403F3F]">Photo URL</legend>
                        <input type="text" className="input w-full rounded-md"
                            {...register("photoUrl")} placeholder="Enter your photo url" />
                    </fieldset>
                    {/* email */}
                    <fieldset className="fieldset mt-2">
                        <legend className="fieldset-legend text-xl font-semibold text-[#403F3F]">Email Address</legend>
                        <input type="email" className="input w-full rounded-md"
                            {...register("email", { required: "Password filed is required!" })} placeholder="Enter your email address" />
                        {errors.email && (<p className='text-red-600 font-bold mt-1'>{errors.email.message}</p>)}
                    </fieldset>

                    <fieldset className="fieldset mt-2 relative">
                        <legend className="fieldset-legend text-xl font-semibold text-[#403F3F]">Password</legend>
                        <input type={isShow?"password":"text"} className="input w-full rounded-md"
                            {...register("password", { required: "Password filed is required!" })} placeholder="Enter your Password" />
                        <span className='absolute right-2 top-3.5 text-lg' onClick={() => setIsShow(!isShow)}>
                            {isShow ? <IoEyeOff /> : <FaEye />
                            }
                        </span>
                        {errors.password && (<p className='text-red-600 font-bold mt-1'>{errors.password.message}</p>)}
                    </fieldset>
                    <button className='btn bg-[#403F3F] mt-5 w-full text-white text-lg font-bold'>Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;