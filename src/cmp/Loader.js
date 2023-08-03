import React, { useEffect, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";

const Loader = ({ show }) => {
  
  return show && (
    <div>
      <CirclesWithBar
        height="200"
        width="200"
        color="#31602E"
        wrapperStyle={{}}
        wrapperClass="loader"
        visible={true}
        outerCircleColor="#602E5D"
        innerCircleColor="#3C2E60"
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
      
      
    </div>
  );
};

export default Loader;
