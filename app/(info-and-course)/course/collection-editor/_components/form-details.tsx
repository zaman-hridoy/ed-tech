"use client";

import BookInput from "./book-input";
import DescriptionInput from "./description-input";
import SubjectInput from "./subject-input";
import TitleInput from "./title-input";

const FormDetails = () => {
  return (
    <div className="flex flex-col space-y-4">
      <TitleInput />
      <DescriptionInput />
      <SubjectInput />
      <BookInput />
    </div>
  );
};

export default FormDetails;
