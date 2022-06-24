import { ethers } from "./ethers-5.6.esm.min.js";
import { UsdtAddress, ERC20_ABI, contractAddress, abi } from "./constants.js";
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("connectButton").innerHTML = "Connected";
    console.log("Wallet connected");
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install metamask";
  }
}
async function fund(usdtAmount) {
  if (typeof window.ethereum !== "undefined") {
    //provider
    //signer
    //contract address, abi
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    const UsdtContract = new ethers.Contract(UsdtAddress, ERC20_ABI, signer);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    await contract.approve(contractAddress, usdtAmount);
    const transcationResponse = await contract.buy(usdtAmount);
    console.log(transcationResponse);
  }
}
