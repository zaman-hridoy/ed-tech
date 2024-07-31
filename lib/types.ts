import { Channel, Member, Profile } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type SessionWithUserType = {
  user: {
    name: string;
    email: string;
    sub: string;
    accessToken: string;
    userId: number;
    type: "Student" | "Educator" | "ContentManager";
    isVerified: boolean;
    iat: number;
    exp: number;
    jti: string;
  };
  expires: string;
};

export type UserProfileType = {
  id: number;
  userId: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  about: string;
  country: string;
  university: string;
  image: string;
  subscribed: boolean;
  designation: string;
  birthdate: string;
  gender: string;
  phone_number: string;
  address: string;
  state: string;
  allowed: boolean;
  isVerified: boolean;
  role: "Educator" | "Student" | "ContentManager";
};

export type InstitutionDataType = {
  program_name: string;
  duration: string;
  program_projected_graduation_year: string;
  user_program_id: number;
  designation: string;
  department: string;
  institute_id: number;
  user_institute_id: number;
  primary_institute: boolean;
  user_course_id: number;
  major_courses: string;
  minor_courses: string;
  name: string;
  logo: string | null;
  institute_email: string | null;
  address: string | null;
  country: string | null;
  state: string | null;
  instition_type: string | null;
  status: boolean;
  employee_status: string | null;
};

export interface ChapterType {
  id: string;
  chapterName: string;
  autoCurated?: boolean;
  bookId: string | number;
  bookName: string;
  files: CourseFileType[];
  keywords: string;
  isActive?: boolean;
}

export type CourseFileType = {
  id: string;
  fileName: string;
  url: string;
  type: string;
  fileExtention: string;
  contentType: "Video" | "Audio" | "Document" | "Blog" | "Image";
  premium: boolean;
  preview: string;
  duration: string;
  createdAt: Date | string;
  from: "DRIVE" | "MY_DRIVE" | "YOUTUBE" | "EXTERNAL_URL";
  title: string;
  description: string;
  keywords: string;
  annotationId?: number;
};

export type CourseDataType = {
  id: number;
  collection_name: string;
  collection_description: string;
  course_id: number;
  course_name: string;
  educator_id: number;
  educator_name: string;
  book_id: number | null;
  book_name: string;
  chapter_name: [
    {
      id: number;
      name: string;
    }
  ];
  chapter_content_mapping: [
    {
      id: number;
      chapterName: string;
      keywords: string;
      autoCurated: boolean;
      bookId: number;
      bookName: string;
      files: CourseFileType[];
    }
  ];
  slug: string;
  status: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  complete_status: boolean;
  active_status: boolean;
  books_json: any;
  course_collection_type: "course" | "module";
  module_name: string;
  course_collection_template_id: number | null;
};

export interface BookType {
  id: string | number;
  book_name: string;
  authors: [{ author: string }];
  isbns: [{ isbn: string | number }];
  edition: string;
  publisher: string;
  bookImage: string;
}

export type TreeNodeType = {
  id: number;
  name: string;
  type: "FOLDER" | "FILE";
  parentFolderId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  data: any;
};

export type CommentType = {
  comment: string;
  comment_id: number | null;
  content_id: string;
  course_id: number;
  flag: boolean;
  flag_count: number;
  id: number;
  likes_count: number;
  status: boolean;
  type: "comment" | "reply";
  created_at: Date;
  updated_at: Date;
  user: UserProfileType;
};

export type FollowUserType = {
  userId: string;
  username: string;
  profilepic: string | null;
  email: string | null;
  role: "Student" | "Educator";
};

type MemberWithProfile = Member & {
  profile: Profile;
};

export type ChannelWithMembersWithProfiles = Channel & {
  profile: Profile;
  members: MemberWithProfile[];
};

export type NextApiResponseWithServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type VitalBookContributorType = {
  name: string;
  type: string;
};

export type VitalPriceType = {
  type: string;
  value: string;
  currency: string;
  discount_codes: string;
  territory: string;
};

export type VitalVarientsType = {
  duration: string;
  online_duration: string;
  sku: string;
  type: string;
  distributable: boolean;
  prices: VitalPriceType[];
  updated: string;
  channel_ids: any[];
};

export type AmazonPriceType = {
  type: "Paperback";
  value: string;
  currency: string;
  discount_codes: string | null;
  territory: string | null;
};

export type AmazonVarientsType = {
  duration: string;
  prices: AmazonPriceType[];
};

export type VitalBookType = {
  vbid: string;
  title: string;
  identifiers: {
    isbn_canonical: string;
    eisbn_canonical: string;
    print_isbn_canonical: string;
    isbn_10: string;
    isbn_13: string;
    e_isbn: string;
    print_isbn: string;
    saleable_print_isbn_10: string;
    saleable_print_isbn_13: string;
    vbid_alias: string;
    fpid_alias: string;
    print_isbn_10: string;
    print_isbn_13: string;
    e_isbn_10: string;
    e_isbn_13: string;
    fpid_isbn_10: string;
    fpid_isbn_13: string;
    csm_sku: string;
    fpid10_alias: string;
    fpid13_alias: string;
    vbid10_alias: string;
    vbid13_alias: string;
    fpid: string;
  };
  format: string;
  publisher: string;
  edition: number;
  contributors: VitalBookContributorType[];
  resource_links: {
    metadata: string;
    cover_image: string;
    table_of_contents: string;
    store_url: string;
  };
  variants: (VitalVarientsType & AmazonVarientsType)[];
  categories: any[];
  slug: string;
  source: string;
  st_book: boolean;
  st_book_id: string;
  created_at: string;
  updated_at: string;
};
