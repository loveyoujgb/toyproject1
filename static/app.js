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

/* CLOCK -------------------------------------------------------------------- */

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
