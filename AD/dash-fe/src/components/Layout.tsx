import { ReactNode } from "react";
import Head from "next/head";
import SideMenu from "./SideMenu";
import Header from "./Header";
// import { Inter } from "@next/font/google";

// const inter = Inter({
//   subsets: ['latin'],
//   variable: "--font-inter",
// })

// const inter2 = Inter();

interface PropType {
  children: ReactNode;
}

export default function Layout({ children }: PropType): JSX.Element {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`min-h-screen min-w-screen flex border-solid border-2 border-black font-inter`} >
        <SideMenu />
        <div className="w-4/5 [&>*:nth-child(2)]:h-screen [&>*:nth-child(2)]:p-10 [&>*]:border-solid [&>*]:border-2 [&>*]:border-black bg-[#DEE6EC]" >
          <Header/>
          {children}
        </div>
      </main>
    </div>
  );
}
