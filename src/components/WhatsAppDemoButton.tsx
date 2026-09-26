"use client";

import { useState } from "react";

// The concept has no real WhatsApp number, so the button explains that instead of opening a chat.
export function WhatsAppDemoButton({ label, note }: { label: string; note: string }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setShown(true)}
        className="flex h-14 items-center justify-between bg-sign px-[18px] text-left text-[17px] font-extrabold text-ink lg:h-auto lg:px-6 lg:py-5 lg:text-[19px]"
      >
        <span>{label}</span>
        <span aria-hidden="true">→</span>
      </button>
      <p role="status" className="text-sm text-on-ink-muted">
        {shown ? note : ""}
      </p>
    </div>
  );
}
