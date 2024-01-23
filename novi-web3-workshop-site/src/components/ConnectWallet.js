import React from "react";

const ConnectWallet = ({ connect }) => {
  return (
    <>
      <div className="connect-text">
        <div> Connect your 🦊 Metamask </div>
      </div>
      <div className="button connect" onClick={connect}>
        <h3>Connect Wallet</h3>
      </div>
    </>
  );
};

export default ConnectWallet;
