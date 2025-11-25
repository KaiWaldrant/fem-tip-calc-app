document.addEventListener("DOMContentLoaded", function () {
    const bill = document.getElementById("bill-input");
    const people = document.getElementById("people-input");

    bill.addEventListener("change", () => {
        var billInput = bill.value;
        // console.log(billInput);
    });

    console.log(billInput);
});
