'use client'
import React, { useRef } from "react";
import Products from "../Products/Product";
import Image from "next/image";
import { useStore } from "@/store/store";

const Index = (): JSX.Element => {
  const secondComponentRef = useRef<HTMLDivElement>(null);
  const { products, fetchProducts } = useStore();
  const [mProducts, setMProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  React.useEffect(() => {
    setMProducts(products);
  }, [products]);

  return (
    <div className="pb-10 pt-20 my-10">
      <div className="flex justify-center mb-5">
        <Image
          src="/assets/logo/react-js.svg"
          alt="logo"
          width={70}
          height={70}
        />
      </div>
      <h1 className="text-center text-4xl md:text-70px font-bold mb-4">
        {mProducts.length} + Free & Premium React Themes / Templates
      </h1>
      <h5 className="text-center text-darkgrey mb-5">
        Find the Perfect Starting Point for Your Project, it has a vast
        collection of <br />
        free and premium React themes / templates / dashboards.
      </h5>
      <div className="text-center">
        <button
          className="bg-react hover:bg-darkpurple text-white py-3 px-7 rounded"
          onClick={() => {
            if (secondComponentRef.current) {
              secondComponentRef.current.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Browse Themes
        </button>
        <div ref={secondComponentRef}>
          <Products />
        </div>
      </div>
    </div>
  );
};

export default Index;
