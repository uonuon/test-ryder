import { Psbt, Transaction, networks, payments } from "bitcoinjs-lib";
import coinSelect from "coinselect";
import NfcProxy from "../src/NfcProxy";
import { ProviderApiBtc } from "./provider-api-btc";
import { exportPublicKey } from "./ryder-one";
import { APDUs, DerivationPath } from "./ryder-one-apdus";

export type SimpleBtcTransaction = {
    derivationPath: DerivationPath;
    amountInSats: number;
    recipient: string;
    feeRate: number;
}

export type BroadcastResult = {
    success: boolean;
}

export type Utxo = {
    txid: string;
    vout: number;
    value: number;
}

export type SignedBtcTransaction = { tx: Transaction, signature: Uint8Array };

const providerApiBtc = new ProviderApiBtc();
const network = networks.regtest;

export async function signBtcTransaction(tx: SimpleBtcTransaction, logger): Promise<SignedBtcTransaction> {
    try {
        const publicKey = await exportPublicKey(tx.derivationPath, logger);
        console.log({ publicKey });
        const changeAddress = payments.p2tr({ pubkeys: [Buffer.from(publicKey)], network });
        console.log(changeAddress);

        const utxos = await providerApiBtc.getUtxos(publicKey);
        let { inputs, outputs, fee } = coinSelect(utxos, [{ address: tx.recipient, value: tx.amountInSats }], tx.feeRate);

        if (!inputs || !outputs) throw new Error("No coins found");

        let psbt = new Psbt()

        inputs.forEach(input =>
            psbt.addInput({
                hash: input.txId,
                index: input.vout,
                nonWitnessUtxo: input.nonWitnessUtxo,
                // OR (not both)
                witnessUtxo: input.witnessUtxo,
            })
        )
        outputs.forEach(output => {
            // watch out, outputs may have been added that you need to provide
            // an output address/script for
            if (!output.address) {
                output.address = changeAddress;
            }

            psbt.addOutput({
                address: output.address,
                value: output.value,
            })
        })

        const btcTx = psbt.extractTransaction();
        const hashBuffer = btcTx.getHash();
        const [result, responses] = await NfcProxy.customSelectAndTransceiveIsoDep([
            APDUs.signHashRequest(0x01, hashBuffer, tx.derivationPath),
        ], logger);
        console.log(result, responses);
        return { tx: btcTx, signature: responses.pop() };
    } catch (e) {
        console.log(e);
        return Promise.reject(e.toString());
    }
}

export async function broadcastBtcTransaction(tx: SignedBtcTransaction): Promise<BroadcastResult> {
    return Promise.resolve({ success: true });

}