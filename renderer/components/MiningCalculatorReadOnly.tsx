import React, { FC } from "react";

interface MiningCalculatorReadOnlyProps {
  hashrate: number;
  exchange_rate: number;
  net_day_earnings_ar: number;
  net_hashrate: number;
}

export const MiningCalculatorReadOnly: FC<MiningCalculatorReadOnlyProps> = () => {
  // const profitDetails = [
  //   { title: "month", mult: 30 },
  //   { title: "week", mult: 7 },
  //   { title: "day", mult: 1 },
  //   { title: "hour", mult: 1 / 24 },
  // ].map(({ title, mult }) => {
  //   const profitArPerDay = (net_day_earnings_ar * hashrate) / net_hashrate;
  //   const profit = profitArPerDay * mult;

  //   // return (
  //   //   <Tr key={title}>
  //   //     <Th>Profit per {title}</Th>
  //   //     <Td style={{ textAlign: "right" }}>{profit.toFixed(2)}</Td>
  //   //     <Td>AR/{title}</Td>
  //   //     <Td style={{ textAlign: "right" }}>{(profit * exchange_rate).toFixed(2)}</Td>
  //   //     <Td>USD/{title}</Td>
  //   //   </Tr>
  //   // );

  //   return;
  // });

  return (
    <>
      Mining Calculator
    </>
  );
};
