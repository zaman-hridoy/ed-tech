import axios from "@/lib/instance";
import { InstitutionDataType, SessionWithUserType } from "@/lib/types";

type GetInstitution = (
  session: SessionWithUserType
) => Promise<InstitutionDataType[]>;

export const getInstitutions: GetInstitution = async (session) => {
  let results: InstitutionDataType[] = [];
  try {
    const res = await axios.post(
      "/content/institues/getInstituionAndProgram",
      {},
      {
        headers: {
          Authorization: `${session?.user?.accessToken}`,
        },
      }
    );
    if (
      res.data &&
      res?.data?.success &&
      res?.data?.data &&
      res?.data?.data?.length > 0
    ) {
      results = res.data?.data;
    }
  } catch (error: any) {
    console.log(error?.response?.data, "api-getInstituionAndProgram");
  } finally {
    return results;
  }
};
