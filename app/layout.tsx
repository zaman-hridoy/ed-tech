// import AlanWidget from "@/components/alan-widget";
import ModalProvider from "@/components/providers/modal-provider";
import NextAuthProvider from "@/components/providers/next-auth-provider";
import NextProgressProvider from "@/components/providers/next-progress-provider";
import QueryProvider from "@/components/providers/query-client-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import ToasterProvider from "@/components/providers/toaster-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AzureAssistant from "@/components/azure-assistat";
// const AlanWidget = dynamic(() => import("@/components/alan-widget"), {
//   ssr: false,
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SimpliTaught - A Content Curation &amp; Collaboration Platform.",
  description:
    "Using AI Technology, we can identify digital resources to support the key concepts students are learning in class, whether in-person, hybrid or online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, "no-scrollbar")}>
        {/* <Suspense fallback={<UILoader />}> */}
        <NextAuthProvider>
          <NextProgressProvider />
          <ToasterProvider />
          <SocketProvider>
            {/* <VoiceAssistantProvider> */}
            <QueryProvider>
              <ModalProvider />
              {children}
              {/* <VoiceWidget /> */}
              {/* <AlanWidget /> */}

              {/* active */}
              <AzureAssistant />
            </QueryProvider>
            {/* </VoiceAssistantProvider> */}
          </SocketProvider>
        </NextAuthProvider>
        {/* </Suspense> */}
      </body>
    </html>
  );
}
