import React from "react";

const CompletedMinting = ({ address }) => {
  const viewOpenSea = () => {
    // For Demo
    // const url = "https://testnets.opensea.io/mumbai/novi-developers-final";

    // Step 14: In case you DON'T SEE your collection on Testnet OpenSea
    const url = `https://testnets.opensea.io/assets/mumbai/${address}/`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="minting-success-text">
        All set! Your NFT has been minted.
      </div>
      <div className="button check-opensea" onClick={viewOpenSea}>
        <h3>View 🖼️ at Testnet Opensea</h3>
      </div>
    </>
  );
};

export default CompletedMinting;
