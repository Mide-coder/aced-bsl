"use client";
// ACED — TranscriptUpload
// Drag-and-drop transcript upload with preview

import { useState, useRef } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";

interface TranscriptUploadProps {
  onUpload?: (file: File) => void;
}

export function TranscriptUpload({ onUpload }: TranscriptUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    setFile(f);
    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
    onUpload?.(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  return (
    <div className="space-y-3">
      {!file ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-[var(--radius-aced)] p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors
            ${dragging ? "border-aced-royal bg-aced-royal/5" : "border-gray-200 hover:border-aced-blue/40 bg-white"}`}
        >
          <div className="w-12 h-12 rounded-full bg-aced-royal/10 flex items-center justify-center">
            <Upload size={22} className="text-aced-royal" />
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-aced-text">Drop your transcript here</p>
            <p className="text-sm text-gray-400 mt-1">or click to browse — PDF, JPG, PNG · max 5 MB</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
        </div>
      ) : (
        <div className="flex items-center gap-4 p-4 bg-aced-green/5 border border-aced-green/20 rounded-[var(--radius-aced)]">
          {preview ? (
            <img src={preview} alt="Transcript preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
          ) : (
            <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
              <FileText size={28} className="text-aced-royal" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-aced-green shrink-0" />
              <p className="font-bold text-sm text-aced-text truncate">{file.name}</p>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{(file.size / 1024).toFixed(0)} KB · Ready to submit</p>
          </div>
          <button
            onClick={() => { setFile(null); setPreview(null); }}
            className="p-1.5 rounded-full text-gray-300 hover:text-aced-red hover:bg-red-50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
