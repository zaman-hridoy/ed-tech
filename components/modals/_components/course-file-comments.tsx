"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/user-avatar";
import axios from "@/lib/instance";
import { CommentType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";
import { LiaComment } from "react-icons/lia";
import * as z from "zod";
import CommentItem from "./comment-item";

const formSchema = z.object({
  comment: z.string().min(1),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface Props {
  courseId: number;
  contentId: string;
}

const CourseFileComments = ({ courseId, contentId }: Props) => {
  const router = useRouter();
  const { data } = useSession();
  const session = data;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);

  const getComments = useCallback(async () => {
    try {
      const comments = await axios
        .post(
          "/content/comments/getCommentForCourses",
          {
            course_id: courseId,
            content_id: contentId,
            offset: 0,
            limit: 100,
          },
          {
            headers: {
              Authorization: `${session?.user?.accessToken}`,
            },
          }
        )
        .then((res) => res.data?.comments);
      if (comments) {
        const updated = comments.map((item: any) => {
          const user = item.user;
          return {
            comment: item.comment,
            comment_id: item.comment_id,
            content_id: item.content_id,
            course_id: item.course_id,
            flag: item.flag,
            flag_count: item.flag_count,
            id: item.id,
            likes_count: item.likes_count,
            status: item.status,
            type: item.type,
            created_at: item.created_at,
            updated_at: item.updated_at,
            user: {
              role: "student",
              id: user.id,
              userId: user.userId,
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
            },
          };
        });

        setComments(updated);
      }
      form.reset();
    } catch (error: any) {
      console.log(error?.response?.data);
    }
  }, [courseId, contentId, session, form]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      await axios.post(
        "/content/comments/addcommentForCourses",
        {
          course_id: courseId,
          content_id: contentId,
          comment: values.comment,
          type: "comment",
          finaldate: new Date().toISOString(),
          comment_id: null,
        },
        {
          headers: {
            Authorization: `${session?.user?.accessToken}`,
          },
        }
      );

      getComments();
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting || loading;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-slate-400 font-semibold flex items-center gap-x-2">
          <LiaComment className="w-4 h-4" /> Comments ({comments.length})
        </p>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-2">
            <UserAvatar className="w-10 h-10" />
            <div className="flex-1">
              <FormField
                name="comment"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex items-center border rounded-xl bg-slate-50">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Write a comment..."
                        className="text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 border-0 bg-transparent"
                        disabled={isSubmitting}
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <div className="h-full">
                      <Button
                        size="sm"
                        className="w-auto h-auto p-2"
                        variant="ghost"
                        type="submit"
                      >
                        <IoSend className="w-4 h-4 text-slate-300" />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourseFileComments;
