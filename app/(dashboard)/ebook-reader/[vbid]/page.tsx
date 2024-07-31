import NotFoundComp from "@/components/not-found-comp";
import { authOptions } from "@/lib/auth";
import axios from "@/lib/instance";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BookReader from "../_components/book-reader";
import ReaderNavbar from "../_components/reader-navbar";

interface Props {
  params: {
    vbid: string;
  };
}

const EbookReaderPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  let result = null;

  try {
    const res = await axios.post("/content/vs/CheckUserLicenseAndRedirect", {
      email: session?.user.email,
      reference: session?.user.email,
      sku: params.vbid,
    });

    result = res.data;

    console.log(result);
  } catch (error) {
    console.log(error);
  }

  if (result.message) {
    return (
      <div className="flex flex-col h-full bg-white">
        <ReaderNavbar />
        <div className="pt-14 pb-20 h-full flex items-center justify-center">
          <NotFoundComp />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <ReaderNavbar />
      <div className="h-full">
        <BookReader xmlData={result} />
      </div>
    </div>
  );
};

export default EbookReaderPage;
