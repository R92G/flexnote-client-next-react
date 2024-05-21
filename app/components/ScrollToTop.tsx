"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowUpToLine } from "lucide-react";
import { usePathname } from "next/navigation";

export const ScrollToTop = () => {
  const pathname = usePathname();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Initial scroll if there's a hash in the URL
    if (window.location.hash) {
      handleHashChange();
    }

    // Listen to hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Clean up event listener
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      {showTopBtn && (
        <Button
          onClick={goToTop}
          className="fixed bottom-4 right-4 opacity-90 shadow-md"
          size="icon"
        >
          <ArrowUpToLine className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
