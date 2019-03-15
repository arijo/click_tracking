const Counter = function(clicks) {
  const counterEl = document.getElementById('counter');
  counterEl.innerText = clicks;
};

export default Counter;