// Задание 5.
// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:
// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
// Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.
// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).

window.onload = () => {
    const myJSON = localStorage.getItem('myJSON');
    if (myJSON) {
      const json = JSON.parse(myJSON);
      displayResult(json);
    }
  }

const btn = document.querySelector(".j-btn");
const resultNode = document.querySelector(".j-result");
let url;

const useRequest = (url) => {
//   console.log("url", url);
  return fetch(url)
    .then((response) => {
    //   console.log("response", response);
      return response.json();
    })

    .then((json) => {
      localStorage.setItem('myJSON', JSON.stringify(json));
      // console.log("json", json);
    displayResult(json);
  })

    .catch(() => {
      resultNode.innerHTML = "Ошибка";
    });
};

btn.addEventListener("click", async () => {
  let page = document.querySelector(".page").value;
  let limit = document.querySelector(".limit").value;
  let pageError = document.querySelector(".page-error");
  let limitError = document.querySelector(".limit-error");
  if ((page == "" ||
    typeof +page !== "number" ||
    isNaN(+page) ||
    +page < 1 ||
    +page > 10) &&
     (limit == "" ||
    typeof +limit !== "number" ||
    isNaN(+limit) ||
    +limit < 1 ||
    +limit > 10)) {
    limitError.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    pageError.innerHTML = "";
  } else if (
    page == "" ||
    typeof +page !== "number" ||
    isNaN(+page) ||
    +page < 1 ||
    +page > 10
  ) {
    pageError.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    limitError.innerHTML = "";
  } else if (
    limit == "" ||
    typeof +limit !== "number" ||
    isNaN(+limit) ||
    +limit < 1 ||
    +limit > 10) {
        limitError.innerHTML = "Лимит вне диапазона от 1 до 10";
        pageError.innerHTML = "";
  } else {
    pageError.innerHTML = "";
    limitError.innerHTML = "";
    url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    await useRequest(url);
  }
});

function displayResult(json) {
    let cards = '';

    json.forEach(item => {
      const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
      cards = cards + cardBlock;
    });

    resultNode.innerHTML = cards;
  }