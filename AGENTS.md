# Project Instructions: Dr. Honório Onofre Website

## Contact Form (EmailJS)
- **Approach:** Client-side only (serverless) using `@emailjs/browser`.
- **Dependencies:** `@emailjs/browser` must be used for all contact form submissions.
- **Environment Variables:**
  - `VITE_EMAILJS_SERVICE_ID`: Service ID from EmailJS dashboard.
  - `VITE_EMAILJS_TEMPLATE_ID`: Template ID from EmailJS dashboard.
  - `VITE_EMAILJS_PUBLIC_KEY`: Public Key from EmailJS dashboard.
- **Implementation Details:**
  - Use `emailjs.sendForm` with a `useRef` to the form element.
  - Maintain `formStatus` state (`idle`, `loading`, `success`, `error`) for UI feedback.
  - All form inputs should be required and validated before submission.

## Design & Aesthetics
- **Style:** Minimalist, medical, professional (Apple-inspired).
- **Colors:** Deep blues (`#0f172a`), clean whites, and medical accents (`#0ea5e9`).
- **Typography:** Inter for UI, high-contrast headings.
- **Imagery:** Use high-quality medical photography from Unsplash/Picsum. Always use `referrerPolicy="no-referrer"` on `<img>` tags.
