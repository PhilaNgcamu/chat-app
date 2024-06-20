import React from "react";
import { SvgXml } from "react-native-svg";

const GroupIcon = () => {
  const xml = `
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="13" cy="13" r="10.8333" stroke="#797C7B" stroke-width="1.5" stroke-linejoin="round" />
  <path d="M12.3258 16.4167C11.3269 15.5575 10.1776 15.0682 8.95454 15.0682C7.73152 15.0682 6.58215 15.5575 5.58333 16.4167" stroke="#797C7B" stroke-width="0.933566" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M21.039 16.4167C20.0402 15.5575 18.8909 15.0682 17.6678 15.0682C16.4448 15.0682 15.2954 15.5575 14.2966 16.4167" stroke="#797C7B" stroke-width="0.933566" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="2.02273" cy="2.02273" r="2.02273" transform="matrix(1 0 0 -1 6.93182 13.0454)" stroke="#797C7B" stroke-width="0.933566" stroke-linejoin="round" />
  <circle cx="2.02273" cy="2.02273" r="2.02273" transform="matrix(1 0 0 -1 15.6451 13.0454)" stroke="#797C7B" stroke-width="0.933566" stroke-linejoin="round" />
</svg>
  `;
  return <SvgXml xml={xml} />;
};

export default GroupIcon;
