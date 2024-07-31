import { authOptions } from "@/lib/auth";
import axios from "@/lib/instance";
import { SessionWithUserType } from "@/lib/types";
import { getServerSession } from "next-auth";

type ReturnType = {
  startDate: Date | string;
  endDate: Date | string;
} | null;

type GetTerms = () => Promise<ReturnType>;

export const getStudentTerms: GetTerms = async () => {
  const session: SessionWithUserType | null = await getServerSession(
    authOptions
  );

  if (!session) return null;

  try {
    const res = await axios.post(
      "/content/getTerm",
      {},
      {
        headers: {
          Authorization: `${session?.user?.accessToken}`,
        },
      }
    );
    if (res.data && res?.data?.Term && res?.data?.Term?.length > 0) {
      const termsData: any[] = res.data?.Term;
      const active_term = res.data?.Term[termsData.length - 1];

      return {
        startDate: active_term?.start_date,
        endDate: active_term?.end_date,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
