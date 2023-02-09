// Задание 4
// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.
// При клике на кнопку происходит следующее:
// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
// Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
// После получения данных вывести ниже картинку на экран.
// Подсказка
// Получение данных из input:
// const value = document.querySelector('input').value;

const btn = document.querySelector(".j-btn");
const resultNode = document.querySelector(".j-result");
let url;

const useRequest = (url) => {
//   console.log("url", url);
  return fetch(url)
    .then((response) => {
    //   console.log("response", response);
      return response.url;
    })
    .then((responseUrl) => {
    //   console.log("responseUrl", responseUrl);
      let img = `<img src="${responseUrl}"/>`;
      resultNode.innerHTML = img;
    })
    .catch(() => {
      resultNode.innerHTML = "Ошибка";
    });
};

btn.addEventListener("click", async () => {
  let width = document.querySelector(".width").value;
  let height = document.querySelector(".height").value;
  if (
    width == "" ||
    typeof +width !== "number" ||
    isNaN(+width) ||
    +width < 100 ||
    +width > 300 ||
    height == "" ||
    typeof +height !== "number" ||
    isNaN(+height) ||
    +height < 100 ||
    +height > 300
  ) {
    resultNode.innerHTML = "Одно из чисел вне диапазона от 100 до 300";
  } else {
    url = `https://picsum.photos/${+width}/${+height}`;
    await useRequest(url);
  }
});
