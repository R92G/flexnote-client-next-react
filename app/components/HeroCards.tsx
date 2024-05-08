import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import NotificationHeroCard from "./NotificationHeroCard";
import BrowserMock from "./BrowserMock";

export const HeroCards = () => {
  const notifications = [
    {
      alt: "Instagram Logo",
      imgUrl: "/hero/instagram.jpeg",
      message: "Follow us on Instagram",
      sender: "Thanks for your purchase!",
    },
    {
      alt: "Savaya beach club logo",
      imgUrl: "/hero/savaya.jpg",
      message: "Make your reservation now",
      sender: "Weather forecast - 29°C ☀️",
    },
    {
      alt: "Golden Retriever",
      imgUrl: "/hero/golden-retriever-min.jpg",
      message: "Only one item left in stock!",
      sender: "Layla from Petshop",
    },
    {
      alt: "Google Logo",
      imgUrl: "/hero/googleLogo.jpg",
      message: "Thank you for the provid...",
      sender: "New review (5/5⭐)",
    },
    {
      alt: "Chef Icon",
      imgUrl: "/hero/chef-min.jpg",
      message: "Click here to see our new menu!",
      sender: "Chef Specials",
    },
  ];

  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotificationIndex((prevIndex) =>
          prevIndex === notifications.length - 1 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 500); // Duration of hiding the card
    }, 5000); // Interval between notifications

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center relative flex-1">
      <BrowserMock />
      <Card
        className={`w-[340px] drop-shadow-xl absolute shadow-black/10 dark:shadow-white/10 mt-16 lg:mt-0 ${
          isVisible
            ? "animate-in slide-in-from-right"
            : "animate-out slide-out-from-right"
        }`}
      >
        <CardContent className="p-0">
          <NotificationHeroCard
            alt={notifications[currentNotificationIndex].alt}
            imgUrl={notifications[currentNotificationIndex].imgUrl}
            message={notifications[currentNotificationIndex].message}
            sender={notifications[currentNotificationIndex].sender}
          />
        </CardContent>
      </Card>
    </div>
  );
};
