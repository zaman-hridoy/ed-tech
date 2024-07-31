import axios from "@/lib/instance";
import { FollowUserType } from "@/lib/types";

export const getFollowingById = async (id: number) => {
  let users: FollowUserType[] = [];
  try {
    const res = await axios.get(`/content/getUserFollowingList/${id}`);
    if (res.data && res.data?.userdata?.length > 0) {
      users = res.data?.userdata;
    }
  } catch (error: any) {
    console.log(error?.response?.data, "Api- getUserFollowerList");
  } finally {
    return users;
  }
};
