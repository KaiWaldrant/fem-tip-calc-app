document.addEventListener("DOMContentLoaded", function () {
  const bill = document.getElementById("bill-input");
  const people = document.getElementById("people-input");
  const tipButtons = document.querySelectorAll(".tip__btns button");
  const customTipInput = document.getElementById("custom-tip");
  const tipAmount = document.getElementById("tip-amount");
  const totalAmount = document.getElementById("total-amount");
  const resetButton = document.getElementById("reset");
  const peopleError = document.getElementById("people-error");

  let billInput, peopleInput;
  let selectedTip = 0;

  const calculateTip = () => {
    if (
      peopleInput == 0 ||
      peopleInput == null ||
      billInput == 0 ||
      billInput == null
    ) {
      // do nothing
      return;
    }

    totalTip = (billInput * selectedTip) / 100;
    tipPerPerson = totalTip / peopleInput;
    amountPerPerson = billInput / peopleInput;
    totalAmountPerPerson = amountPerPerson + tipPerPerson;

    tipAmount.textContent = "$" + tipPerPerson.toFixed(2);
    totalAmount.textContent = "$" + totalAmountPerPerson.toFixed(2);
  };

  const removeError = () => {
    people.classList.remove("border_color_error");
    peopleError.textContent = "";
  };

  const addSuccess = (el) => {
    el.classList.add("border_color_success");
  };

  const removeSuccess = (el) => {
    el.classList.remove("border_color_success");
  };

  bill.addEventListener("input", () => {
    billInput = parseFloat(bill.value);
    addSuccess(bill);
    calculateTip();
  });

  people.addEventListener("input", () => {
    peopleInput = parseFloat(people.value);
    if (peopleInput == 0) {
      removeSuccess(people);
      people.classList.add("border_color_error");
      peopleError.textContent = "Can't be zero";
      return;
    }
    removeError();
    addSuccess(people);
    calculateTip();
  });

  const clearActiveClass = (elements) => {
    elements.forEach((el) => el.classList.remove("active"));
  };

  tipButtons.forEach((button) => {
    button.addEventListener("click", function () {
      clearActiveClass(tipButtons);

      this.classList.add("active");

      customTipInput.value = "";

      selectedTip = parseFloat(this.textContent);

      calculateTip();
    });
  });

  customTipInput.addEventListener("input", function () {
    clearActiveClass(tipButtons);
    customTipInput.classList.add("border_color_success");
    selectedTip = parseFloat(this.value) || 0;
    calculateTip();
  });

  resetButton.addEventListener("click", function () {
    billInput = 0;
    peopleInput = 0;
    selectedTip = 0;
    removeSuccess(bill);
    removeSuccess(people);
    removeSuccess(customTipInput);
    removeError(people);
    bill.value = null;
    people.value = null;
    customTipInput.value = "";
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
  });
});
