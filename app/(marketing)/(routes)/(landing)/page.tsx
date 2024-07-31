import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AiTechnology from "./_components/ai-technology";
import BannerSection from "./_components/banner-section";
import LearingResources from "./_components/learning-resources";
import PopularSubjects from "./_components/popular-subjects";
import RatingSection from "./_components/rating-section";
import SimplitaughtFor from "./_components/simplitaught-for";
import SimpliTaughtModel from "./_components/st-model";
import SucceedWith from "./_components/succeed-with";
import UniversitiesSection from "./_components/universities";
import WhatWeDo from "./_components/what-we-do";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/dashboard");
  return (
    <main>
      <BannerSection />
      <SimplitaughtFor />
      <PopularSubjects />
      <UniversitiesSection />
      <AiTechnology />
      <LearingResources />
      <WhatWeDo />
      <SucceedWith />
      <SimpliTaughtModel />
      <RatingSection />
    </main>
  );
}
