import React from "react";

const StartMinting = ({ mint }) => {
  return (
    <>
      <div className="minting-text">
        <div> Start minting your NFT!</div>
      </div>
      <div onClick={mint} className="button start-minting">
        <h3>🍬 Mint a NFT</h3>
      </div>
    </>
  );
};

export default StartMinting;
