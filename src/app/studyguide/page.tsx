"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudyGuidePage() {
  const [inputText, setInputText] = useState("");
  const [studyGuide, setStudyGuide] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Study Guide Generator</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Input Your Study Material</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your notes, textbook content, or any study material here..."
            className="min-h-[200px] mb-4"
          />
          <Button
            onClick={generateStudyGuide}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? "Generating..." : "Generate Study Guide"}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="mb-6 border-red-500">
          <CardContent className="pt-6 text-red-500">{error}</CardContent>
        </Card>
      )}

      {studyGuide && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Study Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap">{studyGuide}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
