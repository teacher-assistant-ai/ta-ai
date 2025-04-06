'use client';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

export default function GradingPage() {
  const [content, setContent] = useState('');
  const [exam, setExam] = useState('');
  const [answers, setAnswers] = useState('');
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [testFile, setTestFile] = useState<File | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedTest, setSelectedTest] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGrade = async () => {
    setLoading(true);
    setResult('');

    try {
      const payload = {
        content,
        exam,
        answers,
        selectedMaterial,
        selectedTest,
      };

      const res = await fetch('../api/grading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('Response:', data);

      if (res.ok) {
        setResult(data.gradingResult.replaceAll('*', '') || 'No grading result returned.');
      } else {
        setResult(data.error || 'Failed to grade the exam.');
      }
    } catch (error) {
      setResult('Failed to connect to grading service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Grade Exam</h2>

      <textarea
        placeholder="Enter content or material here..."
        className="w-full p-2 border mb-3 rounded"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="mb-3">
        <label className="block mb-1">Upload Material PDF:</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setMaterialFile(e.target.files[0]);
            }
          }}
        />
      </div>

      <textarea
        placeholder="Enter exam questions here..."
        className="w-full p-2 border mb-3 rounded"
        rows={5}
        value={exam}
        onChange={(e) => setExam(e.target.value)}
      />
      <div className="mb-3">
        <label className="block mb-1">Upload Test PDF:</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setTestFile(e.target.files[0]);
            }
          }}
        />
      </div>

      <textarea
        placeholder="Enter answers here..."
        className="w-full p-2 border mb-3 rounded"
        rows={5}
        value={answers}
        onChange={(e) => setAnswers(e.target.value)}
      />

      <div className="mb-3">
        <label className="block mb-1">Select Material:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
        >
          <option value="">-- Select Material --</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1">Select Test:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value)}
        >
          <option value="">-- Select Test --</option>
        </select>
      </div>

      <button
        onClick={handleGrade}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
        disabled={loading}
      >
        {loading ? 'Grading...' : 'Grade Exam'}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
          <h3 className="font-bold mb-2">Result:</h3>
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
