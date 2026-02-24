import { calculateTip } from "./calculations.js";

function init() {
  const bill = document.getElementById("bill-input");
  const people = document.getElementById("people-input");
  const tipButtons = document.querySelectorAll(".tip__btns button");
  const customTipInput = document.getElementById("custom-tip");
  const tipAmount = document.getElementById("tip-amount");
  const totalAmount = document.getElementById("total-amount");
  const resetButton = document.getElementById("reset");
  const peopleError = document.getElementById("people-error");

  let billInput,
    peopleInput = null;
  let selectedTip = 0;

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

  const tipResult = (bill, tip, people) => {
    const result = calculateTip(bill, tip, people);

    if (result === undefined) {
      return;
    }
    tipAmount.textContent = `$${result.tipPerPerson.toFixed(2)}`;
    totalAmount.textContent = `$${result.totalAmountPerPerson.toFixed(2)}`;
  };

  bill.addEventListener("input", () => {
    console.log("bill input:", bill.value);
    billInput = parseFloat(bill.value);
    addSuccess(bill);
    tipResult(billInput, selectedTip, peopleInput);
  });

  people.addEventListener("input", () => {
    peopleInput = parseFloat(people.value);
    if (peopleInput === 0) {
      removeSuccess(people);
      people.classList.add("border_color_error");
      peopleError.textContent = "Can't be zero";
      return;
    }
    removeError();
    addSuccess(people);
    tipResult(billInput, selectedTip, peopleInput);
  });

  const clearActiveClass = (elements) => {
    elements.forEach((el) => {
      el.classList.remove("active");
    });
  };

  tipButtons.forEach((button) => {
    button.addEventListener("click", function () {
      clearActiveClass(tipButtons);

      this.classList.add("active");

      customTipInput.value = "";

      selectedTip = parseFloat(this.textContent);

      tipResult(billInput, selectedTip, peopleInput);
    });
  });

  customTipInput.addEventListener("input", function () {
    clearActiveClass(tipButtons);
    customTipInput.classList.add("border_color_success");
    selectedTip = parseFloat(this.value) || 0;
    tipResult(billInput, selectedTip, peopleInput);
  });

  resetButton.addEventListener("click", () => {
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
    clearActiveClass(tipButtons);
  });

}

document.addEventListener("DOMContentLoaded", init);

export { init };
