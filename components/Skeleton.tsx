"use client";
// ACED — Skeleton
// Reusable skeleton loading components

export function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`aced-skeleton h-4 ${className}`} />;
}

export function SkeletonCircle({ size = 40 }: { size?: number }) {
  return (
    <div
      className="aced-skeleton rounded-full shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <SkeletonCircle size={44} />
          <div className="space-y-2">
            <SkeletonLine className="w-24" />
            <SkeletonLine className="w-16 h-3" />
          </div>
        </div>
        <div className="space-y-1.5 text-right">
          <SkeletonLine className="w-16 h-5" />
          <SkeletonLine className="w-12 h-2" />
        </div>
      </div>
      <div className="flex gap-1.5">
        <SkeletonLine className="w-16 h-5 rounded-full" />
        <SkeletonLine className="w-20 h-5 rounded-full" />
      </div>
      <div className="flex gap-1.5">
        <SkeletonLine className="w-14 h-4 rounded-full" />
        <SkeletonLine className="w-18 h-4 rounded-full" />
      </div>
      <SkeletonLine className="w-full h-10 rounded-[var(--radius-aced)]" />
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonLine className="w-48 h-7" />
          <SkeletonLine className="w-32 h-4" />
        </div>
        <SkeletonLine className="w-28 h-10 rounded-[var(--radius-aced)]" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5 flex items-center gap-4">
            <SkeletonCircle size={40} />
            <div className="space-y-1.5">
              <SkeletonLine className="w-14 h-5" />
              <SkeletonLine className="w-20 h-3" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <SkeletonLine className="w-32 h-5" />
          {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5 space-y-4">
            <SkeletonLine className="w-28 h-5" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <SkeletonCircle size={32} />
                <div className="flex-1 space-y-1.5">
                  <SkeletonLine className="w-full h-3" />
                  <SkeletonLine className="w-2/3 h-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonSearch() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <SkeletonLine className="w-full h-14 rounded-[var(--radius-aced)]" />
      <div className="flex gap-2">
        {[...Array(6)].map((_, i) => (
          <SkeletonLine key={i} className="w-16 h-8 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-5">
            <div className="flex items-start gap-4">
              <SkeletonCircle size={64} />
              <div className="flex-1 space-y-3">
                <SkeletonLine className="w-40 h-6" />
                <div className="flex gap-3">
                  <SkeletonLine className="w-24 h-4" />
                  <SkeletonLine className="w-20 h-4" />
                  <SkeletonLine className="w-28 h-4" />
                </div>
              </div>
            </div>
            <SkeletonLine className="w-full h-4" />
            <SkeletonLine className="w-3/4 h-4" />
          </div>
          <div className="bg-aced-text rounded-[var(--radius-aced-lg)] aspect-video" />
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-5">
            <SkeletonLine className="w-24 h-8 mx-auto" />
            <SkeletonLine className="w-full h-14 rounded-[var(--radius-aced)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonAuth() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-aced-text items-center justify-center p-12">
        <div className="space-y-8 max-w-sm">
          <SkeletonCircle size={64} />
          <div className="space-y-3">
            <SkeletonLine className="w-48 h-9 bg-white/10" />
            <SkeletonLine className="w-32 h-9 bg-white/10" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12 bg-gray-50/50">
        <div className="w-full max-w-md space-y-6 py-8">
          <SkeletonLine className="w-32 h-8" />
          <SkeletonLine className="w-full h-12 rounded-[var(--radius-aced)]" />
          <SkeletonLine className="w-full h-12 rounded-[var(--radius-aced)]" />
          <SkeletonLine className="w-full h-14 rounded-[var(--radius-aced)]" />
        </div>
      </div>
    </div>
  );
}
