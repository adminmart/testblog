import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-8 border-t border-grey">
      <h3 className="text-center font-semibold text-darkgrey text-sm md:text-base">
        All rights reserved by <Link href="/"> React-themes.com </Link>
      </h3>
    </div>
  );
};

export default Footer;
