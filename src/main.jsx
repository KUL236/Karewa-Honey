import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LangProvider } from './lib/i18n';
import { Router } from './lib/router';
import { CmsProvider } from './lib/cms';
import App from './App';
import './lib/probe';
import './styles/base.css';
import './styles/sections.css';
import './styles/extra.css';
// Google Translate wraps text nodes; these two guards stop React from crashing when it happens.
if (typeof Node === 'function' && Node.prototype) {
  const rc = Node.prototype.removeChild; Node.prototype.removeChild = function (c) { if (c.parentNode !== this) return c; return rc.apply(this, arguments) };
  const ib = Node.prototype.insertBefore; Node.prototype.insertBefore = function (n, r) { if (r && r.parentNode !== this) return n; return ib.apply(this, arguments) };
}
createRoot(document.getElementById('root')).render(<StrictMode><LangProvider><Router><CmsProvider><App /></CmsProvider></Router></LangProvider></StrictMode>);
