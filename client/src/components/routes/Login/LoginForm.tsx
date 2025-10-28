import React from 'react';
import {Button} from "@ui/button";
import httpClient from "../../../api/httpClient";
import { toast } from "sonner";

interface Account
{
    handleAccountSignUp: () => void;
    handleLandingPage: () => void;
}
export default function LoginForm({handleAccountSignUp, handleLandingPage}: Account)
{
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const loginUser = async () =>
    {
        try
        {
            const response = await httpClient.post("/api/login", {
                username, password
            });
            toast.success("Logged in successfully")
            handleLandingPage();
        } catch (error:any)
        {
          if(error.response.status === 401) {
              window.alert("invalid credentials");
          }
        }
    }
    return (
        <div className="bg-gradient-to-br from-green-400/24 to-black/67 lg:h-screen flex items-center justify-center p-4">
            <div className=" border-green-400 border-[3px] max-w-6xl bg-white/8  [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] p-4 lg:p-5 rounded-md">
                <div className="grid md:grid-cols-2 items-center gap-y-8">
                    {/* Form Section */}
                    <form className="max-w-md mx-auto w-full p-4 md:p-6">
                        <div className="mb-8">
                            <a href="#" className="inline-block">
                                <img
                                    src="https://readymadeui.com/readymadeui.svg"
                                    alt="logo"
                                    className="w-40"
                                />
                            </a>
                        </div>

                        <div className="space-y-6">
                            <label className="text-green-400 text-sm font-medium mb-2 block">
                                Username
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    id=""
                                    className="border-green-400 border-[1px] w-full text-sm text-slate-900 bg-slate-100 focus: pl-4 pr-10 py-3 rounded-md focus:border-blue-600 outline-none transition-all"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 960 960"
                                    width="20"
                                    height="20"
                                    fill="#000000"
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    <path d="M480 480q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM192 768v-96q0-23 12.5-43.5T239 594q55-32 116.29-49 61.29-17 124.5-17t124.71 17Q666 594 721 626q22 13 34.5 34t12.5 44v96H192Z" />
                                </svg>
                            </div>
                            {/* Password Field */}
                            <div>
                                <label className="text-green-400 text-sm font-medium mb-2 block">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id=""
                                        required
                                        placeholder="Enter password"
                                        className="border-green-400 border-[1px] w-full text-sm text-slate-900 bg-slate-100 focus: pl-4 pr-10 py-3 rounded-md  focus:border-blue-600 outline-none transition-all"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000" className="absolute right-4 top-1/2 -translate-y-1/2"><path d="M288-384q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 144q-100 0-170-70T48-480q0-100 70-170t170-70q65 0 120 32.5t88 87.5h344l120 120-180 168-84-60-72 60-96-72h-20q-24 68-85.5 106T288-240Zm0-72q63 0 111-40.5T454-456h98l70 52 71-59 81 58 82-76-46-47H449q-19-53-62.5-86.5T288-648q-70 0-119 49t-49 119q0 70 49 119t119 49Z"/></svg>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex flex-wrap items-center gap-4 justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="shrink-0 h-4 w-4 text-blue-600 focus:ring-blue-500  rounded-md"
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm text-green-400">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm mt-6 text-center text-white">
                            Don't have an account?
                            <Button onClick={handleAccountSignUp} className="text-green-400 font-medium tracking-wide hover:underline ml-1">
                                Register here
                            </Button>
                        </p>


                        {/* Submit Button */}
                        <div className="mt-12">
                            <Button
                                type="submit"
                                onClick={() => loginUser()}
                                className="border-green-400 border-[3px] w-full shadow-xl py-2 px-4 text-[15px] tracking-wide font-medium rounded-md text-white bg-green-400 hover:bg-green-700 focus:outline-none cursor-pointer"
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                    {/* Image Section */}
                    <div className="w-full h-full">
                        <div className="aspect-square bg-gray-50 relative before:absolute before:inset-0 before:bg-black/40 rounded-md overflow-hidden w-full h-full border-green-400 border-[2px]">
                            <img
                                src="https://airstriker123.github.io/figma-css-export/login.jpg"
                                className="w-full h-full object-cover"
                                alt="login img"
                            />
                            <div className="absolute inset-0 m-auto max-w-sm p-6 flex items-center justify-center">
                                <div>
                                    <h1 className="text-white text-4xl font-semibold"><b>Sign in</b></h1>
                                    <p className="text-green-400 text-[15px] font-medium mt-6 leading-relaxed">
                                        <h1><b>Sign in to your account to proceed</b> <br/><br/></h1>

                                        Software Readvanced is a web application designed to help students learn the new HSC software engineering course, by providing useful learning resources to students for their studies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


