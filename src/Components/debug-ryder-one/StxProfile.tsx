import React from "react";

import { StxBalance } from "@stacks/blockchain-api-client";
import { Text } from "react-native-paper";

const toStx = (balance: string) => {
    return (BigInt(balance) / 1000000n).toLocaleString(undefined, {style: "currency"});
}
export const StxProfile = ({balance, stxAddress}: {balance: StxBalance, stxAddress: string} ) => {
    return <>
    <Text>{stxAddress}:</Text> 
    <Text>{toStx(balance.balance)} STX</Text>
    </>
}