import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import nftImage from "./assets/first.png";
import StartMinting from "./components/StartMinting";
import InProgressMinting from "./components/InProgressMinting";
import CompletedMinting from "./components/CompletedMinting";
import { ethers } from "ethers";

// Step 1: Let's run the app (npm run start)

function App() {
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [contract, setContract] = useState();
  const [contractAddress, setContractAddress] = useState(
    "0x945E2FF35Fc2591f310b89Ac8633fe004e2CeE93"
  );
  const [supply, setSupply] = useState(0);
  const [hash, setHash] = useState();
  const [account, setAccount] = useState(() => {
    const storedAccount = localStorage.getItem("walletAccount");
    return storedAccount ? JSON.parse(storedAccount) : null;
  });

  const connect = async () => {
    try {
      // Step 2: Get Metamask account
    } catch (error) {
      console.error("❌🌐🦊 Error connecting to Metamask:", error);
    }
  };

  const getContract = async () => {
    // Step 4b: Connect to provider, signer.
    // Step 4c: Get the contract with contractAddress, abi, signer.
    // Step 4d: Set the contract;
    // Step 5a: Get the total supply of minted NFT's
    // Step 5b: Set the total supply
  };

  useEffect(() => {
    if (account) {
      // Step 4a: Get contract
    }
  }, [account]);

  const mint = async () => {
    if (contract) {
      // Step 6a: Write the payload
      // Step 6b: Use the safeMint() from the contract
      // Step 6c: Set the transaction hash

      setInProgress(true);
      // Step 5d: Await the transaction after set in Progress
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
      return <InProgressMinting />;
    }

    if (completed) {
      // Step 7d: Pass contract address as prop
      return <CompletedMinting />;
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
                {/* Step 4: Render a connect button conditionally with getState() */}
                <ConnectWallet />
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
