import React from "react";
import { SvgXml } from "react-native-svg";

const MoreIcon = () => {
  const xml = `
<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="22" cy="22" r="22" fill="#051D13" />
  <path d="M22 24C20.8954 24 20 23.1046 20 22C20 20.8954 20.8954 20 22 20C23.1046 20 24 20.8954 24 22C24 23.1046 23.1046 24 22 24Z" fill="white" />
  <path d="M30 24C28.8954 24 28 23.1046 28 22C28 20.8954 28.8954 20 30 20C31.1046 20 32 20.8954 32 22C32 23.1046 31.1046 24 30 24Z" fill="white" />
  <path d="M14 24C12.8954 24 12 23.1046 12 22C12 20.8954 12.8954 20 14 20C15.1046 20 16 20.8954 16 22C16 23.1046 15.1046 24 14 24Z" fill="white" />
</svg>
  `;
  return <SvgXml xml={xml} />;
};

export default MoreIcon;
