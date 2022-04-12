import pic1 from "./assets/김규민.jpeg";
import pic2 from "./assets/전희선.jpeg";
import pic3 from "./assets/서혜은.jpg";
import pic4 from "./assets/황주희.jpeg";
import pic5 from "./assets/백지연.png";

const $ = (selector) => document.querySelector(selector);

const replayButton = document.querySelector(".buttonList__shuffle");
const scoreBoard = document.querySelector(".scoreBoard");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal__body");

let currentStep = 0;

const quizList = [
  {
    src: pic1,
    answer: "김규민",
  },
  {
    src: pic2,
    answer: "전희선",
  },
  {
    src: pic3,
    answer: "서혜은",
  },
  {
    src: pic4,
    answer: "황주희",
  },
  {
    src: pic5,
    answer: "백지연",
  },
];

function loadImage(image) {
  //이미지 로딩 중일 때 모달로 알림.
  modal.classList.remove("hide");

  image.onload = function () {
    modal.classList.add("hide");
  };
  modalText.innerText = "이미지 로딩중...🛠️";
  image.src = quizList[currentStep].src;
}

function handleModal(isCorrect, score, answer, image) {
  modal.classList.remove("hide"); //모달 활성화.
  //1초가 지나면 점수 애니메이션 해제.
  setTimeout(() => {
    scoreBoard.classList.remove("scored");
  }, 700);

  //정답인 경우.
  if (isCorrect) {
    scoreBoard.classList.add("scored");
    score.innerText++;
    currentStep++;

    //모두 맞췄을 경우.
    if (currentStep >= quizList.length) {
      modalText.innerText = "메인으로";

      modalText.addEventListener("click", () => {
        initGame({ score, answer, image });
        modal.classList.add("hide");
      });
      return;
    }
    loadImage(image);
  }
  //오답인 경우
  else {
    modalText.innerText = "날..모른다고?😱";

    //1초가 지나면 모달을 닫기.
    setTimeout(() => {
      modal.classList.add("hide");
    }, 1000);
  }
  //모달 배경 클릭 시 수동으로 모달 닫기.
  modal.addEventListener("click", () => {
    modal.classList.add("hide");
  });
}

function attachEvent({ score, answer, image }) {
  answer.addEventListener("click", (e) => {
    if (e.target.closest(".answer__list > li")) {
      if (currentStep < quizList.length) {
        if (quizList[currentStep].answer == e.target.innerText) {
          handleModal(true, score, answer, image);
        } else {
          handleModal(false, score, answer, image);
        }
      }
    }
  });
}

function initGame({ score, answer, image }) {
  currentStep = 0;
  score.innerText = 0;
  loadImage(image);
}

function gameManager(gameInfo) {
  initGame(gameInfo); //초기화.
  attachEvent(gameInfo); //이벤트를 붙이는 메소드.
  replayButton.addEventListener("click", () => initGame(gameInfo));
}

window.onload = () => {
  gameManager({
    score: $(".scoreBoard__score"),
    answer: $(".answer__list"),
    image: $(".imageBoard > img"),
  });
};
