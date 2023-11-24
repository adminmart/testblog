import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useStore } from "@/store/store";

const ProductDetail = () => {
  const { products, fetchProducts, isSelected, isLoading } = useStore();
  const [sProducts, setSProducts] = useState<any[]>([]);
  const router = useRouter();
  const getTitle = router.asPath.split('/').pop()
  console.log(getTitle)
  const paramCase = (t: string) =>
    t
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  const selectedProduct = sProducts.find(
    (p: any) => paramCase(p.templateName) === getTitle
  );
  console.log(selectedProduct);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  useEffect(() => {
    setSProducts(products);
  }, [products]);

  return (
    <>{selectedProduct ?
      <Head>
        <title>
          {selectedProduct.templateName}
        </title>
        <meta
          name="description"
          content={selectedProduct.subtitle}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> : ''}

      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
        <Link href="/">
          <div className="text-sm text-white bg-black rounded-full text-center inline-block py-1 px-3">Back</div>
        </Link>
        {selectedProduct ?
          <>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-10">
              <div>
                <img
                  src={selectedProduct.imageSrc}
                  width={564}
                  height={395}
                  alt={selectedProduct.imageAlt}
                  className="h-auto w-full object-cover rounded-lg object-center lg:w-full"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-70px font-bold mb-4">{selectedProduct.templateName}</h1>
                <h5 className="mb-6 mt-3">{selectedProduct.subtitle}</h5>
                <div className="flex gap-4 mb-10">
                  <Link href={selectedProduct.livePreview} target="_blank">
                    <button
                      className="text-sm border border-grey text-purple  bg-white hover:text-white hover:bg-purple py-3 px-7 rounded"

                    >
                      Live Preview
                    </button>
                  </Link>
                  <Link href={`${selectedProduct.details}?ref=5`} target="_blank">
                    <button
                      title="Download"
                      className="text-sm flex align-middle gap-1 bg-purple rounded py-3 px-7  hover:bg-purple text-white "
                    >
                      Download
                    </button>
                  </Link>
                </div>
                <h3 className="font-bold mb-3">Theme Information</h3>
                <table className="table-auto text-sm w-6/12">

                  <tbody>
                    <tr>
                      <td className="py-3">Price</td>
                      <td className="font-bold">: {selectedProduct.price === 0 ? (
                        <span className="rounded bg-green mx-3 px-2 py-1 text-white">
                          Free
                        </span>
                      ) : (
                        <span className="rounded bg-black mx-3 px-2 py-1 text-white">
                          {"$" + selectedProduct.price}
                        </span>
                      )}</td>

                    </tr>
                    <tr>
                      <td className="w-2/4 py-3">Created On</td>
                      <td className="font-bold">: {selectedProduct.createdOn}</td>
                    </tr>

                    <tr>
                      <td className=" py-3">Built With</td>
                      <td className="font-bold">: <div className="mx-3 border border-grey rounded-full text-center inline-block py-1 px-3">{selectedProduct.category}</div></td>

                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-10">
              {selectedProduct.description ? <h2 className="text-3xl md:text-70px font-bold mb-4">Description</h2> : ''}
              <p>{selectedProduct.description}</p>
              {selectedProduct.features ? <h2 className="text-3xl md:text-70px font-bold mb-4 mt-10">Features</h2> : ''}
              <ul>
                {selectedProduct.features?.map((feature: string, index: number) => {
                  return <li key={index} className="flex gap-2 items-center my-1"><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  </span>{feature}</li>
                })}
              </ul>
            </div>
          </> : "No"}</div>
    </>
  );
};

export default ProductDetail;
