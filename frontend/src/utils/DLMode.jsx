// src/components/ThemeToggle.jsx
import { useEffect, useState } from 'react';
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";


const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Apply the theme to the document root
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Toggle between dark and light
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded font-bold bg-gray-400 dark:bg-gray-700  dark:text-gray-100"
        >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
    );
};

export default ThemeToggle;
