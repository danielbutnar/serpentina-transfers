// A minimal iCalendar file for "Add to calendar". Times are floating (no time zone), so a calendar
// shows them as the local time the traveller booked.

export type CalendarEvent = { uid: string; title: string; description: string; location: string; date: string; time: string; minutes: number };

function escape(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

function stamp(date: string, time: string): string {
  return `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
}

export function buildIcs(events: CalendarEvent[], now: Date = new Date()): string {
  const created = now
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Serpentina Transfers//Concept//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
  for (const e of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.uid}`,
      `DTSTAMP:${created}`,
      `DTSTART:${stamp(e.date, e.time)}`,
      `DURATION:PT${Math.floor(e.minutes / 60)}H${e.minutes % 60}M`,
      `SUMMARY:${escape(e.title)}`,
      `DESCRIPTION:${escape(e.description)}`,
      `LOCATION:${escape(e.location)}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}
