import UserAvatar from "@/components/user-avatar";
import { CommentType } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface Props {
  comment: CommentType;
}

const CommentItem = ({ comment }: Props) => {
  return (
    <div className="flex items-start gap-x-2">
      <UserAvatar src={comment?.user?.image} className="w-8 h-8 border-0" />
      <div>
        <div className="space-y-1 bg-zinc-100 px-4 py-2 rounded-[20px]">
          <h4 className="text-sm text-slate-800 tracking-tighter font-semibold">
            {comment?.user?.name}
          </h4>
          <p className="text-sm text-slate-500">{comment.comment}</p>
        </div>
        <span className="text-xs font-semibold tracking-tighter text-slate-500">
          {formatDistanceToNow(new Date(comment.created_at), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
};

export default CommentItem;
