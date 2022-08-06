import { useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Cards from "../components/Cards";
import Billing from "../components/Billing";
import { Heading, Box, Text, VStack } from "@chakra-ui/react";

export default function Home(props) {
  return (
    <VStack spacing={10} minH="100vh">
      <Heading as="h2" size="xl">
        <Text
          // bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          className={styles.heading}
        >
          Always be billing 💸
        </Text>
      </Heading>
      <Billing currencyObject={props.currencyObject} />
      <Cards />
    </VStack>
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
