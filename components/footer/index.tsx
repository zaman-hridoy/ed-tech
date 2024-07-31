import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-white border-t py-12">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-4">
          <div className="flex flex-col space-y-2">
            <Link href="/">
              <div className="relative w-[120px] h-[35px] md:w-[170px] md:h-[40px] xl:w-[191px] xl:h-[48px]">
                <Image
                  src="/logos/logo.svg"
                  alt="Simplitaught"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            <div className="flex items-center flex-wrap gap-2">
              {/* youtube */}
              <a
                href="https://www.youtube.com/watch?v=PR_6eF46qkY"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="40px"
                  height="40px"
                >
                  <path
                    fill="#FF0000"
                    d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                  />
                  <path fill="#FFF" d="M20 31L20 17 32 24z" />
                </svg>
              </a>
              {/* linkedin */}
              <a
                href="https://www.linkedin.com/company/simplitaught/"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="35px"
                  height="35px"
                >
                  <path
                    fill="#0078d4"
                    d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
                  />
                  <path
                    d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                    opacity=".05"
                  />
                  <path
                    d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                    opacity=".07"
                  />
                  <path
                    fill="#fff"
                    d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                  />
                </svg>
              </a>

              {/* facebook */}
              <a
                href="https://www.facebook.com/simplitaught"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="35px"
                  height="36px"
                >
                  <path
                    fill="#3F51B5"
                    d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                  />
                  <path
                    fill="#FFF"
                    d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                  />
                </svg>
              </a>

              {/* instagram */}
              <a
                href="https://www.instagram.com/simplitaught/"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="35px"
                  height="35px"
                >
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8ma"
                    cx="19.38"
                    cy="42.035"
                    r="44.899"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#fd5" />
                    <stop offset=".328" stopColor="#ff543f" />
                    <stop offset=".348" stopColor="#fc5245" />
                    <stop offset=".504" stopColor="#e64771" />
                    <stop offset=".643" stopColor="#d53e91" />
                    <stop offset=".761" stopColor="#cc39a4" />
                    <stop offset=".841" stopColor="#c837ab" />
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8ma)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  />
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8mb"
                    cx="11.786"
                    cy="5.54"
                    r="29.813"
                    gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#4168c9" />
                    <stop offset=".999" stopColor="#4168c9" stopOpacity="0" />
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8mb)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  />
                  <path
                    fill="#fff"
                    d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                  />
                  <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
                  <path
                    fill="#fff"
                    d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {navs_1.map((item) => (
              <div key={item.link}>
                <Link
                  href={item.link}
                  className={`
                    inline-block py-1 whitespace-nowrap relative font-semibold text-sm lg:text-base
                    before:absolute before:w-0 before:h-[3px] before:bg-[#212CE6] before:bottom-1
                    hover:before:w-full hover:before:transition-all hover:before:duration-500 transition-all
                  `}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            {navs_2.map((item) => (
              <div key={item.link}>
                <Link
                  href={item.link}
                  className={`
                    inline-block py-1 whitespace-nowrap relative font-semibold text-sm lg:text-base
                    before:absolute before:w-0 before:h-[3px] before:bg-[#212CE6] before:bottom-1
                    hover:before:w-full hover:before:transition-all hover:before:duration-500 transition-all
                  `}
                  target={item.target ? "_blank" : ""}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-2">
            {navs_3.map((item) => (
              <div key={item.link}>
                <Link
                  href={item.link}
                  className={`
                    inline-block py-1 whitespace-nowrap relative font-semibold text-sm lg:text-base
                    before:absolute before:w-0 before:h-[3px] before:bg-[#212CE6] before:bottom-1
                    hover:before:w-full hover:before:transition-all hover:before:duration-500 transition-all
                  `}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

const navs_1 = [
  {
    name: "Students",
    link: "/solution-for-students",
  },
  {
    name: "Educators",
    link: "/solution-for-educators",
  },
  {
    name: "Content creators",
    link: "/solution-for-content-creators",
  },
  {
    name: "Institutions",
    link: "/solution-for-institutions",
  },
];

const navs_2 = [
  {
    name: "What is ST?",
    link: "/what-is-st",
  },
  {
    name: "How it Works",
    link: "/how-it-works",
  },
  {
    name: "Platform",
    link: "/platform",
  },
  {
    name: "Books",
    link: "/text-books",
  },
  {
    name: "Blog",
    link: "http://blog.simplitaught.com",
    target: true,
  },
];

const navs_3 = [
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },
  {
    name: "FAQ's",
    link: "/faq",
  },
  {
    name: "Privacy policy",
    link: "/privacy-policy",
  },
  {
    name: "Refund policy",
    link: "/refund-policy",
  },
  {
    name: "Terms and conditions",
    link: "/terms-and-conditions",
  },
];
