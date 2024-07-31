import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="relative w-[170px] h-[40px] xl:w-[191px] xl:h-[48px]">
        <Image
          src="/logos/logo.png"
          alt="Simplitaught"
          fill
          priority
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
