import { expect, test } from "vitest";
import { calculateTip } from "./calculations.js";

test("calculates tip correctly", () => {
  const bill = 100;
  const tip = 15;
  const people = 2;

  const result = calculateTip(bill, tip, people);

  expect(result.tipPerPerson).toBe(7.5);
  expect(result.totalAmountPerPerson).toBe(57.5);
});

test("calculates tip correctly with decimals", () => {
  const bill = 100.50;
  const tip = 15;
  const people = 2;

  const result = calculateTip(bill, tip, people);

  expect(result.tipPerPerson).toBe(7.5375);
  expect(result.totalAmountPerPerson).toBe(57.7875);
});

test("return undef when people is 0", () => {
  const bill = 100;
  const tip = 15;
  const people = 0;

  const result = calculateTip(bill, tip, people);

  expect(result).toBeUndefined();
})

test("return undef when bill is 0", () => {
  const bill = 0;
  const tip = 15;
  const people = 2;

  const result = calculateTip(bill, tip, people);

  expect(result).toBeUndefined();
})

test("calculates tip correctly when tip is 0", () => {
  const bill = 100;
  const tip = 0;
  const people = 2;

  const result = calculateTip(bill, tip, people);

  expect(result.tipPerPerson).toBe(0);
  expect(result.totalAmountPerPerson).toBe(50);
})