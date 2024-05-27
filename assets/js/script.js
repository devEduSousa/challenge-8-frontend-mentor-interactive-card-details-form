const nameInput = document.querySelector("#name");
const nameSpan = document.querySelector(".name-in-card");
const cardNumberInput = document.querySelector("#card-number");
const cardNumberSpan = document.querySelector(".card-number-in-card");
const monthInput = document.querySelector("#month");
const monthSpan = document.querySelector(".month-in-card");
const yearInput = document.querySelector("#year");
const yearSpan = document.querySelector(".year-in-card");
const expDateContainerInput = document.querySelectorAll(".date-container");
const codeInput = document.querySelector("#code");
const codeSpan = document.querySelector(".code-in-card")
const inputs = document.querySelectorAll("input");
const errorP = document.querySelectorAll(".error");
const submitDiv = document.querySelector("#submit");
const returnDiv = document.querySelector("#return");
const form = document.querySelector("form");
const thanksSection = document.querySelector(".thanks");

function checkExpDateContainer(className, classMethod) {
    let numberOfInputsWithErrors = 0;
    const indexErrorExpDateContainer = 2;
    for(const input of expDateContainerInput) {
        if(input.classList.contains("border-color-red") || input.value === "") numberOfInputsWithErrors++;
    };
    if(numberOfInputsWithErrors > 0) classMethod.call(errorP[indexErrorExpDateContainer].classList, className);
};

function checkInputs(prototype) {
    const cardNumberIndex = 1;
    inputs.forEach((input, index) => {
        if(!input.value) {
            if(index === 2 || index === 3) {
                prototype.call(inputs[index].classList, "border-color-red");
                checkExpDateContainer("visible", prototype);
            } else {
                prototype.call(inputs[index].classList, "border-color-red");
                if(index === 4) --index;

                prototype.call(errorP[index].classList, "visible");
            };
        };
        if(inputs[cardNumberIndex].value.length !== 19) {
            prototype.call(inputs[cardNumberIndex].classList, "border-color-red");
            prototype.call(errorP[cardNumberIndex].classList, "visible");
        };
    });
};

function checkErrors() {
    let numberOfErrors = 0;
    for(const error of errorP) {
        if(error.classList.contains("visible")) numberOfErrors++;
    };
    if(numberOfErrors === 0) {
        form.classList.toggle("hide");
        thanksSection.classList.toggle("hide");
    }; 
};

function checkChar(e, pattern) {
    const char = String.fromCharCode(e.keyCode);

    if(char.match(pattern)) {
        return true;
    };
};

function cleanForm() {
    codeSpan.textContent = "000";
    cardNumberSpan.textContent = "0000 0000 0000 0000";
    nameSpan.textContent = "Jane Applessed";
    monthSpan.textContent = "00";
    yearSpan.textContent = "00";
    for(const input of inputs) input.value = "";
};

inputs.forEach((input) => {
    input.addEventListener("focus", () => {
        checkInputs(DOMTokenList.prototype.remove);
    });
});

nameInput.addEventListener("input", (e) => {
    let valorAtual = e.target.value;
    e.target.value = valorAtual.toUpperCase();
});

nameInput.addEventListener("keypress", (e) => {
    if(!checkChar(e, "[a-zA-Z ]")) e.preventDefault();
});

nameInput.addEventListener("keyup", (e) => {
    nameSpan.textContent = e.target.value;
});

cardNumberInput.addEventListener("keyup", (e) => {
    cardNumberSpan.textContent = e.target.value;
});

monthInput.addEventListener("keyup", (e) => {
    monthSpan.textContent = e.target.value;
});

yearInput.addEventListener("keyup", (e) => {
    yearSpan.textContent = e.target.value;
});

codeInput.addEventListener("keyup", (e) => {
    codeSpan.textContent = e.target.value;
})

submitDiv.addEventListener("click", () => {
    checkInputs(DOMTokenList.prototype.add);
    checkErrors();
});

returnDiv.addEventListener("click", () => {
    form.classList.toggle("hide");
    thanksSection.classList.toggle("hide");
    cleanForm();
});