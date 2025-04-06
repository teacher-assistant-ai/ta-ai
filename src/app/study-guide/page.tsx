"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function StudyGuidePage() {
  const [inputText, setInputText] = useState("");
  const [studyGuide, setStudyGuide] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeInput, setActiveInput] = useState<"text" | "file" | "url">(
    "text"
  );
  const [inputUrl, setInputUrl] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleReset = () => {
    setInputText("");
    setStudyGuide(null);
    setError(null);
    setFileName(null);
    setInputUrl("");
    setFileError(null);
  };

  const validateFile = (file: File): boolean => {
    setFileError(null);

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError("Please upload a PDF or Word document.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must be less than 10MB.");
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) return;

    if (!validateFile(file)) {
      setFileName(null);
      return;
    }

    setFileName(file.name);

    try {
      const fileContent = await file.text();
      setInputText(fileContent);
    } catch (err) {
      console.error("Error reading file:", err);
      setFileError("Error reading file. Please try again.");
      setFileName(null);
    }
  };

  const generateStudyGuide = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let textToProcess = "";

      if (activeInput === "text") {
        textToProcess = inputText;
      } else if (activeInput === "file" && fileName) {
        textToProcess = inputText; // We already set this from file content
      } else if (activeInput === "url") {
        // URL handling will be implemented later
        throw new Error("URL processing not implemented yet");
      }

      const response = await fetch("../api/study-guide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textToProcess }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate study guide");
      }

      const data = await response.json();
      setStudyGuide(data.studyGuide);
    } catch (error) {
      console.error("Error generating study guide:", error);
      setError("Failed to generate study guide. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (studyGuide) {
      try {
        await navigator.clipboard.writeText(studyGuide);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#CAD2C5]">
      <div className="fixed top-4 left-4">
        <span className="text-xl font-bold text-[#2F3E46]">ta.ai</span>
      </div>
      <div className="container mx-auto px-4 pt-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#2F3E46]">
          Study Guide Generator
        </h1>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* PDF/Doc Option */}
          <button
            onClick={() => setActiveInput("file")}
            className={`p-4 rounded-lg border transition-all h-24 ${
              activeInput === "file"
                ? "border-[#52796F] bg-white shadow-md scale-[1.02] transform"
                : "border-[#B8BFB3] bg-white hover:bg-[#354F52]/10 hover:border-[#84A98C] hover:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg
                  className="w-6 h-6 mx-auto mb-1 text-[#52796F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="font-medium text-sm text-[#2F3E46]">PDF/Doc</h3>
                <p className="text-xs text-[#354F52]">Notes, papers</p>
              </div>
            </div>
          </button>

          {/* Plain Text Option */}
          <button
            onClick={() => setActiveInput("text")}
            className={`p-4 rounded-lg border transition-all h-24 ${
              activeInput === "text"
                ? "border-[#52796F] bg-white shadow-md scale-[1.02] transform"
                : "border-[#B8BFB3] bg-white hover:bg-[#354F52]/10 hover:border-[#84A98C] hover:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg
                  className="w-6 h-6 mx-auto mb-1 text-[#52796F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <h3 className="font-medium text-sm text-[#2F3E46]">
                  Plain Text
                </h3>
                <p className="text-xs text-[#354F52]">Copy & paste</p>
              </div>
            </div>
          </button>

          {/* URL Option */}
          <button
            onClick={() => setActiveInput("url")}
            className={`p-4 rounded-lg border transition-all h-24 ${
              activeInput === "url"
                ? "border-[#52796F] bg-white shadow-md scale-[1.02] transform"
                : "border-[#B8BFB3] bg-white hover:bg-[#354F52]/10 hover:border-[#84A98C] hover:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg
                  className="w-6 h-6 mx-auto mb-1 text-[#52796F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <h3 className="font-medium text-sm text-[#2F3E46]">URL</h3>
                <p className="text-xs text-[#354F52]">Input link</p>
              </div>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="border-b border-[#B8BFB3] p-6">
            <h2 className="text-xl font-semibold text-[#354F52]">
              {activeInput === "file"
                ? "Upload Your Document"
                : activeInput === "url"
                ? "Enter URL"
                : "Input Your Study Material"}
            </h2>
          </div>
          <div className="p-6">
            {activeInput === "text" && (
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your notes, textbook content, or any study material here..."
                className="w-full min-h-[200px] p-4 mb-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:border-[#52796F]"
              />
            )}
            {activeInput === "file" && (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#B8BFB3] rounded-lg p-8 mb-4">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg
                    className="w-12 h-12 text-[#52796F] mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-[#2F3E46] font-medium mb-1">
                    {fileName || "Click to upload or drag and drop"}
                  </span>
                  <span className="text-sm text-[#354F52]">
                    PDF, DOC up to 10MB
                  </span>
                </label>
              </div>
            )}
            {activeInput === "url" && (
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter the URL of your study material..."
                className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:border-[#52796F]"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={generateStudyGuide}
                disabled={
                  (activeInput === "text" && !inputText.trim()) ||
                  (activeInput === "url" && !inputUrl.trim()) ||
                  (activeInput === "file" && !fileName) ||
                  isLoading
                }
                className="px-4 py-2 bg-[#84A98C] text-white rounded-lg hover:bg-[#52796F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
              >
                {isLoading ? "Generating..." : "Generate Study Guide"}
              </button>
              <button
                onClick={handleReset}
                disabled={
                  isLoading ||
                  (!inputText &&
                    !studyGuide &&
                    !error &&
                    !fileName &&
                    !inputUrl)
                }
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-white rounded-lg shadow-md mb-6 p-6 border-l-4 border-red-500">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {fileError && (
          <div className="bg-white rounded-lg shadow-md mb-6 p-6 border-l-4 border-red-500">
            <p className="text-red-500">{fileError}</p>
          </div>
        )}

        {studyGuide && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-[#B8BFB3] p-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#354F52]">
                Generated Study Guide
              </h2>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-sm border border-[#B8BFB3] rounded-lg hover:bg-[#CAD2C5] transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="p-6">
              <div className="prose prose-slate max-w-none text-[#2F3E46]">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1
                        className="text-[#354F52] text-2xl font-bold mb-4"
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        className="text-[#354F52] text-xl font-bold mb-3"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-[#354F52] text-lg font-bold mb-2"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-[#2F3E46] mb-4" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc list-inside mb-4" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal list-inside mb-4"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="text-[#2F3E46] mb-1" {...props} />
                    ),
                  }}
                >
                  {studyGuide}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
