import React, { useState } from 'react';
import { Button } from "@ui/button";
import { register } from "@/api/auth";

interface SignUpFormProps
{
    onRegister: (user: any) => void;
    onNavigateToLogin: () => void;
}

export default function SignUpForm({ onRegister, onNavigateToLogin }: SignUpFormProps)
{
    /*
    component for the sign up form
    - uses tailwind for styling
    - uses useState for state management
    - uses useEffect for side effects
    - handles look of the sign up form
    - stores the sign up form component
     */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // logic to register user to database
    const signUpUser: (e: React.FormEvent) => Promise<void> = async (e: React.FormEvent):Promise<void> =>
    {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try
        {
            const user = await register(username, password); // try to register api call
            onRegister(user);
        }
        catch (err: any) // if fail return error message
        {
            setError(err.message);
        }
        finally
        {
            setLoading(false);
        }
    };

    // return sign up form component
    return (
        <>
            {/* sign up form background look */}
        <div className="bg-gradient-to-br from-black/67 to-green-400/24 lg:h-screen flex items-center justify-center p-4">
            <div className="border-green-400 border-[3px] max-w-6xl bg-white/8 shadow-xl p-6 rounded-md">
                <div className="grid md:grid-cols-2 items-center gap-y-8">
                    {/* sign up form */}
                    <form className="max-w-md mx-auto w-full" onSubmit={signUpUser}>
                        <div className="mb-8">
                            {/* logo */}
                            <img
                                src="/logo.png"
                                alt="Software Readvanced"
                                className="w-40"
                            />
                        </div>
                        {/* username field */}
                        <label className="text-green-400 text-sm font-medium mb-2 block">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter a username for your account"
                            className="border-green-400 border-[1px] w-full text-sm text-slate-900 bg-slate-100 pl-4 pr-10 py-3 rounded-md mb-4"
                        />
                        {/* password field */}
                        <label className="text-green-400 text-sm font-medium mb-2 block">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter a password for your account"
                            className="border-green-400 border-[1px] w-full text-sm text-slate-900 bg-slate-100 pl-4 pr-10 py-3 rounded-md"
                        />

                        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                        {/* sign up button to submit to api */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="border-green-400 border-[3px] w-full shadow-xl mt-6 py-2 text-[15px] font-medium rounded-md text-white bg-green-400 hover:bg-green-700"
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </Button>
                        {/*  redirect login button */}
                        <p className="text-green-400 text-sm mt-4 text-center">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={onNavigateToLogin}
                                className="underline hover:text-green-300"
                            >
                                Login
                            </button>
                        </p>
                    </form>


                    {/* Image Section */}
                    <div className="w-full h-full">
                        <div className="aspect-square bg-gray-50 relative before:absolute before:inset-0 before:bg-black/40 rounded-md overflow-hidden w-full h-full border-green-400 border-[2px]">
                            <img
                                src="/login.jpg"
                                className="w-full h-full object-cover"
                                alt="signup img"
                            />
                            {/* image overlay */}
                            <div className="absolute inset-0 m-auto max-w-sm p-6 flex items-center justify-center">
                                <div>
                                    {/* image overlay text */}
                                    <h1 className="text-white text-4xl font-semibold"><b>Sign Up</b></h1>
                                    <p className="text-green-400 text-[15px] font-medium mt-6 leading-relaxed">
                                        <b>Create your account to proceed</b> <br /><br />
                                        Software Readvanced is a web application designed to help students learn the new HSC software engineering course by providing useful learning resources for their studies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </>
    );
}
