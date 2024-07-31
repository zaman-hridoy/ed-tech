import Container from "@/components/container";

import Image from "next/image";
import PageTitle from "../../_components/page-title";

import banner_img from "@/public/pages/tnc/tnc_banner.webp";
import Link from "next/link";

const TermsAndConditionsPage = () => {
  return (
    <div>
      <section className="pb-10">
        <Image
          src={banner_img}
          alt="Terms and Conditions of SimpliTaught"
          priority
          className="h-64 object-cover md:object-contain md:h-auto"
        />
        <div className="space-y-8 max-w-5xl mx-auto px-4 lg:px-5 pt-14">
          <PageTitle title="Terms and Conditions" />
        </div>
      </section>

      <section className="pb-14">
        <Container>
          <div
            className={`
            [&>h2]:text-xl [&>h2]:md:text-2xl [&>h2]:font-semibold [&>h2]:pb-2 [&>h2]:pt-4
            [&>p]:text-sm [&>p]:md:text-base [&>p]:font-medium [&>p]:text-slate-600
          `}
          >
            <br />
            <p>Last updated: Sep 6, 2021</p>
            <br />
            <p>
              Please read these Terms and Conditions (Terms and Conditions)
              carefully before using the{" "}
              <Link
                href="https://www.simplitaught.com"
                className="text-[var(--brand-color)] font-semibold"
              >
                www.simplitaught.com
              </Link>{" "}
              website (the Service) operated by SimpliTaught LLC / SimpliTaught
              Group Inc. /SimpliTaught. (us, we, or our).
            </p>
            <br />
            <p>
              Your access to and use of the Service is conditioned upon your
              acceptance of and compliance with these Terms. These Terms apply
              to all visitors, users and others who wish to access or use the
              Service.
            </p>
            <br />
            <p>
              By accessing or using the Service you agree to be bound by these
              Terms. If you disagree with any part of the terms, then you do not
              have permission to access the Service.
            </p>
            <br />
            <h2>Communications</h2>
            <p>
              By creating an Account on our service, you agree to subscribe to
              newsletters, marketing or promotional materials and other
              information we may send. However, you may opt out of receiving
              any, or all, of these communications from us by following the
              unsubscribe link or instructions provided in any email we send.
            </p>
            <br />
            <h2>Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise
              make available certain information, text, graphics, videos, or
              other material (&quot;Content&quot;). You are responsible for the
              Content that you post on or through the Service, including its
              legality, reliability, and appropriateness.
            </p>
            <br />
            <p>
              By posting Content on or through the Service, You represent and
              warrant that: (i) the Content is yours (you own it) and/or you
              have the right to use it and the right to grant us the rights and
              license as provided in these Terms, and (ii) that the posting of
              your Content on or through the Service does not violate the
              privacy rights, publicity rights, copyrights, contract rights or
              any other rights of any person or entity. We reserve the right to
              terminate the account of anyone found to be infringing on a
              copyright.
            </p>
            <br />
            <p>
              You retain all your rights to any Content you submit, post, or
              display on or through the Service and you are responsible for
              protecting those rights. We take no responsibility and assume no
              liability for Content you or any third-party posts on or through
              the Service. However, by posting Content using the Service you
              grant us the right and license to use, modify, publicly perform,
              publicly display, reproduce, and distribute such Content on and
              through the Service. You agree that this license includes the
              right for us to make your Content available to other users of the
              Service, who may also use your Content subject to these Terms.
            </p>
            <br />
            <p>
              SimpliTaught LLC / SimpliTaught Group Inc. has the right but not
              the obligation to monitor and edit all Content provided by users.
            </p>
            <br />
            <p>
              In addition, Content found on or through this Service are the
              property of SimpliTaught LLC / SimpliTaught Group Inc. or used
              with permission. You may not distribute, modify, transmit, reuse,
              download, repost, copy, or use said Content, whether in whole or
              in part, for commercial purposes or for personal gain, without
              express advance written permission from us.
            </p>
            <br />
            <h2>Accounts</h2>
            <p>
              When you create an account with us, you guarantee that you are
              above the age of 18, and that the information you provide us is
              accurate, complete, and current always. Inaccurate, incomplete, or
              obsolete information may result in the immediate termination of
              your account on the Service.
            </p>
            <br />
            <p>
              You are responsible for maintaining the confidentiality of your
              account and password, including but not limited to the restriction
              of access to your computer and/or account. You agree to accept
              responsibility for all activities or actions that occur under your
              account and/or password, whether your password is with our Service
              or a third-party service. You must notify us immediately upon
              becoming aware of any breach of security or unauthorized use of
              your account.
            </p>
            <br />
            <p>
              You may not use as a username the name of another person or entity
              or that is not lawfully available for use, a name or trademark
              that is subject to any rights of another person or entity other
              than you, without appropriate authorization. You may not use as a
              username any name that is offensive, vulgar, or obscene.
            </p>
            <br />
            <h2>Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided
              by users), features and functionality are and will remain the
              exclusive property of SimpliTaught LLC / SimpliTaught Group Inc.
              and its licensors. The Service is protected by copyright,
              trademark, and other laws of both the United States and foreign
              countries. Our trademarks and trade dress may not be used in
              connection with any product or service without the prior written
              consent of SimpliTaught LLC / SimpliTaught Group Inc.
            </p>
            <br />
            <h2>Links To Other Web Sites</h2>
            <p>
              Our Service may contain links to third party Web sites or services
              that are not owned or controlled by SimpliTaught LLC /
              SimpliTaught Group Inc.
            </p>
            <br />
            <p>
              SimpliTaught LLC / SimpliTaught Group Inc. has no control over,
              and assumes no responsibility for the content, privacy policies,
              or practices of any third-party web sites or services. We do not
              warrant the offerings of any of these entities/individuals or
              their websites.
            </p>
            <br />
            <p>
              You acknowledge and agree that SimpliTaught LLC / SimpliTaught
              Group Inc. shall not be responsible or liable, directly, or
              indirectly, for any damage or loss caused or alleged to be caused
              by or in connection with use of or reliance on any such content,
              goods, or services available on or through any such third-party
              web sites or services.
            </p>
            <br />
            <p>
              Your use of any such third-party Web site you visit is governed by
              the Terms of Use and privacy policies of such third-party Web
              site, not by these Terms of Use.
            </p>
            <br />
            <p>
              We strongly advise you to read the terms and conditions and
              privacy policies of any third- party web sites or services that
              you visit.
            </p>
            <br />
            <p>
              &quot;YouTube API&quot; meaning the YouTube API services (e.g.,
              YouTube Data API service) made available by YouTube (
              <a
                href="https://developers.google.com/youtube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-color)] font-semibold underline"
              >
                https://developers.google.com/youtube
              </a>
              ). By using YouTube or YouTube API within our Service, users are
              agreeing to be bound by the YouTube Terms of Service (
              <a
                href="https://www.youtube.com/t/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-color)] font-semibold underline"
              >
                https://www.youtube.com/t/terms
              </a>
              ). For reference, this is a link to the Google Privacy Policy at{" "}
              <a
                href="http://www.google.com/policies/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-color)] font-semibold underline"
              >
                http://www.google.com/policies/privacy
              </a>{" "}
              .
            </p>

            <br />
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the
              Service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever and without limitation,
              including but not limited to a breach of the Terms.
            </p>
            <br />
            <p>
              If you wish to terminate your account, you may simply discontinue
              using the Service.
            </p>
            <br />
            <p>
              All provisions of the Terms which by their nature should survive
              termination shall survive termination, including, without
              limitation, ownership provisions, warranty disclaimers, indemnity,
              and limitations of liability.
            </p>
            <br />
            <h2>Indemnification</h2>
            <p>
              You agree to defend, indemnify and hold harmless SimpliTaught LLC
              / SimpliTaught Group Inc. and its licensee and licensors, and
              their employees, contractors, agents, officers and directors, from
              and against any and all claims, damages, obligations, losses,
              liabilities, costs or debt, and expenses (including but not
              limited to attorney&#39;s fees), resulting from or arising out of
              a) your use and access of the Service, by you or any person using
              your account and password; b) a breach of these Terms, or c)
              Content posted on the Service.
            </p>
            <br />
            <h2>Limitation Of Liability</h2>
            <p>
              In no event shall SimpliTaught LLC / SimpliTaught Group Inc., nor
              its directors, employees, partners, agents, suppliers, or
              affiliates, be liable for any indirect, incidental, special,
              consequential or punitive damages, including without limitation,
              loss of profits, data, use, goodwill, or other intangible losses,
              resulting from (i) your access to or use of or inability to access
              or use the Service; (ii) any conduct or content of any third party
              on the Service; (iii) any content obtained from the Service; and
              (iv) unauthorized access, use or alteration of your transmissions
              or content, whether based on warranty, contract, tort (including
              negligence) or any other legal theory, whether or not we have been
              informed of the possibility of such damage, and even if a remedy
              set forth herein is found to have failed of its essential purpose.
            </p>
            <br />
            <h2>Disclaimer</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is
              provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
              basis. The Service is provided without warranties of any kind,
              whether express or implied, including, but not limited to, implied
              warranties of merchantability, fitness for a particular purpose,
              non-infringement, or course of performance.
            </p>
            <br />

            <p>
              SimpliTaught LLC / SimpliTaught Group Inc. its subsidiaries,
              affiliates, and its licensors do not warrant that a) the Service
              will function uninterrupted, secure or available at any particular
              time or location; b) any errors or defects will be corrected; c)
              the Service is free of viruses or other harmful components; or d)
              the results of using the Service will meet your requirements.
            </p>
            <br />
            <h2>Exclusions</h2>
            <p>
              Some jurisdictions do not allow the exclusion of certain
              warranties or the exclusion or limitation of liability for
              consequential or incidental damages, so the limitations above may
              not apply to you.
            </p>
            <br />
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws of Delaware, United States, without regard to its conflict of
              law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will
              not be considered a waiver of those rights. If any provision of
              these Terms is held to be invalid or unenforceable by a court, the
              remaining provisions of these Terms will remain in effect. These
              Terms constitute the entire agreement between us regarding our
              Service and supersede and replace any prior agreements we might
              have had between us regarding the Service.
            </p>
            <br />
            <h2>Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will
              provide at least 15 days notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after any revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, you are no longer authorized to
              use the Service.
            </p>
            <br />
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please{" "}
              <Link
                href="/contact-us"
                className="text-[var(--brand-color)] font-semibold"
              >
                contact us.
              </Link>{" "}
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
