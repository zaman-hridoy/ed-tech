import axios from "@/lib/instance";
import { InstitutionDataType } from "@/lib/types";

export const getInstitutionsById = async (userId: number) => {
  let results: InstitutionDataType[] = [];
  try {
    const res = await axios.post(
      "/content/institues/getInstituionAndProgramPublic",
      {
        user_id: userId,
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
    console.log(error?.response?.data, "api-getInstituionAndProgramPublic");
  } finally {
    return results;
  }
};
