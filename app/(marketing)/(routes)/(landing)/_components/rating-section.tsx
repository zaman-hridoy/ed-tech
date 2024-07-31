import PageTitle from "@/app/(marketing)/_components/section-title";
import Container from "@/components/container";
import RatingInput from "@/components/rating-input";

const RatingSection = () => {
  return (
    <section className="py-12 select-none">
      <Container className="space-y-12 max-w-2xl mx-auto">
        <PageTitle title="What People Are Saying About SimpliTaught" />
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center text-center">
            <RatingInput value={5} readonly />
            <p className="text-sm italic text-slate-600 tracking-tight">
              I wish I had SimpliTaught during college! I wasted so much time
              looking for good content on the internet as a student.
            </p>
          </div>

          <div className="text-center text-basetracking-tight font-semibold">
            <h4 className="text-slate-900">Turki Alqahtani</h4>
            <h4 className="text-[var(--brand-color)]">
              Arizona State University graduate.
            </h4>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RatingSection;
