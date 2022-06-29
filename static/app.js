/* JS 연결 확인 ----------------------------------------------------------------- */
const test = () => {
  console.log('JavaScript connected!');
};

/* app.js ------------------------------------------------------------------- */
$(document).ready(() => {
  test();
  // 페이지 로딩 후 바로 들어오는 GET 함수는 이곳에서 호출
});

/* BACKGROUND --------------------------------------------------------------- */

const body = document.querySelector("body");

const IMG_NUMBER = 29;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./static/images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}

init();
/* WEATHER ------------------------------------------------------------------ */
// 위도, 경도를 알아 내는 함수
function onGeoSucess(position){
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("위치정보를 확인하였습니다.", lat,lon);
}
// navigator.geolocation error 시 작동하는 함수
function onGeoError(){
  alert("위치정보를 확인할 수 없습니다.");
}
// 위치정보 허용을 물어보는 함수
navigator.geolocation.getCurrentPosition(onGeoSucess,onGeoError); // sucess 시, 첫번째 인수 실행 / error 시, 두번째 인수 실행

// API key 변수
const APIKEY = "5cedb12d7cfe681080f2af92fcdf062c"
  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
// 날씨 API url
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=37.5503563&lon=127.0952986&appid=${APIKEY}&units=metric`;
  $.ajax({
    type: "GET",
    url: url,
    data: {},
    success: function (response) {
      const temp = response['main']['temp']
      const city = response['name']
      const des = response['weather'][0]['description']
      console.log(temp)
      $("#weather01").text(temp);
      $("#weather02").text(city);
      $("#weather03").text(des);
    }
  })

/* CLOCK -------------------------------------------------------------------- */
// 우선 html에서 Element를 자바스크립트로 가져온다.
const clock = document.querySelector(".clock"); // class는 .을 찍어야한다.

// intervals or timeout

// setintervals(실행하고자 하는 함수 , 시간간격ms) 1000 = 1초

function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `${hours}:${minutes}`;
}

getClock();
setInterval(getClock,1000);


/* TODOLIST ----------------------------------------------------------------- */
/* TODO POPUP --------------------------------------------------------------- */
// 팝업열기
$('.todo-list-a').on('click', function (e) {
  e.preventDefault();
  if ($(this).is('.todo-done')) {
    $('#edit-input').attr('placeholder', '');
    $('.modify-num').val('');
  }
  $('.todo-pop').css('visibility', 'visible');
  modifyResultTF = false;
});
// 팝업닫기
$('.todo-pop-container').on('click', function (e) {
  if (e.target === e.currentTarget) {
    $('.todo-pop').css('visibility', 'hidden');
    if (modifyResultTF) {
      window.location.reload();
    }
  }
});

/* QUOTE -------------------------------------------------------------------- */

/* DB TEST ------------------------------------------------------------------ */
const dbTestPost = () => {
  // input 입력 내용
  let text = $('.dbtest-input').val();
  console.log(text);
  $.ajax({
    type: 'POST',
    url: '/dbtest',
    data: { text_give: text },
    success: (res) => {
      alert(res['msg']);
    },
  });
};
