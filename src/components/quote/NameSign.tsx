"use client";

import { NameSignCard } from "../NameSignCard";
import { useQuote } from "./QuoteProvider";

// The home page's sign, following the name typed in the quote form.
export function NameSign({ size }: { size: "large" | "compact" }) {
  const { name, t } = useQuote();
  return <NameSignCard name={name} placeholder={t.sign.yourName} company={t.sign.company} size={size} />;
}
