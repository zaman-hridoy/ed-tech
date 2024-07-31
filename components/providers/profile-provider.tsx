"use client";

import axios from "@/lib/instance";
import { SessionWithUserType, UserProfileType } from "@/lib/types";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ProfileContextType = {
  profile: UserProfileType | null;
};

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
});

export const useCurrentProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useSession();
  const session = data as SessionWithUserType;
  const [profile, setProfile] = useState<UserProfileType | null>(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await axios.get("/content/getUserMyProfileDetail", {
          headers: {
            Authorization: session?.user?.accessToken,
          },
        });

        if (res.data && res.data?.success) {
          const user = res.data?.user;
          const profile = {
            role: res.data?.role,
            id: user.id,
            userId: user.userId,
            email: user?.email?.email,
            name: user.name + " " + user.last_name,
            firstName: user?.name,
            lastName: user?.last_name,
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

          setProfile(profile);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (session) {
      getProfile();
    }
  }, [session]);

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};
