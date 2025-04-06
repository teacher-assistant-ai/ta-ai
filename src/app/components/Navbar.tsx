import Image from "next/image";
import Account from "./Account";

const Navbar = () => {
  return (
    <nav className="z-50 flex h-20 px-16 no-wrap items-stretch min-w-full shadow-md justify-between font-sans">
      <div className="text-[#52796F] flex items-center">
        {/* <span className={`text-2xl font-extrabold font-mono`}>Ta.ai</span> */}
        <Image
            src={"/img/logo.png"}
            height={64}
            width={64}
            alt="ta.ai"
        />
      </div>
      <Account />
    </nav>
  );
};

export default Navbar;
