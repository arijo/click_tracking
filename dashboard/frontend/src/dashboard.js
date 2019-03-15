import Click from './models/click.js';
import Sidebar from './dashboard/sidebar.js';

Sidebar.init();

const iframeEl = document.getElementById('site');
iframeEl.setAttribute('src', 'http://' + window.location.hostname + ':3001');
