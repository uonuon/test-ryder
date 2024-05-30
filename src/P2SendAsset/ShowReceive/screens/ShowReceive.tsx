import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { AddressVersion, createStacksPublicKey, publicKeyToAddress, validateStacksAddress } from '@stacks/transactions';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { assets } from '../../../../lib/tokens/tokens';
import AddressInput from '../../../Components/send-asset/AddressInput/AddressInput';
import ScreenHeader from '../../../Components/send-asset/ScreenHeader/ScreenHeader';
import { useAssetData } from '../../../Utils/assetContext';
import { usePrices } from '../../../Utils/pricesContext';
import { useWallet } from '../../../Utils/walletContext';
import { useStacks } from '../../../Utils/stacksContext';
import { publicKeyFromXtendedPubKey } from '../../../../lib/nfc-protocol/stacks-network';
import { bytesToHex } from '@stacks/common';

import QRCodeStyled from 'react-native-qrcode-styled';


const ShowReceive = ({ route }) => {
	const { asset, recipient, amount: initialAmount, feeAmount } = route.params;
	const { decimals } = assets[asset];
	const { navigate, goBack } = useNavigation();
	const { currentWallet } = useWallet();
	const amountAvailable =
		currentWallet.assets[asset].accounts[currentWallet.currentIndex].amountAvailable;
	const { defaultFees: fees } = useAssetData(asset);
	const prices = usePrices();
	const priceUsdAvailable = prices?.[asset]?.usd;
	const priceUsd = prices?.[asset]?.usd || 1;

	const [recipientAddress, setRecipientAddress] = useState<string>(recipient?.address?.stx || '');
	const [enterAsset, setEnterAsset] = useState<boolean>(true);
	const [amount, setAmount] = useState<string>(
		initialAmount ? initialAmount.toFixed(decimals) : '1',
	);
	const [amountFiat, setAmountFiat] = useState<string>(
		initialAmount ? (initialAmount * priceUsd).toFixed(2) : priceUsd.toFixed(2),
	);

	const { network } = useStacks();
	const accountIndex = currentWallet.currentIndex;
	const extendedPubKey = currentWallet.assets.stx?.xtendedPublicKey;
	let stxAddress = '';
	if (extendedPubKey) {
		console.log('mainnet', network.isMainnet());
		const pubKey = publicKeyFromXtendedPubKey(extendedPubKey, accountIndex);
		stxAddress = publicKeyToAddress(
			network.isMainnet() ? AddressVersion.MainnetSingleSig : AddressVersion.TestnetSingleSig,
			createStacksPublicKey(bytesToHex(pubKey)),
		);
		console.log('receive stx address', stxAddress);
	}

	// useEffect(() => {
	// 	QRCode.toDataURL(stxAddress, {}, (err, url) => {
	// 		console.log(err);
	// 		console.log(url);
	// 	});
	// }, []);

	//   const [stxReceiveAddress, setStxReceiveAddress] = useState<string>(stxAddress);


	//   useEffect(() => {
	//   	const accountIndex = currentWallet.currentIndex;
	// 	const extendedPubKey = currentWallet.assets.stx?.xtendedPublicKey;
	// 	if (extendedPubKey) {
	// 		console.log('mainnet', network.isMainnet());
	// 		const pubKey = publicKeyFromXtendedPubKey(extendedPubKey, accountIndex);
	// 		let stxAddress = publicKeyToAddress(
	// 			network.isMainnet() ? AddressVersion.MainnetSingleSig : AddressVersion.TestnetSingleSig,
	// 			createStacksPublicKey(bytesToHex(pubKey)),
	// 		);
	// 		console.log('receive stx address', stxAddress);
	// 		setStxReceiveAddress(stxReceiveAddress);
	// 		}
	// 	  }, [currentWallet, setStxReceiveAddress, network, stxReceiveAddress]);

	return (
		<SafeAreaView style={styles.send}>
			<View style={styles.instanceParent}>
				<ScreenHeader title={'Receive'} />
				<View style={[styles.frameParent, styles.frameFlexBox]}>
					{/* <View style={styles.frameWrapper}>
			<Text>Hello</Text>
          </View> */}
					<View style={[styles.frameGroup, styles.frameFlexBox]}>
						<QRCodeStyled
							data={stxAddress}
							style={{ backgroundColor: 'white' }}
							color={'black'}
							padding={20}
							pieceSize={8}

						/>
						{/* <View style={styles.tokensFinalParent}>
							<Image
								style={styles.tokensFinalIcon}
								resizeMode="cover"
								source={assets[asset].source}
							/>
							<View style={styles.totalAvailableParent}>
								<Text style={[styles.settings, styles.labelTypo]}>{stxAddress}</Text>
								<Text style={[styles.stx, styles.stxLayout]}>
									{`${amountAvailable} ${assets[asset].symbol}`}
								</Text>
							</View>
						</View> */}
						<Text style={[styles.fee, styles.stxLayout, styles.address]}>{stxAddress.replace(/(....)/g, '$1 ')}</Text>
					</View>


					<View style={[styles.frameContainer, styles.frameFlexBox]}>
						<Text style={[styles.fee, styles.stxLayout]}>Only send STX tokens to this address.</Text>

					</View>

				</View>
			</View>
			{/* <View style={[styles.sendInner, styles.sendInnerFlexBox]}>
        <View style={[styles.buttonclassicWrapper, styles.sendInnerFlexBox]}>
          <Pressable
            style={[styles.buttonclassic1, styles.buttonclassicLayout]}
            disabled={isNaN(parseFloat(amount)) || !validateStacksAddress(recipientAddress)}
            onPress={() => goBack()}>
            <View style={styles.textWrapper1FlexBox}>
              <Text style={[styles.labelText3, styles.labelTypo]}>Back</Text>
            </View>
          </Pressable>
        </View>
      </View> */}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	address: {
		fontSize: 24,
		marginTop: 20,
		fontFamily: 'courier'
	},
	wrapperSpaceBlock: {
		paddingVertical: 0,
		flexDirection: 'row',
	},
	labelTypo: {
		fontFamily: 'Poppins-Medium',
		fontWeight: '500',
	},
	frameFlexBox: {
		marginTop: 20,
		paddingTop: 12,
		paddingBottom: 12,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonclassicLayout: {
		borderRadius: 16,
		overflow: 'hidden',
	},
	stxLayout: {
		// lineHeight: 20,
		letterSpacing: 0,
	},
	textWrapper1FlexBox: {
		paddingHorizontal: 8,
		justifyContent: 'center',
		paddingVertical: 0,
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconWrapperLayout: {
		height: 16,
		width: 16,
	},
	sendInnerFlexBox: {
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	settings: {
		textAlign: 'left',
		lineHeight: 20,
		letterSpacing: 0,
		fontSize: 14,
		color: '#fff',
	},
	instanceParent: {
		alignSelf: 'stretch',
		alignItems: 'center',
	},
	labelText: {
		fontSize: 78,
		textAlign: 'center',
		textAlignVertical: 'center',
		backgroundColor: '#131313',
		height: 160,
	},
	icon: {
		height: '100%',
		width: '100%',
	},
	buttoniconOnly: {
		width: 32,
		marginTop: 12,
		height: 32,
	},
	labelText1: {
		fontSize: 22,
		lineHeight: 28,
		fontFamily: 'Poppins-Regular',
		marginTop: 12,
		textAlign: 'center',
		color: '#fff',
	},
	labelTextParent: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	frameWrapper: {
		paddingHorizontal: 0,
		paddingVertical: 12,
		alignSelf: 'stretch',
		alignItems: 'center',
	},
	tokensFinalIcon: {
		borderRadius: 1249,
		width: 40,
		height: 40,
		overflow: 'hidden',
	},
	stx: {
		color: '#b3b3b3',
		fontFamily: 'Poppins-Regular',
		textAlign: 'left',
		fontSize: 14,
		lineHeight: 20,
	},
	totalAvailableParent: {
		marginLeft: 8,
		justifyContent: 'center',
	},
	tokensFinalParent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	labelText2: {
		lineHeight: 16,
		letterSpacing: 0,
		fontFamily: 'Poppins-Medium',
		fontWeight: '500',
		fontSize: 14,
		textAlign: 'center',
		color: '#fff',
	},
	textWrapper: {
		paddingHorizontal: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonclassic: {
		borderRadius: 16,
		overflow: 'hidden',
		height: 32,
		borderWidth: 1,
		borderColor: '#fff',
		borderStyle: 'solid',
		alignSelf: 'center',
	},
	frameGroup: {
		borderRadius: 12,
		backgroundColor: '#1a1a1a',
		paddingVertical: 0,
		flexDirection: 'column',
		padding: 12,
		justifyContent: 'space-between',
	},
	fee: {
		marginLeft: 4,
		fontFamily: 'Poppins-Regular',
		textAlign: 'left',
		fontSize: 14,
		// lineHeight: 20,
		color: '#fff',
	},
	iconWrapperGroup: {
		width: 191,
		flexDirection: 'row',
		alignItems: 'center',
	},
	stx1: {
		letterSpacing: 1,
		lineHeight: 24,
		fontSize: 16,
		fontFamily: 'Poppins-Regular',
		textAlign: 'left',
		color: '#fff',
	},
	frameContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	frameParent: {
		paddingHorizontal: 24,
		paddingVertical: 0,
	},
	labelText3: {
		color: '#131313',
		fontSize: 16,
		lineHeight: 20,
		letterSpacing: 0,
		textAlign: 'center',
	},
	buttonclassic1: {
		height: 48,
		paddingHorizontal: 20,
		justifyContent: 'center',
		paddingVertical: 0,
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignSelf: 'stretch',
		alignItems: 'center',
	},
	buttonclassicWrapper: {
		paddingHorizontal: 24,
		paddingVertical: 0,
		alignSelf: 'stretch',
	},
	sendInner: {
		paddingBottom: 24,
		alignSelf: 'stretch',
	},
	send: {
		backgroundColor: '#131313',
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
});

export default ShowReceive;
