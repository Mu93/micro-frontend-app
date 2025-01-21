import React, { useRef, useEffect } from "react";
import mount from "marketingApp/marketingIndex";

const MarketingApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      mount(ref.current);
    }
  }, []);

  return <div ref={ref}></div>;
};

export default MarketingApp;
