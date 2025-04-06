"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCopy } from "lucide-react";

export default function StudyGuidePage() {
  const [inputText, setInputText] = useState("");
  const [studyGuide, setStudyGuide] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Reset the input text, study guide, and error
  const handleReset = () => {
    setInputText("");
    setStudyGuide(null);
    setError(null);
  };

  const generateStudyGuide = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-study-guide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
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
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-ta-lightest">
      <div className="fixed top-4 left-4">
        <span className="text-ta-darkest text-xl font-bold">TA.ai</span>
      </div>
      <div className="container mx-auto px-4 pt-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-ta-darkest">
          Study Guide Generator
        </h1>

        <Card className="mb-6 bg-ta-lighter border-ta-light">
          <CardHeader>
            <CardTitle className="text-ta-dark">
              Input Your Study Material
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your notes, textbook content, or any study material here..."
              className="min-h-[200px] mb-4 bg-white border-ta-light focus:border-ta-medium focus:ring-ta-medium"
            />
            <div className="flex gap-2">
              <Button
                onClick={generateStudyGuide}
                disabled={!inputText.trim() || isLoading}
                className="bg-ta-medium hover:bg-ta-dark text-white"
              >
                {isLoading ? "Generating..." : "Generate Study Guide"}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                disabled={isLoading || (!inputText && !studyGuide && !error)}
                className="border-ta-medium text-ta-dark hover:bg-ta-light/10"
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="mb-6 border-red-500 bg-ta-lighter">
            <CardContent className="pt-6 text-red-500">{error}</CardContent>
          </Card>
        )}

        {studyGuide && (
          <Card className="bg-ta-lighter border-ta-light">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-ta-dark">
                Generated Study Guide
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-ta-medium text-ta-dark hover:bg-ta-light/10"
                onClick={handleCopy}
              >
                <ClipboardCopy className="h-4 w-4" />
                {copySuccess ? "Copied!" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-ta-darkest">
                {studyGuide}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
