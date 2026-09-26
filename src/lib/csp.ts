// Content-Security-Policy as a <meta> tag: GitHub Pages cannot send headers. A static export has no
// per-request nonces, so Next's inline bootstrap scripts need 'unsafe-inline'; the policy still blocks
// every third-party origin. Development mode is left without it because React's dev tools need eval.
export const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

export const cspEnabled = process.env.NODE_ENV === "production";
