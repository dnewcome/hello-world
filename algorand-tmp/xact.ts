import { Buffer } from 'buffer';
import algosdk from 'algosdk';
import { getLocalAccounts, getLocalAlgodClient, getLocalKmdClient } from './utils';

const createNewWallet = async (walletName: string) => {
	const password = 'testpassword';
	const kmdClient = getLocalKmdClient();
	// MDK is undefined since we are creating a completely new wallet
	const masterDerivationKey = undefined;
	const driver = 'sqlite';

	const wallet = await kmdClient.createWallet(
	  walletName,
	  password,
	  masterDerivationKey,
	  driver
	);
	const walletID = wallet.wallet.id;
	console.log('Created wallet:', walletID);
}

async function main() {
	console.log('*************');
  const algodClient = getLocalAlgodClient();
  // const kmdClient = getLocalKmdClient();
  const accts = await getLocalAccounts();
  // const acct = kmdClient.initWalletHandle(accts[0].walletId, 'testpassword');
  const acct = accts[0];
  console.log(acct);
  const acct2 = accts[1];

  // example: TRANSACTION_PAYMENT_CREATE
  const suggestedParams = await algodClient.getTransactionParams().do();
  const ptxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: acct.addr,
    suggestedParams,
    to: acct2.addr,
    amount: 10000,
    note: new Uint8Array(Buffer.from('hello world')),
  });
  // example: TRANSACTION_PAYMENT_CREATE

  // example: TRANSACTION_PAYMENT_SIGN
  const signedTxn = ptxn.signTxn(acct.privateKey);
  // example: TRANSACTION_PAYMENT_SIGN

  // example: TRANSACTION_PAYMENT_SUBMIT
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  const result = await algosdk.waitForConfirmation(algodClient, txId, 4);
  console.log(result);
  console.log(`Transaction Information: ${result.txn}`);
  console.log(`Decoded Note: ${Buffer.from(result.txn.txn.note).toString()}`);
  // example: TRANSACTION_PAYMENT_SUBMIT

  // example: ALGOD_FETCH_ACCOUNT_INFO
  const acctInfo = await algodClient.accountInformation(acct.addr).do();
  console.log(`Account balance: ${acctInfo.amount} microAlgos`);
  // example: ALGOD_FETCH_ACCOUNT_INFO
}
main();
// createNewWallet('unencrypted-default-wallet');
