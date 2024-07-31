import PageTitle from "@/app/(marketing)/_components/section-title";
import Container from "@/components/container";
import model_img from "@/public/pages/home/simplitaught-model.png";
import Image from "next/image";

const SimpliTaughtModel = () => {
  return (
    <section className="py-12 select-none bg-white">
      <Container className="space-y-12 max-w-5xl mx-auto">
        <PageTitle title="What Is The SimpliTaught Model?" />
        <div className="space-y-6">
          <div className="text-base md:text-lg tracking-tight text-slate-800 font-[500] text-center">
            SimpliTaught technologies enable the learner to be at the center of
            their very own <strong>“Community of Learning”</strong>. This
            personalized community cultivates a comprehensive network of
            relationships – from institutions, instructors, and students, to
            publishers and content creators – all with the purpose of enriching
            the learning experience of the student, regardless of geography or
            social/economic limitations.
          </div>

          <div className="flex items-center justify-center">
            <Image src={model_img} alt="succeed with" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SimpliTaughtModel;
