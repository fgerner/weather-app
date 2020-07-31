const weatherForm = document.querySelector('form');
const searchItem = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let place = searchItem.value;

    if(place.length === 0){
        return messageOne.innerHTML = 'Location is mandatory';
    }

    messageOne.innerText = 'Loading...';
    messageTwo.innerText = '';

    fetch('/weather?address=' + place).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                messageOne.textContent = data.err;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = `${data.forecast} with a temperature of ${data.temp} witch feels like ${data.feelslike} and the UV-index are ${data.uvindex}`;
            }
        })
    });
    // console.log(place);
})