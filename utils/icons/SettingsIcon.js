import React from "react";
import { SvgXml } from "react-native-svg";

const SettingsIcon = ({ color }) => {
  const xml = `
 <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.9192 4.33337H12.0808C11.0655 4.33337 10.2424 5.10941 10.2424 6.06671C10.2424 7.16219 9.0703 7.85866 8.10814 7.3349L8.01042 7.2817C7.13113 6.80305 6.00679 7.08711 5.49913 7.91615L4.57993 9.41726C4.07228 10.2463 4.37354 11.3064 5.25283 11.785C6.21545 12.309 6.21545 13.691 5.25283 14.215C4.37354 14.6937 4.07228 15.7538 4.57993 16.5828L5.49913 18.0839C6.00679 18.913 7.13113 19.197 8.01042 18.7184L8.10814 18.6652C9.0703 18.1414 10.2424 18.8379 10.2424 19.9334C10.2424 20.8907 11.0655 21.6667 12.0808 21.6667H13.9192C14.9345 21.6667 15.7576 20.8907 15.7576 19.9334C15.7576 18.8379 16.9297 18.1414 17.8919 18.6652L17.9896 18.7184C18.8689 19.197 19.9932 18.913 20.5009 18.0839L21.4201 16.5828C21.9277 15.7538 21.6264 14.6937 20.7472 14.215C19.7846 13.691 19.7846 12.309 20.7472 11.785C21.6264 11.3064 21.9277 10.2463 21.4201 9.41727L20.5009 7.91616C19.9932 7.08712 18.8689 6.80307 17.9896 7.28171L17.8919 7.33491C16.9297 7.85867 15.7576 7.16219 15.7576 6.06671C15.7576 5.10941 14.9345 4.33337 13.9192 4.33337Z" stroke="${color}" stroke-width="1.5" stroke-linejoin="round" />
  <circle cx="13" cy="13" r="3.25" stroke="${color}" stroke-width="1.5" />
</svg>
  `;
  return <SvgXml xml={xml} />;
};

export default SettingsIcon;