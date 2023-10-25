import React, { FC } from "react";
import { Table, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface MiningCalculatorReadOnlyProps {
  hashrate: number;
  exchange_rate: number;
  net_day_earnings_ar: number;
  net_hashrate: number;
}

export const MiningCalculatorReadOnly: FC<MiningCalculatorReadOnlyProps> = ({
  hashrate,
  exchange_rate,
  net_day_earnings_ar,
  net_hashrate,
}) => {
  const profitDetails = [
    { title: "month", mult: 30 },
    { title: "week", mult: 7 },
    { title: "day", mult: 1 },
    { title: "hour", mult: 1 / 24 },
  ].map(({ title, mult }) => {
    const profitArPerDay = (net_day_earnings_ar * hashrate) / net_hashrate;
    const profit = profitArPerDay * mult;

    return (
      <Tr key={title}>
        <Th>Profit per {title}</Th>
        <Td style={{ textAlign: "right" }}>{profit.toFixed(2)}</Td>
        <Td>AR/{title}</Td>
        <Td style={{ textAlign: "right" }}>{(profit * exchange_rate).toFixed(2)}</Td>
        <Td>USD/{title}</Td>
      </Tr>
    );
  });

  return (
    <Table>
      <Tbody>
        <Tr>
          <Th>net hashrate</Th>
          <Td colSpan={4}>{net_hashrate}</Td>
        </Tr>
        <Tr>
          <Th>Exchange rate</Th>
          <Td colSpan={4}>{exchange_rate} USD/AR</Td>
        </Tr>
        {profitDetails}
      </Tbody>
    </Table>
  );
};
