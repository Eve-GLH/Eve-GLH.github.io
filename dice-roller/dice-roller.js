function getRandomNumber() {
    var randomNumber = Math.floor(Math.random() * 20) + 1;
    return randomNumber;
}

function printResult(number) {
    var numberPlaceholder = document.getElementById("result");
    numberPlaceholder.innerHTML = number;
}

function roll() {
    var result = getRandomNumber();
    document.getElementById("result");
    numberPlaceholder.innerHTML = result;
}