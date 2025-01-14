const passwordField = document.getElementById('password');
const copyBtn = document.querySelector('.password-display__copy-btn');
const generateBtn = document.querySelector('.password-display__generate-btn');
const lengthSlider = document.getElementById('length-slider');
const lengthValue = document.getElementById('length-value');
const decreaseBtn = document.getElementById('decrease-btn');
const increaseBtn = document.getElementById('increase-btn');

generateBtn.addEventListener('click', () => {
  const length = Number(lengthSlider.value);
  const useLowerCase = document.getElementById('lowercase').checked;
  const useUppercase = document.getElementById('uppercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSymbols = document.getElementById('symbols').checked;

  const password = generatePassword(length, useLowerCase, useUppercase, useNumbers, useSymbols);
  passwordField.value = password;
});

function generatePassword(length, useLowerCase, useUppercase, useNumbers, useSymbols) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '@#!$%^&*()_-+=<>?';
  
  let passwordChars = '';
  if (useLowerCase) passwordChars += lowercase;
  if (useUppercase) passwordChars += uppercase;
  if (useNumbers) passwordChars += numbers;
  if (useSymbols) passwordChars += symbols;

  if (!passwordChars) return 'Вы ничего не выбрали!';

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * passwordChars.length);
    password += passwordChars[randomIndex];
  }
  return password;
};

copyBtn.addEventListener('click', () => {
  if (passwordField.value) {
    navigator.clipboard.writeText(passwordField.value);
    alert('Пароль скопирован в буфер обмена');
  }
});

increaseBtn.addEventListener('click', () => {
  lengthSlider.value = Number(lengthSlider.value) + 1;
  if (lengthValue.innerText <= 32) {
    lengthValue.innerText = Number(lengthValue.innerText) + 1;
  }

  if (lengthValue.innerText > 32) {
    lengthValue.innerText = 32;
    alert('Невозможно сгенерировать пароль больше 32 символов')
  }
});

decreaseBtn.addEventListener('click', () => {
  lengthSlider.value = Number(lengthSlider.value) - 1;
  if (lengthValue.innerText >= 4) {
    lengthValue.innerText = Number(lengthValue.innerText) - 1;
  }

  if (lengthValue.innerText < 4) {
    lengthValue.innerText = 4;
    alert('Невозможно сгенерировать пароль меньше 4 символов');
  }
});

lengthSlider.addEventListener('input', () => {
  lengthValue.innerText = lengthSlider.value;
});