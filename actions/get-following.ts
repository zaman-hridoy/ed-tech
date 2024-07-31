import axios from "@/lib/instance";

type ReturnType = {
  userId: number;
  name: string;
  email: string;
  image: string | null;
  type: string;
};
type FuncType = (userId: number) => Promise<ReturnType[]>;

export const getFollowing: FuncType = async (userId: number) => {
  let users: ReturnType[] = [];
  try {
    const res = await axios.get(`/content/getFollowerUsersDetails/${userId}`);
    if (res.data && res.data?.user) {
    }
  } catch (error) {
    console.log(error);
  }

  return users;
};
