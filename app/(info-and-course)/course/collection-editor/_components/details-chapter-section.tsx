import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChapterList from "./chapter-list";
import FormDetails from "./form-details";

export function DetailsChapterSection() {
  return (
    <Tabs defaultValue="Chapters" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="Chapters"
          className="data-[state=active]:bg-[var(--brand-color)] data-[state=active]:text-white text-xs font-semibold tracking-tight py-2"
        >
          Chapters
        </TabsTrigger>
        <TabsTrigger
          value="Details"
          className="data-[state=active]:bg-[var(--brand-color)] data-[state=active]:text-white text-xs font-semibold tracking-tight py-2"
        >
          Details
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Chapters">
        <ChapterList />
      </TabsContent>
      <TabsContent value="Details">
        <FormDetails />
      </TabsContent>
    </Tabs>
  );
}
