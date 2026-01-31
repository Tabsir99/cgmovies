"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  allServers,
  serverDisplayNames,
  serverHasAds,
  serverHas4K,
  ServerName,
} from "@/lib/embed";
import { Monitor, ChevronDown, Check } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function ServerSelector({ className }: { className?: string }) {
  const { selectedServer, setServer } = usePlayerStore.getState();
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Monitor className="h-4 w-4 text-white/60" />
            <span>{serverDisplayNames[selectedServer]}</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-white/40 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-56 p-1 bg-zinc-900 border-white/10 max-h-[300px] overflow-y-auto"
        >
          <div className="flex flex-col">
            {allServers.map((server, index) => {
              const hasAds = serverHasAds[server];
              const has4K = serverHas4K[server];
              const isSelected = selectedServer === server;

              return (
                <button
                  key={server}
                  onClick={() => {
                    setServer(server as ServerName);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded text-sm text-left transition-colors",
                    isSelected
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <span className="text-white/40 text-xs w-5">
                    {index + 1}.
                  </span>
                  <span className="flex-1">{serverDisplayNames[server]}</span>
                  <div className="flex items-center gap-1">
                    {has4K && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-purple-500/20 text-purple-400 rounded">
                        4K
                      </span>
                    )}
                    {!hasAds && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-green-500/20 text-green-400 rounded">
                        No Ads
                      </span>
                    )}
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 text-white/60 ml-1" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
