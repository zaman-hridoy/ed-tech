import Image from "next/image";
import Link from "next/link";

const LogoMobile = () => {
  return (
    <Link href="/dashboard" className="relative w-[150px] h-[40px] block">
      <Image
        src="/logos/logo.svg"
        alt="Simplitaught"
        fill
        priority
        className="object-contain"
      />
    </Link>
  );
};

export default LogoMobile;
