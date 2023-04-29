const startEl = document.querySelector('[data-start]');
const stopEl = document.querySelector('[data-stop]');
  
  
  let timerId = null;
  stopEl.disabled = true;
  
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  function onStart() {
   startEl.disabled = true;
   stopEl.disabled = false;
  
    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000 );
  }
  
  function onStop() {
   startEl.disabled = false;
   stopEl.disabled = true;
  
    clearInterval(timerId);
  }
  
startEl.addEventListener('click', onStart);
stopEl.addEventListener('click', onStop);