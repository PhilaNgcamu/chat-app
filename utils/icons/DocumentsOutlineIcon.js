import React from "react";
import { SvgXml } from "react-native-svg";

const DocumentsOutlineIcon = () => {
  const xml = `<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 17L5 9C5 6.79086 6.79086 5 9 5L15 5M5 17C5 19.2091 6.79086 21 9 21H11.3431C12.404 21 13.4214 20.5786 14.1716 19.8284L17.8284 16.1716C18.5786 15.4214 19 14.404 19 13.3431V9C19 6.79086 17.2091 5 15 5M5 17C2.79086 17 1 15.2091 1 13L1 5C1 2.79086 2.79086 1 5 1L11 1C13.2091 1 15 2.79086 15 5M13 21V19C13 16.7909 14.7909 15 17 15H19" stroke="#797C7B" stroke-width="1.5" stroke-linejoin="round" />
</svg>`;
  return <SvgXml xml={xml} />;
};

export default DocumentsOutlineIcon;
