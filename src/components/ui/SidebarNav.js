import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function SideBar() {
  const router = useRouter(); // Inicializa useRouter

  // Crear una función para verificar si la ruta es la actual
  const isActive = (route) => {
    return route === router.pathname;
  };

  return (
    <div className="w-80 pt-10 flex h-screen flex-col justify-between border-e ">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700"
          >
            <Image src="/icons/icons_008.png" width={30} height={50} />

            <span className="text-m font-medium "> Home </span>
          </a>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <div className="flex items-center gap-2">
                <Image src="/icons/icons_016.png" width={30} height={50} />

                <span className="text-m font-medium"> Seo Tools </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
              <Link href="/tools/ppaa" passHref>
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 ${
                    isActive("/tools/ppaa") ? "bg-gray-200": ""
                  }`}
                >
                  <Image src="/icons/icons_014.png" width={25} height={50} />
                  <span className="text-m font-medium">Google PPAA Scraper</span>
                </div>
              </Link>
              <Link href="/tools/related-searches" passHref>
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 ${
                    isActive("/tools/related-searches") ? "bg-gray-200": ""
                  }`}
                >
                  <Image src="/icons/icons_014.png" width={25} height={50} />
                  <span className="text-m font-medium">Búsquedas Relacionadas</span>
                </div>
              </Link>
              <Link href="/tools/autosuggest" passHref>
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 ${
                    isActive("/tools/autosuggest") ? "bg-gray-200": ""
                  }`}
                >
                  <Image src="/icons/icons_014.png" width={25} height={50} />
                  <span className="text-m font-medium">Google Auto-Suggest Scraper</span>
                </div>
              </Link>
              <Link href="/tools/url-scraper" passHref>
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 ${
                    isActive("/tools/url-scraper") ? "bg-gray-200": ""
                  }`}
                >
                  <Image src="/icons/icons_014.png" width={25} height={50} />
                  <span className="text-m font-medium">Url Info data scraper</span>
                </div>
              </Link>

              <Link href="/tools/redirections" passHref>
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 ${
                    isActive("/tools/redirections") ? "bg-gray-200" : ""
                  }`}
                >
                  <Image src="/icons/icons_014.png" width={25} height={50} />
                  <span className="text-m font-medium">Redirects</span>
                </div>
              </Link>
              <Link href="/tools/url-cleaner" passHref>
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 ${
                    isActive("/tools/url-cleaner") ? "bg-gray-200" : ""
                  }`}
                >
                  <Image src="/icons/icons_014.png" width={25} height={50} />
                  <span className="text-m font-medium">Url cleaner</span>
                </div>
              </Link>
            </nav>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <div className="flex items-center gap-2">
                <Image src="/icons/icons_010.png" width={30} height={50} />

                <span className="text-m font-medium"> IA Tools </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
              <Link href="/tools/search-intent" passHref>
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 ${
                    isActive("/tools/search-intent") ? "bg-gray-200" : ""
                  }`}
                >
                  <Image src="/icons/icons_009.png" width={25} height={50} />
                  <span className="text-m font-medium">Search Intent</span>
                </div>
              </Link>

              <Link href="/tools/redirections" passHref>
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 ${
                    isActive("/tools/ppaa") ? "bg-gray-200" : ""
                  }`}
                >
                  <Image src="/icons/icons_009.png" width={25} height={50} />
                  <span className="text-m font-medium">Clustering</span>
                </div>
              </Link>
            </nav>
          </details>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <img
            alt="Man"
            src="/icons/icons_001.png"
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">David Mas-Bagà</strong>

              <span> davidmasbaga@gmail.com </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default SideBar;
