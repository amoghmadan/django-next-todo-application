import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";

import { CreateItem, ListItem, Navbar } from "@/components/lib";
import { Page, Public, LOCAL_STORAGE_KEY } from "@/config";

export default function Dashboard(): JSX.Element {
  const router: NextRouter = useRouter();
  useEffect((): (() => void) => {
    return (): void => {
      const token: null | string = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (token) return;
      router.push(Page.ROOT);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Tracker | Dashboard</title>
        <meta name="description" content="Tracker dashboard page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={Public.FAVICON} />
      </Head>
      <main>
        <Navbar />
        <CreateItem />
        <ListItem />
      </main>
    </>
  );
}
