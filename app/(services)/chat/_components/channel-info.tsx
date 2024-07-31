import { Channel, Member, Profile } from "@prisma/client";
import DirectUserItem from "./direct/direct-user-item";
import { UserInfo } from "./user-info";

type MemberType = Member & {
  profile: Profile;
};

interface Props {
  channel: Channel & {
    members: MemberType[];
  };
}

const ChannelInfo = ({ channel }: Props) => {
  const members = channel.members;

  const activeMembers = members.filter((member) => member.profile.isActive);
  const inactiveMembers = members.filter((member) => !member.profile.isActive);

  return (
    <div className="fixed top-0 right-0 w-72 h-full z-10 pt-14 pr-1">
      <div className="bg-white h-full rounded-lg shadow-lg shadow-[var(--brand-shadow)] p-4 space-y-4 overflow-y-auto no-scrollbar">
        {!!activeMembers.length && (
          <div>
            <h4 className="uppercase text-xs font-semibold text-slate-500">
              Online - {activeMembers.length}
            </h4>
            <div className="mt-2">
              {activeMembers.map((member) => (
                <UserInfo
                  key={member.id}
                  memberId={member.id}
                  profile={member.profile}
                  side="right"
                  memberRole={member.role}
                >
                  <DirectUserItem member={member} />
                </UserInfo>
              ))}
            </div>
          </div>
        )}

        {!!inactiveMembers.length && (
          <div>
            <h4 className="uppercase text-xs font-semibold text-slate-500">
              Offline - {inactiveMembers.length}
            </h4>
            <div className="mt-2">
              {inactiveMembers.map((member) => (
                <UserInfo
                  key={member.id}
                  memberId={member.id}
                  profile={member.profile}
                  side="right"
                  memberRole={member.role}
                >
                  <DirectUserItem member={member} />
                </UserInfo>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelInfo;
