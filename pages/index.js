import { useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Cards from "../components/Cards";
import Billing from "../components/Billing";
import HistoricalTracking from "../components/HistoricalTracking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home(props) {
  return (
    <div className="flex flex-col items-center space-y-10 min-h-screen">
      <h2 className="text-4xl">
        <span
          className={`text-6xl font-extrabold ${styles.heading}`}
        >
          Always be billing 💸
        </span>
      </h2>
      <Billing currencyObject={props.currencyObject} />
      
      <Tabs defaultValue="projections" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="projections">Projections</TabsTrigger>
          <TabsTrigger value="historical">Historical Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="projections">
          <Cards />
        </TabsContent>
        <TabsContent value="historical">
          <HistoricalTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { currencyObject } from "../data/currencies";

export async function getStaticProps() {
  return {
    props: {
      currencyObject,
    },
  };
}
