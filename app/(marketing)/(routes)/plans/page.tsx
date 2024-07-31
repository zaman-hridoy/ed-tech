import Container from "@/components/container";
import { authOptions } from "@/lib/auth";
import axios from "@/lib/instance";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PlanCard from "./_components/plan-card";

const featuresForStudent = {
  Basic: [
    "Machine Learning algos learn student preferences",
    "Generative AI recommendations",
    "SImpliTaught “My Drive” saves content -2 GB",
    "Exam library for curated content for exams",
    "Tool for content annotation and collaboration",
    "Ability to share exam notes and annotations",
    "Chat community and chat engagement",
    "Enhanced profile page",
  ],
  Silver: [
    "Video Annotation",
    "Textbook Workspace",
    "Storage Drive 2GB ",
    "Advance Profile Page",
    "5 Unlocks for Premium Documents",
    // "Documents",
    "Premium Content",
    // "5 Additional Unlocks for Premium Documents",
  ],
  Premium: [
    "Machine Learning algos learn student preferences",
    "Generative AI recommendations",
    "SImpliTaught “My Drive” saves content -20 GB",
    "Exam library for curated content for exams",
    "Tool for content annotation and collaboration",
    "Ability to share exam notes and annotations",
    // "Chat and community chat engagement",
    "Chat community and chat engagement",
    "Enhanced profile page",
    "Voice and Video Conferencing for peer and educator collaboration",
  ],
};
const featuresForEdu = {
  Basic: [
    "Machine Learning algos learn student preferences",
    "Generative AI recommendations",
    "SImpliTaught “My Drive” saves content -2 GB",
    "Chat and community chat engagement",
    "Enhanced profile page",
  ],
  Silver: [
    "Textbook Workspace",
    "Storage Drive 2GB ",
    "Advance Profile Page",
    "5 Unlocks for Premium Documents",
    // "Documents",
    "Premium Content",
    // "5 Additional Unlocks for Premium Documents",
  ],
  Premium: [
    "Machine Learning algos learn student preferences",
    "Generative AI recommendations",
    "SImpliTaught “My Drive” saves content -20 GB",
    "Chat and community chat engagement",
    "Enhanced profile page",
    "Voice and Video Conferencing for peer and educator collaboration",
  ],
};

const PlansPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const response = await axios.get("/profile/getPlans", {
    headers: {
      Authorization: session.user.accessToken,
    },
  });

  const plan_products = await response.data;
  const plans: Record<string, any>[] = plan_products.products?.filter(
    (p: any) => p.name === "Basic" || p.name === "Premium"
  );

  const sortedPlans = plans.sort((a, b) =>
    a.plans[0].unit_amount > b.plans[0].unit_amount ? 1 : -1
  );

  const features =
    session.user.type === "Student" ? featuresForStudent : featuresForEdu;

  return (
    <Container className="pt-24 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-5xl text-slate-900 text-center font-semibold">
        Choose your plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-20 gap-6">
        {sortedPlans.map((plan: any) => {
          const name: "Basic" | "Premium" = plan.name;
          const feature_items: any = features[name];
          return (
            <PlanCard
              key={plan.name}
              features={feature_items}
              name={plan.name}
              price={plan.plans[0]?.unit_amount / 100}
              priceId={plan?.plans[0]?.id}
            />
          );
        })}
      </div>
      <p className="py-20 text-center text-slate-500 font-medium">
        You will be redirected to Stripe’s payment page, where you can review
        amount and use various payment methods to pay your amount.
      </p>
    </Container>
  );
};

export default PlansPage;
