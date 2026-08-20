"use client";
// ACED — SessionModePicker
// Choose between online (Google Meet) or in-person (approved campus location)

import { useState } from "react";
import { Video, MapPin, Link, Building, CheckCircle } from "lucide-react";

interface CampusLocation {
  id: string;
  name: string;
  building: string;
  notes: string;
}

const CAMPUS_LOCATIONS: CampusLocation[] = [
  { id: "loc1", name: "Main Library Reading Room",      building: "Main Library",      notes: "Ground floor, quiet zone" },
  { id: "loc2", name: "Engineering Common Room",         building: "Engineering Block", notes: "1st floor, near lift" },
  { id: "loc3", name: "Student Union Lounge",            building: "Student Centre",    notes: "Upper floor, near cafeteria" },
  { id: "loc4", name: "CS Department Lab",               building: "Science Block",     notes: "Room 312, after 4pm" },
  { id: "loc5", name: "Senate Building Cafe",            building: "Senate Building",   notes: "Ground floor, open area" },
];

type SessionMode = "online" | "in_person";

interface SessionModePickerProps {
  onModeSelect?: (mode: SessionMode, details: string) => void;
}

export function SessionModePicker({ onModeSelect }: SessionModePickerProps) {
  const [mode, setMode] = useState<SessionMode>("online");
  const [meetLink, setMeetLink] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  function handleModeChange(m: SessionMode) {
    setMode(m);
    if (m === "online") {
      onModeSelect?.("online", meetLink);
    } else {
      onModeSelect?.("in_person", selectedLocation);
    }
  }

  function handleLocationSelect(locId: string) {
    setSelectedLocation(locId);
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === locId);
    onModeSelect?.("in_person", loc?.name ?? "");
  }

  return (
    <div className="space-y-4">
      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
        Session Mode
      </label>

      {/* Mode toggle */}
      <div className="grid grid-cols-2 gap-3">
        {([
          { key: "online" as const, icon: Video, label: "Online", desc: "Google Meet" },
          { key: "in_person" as const, icon: MapPin, label: "In Person", desc: "Campus location" },
        ]).map((opt) => {
          const Icon = opt.icon;
          const active = mode === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => handleModeChange(opt.key)}
              className={`py-4 px-4 rounded-[var(--radius-aced)] border-2 text-left transition-all ${
                active
                  ? "border-aced-royal bg-aced-royal/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  active ? "bg-aced-royal/10" : "bg-gray-100"
                }`}>
                  <Icon size={20} className={active ? "text-aced-royal" : "text-gray-400"} />
                </div>
                <div>
                  <p className={`font-bold text-sm ${active ? "text-aced-royal" : "text-aced-text"}`}>
                    {opt.label}
                  </p>
                  <p className="text-[10px] text-gray-400">{opt.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Online: Meet link input */}
      {mode === "online" && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
            <Link size={11} /> Google Meet Link
          </label>
          <input
            type="url"
            placeholder="https://meet.google.com/abc-defg-hij"
            value={meetLink}
            onChange={(e) => {
              setMeetLink(e.target.value);
              onModeSelect?.("online", e.target.value);
            }}
            className="w-full px-4 py-3 rounded-[var(--radius-aced)] border border-gray-200 text-sm outline-none focus:border-aced-royal focus:ring-2 focus:ring-aced-royal/20 bg-white"
          />
          <p className="text-[10px] text-gray-400 ml-1">
            Create a free Meet and paste the link here
          </p>
        </div>
      )}

      {/* In-person: Location picker */}
      {mode === "in_person" && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
            <Building size={11} /> Approved Campus Location
          </label>
          <div className="space-y-2">
            {CAMPUS_LOCATIONS.map((loc) => {
              const selected = selectedLocation === loc.name;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleLocationSelect(loc.id)}
                  className={`w-full text-left p-4 rounded-[var(--radius-aced)] border-2 transition-all ${
                    selected
                      ? "border-aced-royal bg-aced-royal/5"
                      : "border-gray-100 hover:border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-bold text-sm ${selected ? "text-aced-royal" : "text-aced-text"}`}>
                        {loc.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {loc.building} · {loc.notes}
                      </p>
                    </div>
                    {selected && (
                      <CheckCircle size={18} className="text-aced-green shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-400 ml-1">
            📍 Only approved, public on-campus locations
          </p>
        </div>
      )}
    </div>
  );
}
