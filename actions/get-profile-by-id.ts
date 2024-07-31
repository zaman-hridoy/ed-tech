import axios from "@/lib/instance";
import { UserProfileType } from "@/lib/types";

export const getProfileById = async (id: number) => {
  let profile: UserProfileType | null = null;
  try {
    const res = await axios.get(`/content/getUserProfileDetail/${id}`);

    if (res.data && res.data?.success) {
      const user = res.data?.user;
      profile = {
        role: res.data?.role,
        id: user.id,
        userId: user.userId,
        email: res.data?.email?.email || "",
        name: user.name + " " + user.last_name,
        firstName: user?.name || "",
        lastName: user?.last_name || "",
        about: user.about,
        country: user.country,
        state: user.state,
        address: user.address,
        image: user.image,
        university: user.university,
        subscribed: user.subscribed,
        designation: user.designation,
        birthdate: user.birthdate,
        gender: user.gender,
        phone_number: user.phone_number,
        allowed: user.allowed,
        isVerified: user.isVerified,
      };
    }
    // const institutions = await axios
    //   .post("/content/institues/getInstituionAndProgramPublic", {
    //     user_id: `${id}`,
    //   })
    //   .then((res) => res.data);
  } catch (error) {
    console.log(error);
  } finally {
    return profile;
  }
};
