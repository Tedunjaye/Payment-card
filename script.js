const cardNumberInputs = document.querySelectorAll(".card-number-input");
const cardNumberOutput = document.getElementById("card-number-output");
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
const cardNumberOne = document.getElementById("card-number-1");
const cardNumberError = document.getElementById("card-number-error");
const cardHolderError = document.getElementById("card-holder-error");
const expirationDateError = document.getElementById("expiration-date-error");
const cvvError = document.getElementById("cvv-error");

function updateCardTypeLogo(cardType) {
  switch (cardType) {
    case 'visa':
      cardLogo.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/512px-Visa_Inc._logo.svg.png`;
      break;
    case 'mastercard':
      cardLogo.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/256px-MasterCard_Logo.svg.png`;
      break;
    case 'amex':
      cardLogo.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/512px-American_Express_logo_%282018%29.svg.png`;
      break;
    default:
      cardLogo.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/512px-Visa_Inc._logo.svg.png`;
      break;
  }
}

cardNumberInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const cardNumber = cardNumberInputs[0].value.replace(/\D/g, '');

    let cardType = "";

    switch (true) {
      case /^4/.test(cardNumber):
        cardType = "visa";
        break;
      case /^5/.test(cardNumber):
        cardType = "mastercard";
        break;
      case /^3/.test(cardNumber):
        cardType = "amex";
        break;
      default:
        cardType = "visa";
    }

    updateCardTypeLogo(cardType);

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
  cardNumberError.textContent = '';
  cardHolderError.textContent = '';
  expirationDateError.textContent = '';
  cvvError.textContent = '';

  const isCardNumberValid = validateCardNumber();
  const isCardHolderValid = validateCardHolder();
  const isExpirationDateValid = validateExpirationDate();
  const isCVVValid = validateCVV();

  if (isCardNumberValid && isCardHolderValid && isExpirationDateValid && isCVVValid) {
    alert('Your payment was successful.');
  } else {
    if (!isCardNumberValid) {
      cardNumberError.textContent = '*Invalid number';
    }
    if (!isCardHolderValid) {
      cardHolderError.textContent = '*Invalid name';
    }
    if (!isExpirationDateValid) {
      expirationDateError.textContent = '*Invalid date';
    }
    if (!isCVVValid) {
      cvvError.textContent = '*Invalid CVV';
    }
  }
}

submitButton.addEventListener('click', handleSubmit);
