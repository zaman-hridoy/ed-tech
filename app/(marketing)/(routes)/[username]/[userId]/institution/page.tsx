import { getInstitutionsById } from "@/actions/get-institutions-by-id";
import { getProfileById } from "@/actions/get-profile-by-id";
import InstitutionCard from "../_components/institution-card";

const InstitutionPage = async ({
  params,
}: {
  params: { userId: string; username: string };
}) => {
  const institutions = await getInstitutionsById(+params.userId);
  const profile = await getProfileById(+params.userId);

  const userType = profile?.role;
  return (
    <div className="max-w-4xl">
      <div className="flex flex-col gap-y-4">
        {institutions.map((item, idx) => (
          <InstitutionCard key={idx} institution={item} userType={userType} />
        ))}
      </div>
    </div>
  );
};

export default InstitutionPage;
