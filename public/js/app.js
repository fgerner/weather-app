console.log('Client side js you know!!!');


const weatherForm = document.querySelector('form');
const searchItem = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let place = searchItem.value;

    fetch('http://localhost:3000/weather?address=' + place).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                console.log(data.err);
            } else {
                console.log(data.location)
                console.log(data.forecast)
                console.log(data.temp)
                console.log(data.feelslike)
            }
        })
    });
    // console.log(place);
})