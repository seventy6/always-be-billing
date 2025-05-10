import React from "react";
import { Box } from "@chakra-ui/react";
import PredictionChart from "./PredictionChart";

function PredictionChartContainer() {
  return (
    <Box width="100%" mt={4} mb={4}>
      <PredictionChart />
    </Box>
  );
}

export default PredictionChartContainer;