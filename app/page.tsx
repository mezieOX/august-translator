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
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200/40 p-8 mt-8 relative">
        {/* Settings Button */}

        {/* Card Title */}
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Translation Studio
        </h2>
        {/* Language Selectors */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-500 mb-2 tracking-widest">
              FROM LANGUAGE
            </label>
            <div className="relative">
              <select
                className="form-select w-full rounded-full border border-blue-200 bg-white/80 px-5 py-3 min-h-[48px] text-base font-semibold text-gray-700 shadow focus:ring-2 focus:ring-blue-400 pr-10 appearance-none"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400" />
            </div>
          </div>
          <div className="flex items-center justify-center my-2 md:my-0">
            <button
              className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all border-4 border-white"
              onClick={swapLanguages}
              title="Swap languages"
            >
              <FaExchangeAlt className="text-xl" />
            </button>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-500 mb-2 tracking-widest">
              TO LANGUAGE
            </label>
            <div className="relative">
              <select
                className="form-select w-full rounded-full border border-purple-200 bg-white/80 px-5 py-3 min-h-[48px] text-base font-semibold text-gray-700 shadow focus:ring-2 focus:ring-purple-400 pr-10 appearance-none"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-purple-400" />
            </div>
          </div>
        </div>
        {/* Source/Translation Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-3 w-3 rounded-full bg-blue-500 inline-block"></span>
              <span className="font-bold text-gray-700">Source Text</span>
            </div>
            <textarea
              className="form-textarea w-full rounded-2xl border border-blue-200 bg-white/80 px-5 py-4 min-h-[160px] text-base font-medium text-gray-700 shadow focus:ring-2 focus:ring-blue-400 resize-y"
              placeholder="Enter text to translate..."
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <div className="text-xs text-gray-400 mt-1 text-right">
              {source.length} characters
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-3 w-3 rounded-full bg-purple-500 inline-block"></span>
              <span className="font-bold text-gray-700">Translation</span>
            </div>
            <textarea
              className="form-textarea w-full rounded-2xl border border-purple-200 bg-white/80 px-5 py-4 min-h-[160px] text-base font-medium text-gray-700 shadow focus:ring-2 focus:ring-purple-400 resize-y"
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
            className="w-full sm:w-auto flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
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
              "Translate Text"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
      {/* Header Bar */}
      <header className="w-full bg-gradient-to-r from-blue-600 to-purple-500 py-4 px-6 flex items-center gap-3 shadow-md">
        <PiTranslateBold className="text-3xl text-white" />
        <span className="text-2xl font-extrabold text-white tracking-wide">
          August Translator
        </span>
      </header>
      {/* Subtitle */}
      <div className="w-full flex justify-center mt-6">
        <p className="text-lg text-gray-600 font-medium bg-white/60 px-6 py-2 rounded-full shadow-sm backdrop-blur-md">
          Experience seamless translation between languages with a beautiful,
          modern interface
        </p>
      </div>
      {/* Main Card */}
      <TranslatorCard />
      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white text-center py-4 mt-12 shadow-inner">
        Powered by August Translate API
      </footer>
    </div>
  );
}
