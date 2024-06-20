import React from "react";
import { SvgXml } from "react-native-svg";

const PhoneIcon = () => {
  const xml = `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="22" cy="22" r="22" fill="#051D13" />
  <path d="M31 29V27.3541C31 26.5363 30.5021 25.8008 29.7428 25.4971L27.7086 24.6835C26.7429 24.2971 25.6422 24.7156 25.177 25.646L25 26C25 26 22.5 25.5 20.5 23.5C18.5 21.5 18 19 18 19L18.354 18.823C19.2844 18.3578 19.7029 17.2571 19.3165 16.2914L18.5029 14.2572C18.1992 13.4979 17.4637 13 16.6459 13H15C13.8954 13 13 13.8954 13 15C13 23.8366 20.1634 31 29 31C30.1046 31 31 30.1046 31 29Z" stroke="white" stroke-width="1.5" stroke-linejoin="round" />
</svg>`;
  return <SvgXml xml={xml} />;
};

export default PhoneIcon;
