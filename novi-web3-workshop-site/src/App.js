import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import nftImage from "./assets/first.png";
import StartMinting from "./components/StartMinting";
import InProgressMinting from "./components/InProgressMinting";
import CompletedMinting from "./components/CompletedMinting";
import { ethers } from "ethers";
import abi from "./manual/abi.json";

// Step 1: Let's run the app (npm run start)

function App() {
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [contract, setContract] = useState();
  const [contractAddress, setContractAddress] = useState(
    "0x9499BE9aa57f9797FbAD1A1f13832b55712706e1"
  );
  const [supply, setSupply] = useState(0);
  const [hash, setHash] = useState();
  const [account, setAccount] = useState(() => {
    const storedAccount = localStorage.getItem("walletAccount");
    return storedAccount ? JSON.parse(storedAccount) : null;
  });

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      const walletAccount = accounts[0];
      console.log("🦊 Wallet Account: ", walletAccount);
      setAccount(walletAccount);

      localStorage.setItem("walletAccount", JSON.stringify(walletAccount));
    } catch (error) {
      console.error("❌🌐🦊 Error connecting to Metamask:", error);
    }
  };

  const getContract = async () => {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(account);
      let NFTContract = new ethers.Contract(contractAddress, abi, signer);
      setContract(NFTContract);
      const totalSupply = await NFTContract.totalSupply();
      setSupply(totalSupply.toNumber());
    }
  };

  useEffect(() => {
    if (account) {
      getContract();
    }
  }, [account]);

  const mint = async () => {
    if (contract) {
      const payload = { value: ethers.utils.parseEther("0.001") };
      const transaction = await contract.safeMint(payload);
      console.log("🐲HASH: ", transaction.hash);
      setHash(transaction.hash);

      setInProgress(true);
      await transaction.wait();
      setInProgress(false);
      setCompleted(true);
    } else {
      console.log("❗📝 There's no contract yet!");
    }
  };

  useEffect(() => {
    const handleAccountsChanged = (newAccounts) => {
      if (newAccounts.length === 0) {
        localStorage.removeItem("walletAccount");
        setAccount(null);
        setContract(null);
        setSupply(0);
      } else {
        const newAccount = newAccounts[0];
        localStorage.setItem("walletAccount", JSON.stringify(newAccount));
        setAccount(newAccount);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    return () => {
      window.ethereum.off("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const getState = () => {
    if (inProgress) {
      // Step 7c: Pass the hash as a prop
      return <InProgressMinting hash={hash} />;
    }

    if (completed) {
      // Step 7d: Pass contract address as prop
      return <CompletedMinting address={contractAddress} />;
    }

    // Step 7b: Pass the mint function as a prop
    return <StartMinting mint={mint} />;
  };

  const ConnectWallet = () => {
    return (
      <div>
        <div className="connect-text">
          <div> Connect your 🦊 Metamask </div>
        </div>
        <div className="button connect" onClick={connect}>
          <h3>Connect Wallet</h3>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <Header />
      <div className="hero">
        <div className="card">
          <div className="card-main">
            <div className="card-details">
              <div className="details-header">
                <h1> Novi's 1st NFT Collection:</h1>
              </div>
              <div className="details-description">
                <h2>Novi Developers</h2>
              </div>
              <div className="details-actions">
                <p> {supply} / 20 minted </p>
                {/* Step 3: Render a connect button conditionally with text */}
                {account ? getState() : <ConnectWallet />}
                {/* Step 4: Render a connect button conditionally with getState() */}
                {/* <ConnectWallet /> */}
              </div>
            </div>
            <div className="nft">
              <img className="nft-image" src={nftImage} alt="NFT-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
