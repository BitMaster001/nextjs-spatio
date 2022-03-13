import Web3 from "web3";
import erc20ABI from './erc20.abi.json'

export default function TokenList({ data, account }) {
  const web3 = new Web3(Web3.givenProvider);
  const holdingTokens = [];

  if (account) {
    data.map(async (record, idx) => {
      const Token = new web3.eth.Contract(erc20ABI, record.address);
      console.log("account: ", account)
      const balance = await (await Token.methods.balanceOf(account).call())
      if (balance >= 0)
        holdingTokens.push({
          symbol: record.symbol,
          address: record.address
        })
    })
  }

  return holdingTokens.map((token, idx) => <p key={idx}>{token.symbol} - {token.address}</p>)
}