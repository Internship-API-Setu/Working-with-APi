"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 w-full px-4 lg:px-[300px] py-[10px] bg-white shadow-md"
    >
      {/* Navbar Container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo_1.webp"
            alt="Company Logo"
            width={150}
            height={40}
            className="h-auto w-auto"
          />
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-black"
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Desktop and Tablet Menu */}
        <ul className="hidden md:flex items-center text-black font-inter font-bold text-[13px]">
          <li className="mr-8">
            <Link href="/Direction">Direction</Link>
          </li>
          <li className="hover:text-orange-500 cursor-pointer mr-8">Resources</li>
          <li className="hover:text-orange-500 cursor-pointer mr-8">Category</li>
          <li className="hover:text-orange-500 cursor-pointer mr-8">Blog</li>
          <li className="hover:text-orange-500 cursor-pointer mr-28">Join Us</li>
          <li className="mr-4">
            <button className="bg-transparent text-[#002051] opacity-80 py-2 px-4 rounded border border-[#002051]">
              Sign In
            </button>
          </li>
          <li>
            <button className="bg-[#002051] opacity-80 text-white py-2 px-4 rounded">
              Create Account
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[60px] left-0 w-full bg-white shadow-lg z-50">
          <ul className="flex flex-col items-center text-black space-y-4 py-4">
            <li>
              <Link href="/Direction" className="hover:text-orange-500">
                Direction
              </Link>
            </li>
            <li className="hover:text-orange-500">Resources</li>
            <li className="hover:text-orange-500">Category</li>
            <li className="hover:text-orange-500">Blog</li>
            <li className="hover:text-orange-500">Join Us</li>
            <li>
              <button className="bg-transparent text-[#002051] opacity-80 py-2 px-4 rounded border border-[#002051]">
                Sign In
              </button>
            </li>
            <li>
              <button className="bg-[#002051] opacity-80 text-white py-2 px-4 rounded">
                Create Account
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
