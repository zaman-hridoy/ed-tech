import { Input } from "@/components/ui/input";
import SearchBookItem from "./_components/search-book-item";

const BooksPage = () => {
  return (
    <div className="h-full pt-[68px] px-[2px]">
      <div className="bg-white rounded-md h-full flex flex-col">
        <div className="px-4 pt-4">
          <h4 className="text-base md:text-xl text-black font-medium">
            Join a book discussions
          </h4>
          <p className="text-sm text-zinc-500">
            You can join book discussions by searching their book name.
          </p>
          <Input
            placeholder="Search by book name"
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-4"
          />
        </div>

        <div className="h-full px-2 overflow-y-auto no-scrollbar grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
          {[...new Array(20)].map((item) => (
            <SearchBookItem key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
