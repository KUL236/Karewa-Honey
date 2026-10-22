// EmailJS settings for ALL enquiries (https://www.emailjs.com).
// Values come from environment variables (Netlify: Site settings -> Environment variables, or a local .env file).
// They are baked in at BUILD time, so after adding/changing them you must trigger a NEW deploy (Clear cache and deploy site).
// See .env.example for the exact names. The EmailJS public key is meant to be public (it is not a secret).
const E = import.meta.env || {};
const v = k => String(E[k] || '').trim().replace(/^["']|["']$/g, '');
const one = v('VITE_EMAILJS_TEMPLATE_ID');   // optional: ONE template for everything
export const EMAILJS = {
  serviceId: v('VITE_EMAILJS_SERVICE_ID'),
  publicKey: v('VITE_EMAILJS_PUBLIC_KEY'),
  toEmail: v('VITE_EMAILJS_TO_EMAIL') || 'Karewabee@gmail.com',
  templates: {
    website: v('VITE_EMAILJS_TEMPLATE_WEBSITE') || one,     // contact page form
    wholesale: v('VITE_EMAILJS_TEMPLATE_WHOLESALE') || one, // bulk / wholesale enquiries
    chatbot: v('VITE_EMAILJS_TEMPLATE_CHATBOT') || one,     // enquiry sent from the chat window
    fallback: one || v('VITE_EMAILJS_TEMPLATE_WEBSITE')     // used when a template above is empty
  }
};
