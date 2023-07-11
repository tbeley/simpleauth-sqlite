"use client";

import { useEffect, useState } from "react";
import Moon from "./Moon";
import Sun from "./Sun";

const DarkModeToggler = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const themeCheck = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkModeEnabled(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkModeEnabled(false);
    }
  };

  useEffect(() => {
    themeCheck();
  }, [darkModeEnabled]);

  useEffect(() => {
    themeCheck();
  }, []);

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <div className="cursor-pointer" onClick={toggleTheme}>
      {darkModeEnabled ? <Sun /> : <Moon />}
    </div>
  );
};

export default DarkModeToggler;
