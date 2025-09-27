"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      id="footer"
      className=" backdrop-blur-3xl border-t border-[#007BFF]/20 pt-20 pb-10 px-6"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="https://i.ibb.co/b5xP5KTS/Untitled-design-3-Photoroom.png"
                alt="Blend Pilot Logo"
                width={100}
                height={60}
                className="invert brightness-0"
              />
            </Link>
            <p className="text-sm text-gray-400 text-balance font-sora">
              Engineering powerful digital legacies and intelligent software
              solutions for businesses ready to conquer the world stage.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg font-rajdhani">Quick Links</h4>
            <ul className="space-y-3 font-sora">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg font-rajdhani">Legal</h4>
            <ul className="space-y-3 font-sora">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-and-refund"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-and-delivery"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg font-rajdhani">
              Connect With Us
            </h4>
            <div className="mb-4 font-sora">
              <Link
                href="/contact"
                className="text-gray-400 hover:text-[#007BFF] transition-colors"
              >
                Contact Us
              </Link>
            </div>
            <div className="flex space-x-5">
              <a
                href="https://www.facebook.com/profile.php?id=61578180728898"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all text-xl"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/blend-pilot-035101375/"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all text-xl"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t backdrop-blur-3xl border-[#007BFF]/10 text-center text-gray-500 text-sm font-sora">
          <p>
            &copy; {new Date().getFullYear()} Blend Pilot. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;