import { db } from "./db";

export const getOrCreateConversation = async (
  memberOneId: number, // memberOne profile id
  memberTwoId: number // memberTwo profile id
) => {
  console.log({ memberOneId, memberTwoId });

  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }
  return conversation;
};

const findConversation = async (memberOneId: number, memberTwoId: number) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [
          {
            memberOneProfileId: memberOneId,
          },
          {
            memberTwoProfileId: memberTwoId,
          },
        ],
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {
    console.log("[FIND_CONVERSATION]", error);
    return null;
  }
};

const createNewConversation = async (
  memberOneId: number, // memberOne profile id
  memberTwoId: number // memberTwo profile id
) => {
  try {
    return await db.conversation.create({
      data: {
        memberOneProfileId: memberOneId,
        memberTwoProfileId: memberTwoId,
        members: {
          createMany: {
            data: [{ profileId: memberOneId }, { profileId: memberTwoId }],
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {
    console.log("[CREATE_CONVERSATION]", error);
    return null;
  }
};
