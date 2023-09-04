
const cardNumberInputs = document.querySelectorAll(".card-number-input");
const cardNumberOutput = document.querySelectorAll("card-number-output");
const cardLogo = document.getElementById("card-logo");
const cardHolderInput = document.getElementById("card-holder");
const cardHolderOutput = document.getElementById("card-holder-output");
const expirationMonthSelect = document.getElementById("expiration-month");
const expirationMonthOutput = document.getElementById("expiration-month-output");
const expirationYearSelect = document.getElementById("expiration-year");
const expirationYearOutput = document.getElementById("expiration-year-output");
const cvvInput = document.getElementById("cvv");
const submitButton = document.getElementById("submit-button");
const cardTypeSpan = document.getElementById('card-type');
const cardNumberOne = document.getElementById("card-number-1")


cardNumberInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const cardNumber = cardNumberInputs[0].value.replace(/\D/g, '');

    const visaPattern = /^4/;
    const mastercardPattern = /^5/;
    const amexPattern = /^3/;

    let cardType = "";

    if (visaPattern.test(cardNumber)) {
      cardType = "visa";
    } else if (mastercardPattern.test(cardNumber)) {
      cardType = "mastercard";
    } else if (amexPattern.test(cardNumber)) {
      cardType = "amex";
    }

        
    if (cardType === 'visa') {
        cardLogo.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/512px-Visa_Inc._logo.svg.png`;
    } else if (cardType === 'mastercard') {
        cardLogo.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/256px-MasterCard_Logo.svg.png`;
    } else if (cardType === 'amex') {
        cardLogo.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/512px-American_Express_logo_%282018%29.svg.png`;
    } else {
        cardLogo.src = `https://cdn.pixabay.com/photo/2014/08/20/09/04/frame-422371_1280.png`;
    } 

    if (input.value.length >= input.getAttribute("maxlength")) {
      if (index < cardNumberInputs.length - 1) {
        cardNumberInputs[index + 1].focus();
      }
    }

    cardNumberOutput.textContent = cardNumber;
  });
});

function validateCardNumber() {
    const cardNumber = Array.from(cardNumberInputs).map(input => input.value).join('');
    return /^\d{16}$/.test(cardNumber);
}

function validateCardHolder() {
    const cardHolderOutput = cardHolderInput.value.trim();
    const cardHolderParts = cardHolderOutput.split(' ');

    if (cardHolderParts.length >= 2) {
        const firstName = cardHolderParts[0];
        const lastName = cardHolderParts.slice(1).join(' ');

        const isValidFirstName = isValidName(firstName);
        const isValidLastName = isValidName(lastName);

        return isValidFirstName && isValidLastName;
    }

    return false;
}

function isValidName(name) {
    return /^[a-zA-Z]+$/.test(name);
}

function validateExpirationDate() {
    const expirationMonthOutput = expirationMonthSelect.value;
    const expirationYearOutput = expirationYearSelect.value;
    return expirationMonthOutput !== '' && expirationYearOutput !== '';
}

function validateCVV() {
    const cvv = cvvInput.value;
    return /^\d{3,4}$/.test(cvv);
}

cardHolderInput.addEventListener("input", (e) => {
  cardHolderOutput.textContent = e.target.value.toUpperCase();
});


expirationMonthSelect.addEventListener("change", (e) => {
  expirationMonthOutput.textContent = e.target.value
});

expirationYearSelect.addEventListener("change", (e) => {
    expirationYearOutput.textContent = e.target.value
});

function handleSubmit() {
    const isCardNumberValid = validateCardNumber();
    const isCardHolderValid = validateCardHolder();
    const isExpirationDateValid = validateExpirationDate();
    const isCVVValid = validateCVV();

    if (isCardNumberValid && isCardHolderValid && isExpirationDateValid && isCVVValid) {
        alert('Your payment was successful.');
    } else {
        alert('Please fill in all fields correctly.');
    }
}

submitButton.addEventListener('click', handleSubmit);