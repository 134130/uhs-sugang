const _timer = document.querySelector('#timer');

setInterval(() => {
    let now = new Date();
    let str = `${now.toLocaleString()}`;
    _timer.textContent = str;
}, 100);
