"use client";

import { PiTranslate, PiTranslateBold } from "react-icons/pi";
import { useState } from "react";
import { FaExchangeAlt, FaChevronDown } from "react-icons/fa";
import { HiTranslate } from "react-icons/hi";

const LANGUAGES = [
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian" },
  { code: "am", name: "Amharic" },
  { code: "ar", name: "Arabic" },
  { code: "hy", name: "Armenian" },
  { code: "az", name: "Azerbaijani" },
  { code: "eu", name: "Basque" },
  { code: "be", name: "Belarusian" },
  { code: "bn", name: "Bengali" },
  { code: "bs", name: "Bosnian" },
  { code: "bg", name: "Bulgarian" },
  { code: "ca", name: "Catalan" },
  { code: "ceb", name: "Cebuano" },
  { code: "ny", name: "Chichewa" },
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "co", name: "Corsican" },
  { code: "hr", name: "Croatian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch" },
  { code: "en", name: "English" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian" },
  { code: "tl", name: "Filipino" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "fy", name: "Frisian" },
  { code: "gl", name: "Galician" },
  { code: "ka", name: "Georgian" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "gu", name: "Gujarati" },
  { code: "ht", name: "Haitian Creole" },
  { code: "ha", name: "Hausa" },
  { code: "haw", name: "Hawaiian" },
  { code: "iw", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "hmn", name: "Hmong" },
  { code: "hu", name: "Hungarian" },
  { code: "is", name: "Icelandic" },
  { code: "ig", name: "Igbo" },
  { code: "id", name: "Indonesian" },
  { code: "ga", name: "Irish" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "jw", name: "Javanese" },
  { code: "kn", name: "Kannada" },
  { code: "kk", name: "Kazakh" },
  { code: "km", name: "Khmer" },
  { code: "ko", name: "Korean" },
  { code: "ku", name: "Kurdish (Kurmanji)" },
  { code: "ky", name: "Kyrgyz" },
  { code: "lo", name: "Lao" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvian" },
  { code: "lt", name: "Lithuanian" },
  { code: "lb", name: "Luxembourgish" },
  { code: "mk", name: "Macedonian" },
  { code: "mg", name: "Malagasy" },
  { code: "ms", name: "Malay" },
  { code: "ml", name: "Malayalam" },
  { code: "mt", name: "Maltese" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi" },
  { code: "mn", name: "Mongolian" },
  { code: "my", name: "Myanmar (Burmese)" },
  { code: "ne", name: "Nepali" },
  { code: "no", name: "Norwegian" },
  { code: "ps", name: "Pashto" },
  { code: "fa", name: "Persian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "pa", name: "Punjabi" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "sm", name: "Samoan" },
  { code: "gd", name: "Scots Gaelic" },
  { code: "sr", name: "Serbian" },
  { code: "st", name: "Sesotho" },
  { code: "sn", name: "Shona" },
  { code: "sd", name: "Sindhi" },
  { code: "si", name: "Sinhala" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "so", name: "Somali" },
  { code: "es", name: "Spanish" },
  { code: "su", name: "Sundanese" },
  { code: "sw", name: "Swahili" },
  { code: "sv", name: "Swedish" },
  { code: "tg", name: "Tajik" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "th", name: "Thai" },
  { code: "tr", name: "Turkish" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "uz", name: "Uzbek" },
  { code: "vi", name: "Vietnamese" },
  { code: "cy", name: "Welsh" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "zu", name: "Zulu" },
];

function TranslatorCard() {
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("es");
  const [source, setSource] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const swapLanguages = () => {
    setFrom(to);
    setTo(from);
    setSource(translation);
    setTranslation(source);
    setError("");
  };

  const handleTranslate = async () => {
    setLoading(true);
    setError("");
    setTranslation("");
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: source, from, to }),
      });
      const data = await res.json();
      if (res.ok) {
        setTranslation(data.translation);
      } else {
        setError(data.error || "Translation failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 md:p-7 mt-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 sm:gap-0">
        <h3 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
          Translator
        </h3>
      </div>
      <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-4 mb-4 pb-2">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black">
            From
          </label>
          <div className="relative">
            <select
              className="w-full border rounded px-3 py-2 min-h-[47px] md:min-h-[30px] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 border-gray-300"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="p-2 cursor-pointer border p-2.5 hover:bg-gray-100 mt-2 rounded border-gray-300"
            onClick={swapLanguages}
            title="Swap languages"
          >
            <FaExchangeAlt className="" />
          </button>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black">
            To
          </label>
          <div className="relative">
            <select
              className="w-full border rounded px-3 py-2 min-h-[47px] md:min-h-[30px] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 border-gray-300"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-t border-t-gray-300">
        <div className="pt-7">
          <label className="block text-sm font-medium mb-1">Source Text</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y border-gray-300"
            placeholder="Enter text to translate..."
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div className="md:pt-7">
          <label className="block text-sm font-medium mb-1">Translation</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[200px] bg-gray-50 focus:outline-none resize-y border-gray-300"
            placeholder="Translation will appear here..."
            value={translation}
            readOnly
          />
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm text-center mb-2">{error}</div>
      )}
      <div className="flex justify-center">
        <button
          className="w-full sm:w-auto flex justify-center items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded font-semibold hover:from-blue-700 hover:to-blue-900 disabled:opacity-50 transition-all shadow-md lg:shadow-none"
          onClick={handleTranslate}
          disabled={!source || loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Translating...
            </span>
          ) : (
            "Translate"
          )}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="flex items-center justify-center gap-2">
        <PiTranslateBold className="text-3xl text-black" />
        <h1 className="text-3xl font-bold text-center">Unit Translator</h1>
      </div>
      <p className="text-center pb-3 pt-4 text-gray-400">
        Translate text between multiple languages instantly
      </p>
      <TranslatorCard />
      <footer className="text-center  text-gray-400 mt-8">
        Powered by Unit Translate API
      </footer>
    </div>
  );
}
