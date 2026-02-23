export const calculateTip = (bill, tip, people) => {
  if (people <= 0 || people == null || bill <= 0 || bill == null) {
    // do nothing
    return;
  }

  const totalTip = (bill * tip) / 100;
  const tipPerPerson = totalTip / people;
  const amountPerPerson = bill / people;
  const totalAmountPerPerson = amountPerPerson + tipPerPerson;

  return { tipPerPerson, totalAmountPerPerson };
};
