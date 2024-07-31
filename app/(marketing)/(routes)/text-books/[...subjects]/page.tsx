import Container from "@/components/container";
import axios from "@/lib/instance";
import BooksPanel from "./_components/books-panel";
import SubjectsPanel from "./_components/subjects-panel";

type SubjectType = {
  link: string;
  subject: string;
};

const BooksPageBySubjects = async ({
  params,
}: {
  params: { subjects: string[] };
}) => {
  let mainSubject: string = "";
  let subjectList: SubjectType[] = [];
  let books: any[] = [];
  let total: number = 0;

  const getInitialBooks = async () => {
    try {
      let payload: any = {
        offset: 0,
        limit: 48,
      };
      params.subjects.forEach((cat, idx) => {
        payload = {
          ...payload,
          [`category${idx + 1}`]: cat,
        };
      });
      const res = await axios.post("/search/get_books_data", payload);
      const results: any[] = res.data?.data?.values || [];

      if (results && results?.length > 0) {
        const updatedBooks = results.map(({ content }: any) => ({
          ...content,
        }));
        books = updatedBooks;
        total = res.data?.data?.results || 0;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (params.subjects.length === 1) {
    const category1 = params.subjects[0];
    mainSubject = category1;

    const res = await axios.get(
      `/content/viewBooks/Get_SubSubjects_of_specific/${category1}`
    );
    if (res.data?.subjectdata && res.data?.subjectdata?.length > 0) {
      subjectList = res.data?.subjectdata?.map((subject: any) => ({
        link: `/text-books/${category1}/${subject.subjects}`,
        subject: subject.subjects,
      }));
    }
  } else if (params.subjects.length >= 2) {
    const category1 = params.subjects[0];
    const category2 = params.subjects[1];
    mainSubject = category2;
    const res = await axios.get(
      `/content/viewBooks/Get_SubSubjects_in_subject/${category1}/${category2}`
    );
    if (res.data?.subjectdata && res.data?.subjectdata?.length > 0) {
      subjectList = res.data?.subjectdata?.map((subject: any) => ({
        link: `/text-books/${category1}/${category2}/${subject.subjects}`,
        subject: subject.subjects,
      }));
    }
  }

  await getInitialBooks();

  return (
    <div className="pt-14 md:pt-16 lg:pt-20 pb-10 ">
      <Container className="flex gap-4 items-start">
        <div className="w-96 hidden md:flex flex-col sticky top-14">
          <SubjectsPanel label={mainSubject} subjectList={subjectList} />
        </div>
        <BooksPanel categories={params.subjects} books={books} total={total} />
      </Container>
    </div>
  );
};

export default BooksPageBySubjects;
