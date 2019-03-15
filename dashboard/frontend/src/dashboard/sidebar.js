import h337 from 'h337';
import Counter from './counter.js';
import Chart from './chart.js';
import Click from "../models/click";

const Sidebar = {
    init: init
}

const chartPageEl = document.getElementById('chart-page');
const heatmapPageEl = document.getElementById('heatmap-page');
const chartLinkEl = document.getElementById('chart-link');
const heatmapLinkEl = document.getElementById('heatmap-link');
const heatmapEl = document.getElementById('heatmap');

let heatmap = {};

function init() {
    addEventListeners();
    getChart();
    heatmap = h337.create({container: heatmapEl});
}

function getChart(ev) {
    if (ev) ev.preventDefault();
    chartPageEl.classList.remove('hidden');
    heatmapPageEl.classList.add('hidden');
    Click.count().then(click => Counter(click.count));
    Click.aggregate().then(clicks => Chart(clicks));
}

function getHeatmap(ev) {
    if (ev) ev.preventDefault();
    chartPageEl.classList.add('hidden');
    heatmapPageEl.classList.remove('hidden');
    Click.heatmap().then(clicks => {
        clicks = adjustForWidth(clicks);
        heatmap.setData({data: clicks, max: Math.max.apply(Math, clicks.map(c => c.x))});
    });

    function adjustForWidth(clicks) {
        return clicks.map(click => {
            const adjustment = { x: click.x * 0.9 };
            return { ...click, ...adjustment };
        });
    }
}

function addEventListeners() {
    chartLinkEl.addEventListener('click', getChart);
    heatmapLinkEl.addEventListener('click', getHeatmap);
}

export default Sidebar;