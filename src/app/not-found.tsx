import NotFound from "@/components/not-found";
import { Config } from "@/config";
import { getBaseURL } from "@/utils";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = await getBaseURL();

  return {
    metadataBase: new URL(BASE_URL),
    title: `Not Found | ${Config.title}`,
    description:
      "Hey, this page does not exist. Please check the URL and try again. If you think this is a mistake, please let me know.",
    openGraph: {
      images: [
        {
          url: new URL("/not-found.webp", BASE_URL),
          width: 800,
          height: 600,
          alt: Config.title,
        },
      ],
    },
  };
}

export default function Page() {
  return (
    <>
      <NotFound />
    </>
  );
}
