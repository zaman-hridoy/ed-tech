import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { getChatProfile } from "@/lib/get-chat-profile";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Bookservers from "./books/book-servers";
import DirectChannels from "./direct/direct-channels";
import LoggedInUser from "./loggedin-user";
import MyChannels from "./voice-channels/my-channels";

const NavigationSidebar = async () => {
  const profile = await getChatProfile();
  if (!profile) return redirect("/");

  const channels = await db.channel.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  // const directUsers = await db.conversation.findMany({
  //   where: {
  //     OR: [
  //       { memberOneProfileId: profile.id },
  //       { memberTwoProfileId: profile.id },
  //     ],
  //   },
  //   include: {
  //     memberOneProfile: true,
  //     memberTwoProfile: true,
  //   },
  // });

  const friends = await db.friendRequest.findMany({
    where: {
      status: "ACCEPTED",
      OR: [
        {
          senderId: profile.id,
        },
        {
          receiverId: profile.id,
        },
      ],
    },
    include: {
      sender: true,
      receiver: true,
    },
  });

  // const otherUsers = directUsers.filter(user => user.memberOneProfile)

  const filteredFriends = friends.map((friend) => ({
    id: friend.id,
    userProfile:
      friend.receiverId === profile.id ? friend.sender : friend.receiver,
  }));
  // console.log(filteredFriends);

  // const updatedUserList = directUsers.map((user) => ({
  //   ...user,
  //   userProfile:
  //     user.memberOneProfileId === profile.id
  //       ? user.memberTwoProfile
  //       : user.memberOneProfile,
  // }));

  return (
    <div className="h-full bg-white flex flex-col gap-y-4 shadow-lg shadow-[var(--brand-shadow)] rounded-md">
      <div className="px-4 pt-4 flex items-center justify-between">
        <Link href="/">
          <div className="relative w-[150px] h-[30px]">
            <Image
              src="/logos/logo.svg"
              alt="SimpliTaught"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div>
          <Button
            size="icon"
            className="w-8 h-8 font-bold"
            variant="ghost"
            asChild
          >
            <Link href="/chat/books">
              <HomeIcon className="h-5 w-5 text-inherit" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 px-4 space-y-4 overflow-y-auto no-scrollbar">
        <Bookservers />
        <MyChannels channels={channels} />
        <DirectChannels users={filteredFriends} />
      </div>
      <LoggedInUser profile={profile} />
    </div>
  );
};

export default NavigationSidebar;
