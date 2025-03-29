"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import withAuth from "../components/auth/withAuth";

const HomePage = () => {
  const features = [
    {
      image: "/assets/icons/learning_icon.png",
      alt: "Fundamentals",
      title: "Master the Fundamentals",
      description:
        "Gain a solid foundation with our curated learning materials, from beginner-friendly to advanced topics.",
    },
    {
      image: "/assets/icons/path_icon.png",
      alt: "Path",
      title: "Forge Your Path",
      description:
        "Choose a guided learning path that aligns with your interests, whether it’s web application testing or network security.",
    },
    {
      image: "/assets/icons/level_icon.png",
      alt: "Challenges",
      title: "Level Up with Challenges",
      description:
        "Test your skills in a safe, gamified environment with our extensive challenge playground.",
    },
  ];

  interface FeatureCardProps {
    image: string;
    alt: string;
    title: string;
    description: string;
  }

  const FeatureCard = ({
    image,
    alt,
    title,
    description,
  }: FeatureCardProps) => (
    <div className="p-6 bg-white shadow-md rounded-xl text-left">
      <Image src={image} alt={alt} width={100} height={100} className="mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );

  return (
    <div className="bg-white text-gray-900">
      <header className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Section - Text & Buttons */}
        <div className="lg:w-1/2 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Enhance your skills and master{" "}
            <span className="text-blue-600">penetration</span>
          </h1>
          <p className="text-lg mb-8">
            Empower your ethical hacking journey! We provide learners with
            curated learning materials, guided paths, and a hands-on challenge
            playground to become a confident penetration tester.
          </p>
          <div className="space-x-4">
            <Link
              href="/learning-modules"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl"
            >
              Start learning
            </Link>
            <Link
              href="/labs"
              className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl border border-gray-300"
            >
              Go to Labs &gt;
            </Link>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center w-auto flex-grow-0 mt-8 lg:mt-0">
          <Image
            src="/assets/images/cybersec_img.png"
            alt="cybersec_img"
            width={500}
            height={500}
            className="w-auto max-w-lg"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            Launch Your{" "}
            <span className="text-blue-600">Ethical Hacking Skills</span>:
            Here’s How We Empower You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Video Section */}
          {/* <div className="w-full lg:w-1/2">
            <video className="w-full rounded-xl shadow-md" controls>
              <source
                src="/assets/videos/learning_intro.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div> */}

          {/* Text Content */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-8 text-center lg:text-left">
              Learn
            </h2>
            <p className="text-gray-700 mb-4">
              Learn key concepts from our training materials, available in text
              and video formats.
            </p>
            <div className="space-y-4">
              <Link
                href="/guide"
                className="block text-blue-600 hover:underline"
              >
                Guide &gt;
              </Link>
              <Link
                href="/practice"
                className="block text-blue-600 hover:underline"
              >
                Practice &gt;
              </Link>
              <Link
                href="/create-challenges"
                className="block text-blue-600 hover:underline"
              >
                Create Challenges &gt;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <div className="flex flex-row bg-white py-2 px-4 rounded-xl w-fit">
            <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
              <Image
                src={"/securion-sphere-icon.svg"}
                alt="Securion Sphere"
                width={50}
                height={50}
                className="mx-auto my-auto"
              />
            </Link>

            <Link href="/" className="hidden lg:block">
              <div className="text-start">
                <div className="text-blue-500 text-xl font-semibold tracking-wide">
                  Securion<span className="text-blue-700">Sphere</span>
                </div>
                <span className="text-[10px] text-blue-500">
                  PENETRATION TESTING LEARNING PLATFORM
                </span>
              </div>
            </Link>
          </div>

          <p className="text-md text-start flex flex-col pt-6">
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
            <br></br>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy & Terms of Service
            </Link>
            <br></br>
            <Link href="/privacy-policy" className="hover:underline">
              © 2024 SecurionSphere
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default withAuth(HomePage);
