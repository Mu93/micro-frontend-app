import React from "react";
import { Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <p className="text-center text-gray-600">
      {"Copyright © "}
      <a href="https://mui.com/" className="text-gray-800 hover:text-gray-900">
        Your Website
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </p>
  );
}

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outline",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Enterprise",
    price: "30",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Contact us",
    buttonVariant: "outline",
  },
];

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

export default function Pricing() {
  return (
    <React.Fragment>
      {/* Hero unit */}
      <div className="max-w-sm mx-auto py-16">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Pricing
        </h1>
        <p className="text-lg text-center text-gray-600">
          Quickly build an effective pricing table for your potential customers
          with this layout. It&apos;s built with default Tailwind CSS components
          with little customization.
        </p>
      </div>
      {/* End hero unit */}

      {/* Pricing cards */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.title}
              className={`flex flex-col border rounded-lg shadow-lg ${
                tier.title === "Pro" ? "border-2 border-blue-500" : ""
              }`}
            >
              <div
                className={`p-6 ${
                  tier.subheader ? "bg-gray-100" : "bg-white"
                } rounded-t-lg`}
              >
                <h2 className="text-2xl font-semibold text-gray-900">
                  {tier.title}
                </h2>
                {tier.subheader && (
                  <p className="text-sm text-gray-500">{tier.subheader}</p>
                )}
              </div>
              <div className="p-6 flex-1">
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    ${tier.price}
                  </span>
                  <span className="text-xl text-gray-600">/mo</span>
                </div>
                <ul className="list-disc list-inside">
                  {tier.description.map((line) => (
                    <li key={line} className="text-gray-600">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6">
                <RouterLink
                  to="/auth/signup"
                  className={`w-full block text-center px-4 py-2 rounded-md ${
                    tier.buttonVariant === "contained"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {tier.buttonText}
                </RouterLink>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-16 border-t border-gray-200 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {footers.map((footer) => (
            <div key={footer.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {footer.title}
              </h3>
              <ul className="space-y-2">
                {footer.description.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Copyright />
        </div>
      </div>
    </React.Fragment>
  );
}