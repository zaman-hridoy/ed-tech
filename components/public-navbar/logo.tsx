import main_logo from "@/public/logos/logo.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      {/* <div className="relative w-[170px] h-[40px] xl:w-[191px] xl:h-[48px]"> */}
      <Image src={main_logo} alt="Simplitaught" priority />
      {/* </div> */}
    </Link>
  );
};

export default Logo;
