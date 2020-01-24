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

var validMail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+ @[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61} [a-zA-Z0-9])?(?:\.[a-zA-Z0-9] (?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)* $/;
var validTel = /^((\+7|7|8)+([0-9]){10})$/;

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
  if (!userName.value || !userSurname.value || !(validTel.test(userTel.value)) || !(validMail.test(userMail.value))) {
    evt.preventDefault();
    if(!userName.value) {userName.classList.add("main-form__error");} else {userName.classList.remove("main-form__error");};
    if(!userSurname.value) {userSurname.classList.add("main-form__error");} else {userSurname.classList.remove("main-form__error");};
    if(!(validTel.test(userTel.value))) {userTel.classList.add("main-form__error");} else {userTel.classList.remove("main-form__error");};
    if(!(validMail.test(userMail.value))) {userMail.classList.add("main-form__error");} else {userMail.classList.remove("main-form__error");};
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
