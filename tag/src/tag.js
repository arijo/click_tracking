const API = { url: 'http://' + window.location.hostname + ':3000/click' };

document.addEventListener('click', (event) => {
    const { pageX, pageY } = event;
    send(API.url, { pageX, pageY });
});

function send(url, data) {
    const opt = {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    fetch(url, opt).then(response => {
        return response.json()
    }).then((data) => {
        // console.log(data);
    });
}