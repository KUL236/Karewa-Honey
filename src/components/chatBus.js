import { go } from '../lib/router';
// tiny event bus so any button can open the chat with a question or open the enquiry form
export const askChat = q => window.dispatchEvent(new CustomEvent('kh:ask', { detail: q }));
export const openEnquiry = type => { go('/contact#contact'); setTimeout(() => window.dispatchEvent(new CustomEvent('kh:enquiry', { detail: { type } })), 250) };
