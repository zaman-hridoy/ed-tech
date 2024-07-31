import Image from "next/image";
import Link from "next/link";

const SmallLogo = () => {
  return (
    <Link href="/dashboard">
      <div className="relative w-[35px] h-[30px]">
        <Image
          src="/logos/st-logo.svg"
          alt="Simplitaught"
          fill
          priority
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default SmallLogo;
