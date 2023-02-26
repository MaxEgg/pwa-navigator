import React from 'react'
import App from './App'
import { createRoot } from 'react-dom/client';
import './style.scss'

const domNode = document.getElementById('root');
const root = createRoot(domNode as HTMLElement);
root.render(<App />)
