/* eslint-disable no-undef */
import WertWidget from '@wert-io/widget-initializer';
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import { v4 as uuidv4 } from 'uuid';

import { Buffer } from 'buffer/';

window.Buffer = Buffer; // needed to use `signSmartContractData` in browser

/* We advise you not to use the private key on the frontend
    It is used only as an example


*/

const options = {
  partner_id: 'default',
  container_id: 'widget',
  click_id: uuidv4(), // unique id of purhase in your system
  width: 400,
  height: 600,
  currency: 'USD',
  commodity: 'ETH',
  commodities: 'BTC,ETH',
  // currency_amount: 100,
  listeners: {
    loaded: () => console.log('loaded'),
  },
};

const options1 = {
  partner_id: 'default',
  container_id: 'widget',
  click_id: uuidv4(), // unique id of purhase in your system
  width: 400,
  height: 600,
  currency: 'USD',
  commodity: 'ETH',
  commodities: 'BTC,ETH',
  // currency_amount: 100,
  listeners: {
    loaded: () => console.log('loaded'),
  },
};


const css_option = {
  partner_id: 'default',
  container_id: 'widget',
  click_id: uuidv4(), // unique id of purhase in your system
  width: 400,
  height: 600,
  currency: 'USD',
  commodity: 'ETH',
  commodities: 'BTC,ETH',
  // currency_amount: 100,
  listeners: {
    loaded: () => console.log('loaded'),
  },
};

if(css_option.container_id != "USD") {
  console.log("Widget console!");
}

if(css_option.partner_id != "default") {
  console.log("This is not a main owner!");
}

if(options.click_id != "widget") {
  console.log("Widget error!");
}

console.log(options);
console.log(options1);
console.log(css_option);

if (window.ethereum) {
  (async () => {
    // Get user address
    const userAccounts = await window.ethereum.request({method: 'eth_requestAccounts'}); 
    const web3 = new Web3(window.ethereum)
    const userAddress = userAccounts[0];
    // Encode the call to mintNFT(address = userAddress, numberOfTokens = 1)
    const sc_input_data = web3.eth.abi.encodeFunctionCall({
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "numberOfTokens",
          "type": "uint256"
        }
      ],
      "name": "mintNFT",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }, [userAddress, 1]);
    const privateKey = '0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3';
    // Create signed SC data for wert-widget
    // Please do this on backend
    const signedData = signSmartContractData({
      address: userAddress, // user's address
      commodity: 'MATIC',
      commodity_amount: '1.5', // the crypto amount that should be send to the contract method
      pk_id: 'key1', // always 'key1'
      sc_address: '0x6af35a72b2490a44c0e88ae635b9b38516544db1', // your SC address
      sc_id: uuidv4(), // must be unique for any request
      sc_input_data,
    }, privateKey);
    const otherWidgetOptions = {
      partner_id: '01GCRJZ1P7GP32304PZCS6RSPD', // your partner id
      container_id: 'widget',
      click_id: uuidv4(), // unique id of purhase in your system
      origin: 'https://sandbox.wert.io', // this option needed only in sandbox
      width: 1400,
      height: 600,
    };
    const nftOptions = {
      extra: {
        item_info: {
          author: "Wert",
          image_url:
            "http://localhost:8765/sample_nft.png",
          name: "Wert Sample NFT",
          seller: "Wert",
        }
      },
    };

    const wertWidget = new WertWidget({
      ...signedData,
      ...otherWidgetOptions,
      ...nftOptions,
    });

    wertWidget.mount();
  })()
}