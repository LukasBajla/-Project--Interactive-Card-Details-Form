const App = {
  $: {
    btnConfirm: document.querySelector("#btn-confirm"),
    btnContinue: document.querySelector("#btn-continue"),
    btnAutocomplete: document.querySelector("#btn-autocomplete"),

    inputCardName: document.querySelector("#card-name"),
    inputCardNumber: document.querySelector("#card-number"),
    inputCardExpMonth: document.querySelector("#card-month"),
    inputCardExpYear: document.querySelector("#card-year"),
    inputCardCVC: document.querySelector("#card-cvc"),
    inputContainer: document.querySelectorAll("input"),

    mainInput: document.querySelector(".input-form-cont"),
    mainConfirm: document.querySelector(".input-success-cont"),

    refCardNumber: document.querySelector("#ref-card-number"),
    refCardName: document.querySelector("#ref-card-name"),
    refCardMonth: document.querySelector("#ref-card-exp-month"),
    refCardYear: document.querySelector("#ref-card-exp-year"),
    refCardCVC: document.querySelector("#ref-card-cvc"),
  },
  init() {
    App.inputToReference();

    // App.$.btnAutocomplete.addEventListener("click", e=> {
    //   const allInputs = App.$.mainInput.querySelectorAll("input");

    //   allInputs.forEach(item => {
    //     item.setAttribute("autocomplete", "on")
    //   })
    // })

    App.$.btnConfirm.addEventListener("click", (e) => {
      // input container is empty [global]
      App.$.inputContainer.forEach((item) => {
        if (item.value == "") {
          item.classList.add("error-cont");
          App.errorBlank(item.parentElement);
        } else {
          item.classList.remove("error-cont");
          App.errorRemoveAll(item.parentElement);
        }
      });

      // Card Name - check only letters
      const cardNameRegexp = /^[a-zA-Z\s]*$/;
      const cardNameOnlyLetters = cardNameRegexp.test(
        App.$.inputCardName.value
      );

      if (!cardNameOnlyLetters) {
        App.$.inputCardName.classList.add("error-cont");
        App.errorNameLength(App.$.inputCardName.parentElement);
      }

      // Card Number - check length
      const cardNumberRegexp = /^(\d{16})$/;
      const numberCorrectLength = cardNumberRegexp.test(
        App.$.inputCardNumber.value
      );
      if (!numberCorrectLength) {
        App.$.inputCardNumber.classList.add("error-cont");
        App.errorNumberLength(App.$.inputCardNumber.parentElement);
      }

      // Card Expiry - check date
      const currentMonth = Number((new Date().getMonth() + 1).toString());
      const currentYear = Number(
        new Date().getFullYear().toString().substring(2)
      );

      if (
        currentYear > Number(App.$.inputCardExpYear.value) ||
        Number(App.$.inputCardExpMonth.value) > 12
      ) {
        App.errorContainer(App.$.inputCardExpYear);
        App.errorContainer(App.$.inputCardExpMonth);
        App.errorInvalidDate(App.$.inputCardExpYear.parentElement);
      } else if (currentYear == Number(App.$.inputCardExpYear.value)) {
        if (currentMonth > Number(App.$.inputCardExpMonth.value)) {
          App.errorContainer(App.$.inputCardExpYear);
          App.errorContainer(App.$.inputCardExpMonth);
          App.errorInvalidDate(App.$.inputCardExpMonth.parentElement);
        }
      }

      // Card CVC - check length
      const cardCvcRegexp = /^(\d{3})$/;
      const cvcCorrectLength = cardCvcRegexp.test(App.$.inputCardCVC.value);
      if (!cvcCorrectLength) {
        App.$.inputCardCVC.classList.add("error-cont");
        App.errorNumberLength(App.$.inputCardCVC.parentElement);
      }

      // ALL IS GOOD, PROCEED
      if (App.$.mainInput.querySelectorAll(".error-msg").length == 0) {
        App.$.mainInput.classList.toggle("hidden");
        App.$.mainConfirm.classList.toggle("hidden");
        // App.$.btnAutocomplete.classList.toggle("hidden");
      }
    });

    App.$.btnContinue.addEventListener("click", (e) => {
      App.$.mainInput.classList.toggle("hidden");
      App.$.mainConfirm.classList.toggle("hidden");
      location.reload();
      // App.$.btnAutocomplete.classList.toggle("hidden");
    });
  },
  inputToReference() {
    // Card Name - show in ref
    App.$.inputCardName.addEventListener("keyup", (e) => {
      App.$.refCardName.innerHTML = App.$.inputCardName.value || "Name";
    });
    // Card Number - show in ref and insert spaces
    App.$.inputCardNumber.addEventListener("keyup", (e) => {
      let result = App.$.inputCardNumber.value.replace(/\d{4}/g, "$& ");
      App.$.refCardNumber.innerHTML = result || "0000 0000 0000 0000";
    });
    // Card Expiry - show in ref
    App.$.inputCardExpMonth.addEventListener("keyup", (e) => {
      App.$.refCardMonth.innerHTML = App.$.inputCardExpMonth.value || "00";
    });
    App.$.inputCardExpYear.addEventListener("keyup", (e) => {
      App.$.refCardYear.innerHTML = App.$.inputCardExpYear.value || "00";
    });
    // Card CVC - show in ref
    App.$.inputCardCVC.addEventListener("keyup", (e) => {
      App.$.refCardCVC.innerHTML = App.$.inputCardCVC.value || "CVC";
    });
  },

  errorRemoveAll(container) {
    const errmsgs = container.querySelector(".error-msg");
    if (errmsgs != null) errmsgs.remove();
  },
  errorContainer(container) {
    container.classList.add("error-cont");
  },

  errorBlank(container) {
    const p = document.createElement("p");
    p.innerHTML = "Can't be blank";
    p.classList.add("error-msg");

    if (container.querySelector(".error-msg")) {
      return;
    } else container.appendChild(p);
  },
  errorNameLength(container) {
    const p = document.createElement("p");
    p.innerHTML = "Invalid Name";
    p.classList.add("error-msg");

    if (container.querySelector(".error-msg")) {
      return;
    } else container.appendChild(p);
  },
  errorNumberLength(container) {
    const p = document.createElement("p");
    p.innerHTML = "Incorrect Number";
    p.classList.add("error-msg");

    if (container.querySelector(".error-msg")) {
      return;
    } else container.appendChild(p);
  },
  errorInvalidDate(container) {
    const p = document.createElement("p");
    p.innerHTML = "Invalid Date";
    p.classList.add("error-msg");

    if (container.querySelector(".error-msg")) {
      return;
    } else container.appendChild(p);
  },
};

window.addEventListener("load", App.init);
