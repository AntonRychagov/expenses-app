let LIMIT = 10000;
const ZERO = 0;
const CURRENCY = "₽";
const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_OF_LIMIT = "все плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status__red";
const POPUP_OPENED_CLASSNAME = "popup_open";

const inputNode = document.querySelector("#input");
const taskSelectNode = document.querySelector("#taskSelect");
const buttonNode = document.querySelector("#button");
const historyNode = document.querySelector("#history");
const sumNode = document.querySelector("#sum");
const limitNode = document.querySelector("#limit");
const statusNode = document.querySelector("#status");
const clearButtonNode = document.querySelector("#clearBtn");
const imgLimitNode = document.querySelector("#imgLimit");
const popupNode = document.querySelector("#popup");
const popupCrossNode = document.querySelector("#imgPopupCross");
const inputNewLimitNode = document.querySelector("#inputNewLimit");
const btnNewLimitNode = document.querySelector("#btnNewLimit");

let expenses = [];

//// ОБРАБОТЧИКИ ////
buttonNode.addEventListener("click", getValueInput);
clearButtonNode.addEventListener("click", clearAll);
imgLimitNode.addEventListener("click", togglePopup);
popupCrossNode.addEventListener("click", togglePopup);
btnNewLimitNode.addEventListener("click", newLimitSum);
btnNewLimitNode.addEventListener("click", crossBtn);
btnNewLimitNode.addEventListener("click", clearNewInput);

//// ФУНКЦИИ ////

const getExpenseFromUser = () => parseInt(inputNode.value);
const getExpenseTypeFromUser = () => taskSelect.value;

//функция добавляет сумму в массив
function getValueInput() {
  //проверка пустой строки ввода
  if (inputNode.value === "") {
    alert("Введите сумму");
    return;
  }

  setExpenses(); // сохраняет значение и добавляет в массив

  render();

  // renderHistory(); // вывод список трат

  // resultSum(); // считатет сумму трат и проверяет статус

  clearInput(); // очищает поле ввода
}

//функция сохраняет значения
function setExpenses() {
  const expense = getExpenseFromUser();
  const type = getExpenseTypeFromUser();

  if (!expense) {
    return;
  }

  expenses.push({
    expenses: expense,
    type: type,
  });

  return;
}

function getExpenses() {
  return expenses;
}

//функция выводит список трат
const renderHistory = () => {
  const expenses = getExpenses();

  let expensesListHTML = "";

  expenses.forEach((expense) => {
    expensesListHTML += `<li class='history__item'>${expense.expenses} ${CURRENCY} - ${expense.type}</li>`;
  });

  historyNode.innerHTML = `<ol class='history__list'>${expensesListHTML}</ol>`;
}

//функция считает сумму трат
const resultSum = () => {
  let sum = 0;

  expenses.forEach((expense) => {
    sum += expense.expenses;
  });

  return sum;
}

//  проверка статуса лимита
const compareLimit = () => {
  const total = resultSum();

  sumNode.innerText = `${total} ${CURRENCY}`;

  if (total <= LIMIT) {
    statusNode.innerHTML = STATUS_IN_LIMIT;
  } else {
    statusNode.innerHTML = `${STATUS_OUT_OF_LIMIT} (${total - LIMIT} ${CURRENCY})`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }

}

const render = () => {
  compareLimit();
  renderHistory();
}


//функция создает новый лимит и выводит user
function newLimitSum() {
  const NEW_LIMIT = parseInt(inputNewLimitNode.value);
  limitNode.innerText = NEW_LIMIT;
  LIMIT = NEW_LIMIT;
}

function crossBtn() {
  popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
}

function clearNewInput() {
  inputNewLimitNode.value = "";
}

//функция очищает поле ввода, после клика по кнопке(добавить)
function clearInput() {
  inputNode.value = "";
}

init();

function init(expenses) {
  statusNode.innerText = STATUS_IN_LIMIT;
  limitNode.innerText = `${LIMIT} ${CURRENCY}`;
  sumNode.innerText = resultSum(expenses);
}

//итоговая функция очистки
function clearAll() {
  clearInput();

  clearHistory();

  clearLimit();

  clearSum();

  clearStatus();

  render();

  return;
}

//функция ошищает историю и массив
function clearHistory() {
  historyNode.innerText = "";
  expenses = [];
}

// функция возвращает дефолтное значение лимита
function clearLimit() {
  LIMIT = 10000;
  limitNode.innerText = `${LIMIT} ${CURRENCY}`;
}

//функция возвращает начальное значение (Всего:)
function clearSum() {
  sumNode.innerText = `${ZERO} ${CURRENCY}`;
}

//функция возвращает статус 'Все хорошо'
function clearStatus() {
  statusNode.innerText = STATUS_IN_LIMIT;
  statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
}

// функция открывет и закрывает popup
function togglePopup() {
  popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
}
