"use client";

import { useEffect, useState } from "react";
import Moon from "./Moon";
import Sun from "./Sun";
import { useUser } from "@clerk/nextjs";

const DarkModeToggler = () => {
  const { user } = useUser();
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const localStorage = window?.localStorage;
  const htmlElement = document.getElementsByTagName("html")[0];

  useEffect(() => {
    if (localStorage?.getItem("darkModeEnabled")) {
      setDarkModeEnabled(true);
    }
  }, [localStorage]);

  useEffect(() => {
    if (user?.unsafeMetadata["Dark Mode"] === undefined) return;
    setDarkModeEnabled(user.unsafeMetadata["Dark Mode"] === true);
  }, [user?.unsafeMetadata]);

  useEffect(() => {
    if (darkModeEnabled) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkModeEnabled, htmlElement]);

  const updateUser = async () => {
    if (user) {
      try {
        const response = await user.update({
          unsafeMetadata: { "Dark Mode": !darkModeEnabled },
        });
        return response;
      } catch (err) {
        console.error("error", err);
      }
    }
  };

  const toggle = async () => {
    if (user) {
      const response = await updateUser();
      if (response) {
        setDarkModeEnabled(response.unsafeMetadata["Dark Mode"] === true);
      }
    } else {
      if (localStorage.getItem("darkModeEnabled")) {
        localStorage.removeItem("darkModeEnabled");
      } else {
        localStorage.setItem("darkModeEnabled", "true");
      }
      setDarkModeEnabled(!darkModeEnabled);
    }
  };

  return (
    <div className="cursor-pointer" onClick={toggle}>
      {darkModeEnabled ? <Sun /> : <Moon />}
    </div>
  );
};

export default DarkModeToggler;
