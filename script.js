document.addEventListener("DOMContentLoaded", function () {
  const bill = document.getElementById("bill-input");
  const people = document.getElementById("people-input");
  const tipButtons = document.querySelectorAll(".tip__btns button");
  const customTipInput = document.getElementById("custom-tip");
  const tipAmount = document.getElementById("tip-amount");
  const totalAmount = document.getElementById("total-amount");
  const resetButton = document.getElementById("reset");

  let billInput, peopleInput;
  let selectedTip = 0;

  const calculateTip = () => {
    if (peopleInput == 0 || peopleInput == null) {
      // activate error message
      return;
    }

    totalTip = (billInput * selectedTip) / 100;
    tipPerPerson = totalTip / peopleInput;
    amountPerPerson = billInput / peopleInput;
    totalAmountPerPerson = amountPerPerson + tipPerPerson;

    tipAmount.textContent = "$" + tipPerPerson.toFixed(2);
    totalAmount.textContent = "$" + totalAmountPerPerson.toFixed(2);
  };

  bill.addEventListener("change", () => {
    billInput = parseFloat(bill.value);
    calculateTip();
  });

  people.addEventListener("change", () => {
    peopleInput = parseFloat(people.value);
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

  customTipInput.addEventListener("change", function () {
    clearActiveClass(tipButtons);
    selectedTip = parseFloat(this.value) || 0;
    calculateTip();
  });

  resetButton.addEventListener("click", function () {
    billInput = 0;
    peopleInput = 0;
    selectedTip = 0;
    bill.value = null;
    people.value = null;
    customTipInput.value = "";
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
  });
});
