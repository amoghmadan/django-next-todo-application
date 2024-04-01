import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";

import { Login } from "@/components/lib";
import { Page, Public, LOCAL_STORAGE_KEY } from "@/config";

export default function Home() {
  const router: NextRouter = useRouter();
  useEffect((): (() => void) => {
    return (): void => {
      const token: null | string = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!token) return;
      router.push(Page.DASHBOARD);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Tracker | Login</title>
        <meta name="description" content="Tracker login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={Public.FAVICON} />
      </Head>
      <main>
        <Login />
      </main>
    </>
  );
}
