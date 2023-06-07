import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";

import { CreateItem, ListItem, Navbar } from "@/components";
import { Browser, LOCAL_STORAGE_KEY } from "@/constants";

export default function Dashboard(): JSX.Element {
  const router: NextRouter = useRouter();
  useEffect((): void => {
    const token: null | string = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (token) return;
    router.push(Browser.ROOT);
  }, []);

  return (
    <>
      <Head>
        <title>Tracker | Dashboard</title>
        <meta name="description" content="Tracker dashboard page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={Browser.FAVICON} />
      </Head>
      <main>
        <Navbar />
        <CreateItem />
        <ListItem />
      </main>
    </>
  );
}
