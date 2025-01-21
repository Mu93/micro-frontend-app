import React from "react";
import { Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <p className="text-center text-gray-600">
      {"Copyright © "}
      <RouterLink to="/" className="text-gray-800 hover:text-gray-900">
        Your Website
      </RouterLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </p>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  return (
    <>
      <main>
        {/* Hero unit */}
        <div className="max-w-sm mx-auto bg-white py-16 px-4">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Home Page
          </h1>
          <p className="text-lg text-center text-gray-600">
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </p>
          <div className="flex justify-center space-x-4 mt-8">
            <RouterLink
              to="/pricing"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Pricing
            </RouterLink>
            <RouterLink
              to="/pricing"
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
            >
              Pricing
            </RouterLink>
          </div>
        </div>

        {/* Card grid */}
        <div className="max-w-4xl mx-auto py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cards.map((card) => (
              <div
                key={card}
                className="flex flex-col border rounded-lg shadow-lg overflow-hidden"
              >
                <div
                  className="relative pt-[56.25%] bg-cover bg-center"
                  style={{
                    backgroundImage: "url(https://placehold.co/600x400)",
                  }}
                ></div>
                <div className="p-6 flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Heading
                  </h2>
                  <p className="text-gray-600">
                    This is a media card. You can use this section to describe
                    the content.
                  </p>
                </div>
                <div className="p-6 flex space-x-4">
                  <button className="text-md bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-md	w-1/2">
                    View
                  </button>
                  <button className="text-md bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-md	w-1/2">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Footer</h2>
          <p className="text-gray-600">
            Something here to give the footer a purpose!
          </p>
          <div className="mt-8">
            <Copyright />
          </div>
        </div>
      </footer>
    </>
  );
}
