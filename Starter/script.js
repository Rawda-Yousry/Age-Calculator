/* eslint-enable */

const inputElements = document.querySelectorAll(".card__input");
const submitBtn = document.querySelector(".card__button");

const validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
};
const validateMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
};
const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) {
    return true;
  }
};

const isValidDate = (dayElement, monthElement, yearElement) => {
  let isValid = [false, false, false];
  if (validateDay(dayElement.value)) {
    isValid[0] = true;
    dayElement.classList.remove("card__input--error");
  } else {
    dayElement.classList.add("card__input--error");
  }

  if (validateMonth(monthElement.value)) {
    isValid[1] = true;
    monthElement.classList.remove("card__input--error");
  } else {
    monthElement.classList.add("card__input--error");
  }

  if (validateYear(yearElement.value)) {
    isValid[2] = true;
    yearElement.classList.remove("card__input--error");
  } else {
    yearElement.classList.add("card__input--error");
  }

  return isValid.every((el) => el === true);
};
const ageCalculate = (year, month, day) => {
  const todayDate = new Date();
  const inputDate = new Date(year, month - 1, day);
  const todayYear = todayDate.getFullYear();
  const inputYear = inputDate.getFullYear();

  let yearDiff = todayYear - inputYear;
  const monthDiff = todayDate.getMonth() - inputDate.getMonth();

  if (monthDiff < 0 && todayDate.getDate() < inputDate()) {
    yearDiff--;
  }
  return yearDiff;
};
const onClickHandler = () => {
  const yearElement = document.querySelector("[data-name=year]");
  const monthElement = document.querySelector("[data-name=month]");
  const dayElement = document.querySelector("[data-name=day]");
  const resultElement = document.querySelector(".card__resultValue");
  if (isValidDate(dayElement, monthElement, yearElement)) {
    resultElement.textContent = ageCalculate(
      yearElement.value,
      monthElement.value,
      dayElement.value
    );
  } else {
    resultElement.textContent = "--";
  }
};

inputElements.forEach((item) => {
  item.addEventListener(
    "keydown",
    (event) => event.key === "Enter" && onClickHandler()
  );
});
submitBtn.addEventListener("click", onClickHandler);
