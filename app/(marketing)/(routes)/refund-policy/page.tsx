import Container from "@/components/container";

import Image from "next/image";
import PageTitle from "../../_components/page-title";

import banner_img from "@/public/pages/policy/privacy_banner.webp";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <div>
      <section className="pb-10">
        <Image
          src={banner_img}
          alt="Refund Policy of SimpliTaught"
          priority
          className="h-64 object-cover md:object-contain md:h-auto"
        />
        <div className="space-y-8 max-w-5xl mx-auto px-4 lg:px-5 pt-14">
          <PageTitle title="Refund Policy" />
        </div>
      </section>

      <section className="pb-14">
        <Container>
          <div
            className={`
            [&>h2]:text-xl [&>h2]:md:text-2xl [&>h2]:font-semibold  [&>h2]:pb-2 [&>h2]:pt-4
            [&>h6]:text-base [&>h6]:md:text-xl [&>h6]:font-semibold  [&>h6]:pb-2
            [&>p]:text-sm [&>p]:md:text-base [&>p]:font-medium [&>p]:text-slate-600
          `}
          >
            <h2>How to refund an eTextbook</h2>
            <br />
            <h6>Use the Refund Self Service Tool</h6>
            <p>
              To return a purchase from the SimpliTaught Store, sign in to your
              Order Listing page with the email address and password used to
              purchase the eTextbook.
            </p>
            <br />
            <p>
              After you sign in, you will see the items from your recent orders.
              Select an item to go to the order details page. From there, use
              the Request Refund button below your item. In the pop-up window,
              confirm the reason for the refund and select the Refund button.
              Repeat the process for any additional eTextbooks you need to
              return.
            </p>
            <br />

            <h2>Refund Process</h2>
            <p>
              Once we receive your refund request, a refund is initiated
              immediately. We refund your purchase back to the original payment
              method.
            </p>
            <br />
            <p>
              We will send credit and debit card refunds to the card-issuing
              bank within five to seven business days of receipt of the return.
              Please contact the card-issuing bank with questions about when you
              can expect the credit to post on your account.
            </p>
            <br />
            <h2>SimpliTaught Return Policy</h2>
            <p>
              There are a few important things to keep in mind when returning an
              eTextbook you purchased from the SimpliTaught Store. You may
              request a refund from the SimpliTaught store provided that the
              following are true:
            </p>
            <ul className="list-disc ml-10 my-4">
              <li>
                <p>
                  You are returning the item within 14 days of the purchase
                  date.
                </p>
              </li>
              <li>
                <p>
                  You have not viewed or printed, in total, more than twenty
                  percent (20%) of the SimpliTaught eTextbook.
                </p>
              </li>
              <li>
                <p>
                  You have not viewed or used any included access codes for any
                  online resources that came with your eTextbook purchase.
                </p>
              </li>
              <li>
                <p>
                  You have not previously returned the same eTextbook from a
                  prior purchase.
                </p>
              </li>
              <li>
                <p>
                  You are returning an item purchased directly from the
                  SimpliTaught Store.
                </p>
              </li>
              <li>
                <p>
                  You have not returned 3 or more eTextbooks in the past 90 days
                  across all of your SimpliTaught Accounts.
                </p>
              </li>
              <li>
                <a id="policy_exceptions" href=""></a>
                <p>
                  You are not returning an eTextbook from one of the publishers
                  in our{" "}
                  <Link
                    href="/refund-policy#policy_exceptions"
                    className="text-[var(--brand-color)]"
                  >
                    Return Policy Exceptions
                  </Link>
                  .
                </p>
              </li>
            </ul>
            <p>
              Returns for SimpliTaught eTextbooks purchases through other
              retailers are subject to their respective returns and refunds
              policy.
              <br />
              Abuse of Return Policy: SimpliTaught reserves the right to refuse
              to sell or to provide refunds to any person for any reason not
              prohibited by law, including, but not limited to, abuse of its
              return policy.
            </p>
            <br />

            <h2>Return Policy Exceptions</h2>
            <p>
              Titles purchased from the following publishers will follow the
              return policies outlined below.
            </p>
            <br />
            <div>
              <h6 className="text-base md:text-xl tracking-tight font-medium">
                Cengage & Cengage Unlimited Policy:
              </h6>
              <ul className="list-disc ml-10 pt-2 pb-4">
                <li>
                  <p>
                    You may request a refund within 14 days of your initial
                    purchase of an eResource.
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="text-base md:text-xl tracking-tight font-medium">
                Hachette Digital Return Policy:
              </h6>
              <ul className="list-disc ml-10 pt-2 pb-4">
                <li>
                  <p>
                    You may request a refund of your SimpliTaught eTextbook
                    purchase within 3 days of your initial purchase.
                  </p>
                </li>
                <li>
                  <p>
                    In total, you have not viewed or printed more than two
                    percent (2%) of the SimpliTaught eTextbook.
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="text-base md:text-xl tracking-tight font-medium">
                HarperCollins Return Policy:
              </h6>
              <ul className="list-disc ml-10 pt-2 pb-4">
                <li>
                  <p>
                    You may request a refund of your SimpliTaught eTextbook
                    purchase within 2 days of your initial purchase.
                  </p>
                </li>
                <li>
                  <p>
                    In total, you have not viewed or printed more than two
                    percent (2%) of the SimpliTaught eTextbook.
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="text-base md:text-xl tracking-tight font-medium">
                HarperCollins Christian Return Policy:
              </h6>
              <ul className="list-disc ml-10 pt-2 pb-4">
                <li>
                  <p>
                    You may request a refund of your SimpliTaught eTextbook
                    purchase within 2 days of your initial purchase.
                  </p>
                </li>
                <li>
                  <p>
                    In total, you have not viewed or printed more than two
                    percent (2%) of the SimpliTaught eTextbook.
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="text-base md:text-xl tracking-tight font-medium">
                McGraw-Hill Courseware Return Policy:
              </h6>
              <ul className="list-disc ml-10 pt-2 pb-4">
                <li>
                  <p>
                    You may request a refund within 14 days of your initial
                    purchase of an eResource.
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-base md:text-xl tracking-tight font-medium">
                Oxford University Press Return Policy:
              </h6>
              <ul className="list-disc ml-10 pt-2 pb-4">
                <li>
                  <p>
                    You have not viewed or printed more than five percent (5%)
                    total of the SimpliTaught eTextbook.
                  </p>
                </li>
                <li>
                  <p>
                    You may request a refund for SimpliTaught eTextbook purchase
                    within 14 days of your initial purchase.
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="text-base md:text-xl tracking-tight font-medium">
                Pearson Courseware & Pearson+ Return Policy:
              </h6>
              <ul className="list-disc ml-10 pt-2 pb-4">
                <li>
                  <p>
                    You may cancel your Pearson+ subscription or request a
                    refund of an eResource within 14 days of your initial
                    purchase.
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-base md:text-xl tracking-tight font-medium">
                Penguin Random House Return Policy:
              </h6>
              <ul className="list-disc ml-10 pt-2 pb-4">
                <li>
                  <p>
                    You may request a refund of your SimpliTaught eTextbook
                    purchase within 7 days of your initial purchase.
                  </p>
                </li>
                <li>
                  <p>You have not viewed or printed the eTextbook.</p>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-base md:text-xl tracking-tight font-medium">
                Simon & Schuster Return Policy:
              </h6>
              <ul className="list-disc ml-10 pt-2 pb-4">
                <li>
                  <p>
                    You may request a refund of your SimpliTaught eTextbook
                    purchase within 2 days of your initial purchase.
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-base md:text-xl tracking-tight font-medium">
                WileyPLUS Return Policy:
              </h6>
              <ul className="list-disc ml-10 pt-2 pb-4">
                <li>
                  <p>
                    You may request a refund unused WileyPLUS registration codes
                    on requests made within 30 days of purchase through the
                    SimpliTaught store.
                  </p>
                </li>
                <li>
                  <p>
                    You may request a refund for used WileyPLUS registration
                    codes on requests made within 14 days of purchase through
                    the SimpliTaught store.
                  </p>
                </li>
                <li>
                  <p>
                    Please note: Upon cancellation all previous work completed
                    with that code is deleted.
                  </p>
                </li>
              </ul>
            </div>

            <br />

            <h2>Additional Information</h2>
            <p>
              As with any shopping experience, some terms and conditions apply
              to transactions through the SimpliTaught Store. Please remember,
              that by placing an order at the SimpliTaught Store, you agree to
              the terms set forth above along with SimpliTaught{" "}
              <Link
                href="/privacy-policy"
                className="text-[var(--brand-color)]"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms-and-conditions"
                className="text-[var(--brand-color)]"
              >
                Terms of Use
              </Link>
              .
            </p>
            <br />
            <h2>Need Further Assistance? Contact SimpliTaught Support</h2>
            <p>
              You can always contact SimpliTaught Support for assistance with a
              refund. A SimpliTaught Support Specialist will assist you with
              your return. We will process your refund at that time. To contact
              SimpliTaught Support, please{" "}
              <Link href="/contact-us" className="text-[var(--brand-color)]">
                Contact SimpliTaught Support
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
