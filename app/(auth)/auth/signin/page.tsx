import Logo from "@/components/navbar/logo";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MemberOptions from "./_components/member-options";
import SigninForm from "./_components/signin-form";

export const metadata: Metadata = {
  title: "Sign in & Learn for Free - SimpliTaught",
};

function SigninPage() {
  // const { data: session, status } = useSession();
  // const session = await getServerSession(authOptions);
  // if (status === "authenticated") {
  //   return redirect("/dashboard");
  // }

  // if (session) return redirect("/dashboard");
  return (
    <div className="flex flex-col h-full py-16">
      <div className="hidden fixed z-20 inset-0 md:w-[340px] lg:w-[400px]  md:flex bg-[var(--brand-color-secondary)] flex-col gap-y-6">
        <div className="p-12 pb-0">
          <Link href="/">
            <div className="relative w-[210px] h-[40px]">
              <Image
                src="/logos/auth-logo/logo.svg"
                alt="SimpliTaught"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>
        <div className="px-12 pb-4">
          <h1 className="text-3xl font-semibold text-white">
            Explore the new world of online education, personalized and
            completely free!
          </h1>
        </div>
        <div className="relative flex-grow">
          <Image src="/images/signin/Frame.svg" fill alt="sign in" priority />
        </div>
        <div className="px-12 pb-8 pt-5">
          <p className="text-base font-semibold text-white">
            © {new Date().getFullYear()} - SimpliTaught
          </p>
        </div>
      </div>

      <MemberOptions page="Sign up" />

      {/* form options */}
      <div className="md:pl-[340px] lg:pl-[400px] flex flex-col w-full h-full">
        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          <div className="max-w-sm w-full mx-auto">
            <div className="md:hidden flex items-center justify-center mb-9">
              <Logo />
            </div>
            <h2 className="text-2xl font-bold md:mb-8 text-center md:text-left">
              Sign in to SimpliTaught
            </h2>
            <p className="text-center text-sm text-slate-500 md:hidden pb-8 mt-2">
              Explore the new world of online education, <br />
              personalized and completely free!
            </p>
            <SigninForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
