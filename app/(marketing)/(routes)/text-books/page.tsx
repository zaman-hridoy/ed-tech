import Container from "@/components/container";
import axios from "@/lib/instance";
import Link from "next/link";
import SubjectItems from "../(landing)/_components/subject-items";

const BooksPage = async () => {
  const res = await axios.get(`/content/viewBooks/Get_Books_Main_Category`);

  const results = res.data?.mainCategories || [];
  const categories: string[] = results.map((cat: any) => cat.subjects);
  return (
    <Container className="py-32 max-w-6xl mx-auto px-4 space-y-6">
      <div>
        <div className="w-fit">
          <h2 className="text-xl md:text-2xl text-slate-800 font-semibold">
            Featured Subjects
          </h2>
          <div className="w-1/2 h-1 bg-[var(--brand-color)] rounded-full" />
        </div>

        <div className="mt-6">
          <SubjectItems />
        </div>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="w-fit">
          <h2 className="text-xl md:text-2xl text-slate-800 font-semibold">
            All Subjects
          </h2>
          <div className="w-1/2 h-1 bg-[var(--brand-color)] rounded-full" />
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/text-books/${encodeURIComponent(cat)}`}
              className="text-xs md:text-sm lg:text-base font-semibold tracking-tight hover:text-[var(--brand-color)] hover:scale-110 hover:underline hover:origin-left transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BooksPage;
