import React from "react";
import { SvgXml } from "react-native-svg";

const VideoIcon = () => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.125 17.75H5.25C4.007 17.75 3 16.743 3 15.5V8.5C3 7.257 4.007 6.25 5.25 6.25H13.125C14.368 6.25 15.375 7.257 15.375 8.5V15.5C15.375 16.743 14.368 17.75 13.125 17.75Z" stroke="#000E08" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M15.375 13.097L19.17 16.151C19.906 16.744 21 16.22 21 15.275V8.72498C21 7.77998 19.906 7.25598 19.17 7.84898L15.375 10.903" stroke="#000E08" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
  `;
  return <SvgXml xml={xml} />;
};

export default VideoIcon;
