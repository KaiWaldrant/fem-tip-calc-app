// @vitest-environment jsdom

import html from "./index.html?raw";
import { init } from "./script.js";

import { expect, test } from "vitest";

document.body.innerHTML = html;
init();

const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const tipButtons = document.querySelectorAll(".tip__btns button");
const customTipInput = document.getElementById("custom-tip");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const resetButton = document.getElementById("reset");
const peopleError = document.getElementById("people-error");

test("Check if the bill input is working", () => {
  billInput.value = 100;
  billInput.dispatchEvent(new Event("input"));
  expect(billInput.classList.contains("border_color_success")).toBe(true);
  expect(billInput.value).toBe("100");
})

test("Check if the tip buttons are working", () => {
  tipButtons[0].click();
  expect(tipButtons[0].classList.contains("active")).toBe(true);
})

test("Check if the custom tip input is working", () => {
  customTipInput.value = 10;
  customTipInput.dispatchEvent(new Event("input"));
  expect(customTipInput.classList.contains("border_color_success")).toBe(true);
  expect(customTipInput.value).toBe("10");
})

test("Check if the people input is working", () => {
  peopleInput.value = 2;
  peopleInput.dispatchEvent(new Event("input"));
  expect(peopleInput.classList.contains("border_color_success")).toBe(true);
  expect(peopleInput.value).toBe("10");
})

test("Check if the calculation is working", () => {
  billInput.value = 100;
  peopleInput.value = 2;
  tipButtons[2].click();
  billInput.dispatchEvent(new Event("input"));
  peopleInput.dispatchEvent(new Event("input"));
  expect(tipAmount.textContent).toBe("$7.50");
  expect(totalAmount.textContent).toBe("$57.50");
})

test("Check if the reset button is working", () => {
  billInput.value = 100;
  peopleInput.value = 2;
  tipButtons[2].click();
  billInput.dispatchEvent(new Event("input"));
  peopleInput.dispatchEvent(new Event("input"));
  expect(tipAmount.textContent).toBe("$7.50");
  expect(totalAmount.textContent).toBe("$57.50");
  resetButton.click();
  expect(billInput.value).toBe("");
  expect(peopleInput.value).toBe("");
  expect(customTipInput.value).toBe("");
  expect(tipAmount.textContent).toBe("$0.00");
  expect(totalAmount.textContent).toBe("$0.00");

  expect(billInput.classList.contains("border_color_success")).toBe(false);
  expect(peopleInput.classList.contains("border_color_success")).toBe(false);
  expect(customTipInput.classList.contains("border_color_success")).toBe(false);
  expect(peopleError.textContent).toBe("");
  expect(peopleInput.classList.contains("border_color_error")).toBe(false);
  expect(billInput.classList.contains("border_color_error")).toBe(false);
  expect(customTipInput.classList.contains("border_color_error")).toBe(false);
  
})

test("check if the error message is working", () => {
  peopleInput.value = 0;
  peopleInput.dispatchEvent(new Event("input"));
  expect(peopleError.textContent).toBe("Can't be zero");
  expect(peopleInput.classList.contains("border_color_error")).toBe(true);
})
