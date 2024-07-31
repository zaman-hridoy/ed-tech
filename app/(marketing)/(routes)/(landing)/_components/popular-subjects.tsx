import PageTitle from "@/app/(marketing)/_components/section-title";
import Container from "@/components/container";
import SubjectItems from "./subject-items";

const PopularSubjects = () => {
  return (
    <section className="py-12 bg-white select-none">
      <Container className="space-y-12 max-w-5xl mx-auto">
        <div className="space-y-12">
          <PageTitle title="Some Popular Subjects" />
          <SubjectItems />
        </div>
      </Container>
    </section>
  );
};

export default PopularSubjects;
