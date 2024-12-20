"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import withAuth from "@/components/auth/withAuth";

const HomePage = () => {
  return (
    <div className="bg-white text-gray-900">
      <header className="container mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Enhance your skills and master{" "}
          <span className="text-blue-600">penetration</span>
        </h1>
        <p className="text-lg mb-8">
          Empower your ethical hacking journey! We provide learners with curated
          learning materials, guided paths, and a hands-on challenge playground
          to become a confident penetration tester.
        </p>
        <div className="space-x-4">
          <Link
            href="/start-learning"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg"
          >
            Start learning
          </Link>
          <Link
            href="/labs"
            className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg border border-gray-300"
          >
            Go to Labs
          </Link>
        </div>
      </header>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Launch Your{" "}
            <span className="text-blue-600">Ethical Hacking Skills</span>:
            Here’s How We Empower You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <Image
                src="/path-to-icon1.svg"
                alt="Fundamentals"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Master the Fundamentals
              </h3>
              <p className="text-gray-700">
                Gain a solid foundation with our curated learning materials,
                from beginner-friendly to advanced topics.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <Image
                src="/path-to-icon2.svg"
                alt="Path"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Forge Your Path</h3>
              <p className="text-gray-700">
                Choose a guided learning path that aligns with your interests,
                whether it’s web application testing or network security.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <Image
                src="/path-to-icon3.svg"
                alt="Challenges"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Level Up with Challenges
              </h3>
              <p className="text-gray-700">
                Test your skills in a safe, gamified environment with our
                extensive challenge playground.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16">
        <h2 className="text-2xl font-bold mb-8">Learn</h2>
        <div className="flex justify-center">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg">
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
          <Image
            src="/securion-sphere-logo.svg"
            alt="Securion Sphere"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <p className="text-sm">
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>{" "}
            |{" "}
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy & Terms of Service
            </Link>
          </p>
          <p className="text-sm mt-4">&copy; 2024 Securion Sphere</p>
        </div>
      </footer>
    </div>
  );
};

export default withAuth(HomePage);
