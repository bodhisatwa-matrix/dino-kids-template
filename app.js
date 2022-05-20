const emitter = mitt();
const startPage = Vue.createApp({
  template: /*html*/ ``,
});
startPage.config.globalProperties.emitter = emitter;
startPage.mount("#app");

/* timer counter code*/
const timeinSecond = 30;
const deadline = new Date(Date.parse(new Date()) + timeinSecond * 1000); // for day, hour, min, sec use => (15 * 24 * 60 * 60 * 1000)
// get remaining time
function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}
//timer clock initilization
function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  // const daysSpan = clock.querySelector('.days');
  // const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector(".minutes");
  const secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    const t = getTimeRemaining(endtime);

    //   daysSpan.innerHTML = t.days;
    //   hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ("" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}
// call this method for start countdown timer
initializeClock("clockdiv", deadline);
/*timer counter end*/
