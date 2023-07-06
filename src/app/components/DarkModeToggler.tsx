"use client";

import { ChangeEvent, useEffect, useState } from "react";

const DarkModeToggler = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [localStorage, setLocalStorage] = useState<Storage>();

  useEffect(() => {
    setLocalStorage(() => window.localStorage);
  }, []);

  useEffect(() => {
    if (localStorage && localStorage.getItem("darkModeEnabled")) {
      setDarkModeEnabled(true);
      document.getElementsByTagName("html")[0].classList.add("dark");
    }
  }, [localStorage]);

  const toggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (localStorage) {
      const checked = e.target.checked;
      setDarkModeEnabled(checked);
      if (checked) {
        localStorage.setItem("darkModeEnabled", "true");
        document.getElementsByTagName("html")[0].classList.add("dark");
      } else {
        localStorage.removeItem("darkModeEnabled");
        document.getElementsByTagName("html")[0].classList.remove("dark");
      }
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={darkModeEnabled}
        className="sr-only peer"
        onChange={toggle}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
    </label>
  );
};

export default DarkModeToggler;
