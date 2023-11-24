import React, { useState, useEffect } from "react";
import Link from "next/link";
import Skeleton from "./Skeleton";
import { useStore } from "@/store/store";
import { ArrowDownTrayIcon, EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export const paginate = (items: any, pageNumber: number, pageSize: number) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items?.slice(0, startIndex + pageSize); // 0, 9
};

interface ProfileData {
  id: number;
  templateName: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  subtitle: string;
  livePreview: string;
  details: string;
  price: number;
  popularity: number;
}

const Productpage = () => {
  const {
    products,
    fetchProducts,
    sortBy,
    appType,
    handleByAppType,
    handleSortBy,
    handleSelected,
    isLoading,
  } = useStore();
  const [mProducts, setMProducts] = useState<any[]>([]);

  const [page, setPage] = useState(1);

  const pageSize = 50;

  const filteredData = mProducts?.filter((item: ProfileData) =>
    ["React", "NextJs"].includes(item.category)
  );

  const sortedData = filteredData?.sort(
    (a: ProfileData, b: ProfileData) => a.popularity - b.popularity
  );

  const getVisibleProducts = (items: any, srtBy: string, apTyp?: string) => {
    if (srtBy === "free") {
      return (items = items.filter((_product: any) => _product.price == 0));
    }
    if (srtBy === "paid") {
      return (items = items.filter((_product: any) => _product.price !== 0));
    }
    if (apTyp === "website") {
      return (items = items.filter(
        (_product: any) => _product.appType == "website"
      ));
    }
    if (apTyp === "admintemplate") {
      return (items = items.filter(
        (_product: any) => _product.appType == "admin-template"
      ));
    }
    if (apTyp === "landingpage") {
      return (items = items.filter(
        (_product: any) => _product.appType == "landingpage"
      ));
    }
    return items;
  };
  const filterdProduct = getVisibleProducts(sortedData, sortBy, appType);
  const paginatedPosts = paginate(filterdProduct, page, pageSize);

  const handelInfiniteScroll = async () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setMProducts(products);
  }, [products]);

  const paramCase = (t: string) =>
    t
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <span className="flex justify-between">
        <div className="flex justify-end items-center">
          <h4 className="mr-2">Type by:</h4>
          <select
            value={appType}
            className="firstselect border border-opacity-50 rounded-3xl"
            onChange={(e) => handleByAppType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="website">Website</option>
            <option value="admintemplate">Admin Template</option>
            <option value="landingpage">Landingpage</option>
          </select>
        </div>

        <div className="flex justify-end items-center">
          <h4 className="mr-2">Sort by:</h4>
          <select
            value={sortBy}
            className="select border border-opacity-50 rounded-3xl"
            onChange={(e) => handleSortBy(e.target.value)}
          >
            <option value="all">All</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </span>

      {!isLoading ? (
        <>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
            {paginatedPosts.map((items: ProfileData) => (
              <div key={items.id}>
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200  lg:aspect-none lg:h-auto">
                  <div className="imageContainer">
                    <Link href={`/product/${paramCase(items.templateName)}`}>
                      <img
                        src={items.imageSrc}
                        width={564}
                        height={395}
                        alt={items.imageAlt}
                        onClick={() =>
                          handleSelected(paramCase(items.templateName))
                        }
                        className="h-auto w-full object-cover object-center lg:w-full"
                      />
                    </Link>

                    <p className="text-sm absolute bottom-1 right-0 font-medium text-gray-900">
                      {items.price === 0 ? (
                        <span className="rounded bg-green px-2 py-1 text-white">
                          Free
                        </span>
                      ) : (
                        <span className="rounded bg-black px-2 py-1 text-white">
                          {"$" + items.price}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-black text-start">
                      {items.templateName}
                    </h3>
                    <p className="mt-1 text-sm text-darkgrey font-normal text-start">
                      {items.subtitle}
                    </p>
                  </div>

                  <div
                    className="py-2  rounded-x flex gap-2"
                    style={{
                      bottom: "0",
                      right: "0",
                    }}
                  >
                    <Link href={`/product/${paramCase(items.templateName)}`}>
                      <button
                        title="Download"
                        className="text-sm flex align-middle gap-1 bg-lightpurple text-purple rounded p-1 hover:bg-react hover:text-white "
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filterdProduct.length > paginatedPosts.length ? (
            <button
              className="bg-purple mt-20 hover:bg-darkpurple text-white py-3 px-7 rounded"
              onClick={handelInfiniteScroll}
            >
              Load More
            </button>
          ) : (
            ""
          )}
        </>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Productpage;
