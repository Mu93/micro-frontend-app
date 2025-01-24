import React, { useRef, useEffect } from "react";
import MarketingMount from "marketingApp/marketingIndex";
console.log("MarketingMount:", MarketingMount);

const MarketingApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      MarketingMount(ref.current);
    }
  }, [ref]);

  return <div ref={ref}></div>;
};

export default MarketingApp;
