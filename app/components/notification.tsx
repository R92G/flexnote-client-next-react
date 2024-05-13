import React, { useEffect } from "react";
import "./notification.css";
import { toast } from "sonner";

interface NotificationProps {
  isNotificationVisible: boolean;
  setIsNotificationVisible: (value: boolean) => void;
  imgUrl?: string;
  sender: string;
  message: string;
  link: string;
  showTimeInMs: number;
  delayInMs: number;
}

const Notification = ({
  isNotificationVisible,
  setIsNotificationVisible,
  imgUrl,
  sender,
  message,
  link,
  showTimeInMs,
  delayInMs,
}: NotificationProps) => {
  const handleOnClick = () => {
    if (!link) {
      return;
    }
    toast.success(`This will link to ${link}`);
  };

  // Adjust the transform based on the visibility state
  const notificationStyle = {
    transform: isNotificationVisible ? "translateX(0%)" : "translateX(120%)",
    transition: "transform 0.5s ease-in-out", // Adjust timing to your preference
    cursor: "pointer",
  };

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    if (isNotificationVisible) {
      // Set the timer to hide the notification after the showTimeInMs
      hideTimer = setTimeout(() => {
        setIsNotificationVisible(false);
      }, showTimeInMs);
    }

    return () => {
      clearTimeout(hideTimer);
    };
  }, [isNotificationVisible, setIsNotificationVisible, showTimeInMs]);

  return (
    <div id="notification-area123" style={notificationStyle}>
      <div onClick={handleOnClick} className="notification123">
        {imgUrl && <img src={imgUrl} alt="Notification123 Icon" />}
        <div
          onClick={(e: any) => {
            e.stopPropagation();
            setIsNotificationVisible(false);
          }}
          className="close--icon123"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="15"
            height="15"
          >
            <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
          </svg>
        </div>
        <div className="content-wrapper123">
          <div className="sender123">{sender}</div>
          <div className="message123">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
