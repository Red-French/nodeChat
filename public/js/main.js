'use strict';
(function () {  // start iffy with a semicolon to prevent potential error because of what came before not having a semicolon

    const ws = io.connect();

    ws.on('connect', () => {  // event Listener
      console.log('******* FRONT END socket connected *******')
    });

    ws.on('receiveChat', msg => {  // event Listener
      console.log(msg);
      displayChat(msg.name, msg.text)
    });

    const form = document.querySelector('form')
    const name = document.querySelector('input[name="name"]')
    const text = document.querySelector('input[name="text"]')
    const ul = document.querySelector('ul')

    form.addEventListener('submit', () => {
      const [n, t] = [name.value, text.value]

      ws.emit('sendChat', {  // sends to all clients
        name: n,
        text: t
      });

      displayChat(n, t);  // so not to rely on waiting on the server (think if this were a video game)

      text.value = ''

      event.preventDefault();  // prevents default form action so the page does not refresh
    })

    function displayChat (name, text) {
      const li = generateLI(name, text)

      ul.appendChild(li)
    }

    function generateLI (name, text) {
      const li = document.createElement('li')
      const textNode = document.createTextNode(`${name}: ${text}`)

      li.appendChild(textNode)
      return li
    }
}());
