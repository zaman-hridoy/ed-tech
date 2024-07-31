"use client";

import { Separator } from "@/components/ui/separator";
import { InstitutionDataType, SessionWithUserType } from "@/lib/types";
import { useSession } from "next-auth/react";

import FormTitle from "@/app/(info-and-course)/_components/form-title";
import Image from "next/image";
import "react-phone-input-2/lib/style.css";
import ActionButton from "./action-button";
import InstitutionTitle from "./institution-title";
import MajorMinorCourses from "./maor-minor-courses";

interface Props {
  institution: InstitutionDataType;
}

type SelectCourseOptionType = {
  id: number;
  name: string;
  value: string;
};

const InstitutionCard = ({ institution }: Props) => {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;

  return (
    <div className="bg-white rounded-md p-4 md:p-6 border shadow-md border-slate-100 relative">
      <ActionButton institution={institution} />

      <FormTitle title="Institution Details" />

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* institutions name */}
          <InstitutionTitle
            title="University Name"
            content={institution?.name}
          />
          <div className="flex items-center justify-start">
            {institution?.logo ? (
              <div className="w-12 h-12 relative bg-slate-300 rounded-full overflow-hidden">
                <Image
                  src={institution.logo}
                  alt={institution.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-[var(--brand-color)] rounded-full flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12H26C26.5304 12 27.0391 11.7893 27.4142 11.4142C27.7893 11.0391 28 10.5304 28 10C28 9.46957 27.7893 8.96086 27.4142 8.58579C27.0391 8.21071 26.5304 8 26 8H24C23.4696 8 22.9609 8.21071 22.5858 8.58579C22.2107 8.96086 22 9.46957 22 10C22 10.5304 22.2107 11.0391 22.5858 11.4142C22.9609 11.7893 23.4696 12 24 12ZM24 20H26C26.5304 20 27.0391 19.7893 27.4142 19.4142C27.7893 19.0391 28 18.5304 28 18C28 17.4696 27.7893 16.9609 27.4142 16.5858C27.0391 16.2107 26.5304 16 26 16H24C23.4696 16 22.9609 16.2107 22.5858 16.5858C22.2107 16.9609 22 17.4696 22 18C22 18.5304 22.2107 19.0391 22.5858 19.4142C22.9609 19.7893 23.4696 20 24 20ZM14 12H16C16.5304 12 17.0391 11.7893 17.4142 11.4142C17.7893 11.0391 18 10.5304 18 10C18 9.46957 17.7893 8.96086 17.4142 8.58579C17.0391 8.21071 16.5304 8 16 8H14C13.4696 8 12.9609 8.21071 12.5858 8.58579C12.2107 8.96086 12 9.46957 12 10C12 10.5304 12.2107 11.0391 12.5858 11.4142C12.9609 11.7893 13.4696 12 14 12ZM14 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18C18 17.4696 17.7893 16.9609 17.4142 16.5858C17.0391 16.2107 16.5304 16 16 16H14C13.4696 16 12.9609 16.2107 12.5858 16.5858C12.2107 16.9609 12 17.4696 12 18C12 18.5304 12.2107 19.0391 12.5858 19.4142C12.9609 19.7893 13.4696 20 14 20ZM38 36H36V2C36 1.46957 35.7893 0.960859 35.4142 0.585786C35.0391 0.210714 34.5304 0 34 0H6C5.46957 0 4.96086 0.210714 4.58579 0.585786C4.21071 0.960859 4 1.46957 4 2V36H2C1.46957 36 0.960859 36.2107 0.585786 36.5858C0.210714 36.9609 0 37.4696 0 38C0 38.5304 0.210714 39.0391 0.585786 39.4142C0.960859 39.7893 1.46957 40 2 40H38C38.5304 40 39.0391 39.7893 39.4142 39.4142C39.7893 39.0391 40 38.5304 40 38C40 37.4696 39.7893 36.9609 39.4142 36.5858C39.0391 36.2107 38.5304 36 38 36ZM22 36H18V28H22V36ZM32 36H26V26C26 25.4696 25.7893 24.9609 25.4142 24.5858C25.0391 24.2107 24.5304 24 24 24H16C15.4696 24 14.9609 24.2107 14.5858 24.5858C14.2107 24.9609 14 25.4696 14 26V36H8V4H32V36Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* program durations for students */}
          {session?.user?.type === "Student" && (
            <InstitutionTitle
              title="Program Duration"
              content={institution?.duration}
            />
          )}

          {/* designation for educator */}
          {(session?.user?.type === "Educator" ||
            session?.user?.type === "ContentManager") && (
            <InstitutionTitle
              title="Designation"
              content={institution?.designation}
            />
          )}

          {/* projected year for students */}
          {session?.user?.type === "Student" && (
            <InstitutionTitle
              title="Projected Graduation Year"
              content="2027"
            />
          )}
          {/* employee status for educator */}
          {(session?.user?.type === "Educator" ||
            session?.user?.type === "ContentManager") && (
            <InstitutionTitle
              title="Employment Status"
              content={institution?.employee_status || ""}
            />
          )}
        </div>

        <Separator className="mt-8 mb-4 bg-slate-200" />

        <FormTitle title="Program Details" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* program */}
          <InstitutionTitle
            title="Degree / Program"
            content={institution?.program_name}
          />

          {/* department */}
          <InstitutionTitle
            title="Department"
            content={institution?.department}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* mejor programs */}
          <MajorMinorCourses
            title="Major Courses"
            courses={institution?.major_courses}
          />

          {/* minor programs */}

          <MajorMinorCourses
            title="Minor Courses"
            courses={institution?.minor_courses}
          />
        </div>
      </div>
    </div>
  );
};

export default InstitutionCard;
