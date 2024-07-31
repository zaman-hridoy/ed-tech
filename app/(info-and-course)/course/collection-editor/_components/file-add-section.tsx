import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinksTabContent from "./links-tab-content";
import RecommendTabContent from "./recommend-tab-content";
import YoutubeTabContent from "./youtube-tab-content";

export function FileAddSection() {
  return (
    <Tabs defaultValue="Recommended" className="w-full h-full flex flex-col">
      <TabsList className="w-full flex items-center justify-between">
        <TabsTrigger
          value="Recommended"
          className="data-[state=active]:bg-[var(--brand-color)] data-[state=active]:text-white text-[10px] xl:text-xs font-semibold tracking-tight p-1 lg:p-2"
        >
          Recommended
        </TabsTrigger>
        <TabsTrigger
          value="Drive"
          className="data-[state=active]:bg-[var(--brand-color)] data-[state=active]:text-white text-[10px] xl:text-xs font-semibold tracking-tight p-1 lg:p-2"
        >
          Drive
        </TabsTrigger>
        <TabsTrigger
          value="Youtube"
          className="data-[state=active]:bg-[var(--brand-color)] data-[state=active]:text-white text-[10px] xl:text-xs font-semibold tracking-tight p-1 lg:p-2"
        >
          YouTube
        </TabsTrigger>

        <TabsTrigger
          value="Links"
          className="data-[state=active]:bg-[var(--brand-color)] data-[state=active]:text-white text-[10px] xl:text-xs font-semibold tracking-tight p-1 lg:p-2"
        >
          Links
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Recommended" className="h-full pb-10">
        <RecommendTabContent />
      </TabsContent>
      <TabsContent value="Drive">drive files</TabsContent>
      <TabsContent value="Youtube" className="h-full pb-10">
        <YoutubeTabContent />
      </TabsContent>
      <TabsContent value="Links" className="h-full pb-10">
        <LinksTabContent />
      </TabsContent>
    </Tabs>
  );
}
