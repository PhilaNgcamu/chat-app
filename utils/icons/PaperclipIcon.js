import React from "react";
import { SvgXml } from "react-native-svg";

const PaperclipIcon = () => {
  const xml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.879 8.37503L8.393 13.861C7.567 14.687 7.567 16.027 8.393 16.853V16.853C9.219 17.679 10.559 17.679 11.385 16.853L18.617 9.62103C20.132 8.10603 20.132 5.65003 18.617 4.13503V4.13503C17.102 2.62003 14.646 2.62003 13.131 4.13503L5.899 11.367C3.695 13.571 3.695 17.143 5.899 19.347V19.347C8.103 21.551 11.675 21.551 13.879 19.347L18.268 14.958" stroke="#000E08" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
  return <SvgXml xml={xml} />;
};

export default PaperclipIcon;
