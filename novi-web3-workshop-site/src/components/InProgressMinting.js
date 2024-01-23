import React from "react";
import ReactLoading from "react-loading";

const InProgressMinting = ({ hash }) => {
  const checkPolygonScan = () => {
    const url = "https://mumbai.polygonscan.com/tx/" + hash;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="in-progress-text">
        <div>Your NFT is being minted. Please wait.</div>
      </div>
      <div className="button polygonscan" onClick={checkPolygonScan}>
        <ReactLoading type="bubbles" color="#fff" />
        CHECK POLYGONSCAN
      </div>
    </>
  );
};

export default InProgressMinting;
