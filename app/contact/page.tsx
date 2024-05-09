import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Any questions? Feel free to contact us. We will get back to you within 1 business day.",
};

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">
              Contact
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Any questions? Feel free to contact us. We will get back to you
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="px-4 sm:px-6 sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">FAQ</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Link
                    href="/#faq"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Check our FAQ
                  </Link>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Contact us
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p className="mt-2">
                    <a
                      href="mailto:info@flexnote.io"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      info@flexnote.io
                    </a>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
