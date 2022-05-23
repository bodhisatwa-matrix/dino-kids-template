var _$ = document.querySelector.bind(document);
var _$$ = document.querySelectorAll.bind(document);
const emitter = mitt();
var whichWindow = 1;
var initialScore = 0;
var initialTime = 30;
var finalScore = 0;
var generateNumber = 0;

/* timer counter code*/
const deadline = new Date(Date.parse(new Date()) + initialTime * 1000); // for day, hour, min, sec use => (15 * 24 * 60 * 60 * 1000)
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
  const clock = _$(`#${id}`);
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
      endClock();
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}
/*timer counter end*/

const firstPage = Vue.createApp({
  name: 'firstPage',
  template: /*html*/`
  <div class="start">
    <img src="./assets/images/pantalla_2_Juego/green_top_left.svg" class="green_top_left">
    <img src="./assets/images/pantalla_2_Juego/yellow_top_right.svg" class="yellow_top_right">
    <img src="./assets/images/pantalla_2_Juego/green_bottom_left.svg" class="green_bottom_left">
    <img src="./assets/images/pantalla_2_Juego/green_bottom_right.svg" class="green_bottom_right">
    <img src="./assets/images/pantalla_2_Juego/orange_bottom_right.svg" class="orange_bottom_right">
    <img src="./assets/images/pantalla_2_Juego/yellow_bottom_right.svg" class="yellow_bottom_right">
    <img src="./assets/images/logo.png" alt="" class="logo1">
    <div class="content_1">
      <h1>Participa</h1>
      <p>Colocate sober el numero que presenta la pantalla para explotar las burbujas y ganar puntos.</p>
      <p id="blink">Presiona enter para comenzar</p>
    </div>
  </div>
  `,
  data() {return {}},
  created() {
    this.emitter.emit("startApp", { emitContent: "Start App" });
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case "Enter": {
          this.emitter.emit("keydown", { emitContent: e.key, "window": whichWindow });
          break;
        }
        default: {
          console.log("Other key pressed!");
          break;
        }
      }
    })},
});
firstPage.config.globalProperties.emitter = emitter;
firstPage.mount("#app");

const gamePage = Vue.createApp({
  name: 'gamingPage',
  template: /*html*/`
  <div class="game">
    <img src="./assets/images/pantalla_2_Juego/green_top_left.svg" class="green_top_left">
    <img src="./assets/images/pantalla_2_Juego/yellow_top_right.svg" class="yellow_top_right">
    <img src="./assets/images/pantalla_2_Juego/green_bottom_left.svg" class="green_bottom_left">
    <img src="./assets/images/pantalla_2_Juego/green_bottom_right.svg" class="green_bottom_right">
    <img src="./assets/images/pantalla_2_Juego/orange_bottom_right.svg" class="orange_bottom_right">
    <img src="./assets/images/pantalla_2_Juego/yellow_bottom_right.svg" class="yellow_bottom_right">
    <img src="./assets/images/logo.png" alt="" class="logo2">
    <div class="content_2">
      <h1>Explota el numero</h1>
      <div class="number">
        0
      </div>
      <div class="points_container">
        <div class="points">
          <p>Puntos</p>
          <p id="scoreCount">1</p>
        </div>
        <div class="time">
          <p>Tiempo</p>
          <div id="clockdiv">
            <div>
              <span class="minutes"></span>
              <!-- <div class="smalltext">Minutes</div> -->
            </div>
            <div>
                <span>:</span>
            </div>
            <div>
              <span class="seconds"></span>
              <!-- <div class="smalltext">Seconds</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  mounted() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": {
          this.emitter.emit("keydown", {
            emitContent: e.key,
            window: whichWindow,
          });
          break;
        }
        default: {
          console.log("Other key pressed!");
          break;
        }
      }
    })},
});
gamePage.config.globalProperties.emitter = emitter;
gamePage.mount("#game");

const scorePage = Vue.createApp({
  name: 'scorePage',
  template: /*html*/`
  <div class="score">
    <img src="./assets/images/final/green_top_left.svg" alt="" class="green_top_left">
    <img src="./assets/images/final/orange_top.svg" alt="" class="orange_top">
    <img src="./assets/images/final/yellow_top_right.svg" alt="" class="yellow_top_right">
    <img src="./assets/images/final/green_bottom_left.svg" alt="" class="green_bottom_left">
    <img src="./assets/images/final/orange_bottom_right.svg" alt="" class="orange_bottom_right">
    <img src="./assets/images/final/yellow_bottom_right.svg" alt="" class="yellow_bottom_right">
    <img src="./assets/images/final/green_bottom_right.svg" alt="" class="green_bottom_right">
    <img src="./assets/images/logo.png" alt="" class="logo3">
    <div class="content_3">
      <h1>Grasias por participar</h1>
      <div class="points_container">
        <div class="points">
          <p>Puntos</p>
          <p id="finalScore">1</p>
        </div>
        <div class="time">
          <p>Tiempo</p>
          <p>0:30</p>
        </div>
      </div>
    </div>
  </div>
  `,
  mounted() {}
});
scorePage.config.globalProperties.emitter = emitter;
scorePage.mount("#score");
/** Events **/
emitter.on('startApp', (event) => {
  document.body.style.cursor = "none";
  console.log("Hello dino");
});

emitter.on('keydown', (event) => {
  if(whichWindow == 1) {
    switch(event.emitContent) {
      case "Enter": {
        whichWindow = 2;
        showWindow(whichWindow);
        break;
      }
      default: {
        console.log("Other key pressed!");
        break;
      }
    }
  } else if(whichWindow == 2) {
    switch(event.emitContent) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        // alert(`Pressed key! ${event.emitContent}`);
        if(generateNumber == event.emitContent) {
          finalScore ++;
          _$('.number').color = "#199549";
          _$('.number').innerHTML = generateRandomNumber();
          // _$('.number').color = "#fe6e46";
        } else {
          // show wrong animation
          _$('.number').color = "red";
        }
      }
      default: {
        console.log("Other key pressed!");
        break;
      }
    }
  }
});

/** generic Functions **/
function showWindow(window) {
  switch(window) {
    case 1: {
      console.log("Opening 1 window!");
      whichWindow = 1;
      break;
    }
    case 2: {
      console.log("Opening 2 window!");
      /** showing second window  **/
      _$(".start").style.display = "none";
      _$(".score").style.display = "none";
      _$(".game").style.display = "block";
      startClock();
      _$('.number').innerHTML = generateRandomNumber();
      // start bubble animation
      whichWindow = 2;
      break;
    }
    case 3: {
      console.log("Opening 3 window!");
      _$(".start").style.display = "none";
      _$(".game").style.display = "none";
      _$(".score").style.display = "block";
      _$("#finalScore").innerHTML = finalScore;
      whichWindow = 3;
      break;
    }
    default: {
      console.log("no window found for show!");
      break;
    }
  }
}

function hideWindow(window) {
  switch(window) {
    case 1: {
      console.log("Closing 1 window!");
      break;
    }
    case 2: {
      console.log("Closing 2 window!");
      break;
    }
    case 3: {
      console.log("Closing 3 window!");
      break;
    }
    default: {
      console.log("no window found! to hide");
      break;
    }
  }
}

function startClock() {
  // call this method for start countdown timer
  initializeClock("clockdiv", deadline);
  _$("#clockdiv").style.display = "block";
  _$("#scoreCount").innerHTML = initialScore;
}
function endClock() {
  showWindow(3);
}
function generateRandomNumber() {
  generateNumber = Math.floor((Math.random() * 10));
  return generateNumber;
}