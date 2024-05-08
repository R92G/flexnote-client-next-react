"use client";
import Script from "next/script";

const NotifyScript = () => {
  // scriptElement.src = 'https://noti-widget.vercel.app/assets/index.js'
  // scriptElement.src = 'http://localhost:5173/src/main.ts';
  // scriptElement.src = 'https://r92g.github.io/NotiWidget/assets/index.js'

  return (
    <Script id="Notify">
      {`(function() {
          const scriptElement = document.createElement('script');
          scriptElement.src = 'https://noti-widget.vercel.app/assets/index.js'
          scriptElement.setAttribute('websiteId', 'clvl7c7rk0001xihxoq6j5k18');
          scriptElement.type = 'module'
          document.body.appendChild(scriptElement);
      })();`}
    </Script>
  );
};

export default NotifyScript;
