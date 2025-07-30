"use client"
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    user && CheckUser();
  }, [user]);

  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress!,
      imageUrl: user?.imageUrl!,
      userName: user?.fullName!,
    });
    console.log(result);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
         
        </div>
        <UserButton />
      </header>

      {/* Hero Section */}
      <section className="flex flex-1 flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-16 gap-12">
        {/* Left Content */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Upload. Ask. <span className="text-indigo-600">Understand.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Upload your PDFs, take notes, and get instant AI-powered answers about the material — all in real time.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href={"/dashboard"}
             
              className="inline-flex items-center justify-center rounded-full bg-orange-700 px-6 py-3 text-white font-medium shadow-lg hover:bg-indigo-700 transition"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Live Demo
            </a>
          </div>
        </div>

        {/* Right Image/Illustration */}
        <div className="flex-1 flex justify-center ">
          <Image
          
            src="/pdf.png"
            alt="AI PDF Preview"
            width={400}
            height={400}
            className="rounded-2xl p-5 shadow-xl  border border-gray-200 "
          />
        </div>
      </section>
    </main>
  );
}
