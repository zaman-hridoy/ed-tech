import axios from "@/lib/instance";
import { SessionWithUserType, UserProfileType } from "./types";

export const getCurrentProfile = async (session: SessionWithUserType) => {
  let profile: UserProfileType | null = null;
  try {
    const res = await axios.get("/content/getUserMyProfileDetail", {
      headers: {
        Authorization: session?.user?.accessToken,
      },
    });

    if (res.data && res.data?.success) {
      const user = res.data?.user;
      profile = {
        role: res.data?.role,
        id: user.id,
        userId: user.userId,
        email: user?.email?.email,
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

      // update chat profile
      // const chatProfile = await db.profile.findUnique({
      //   where: {
      //     userId: profile.userId,
      //   },
      // });

      // if (!chatProfile) {
      //   await db.profile.create({
      //     data: {
      //       userId: profile.userId,
      //       name: profile.name,
      //       imageUrl: profile.image,
      //       email: session?.user?.email,
      //       role: profile.role,
      //       isActive: true,
      //     },
      //   });
      // }
    }
  } catch (error: any) {
    console.log(error, "api: getUserMyProfileDetail");
  }

  return profile;
};
