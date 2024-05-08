import React from "react";
import "./notificationHero.css";

interface NotificationHeroCardProps {
  alt: string;
  imgUrl: string;
  sender: string;
  message: string;
}

const NotificationHeroCard = ({
  alt,
  imgUrl,
  sender,
  message,
}: NotificationHeroCardProps) => {
  return (
    <div className="notification444">
      {imgUrl && <img className="object-contain" src={imgUrl} alt={alt} />}
      <div className="close--icon444 text-foreground dark:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="15"
          height="15"
          fill="currentColor"
        >
          <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
        </svg>
      </div>
      <div className="content-wrapper444">
        <div className="sender444">{sender}</div>
        <hr />
        <div className="message444">{message}</div>
      </div>
    </div>
  );
};

export default NotificationHeroCard;
