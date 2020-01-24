var form = document.querySelector(".main-form");
var userName = form.querySelector("[name=user-name]");
var userSurname = form.querySelector("[name=user-surname]");
var userLastname = form.querySelector("[name=user-lastname]");
var userTel = form.querySelector("[name=user-tel]");
var userMail = form.querySelector("[name=user-mail]");
var userFeedback = form.querySelector("[name=user-feedback]");

var sentButton = form.querySelector(".main-form__button");

var comleteForm = document.querySelector(".page-feedback__popup--sent");
var completeButton = comleteForm.querySelector(".page-feedback__sent-button");

var errorForm = document.querySelector(".page-feedback__popup--error");
var errorButton = errorForm.querySelector(".page-feedback__error-button");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("userName");
} catch (err) {
  isStorageSupport = false;
};

errorButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  errorForm.classList.remove("page-feedback__popup--show");
});

completeButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  comleteForm.classList.remove("page-feedback__popup--show");
});

form.addEventListener("submit", function (evt) {
  if (!userName.value || !userSurname.value || !userTel.value || !userMail.value) {
    evt.preventDefault();
    if(!userName.value) {userName.classList.add("main-form__error");} else {userName.classList.remove("main-form__error");};
    if(!userSurname.value) {userSurname.classList.add("main-form__error");} else {userSurname.classList.remove("main-form__error");};
    if(!userTel.value) {userTel.classList.add("main-form__error");} else {userTel.classList.remove("main-form__error");};
    if(!userMail.value) {userMail.classList.add("main-form__error");} else {userMail.classList.remove("main-form__error");};
    errorForm.classList.add("page-feedback__popup--show");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("userName", userName.value);
      localStorage.setItem("userSurname", userSurname.value);
      localStorage.setItem("userLastname", userLastname.value);
      localStorage.setItem("userTel", userTel.value);
      localStorage.setItem("userMail", userMail.value);
      localStorage.setItem("userFeedback", userFeedback.value);
    };
    comleteForm.classList.add("page-feedback__popup--show");
  }
});
