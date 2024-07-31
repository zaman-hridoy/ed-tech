"use client";

import DirectUserItem from "@/app/(services)/chat/_components/direct/direct-user-item";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { cn } from "@/lib/utils";
import { Channel, Member, Profile } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Archive,
  Check,
  Copy,
  Hash,
  Loader2,
  RefreshCw,
  Search,
  UserPlus,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdLock } from "react-icons/io";
import { ConfirmAlertModal } from "../confirm-alert-modal";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Switch } from "../ui/switch";
import SearchUserForChannel from "./_components/search-user-for-channel";
import { UpdateChannelDescription } from "./_components/update-channel-description";
import { UpdateChannelName } from "./_components/update-channel-name";

type MemberType = Member & {
  profile: Profile;
};

type ChannelType = Channel & {
  profile: Profile;
  members: MemberType[];
};

export function EditChannelModal() {
  const router = useRouter();
  const session = useSession();
  const modal = useModal();
  const isModalOpen = modal.isOpen && modal.type === "EDIT_CHANNEL_MODAL";
  const channelId = modal.data?.channelId;
  const origin = useOrigin();

  const [channel, setChannel] = useState<ChannelType | null>(null);
  const [getChannelLoading, setGetChannelLoading] = useState(false);

  useEffect(() => {
    async function getChannelDetails() {
      try {
        setGetChannelLoading(true);
        const res = await axios.get(`/api/channels/${channelId}`);
        setChannel(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Channel not found!");
      } finally {
        setGetChannelLoading(false);
      }
    }

    if (channelId && isModalOpen) {
      getChannelDetails();
    }
  }, [channelId, isModalOpen]);

  const [activeTab, setActiveTab] = useState<
    "About" | "Members" | "Invite" | "Settings"
  >("About");

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const inviteLink = `${origin}/invite/channel/${channel?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const generateNewLink = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/channels/${channel?.id}/invite-code`);
      modal.onModalOpen("EDIT_CHANNEL_MODAL", res.data);
    } catch (error: any) {
      console.log(error);
      toast.error("Error on generating new link. Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  const [leaving, setLeaving] = useState(false);
  const onLeaveChannel = async () => {
    try {
      setLeaving(true);
      await axios.patch(`/api/channels/${channel?.id}/leave`);
      router.refresh();
      handleClose();
      router.replace("/chat");
    } catch (error: any) {
      console.log(error);
      toast.error("Error on generating new link. Please try again later!");
    } finally {
      setLeaving(false);
    }
  };

  const [deleting, setDeleting] = useState(false);
  const onDeleteChannel = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/channels/${channel?.id}/delete`);
      router.refresh();
      toast.success("Channel deleted successfully.");
      handleClose();
      router.replace("/chat");
    } catch (error: any) {
      console.log(error);
      toast.error("Error on generating new link. Please try again later!");
    } finally {
      setDeleting(false);
    }
  };

  const [accessLoading, setAccessLoading] = useState(false);
  const handleToggleChannelAccess = async (checked: boolean) => {
    try {
      setAccessLoading(true);
      const res = await axios.put(`/api/channels/${channelId}`, {
        isPublic: checked,
      });
      setChannel(res.data);
      toast.success(
        "Channel is now public. Everyone can find and join this channel."
      );
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    } finally {
      setAccessLoading(false);
    }
  };

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [removeLoading, setRemoveLoading] = useState(false);
  const handleRemoveMember = async (id: number) => {
    try {
      setSelectedUserId(id);
      setRemoveLoading(true);
      const res = await axios.post("/api/channels/remove-user", {
        userProfileId: id,
        channelId,
      });
      setChannel(res.data);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.Please try again later!");
      console.log(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  const handleClose = () => {
    setActiveTab("About");
    setChannel(null);
    modal.onModalClose();
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px] bg-white p-0 gap-y-0">
        {getChannelLoading && (
          <Fragment>
            <DialogHeader>
              <div className="flex items-center gap-x-2 p-4 pb-2">
                <DialogTitle className="font-medium flex items-center gap-x-2">
                  Invite friends to{" "}
                  <span className="flex items-center">
                    <Hash className="w-4 h-4" />
                    <Skeleton className="w-10 h-6" />
                  </span>
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="ml-auto w-auto h-auto p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="w-full flex flex-col h-[60vh] min-h-[400px]">
              <div className="w-full flex items-center justify-start bg-transparent border-b pb-0 gap-x-6 px-4">
                <Skeleton className="w-14 h-7" />
                <Skeleton className="w-12 h-7" />
                <Skeleton className="w-14 h-7" />
                <Skeleton className="w-12 h-7" />
              </div>
              <div className="h-full bg-slate-50 p-4 mt-0">
                <Card className="p-4 pr-2 flex items-center gap-x-2 border-0">
                  <Skeleton className="w-full h-full" />
                </Card>
                <Card className="p-4 pr-2 flex items-center gap-x-2 border-0 mt-4 rounded-b-none border-b">
                  <Skeleton className="w-full h-full" />
                </Card>
                <Card className="p-4 pr-2 flex items-center gap-x-2 border-0 rounded-none">
                  <div className="space-y-2 w-full">
                    <Skeleton className="w-10 h-6" />
                    <Skeleton className="w-1/3 h-6" />
                  </div>
                </Card>

                <Card className="p-4 gap-x-2 border-0 rounded-t-none border-t hover:bg-slate-100 cursor-pointer">
                  <Skeleton className="w-full h-24" />
                </Card>
                <Card className="p-4 flex items-center gap-x-2 border-0 mt-4">
                  <div className="space-y-2 w-full">
                    <Skeleton className="w-10 h-6" />
                    <Skeleton className="w-full h-20" />
                  </div>
                </Card>
              </div>
            </div>
          </Fragment>
        )}

        {channel && (
          <Fragment>
            <DialogHeader>
              <div className="flex items-center gap-x-2 p-4 pb-2">
                <DialogTitle className="font-medium flex items-center gap-x-2">
                  Invite friends to{" "}
                  <span className="flex items-center">
                    <Hash className="w-4 h-4" />
                    <strong>{channel?.name}</strong>
                  </span>
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="ml-auto w-auto h-auto p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </DialogHeader>

            <Tabs
              value={activeTab}
              className="w-full flex flex-col h-[60vh] min-h-[400px]"
            >
              <TabsList className="w-full flex items-center justify-start bg-transparent border-b pb-0 gap-x-6 px-4">
                <TabsTrigger
                  value="About"
                  className={`
                data-[state=active]:bg-transparent data-[state=active]:text-black 
                text-sm font-medium tracking-tight p-0 rounded-none relative pb-1
              `}
                  onClick={() => setActiveTab("About")}
                >
                  About
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-[var(--brand-color)]"
                    animate={{
                      width: activeTab === "About" ? "100%" : "0%",
                    }}
                  />
                </TabsTrigger>
                <TabsTrigger
                  value="Members"
                  className={`
                data-[state=active]:bg-transparent data-[state=active]:text-black 
                text-sm font-medium tracking-tight p-0 rounded-none relative pb-1
              `}
                  onClick={() => setActiveTab("Members")}
                >
                  Members
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-[var(--brand-color)]"
                    animate={{
                      width: activeTab === "Members" ? "100%" : "0%",
                    }}
                  />
                </TabsTrigger>
                <TabsTrigger
                  value="Invite"
                  className={`
                data-[state=active]:bg-transparent data-[state=active]:text-black 
                text-sm font-medium tracking-tight p-0 rounded-none relative pb-1
              `}
                  onClick={() => setActiveTab("Invite")}
                >
                  Invite
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-[var(--brand-color)]"
                    animate={{
                      width: activeTab === "Invite" ? "100%" : "0%",
                    }}
                  />
                </TabsTrigger>

                {session?.data?.user?.userId === channel?.profile?.userId && (
                  <TabsTrigger
                    value="Settings"
                    className={`
                data-[state=active]:bg-transparent data-[state=active]:text-black 
                text-sm font-medium tracking-tight p-0 rounded-none relative pb-1
              `}
                    onClick={() => setActiveTab("Settings")}
                  >
                    Settings
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-[var(--brand-color)]"
                      animate={{
                        width: activeTab === "Settings" ? "100%" : "0%",
                      }}
                    />
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent
                value="About"
                className="h-full bg-slate-50 p-4 mt-0"
              >
                <Card className="p-4 pr-2 flex items-center gap-x-2 border-0">
                  <div className="space-y-2">
                    <p className="text-sm font-normal tracking-tight text-slate-500">
                      Channel name
                    </p>
                    <h4 className="text-sm text-black tracking-tight font-medium flex items-center">
                      <Hash className="w-4 h-4 mr-1" />
                      {channel?.name}
                    </h4>
                  </div>
                  <UpdateChannelName
                    initialName={channel.name}
                    channelId={channel?.id}
                    onSuccess={(channel) => setChannel(channel)}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      Edit
                    </Button>
                  </UpdateChannelName>
                </Card>
                <Card className="p-4 pr-2 flex items-center gap-x-2 border-0 mt-4 rounded-b-none border-b">
                  <div className="space-y-2">
                    <p className="text-sm font-normal tracking-tight text-slate-500">
                      Description
                    </p>
                    {channel.description ? (
                      <h4 className="text-sm text-black tracking-tight font-medium flex items-center">
                        {channel.description}
                      </h4>
                    ) : (
                      <span className="bg-slate-100 rounded-full py-1 px-2 text-xs italic">
                        No description
                      </span>
                    )}
                  </div>
                  <UpdateChannelDescription
                    initialDescription={channel.description || ""}
                    channelId={channel.id}
                    onSuccess={(channel) => setChannel(channel)}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto focus-visible:ring-0 focus-within:ring-offset-0"
                    >
                      Edit
                    </Button>
                  </UpdateChannelDescription>
                </Card>
                <Card className="p-4 pr-2 flex items-center gap-x-2 border-0 rounded-none">
                  <div className="space-y-2">
                    <p className="text-sm font-normal tracking-tight text-slate-500">
                      Created by
                    </p>
                    <h4 className="text-sm text-black tracking-tight font-medium flex items-center">
                      {channel.profile.name} on{" "}
                      {format(new Date(channel.createdAt), "MMM dd, yyyy")}
                    </h4>
                  </div>
                </Card>

                <Card className="p-4 gap-x-2 border-0 rounded-t-none border-t hover:bg-slate-100 cursor-pointer">
                  {session?.data?.user?.userId === channel.profile?.userId ? (
                    <ConfirmAlertModal
                      title="Delete Channel"
                      description="Are you sure you want to delete this channel."
                      onContinue={onDeleteChannel}
                      loading={deleting}
                    >
                      <button className="text-rose-500 hover:text-rose-500 p-0 flex text-sm">
                        Delete channel
                      </button>
                    </ConfirmAlertModal>
                  ) : (
                    <ConfirmAlertModal
                      title="Leave Channel"
                      description="Are you sure you want to Leave this channel."
                      onContinue={onLeaveChannel}
                      loading={leaving}
                    >
                      <button className="text-rose-500 hover:text-rose-500 p-0 flex text-sm">
                        Leave channel
                      </button>
                    </ConfirmAlertModal>
                  )}
                </Card>
                <Card className="p-4 flex items-center gap-x-2 border-0 mt-4">
                  <div className="space-y-2">
                    <p className="text-sm font-normal tracking-tight text-slate-500">
                      Files
                    </p>
                    <h4 className="text-sm text-slate-600 tracking-tight font-medium flex items-center">
                      There aren’t any files to see here right now. But there
                      could be — drag and drop any file into the message pane to
                      add it to this conversation.
                    </h4>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="Members" className="h-full py-4 mt-0">
                <div className="px-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Find members"
                      className="text-sm border-none h-[35px] text-slate-800 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-600 pl-8"
                      autoFocus
                    />
                    <Search className="w-4 h-4 absolute top-[10px] left-2" />
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <span
                    onClick={() => setActiveTab("Invite")}
                    className="w-full px-[20px] py-2 hover:bg-slate-100 flex items-center gap-x-2 cursor-pointer text-sm tracking-tight font-medium"
                  >
                    <UserPlus className="w-4 h-4" /> Add member
                  </span>
                </div>
                {channel.members.map((member) => (
                  <span
                    key={member.id}
                    className="group w-full px-4 min-h-[40px] hover:bg-slate-100 flex items-center gap-x-2 cursor-pointer text-sm tracking-tight font-medium"
                  >
                    <DirectUserItem member={member} />

                    {session?.data?.user?.userId !== member.profile.userId && (
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => handleRemoveMember(member.profileId)}
                        disabled={removeLoading}
                        className="hidden group-hover:flex group-hover:bg-slate-200 w-auto h-auto p-[3px]"
                      >
                        {removeLoading &&
                        selectedUserId === member.profileId ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <X className="w-5 h-5" />
                        )}
                      </Button>
                    )}
                  </span>
                ))}
              </TabsContent>
              <TabsContent
                value="Invite"
                className="h-full bg-slate-50 p-4 mt-0"
              >
                <SearchUserForChannel
                  channelId={channel.id}
                  onSuccess={(channel) => setChannel(channel)}
                />
                <Separator className="my-1" />

                <div className="space-y-1 mt-4">
                  <label className="text-xs font-semibold uppercase">
                    Or send a channel invite link to a friend
                  </label>
                  <div className="flex items-center">
                    <Input
                      type="text"
                      placeholder="Search for friends"
                      className="text-sm h-[40px] bg-slate-200 border-none text-slate-800 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-600"
                      value={inviteLink}
                      disabled={loading}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onCopy}
                      disabled={loading}
                    >
                      {copied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="link"
                    className="p-0 gap-x-2 text-[var(--brand-color)]"
                    onClick={generateNewLink}
                    disabled={loading}
                  >
                    Generate a new link{" "}
                    <RefreshCw
                      className={cn("w-4 h-4", loading && "animate-spin")}
                    />
                  </Button>
                </div>
              </TabsContent>
              {session?.data?.user?.userId === channel.profile?.userId && (
                <TabsContent
                  value="Settings"
                  className="h-full bg-slate-50 p-4 mt-0"
                >
                  <Card className="p-4 pr-2 flex items-center gap-x-2 border-0">
                    <div className="space-y-2">
                      <p className="text-sm font-normal tracking-tight text-slate-500">
                        Channel name
                      </p>
                      <h4 className="text-sm text-black tracking-tight font-medium flex items-center">
                        <Hash className="w-4 h-4 mr-1" />
                        {channel.name}
                      </h4>
                    </div>
                    <UpdateChannelName
                      initialName={channel.name}
                      channelId={channel.id}
                      onSuccess={(channel) => setChannel(channel)}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto focus-visible:ring-0 focus-within:ring-offset-0"
                      >
                        Edit
                      </Button>
                    </UpdateChannelName>
                  </Card>
                  <Card className="p-4 pr-2 flex items-center gap-x-2 border-0 mt-4">
                    <div className="space-y-2">
                      <p className="text-sm font-normal tracking-tight text-slate-500 flex">
                        <IoMdLock className="w-4 h-4 text-inherit text-slate-500" />
                        {channel.isPublic ? (
                          <span>Make private</span>
                        ) : (
                          <span>Make public</span>
                        )}
                      </p>
                      {channel.isPublic ? (
                        <h4 className="text-sm text-black tracking-tight font-medium flex items-center">
                          Only selected members will be able to view this
                          channel.
                        </h4>
                      ) : (
                        <h4 className="text-sm text-black tracking-tight font-medium flex items-center">
                          Everyone will be able to view this channel.
                        </h4>
                      )}
                    </div>
                    {accessLoading ? (
                      <Loader2 className="w-5 h-5 ml-auto" />
                    ) : (
                      <Switch
                        checked={channel.isPublic}
                        onCheckedChange={handleToggleChannelAccess}
                        className="data-[state=checked]:bg-[var(--brand-color-success)] ml-auto"
                        disabled={getChannelLoading}
                      />
                    )}
                  </Card>
                  <Card className="p-4 flex items-center gap-x-2 border-0 hover:bg-slate-100 cursor-pointer mt-4">
                    <ConfirmAlertModal
                      title="Archive Channel"
                      description="Are you sure you want to archive this channel."
                      onContinue={() => {}}
                    >
                      <button className="text-rose-500 hover:text-rose-500 p-0 text-sm flex items-center gap-x-1">
                        <Archive className="w-4 h-4" />
                        Archive channel for everyone
                      </button>
                    </ConfirmAlertModal>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
}
