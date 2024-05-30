import { FetchResult } from "react-native";
import { Utxo } from "./bitcoin";

export class ProviderApiBtc {
    async getUtxos(address): Promise<Utxo[]> {
        const utxos = await fetch(`https://blockstream.info/api/address/${address}/utxo`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (utxos.status === 200) {
            return utxos.json();
        } else {
            throw new Error(await utxos.text())
        }
    }
}