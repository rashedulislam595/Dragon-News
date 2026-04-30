"use client"
import { authClient } from "@/lib/auth-client";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const RightSidebar = () => {

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
    <div>
      <h2 className="font-bold text-lg mb-4">Login with</h2>
      <div className="flex flex-col gap-2">
        <button className="btn border-blue-500 text-blue-500" onClick={handleGoogleSignIn}>
          <FaGoogle />
          Login with google
        </button>
        <button className="btn" onClick={handleGithubSignIn}>
          <FaGithub />
          Login with github
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
