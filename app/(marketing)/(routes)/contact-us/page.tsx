import Container from "@/components/container";

import Image from "next/image";
import PageTitle from "../../_components/page-title";

import banner_img from "@/public/pages/contact/contact-banner.jpg";
import ContactForm from "./_components/contact-form";

const ContactUsPage = () => {
  return (
    <div>
      <section className="pb-10">
        <Image
          src={banner_img}
          alt="Contact Us on SimpliTaught"
          priority
          className="h-64 object-cover md:object-contain md:h-auto"
        />
        <div className="space-y-8 max-w-2xl mx-auto px-4 lg:px-5 pt-14">
          <PageTitle title="Contact Us" />
          <p className="text-sm lg:text-xl text-slate-800 font-medium text-center">
            Feel free to contact us regarding any queries you might have.
          </p>
        </div>
      </section>

      <section className="pb-14">
        <Container className="max-w-2xl mx-auto">
          <ContactForm />
        </Container>
      </section>
    </div>
  );
};

export default ContactUsPage;
