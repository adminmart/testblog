'use client'
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Search from "./Search";

const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-lightpink navbar border-b border-grey">
      <>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              {/* LOGO */}

              <Link href="/">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    src="/assets/logo/react-js.png"
                    alt="logo"
                    width={25}
                    height={25}
                  />
                  <div className="ml-2">
                    {" "}
                    React <b>Themes</b>
                  </div>
                </div>
              </Link>
              
            </div>

            {/* SEARCH BUTTON */}
            <div> 
             
            <Link href={`/blogs`} className="absolute right-[150px] sm:right-[214px] top-[20px] hover:text-[#34DFFF]" ><span>Blogs</span></Link>
            <Search />
            </div>
            
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
