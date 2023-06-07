import Head from "next/head";
import { useEffect } from "react";

import { Login } from "@/components";
import { Browser, LOCAL_STORAGE_KEY } from "@/constants";
import { NextRouter, useRouter } from "next/router";

export default function Home() {
  const router: NextRouter = useRouter();
  useEffect((): void => {
    const token: null | string = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!token) return;
    router.push(Browser.DASHBOARD);
  }, []);

  return (
    <>
      <Head>
        <title>Tracker | Login</title>
        <meta name="description" content="Tracker login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={Browser.FAVICON} />
      </Head>
      <main>
        <Login />
      </main>
    </>
  );
}
