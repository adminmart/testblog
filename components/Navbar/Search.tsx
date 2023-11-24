import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/store";

interface ProfileData {
  filter: any;
  map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
  id: number;
  templateName: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  producType: string;
  livePreview: string;
  details: string;
  price: number;
}

const Search = (): JSX.Element => {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };
  const { products, fetchProducts } = useStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  // ...............

  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setSearchText("");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchBoxRef]);

  // ...............

  const filteredData = products?.filter((item: ProfileData) =>
    ["NextJs", "React"].includes(item.category)
  );

  return (
    <>
      <div
        className="flex lg:ml-6 searchBox relative border border-grey"
        ref={searchBoxRef}
      >
        <input
          className="searchInput"
          type="text"
          name="search"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <MagnifyingGlassIcon
          className="h-6 w-6"
          aria-hidden="true"
          color="grey"
        />
      </div>

      {/* COMPONENT to Render On Search */}

      {searchText !== "" && (
        <div
          className="searchBoxResult shadowproduct py-2 px-5 rounded-lg" 
          ref={searchBoxRef}
          style={{zIndex:'1000'}}
        >
          {filteredData ? (
            <div className="mx-auto max-w-3xl">
              <h2 className="font-semibold pt-2">Search Results</h2>
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {filteredData
                  .filter((items: ProfileData) =>
                    items.templateName
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((items: ProfileData) => (
                    <div key={items.id}>
                      <Link href={items.livePreview} target="_blank">
                        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-50">
                          <div className="imageContainer">
                            <img
                              src={items.imageSrc}
                              alt={items.imageAlt}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                        </div>

                        <div className="mt-1 flex justify-between">
                          <h3 className="text-sm font-semibold text-black">
                            {items.templateName}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  ))}
                {filteredData.filter((items: { templateName: string }) =>
                  items.templateName
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                ).length === 0 && (
                  <div className="my-2">
                    <p className="text-sm text-darkgrey md:text-lg font-semibold">
                      Sorry No Results found
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            "No Data Found"
          )}
        </div>
      )}
    </>
  );
};

export default Search;
