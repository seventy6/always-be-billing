import { useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Cards from "../components/Cards";
import Billing from "../components/Billing";
import { Heading, Box, Text } from "@chakra-ui/react";

export default function Home(props) {
  return (
    <Box className={styles.container} bg={"whiteAlpha.100"}>
      <Head>
        <title>
          All ways be billing... - the simple tool for predicting this year's
          potential revenue
        </title>
        <meta
          name="description"
          content="A simple tool for predicting your revenue potential as a freelancer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading as="h2" size="xl">
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            Always be billing...
          </Text>
        </Heading>
        <Billing currencyObject={props.currencyObject} />
        <Cards></Cards>
      </main>

      <footer>
        <a
          href="https://nickwforsberg.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nick W Forsberg
        </a>
      </footer>
    </Box>
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
