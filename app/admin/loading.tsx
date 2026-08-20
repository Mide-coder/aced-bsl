"use client";
export default function Loading() {
  return (
    <div className="min-h-screen bg-page-gradient flex items-center justify-center">
      <div className="w-16 h-16 bg-gradient-to-br from-aced-royal to-aced-blue rounded-2xl rotate-6 flex items-center justify-center shadow-2xl animate-pulse">
        <span className="text-white font-bold text-2xl font-mono">AC</span>
      </div>
    </div>
  );
}
