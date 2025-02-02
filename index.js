let num = "";
let result = null;
let operation = "";
let previousNum = "";
let operatorClicked = false; // New flag to track repeated operator clicks

function CalFunc(num1, num2, operator) {
    let output;
    switch (operator) {
        case '+': output = num1 + num2; break;
        case '-': output = num1 - num2; break;
        case '*': output = num1 * num2; break;
        case '÷': 
            if (num2 === 0) return "Cannot divide by zero";
            output = num1 / num2;
            break;
        default: return "NaN";
    }
    return Number.isInteger(output) ? output : parseFloat(output.toFixed(3)); // Remove unnecessary decimals
}

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
        let screenText = document.getElementById("screen-text");
        let smallScreen = document.getElementById("small-screen");
        let btnValue = this.innerText;

        if (btnValue === "CL") { 
            num = "";
            previousNum = "";
            operation = "";
            result = null;
            operatorClicked = false; // Reset flag
            screenText.innerText = "0";
            smallScreen.innerText = "";
        } 
        
        else if (btnValue === "DEL") { 
            num = num.slice(0, -1);
            screenText.innerText = num || "0";
        } 
        
        else if (["+", "-", "*", "÷"].includes(btnValue)) {
            if (operatorClicked) {
                alert("You cannot enter two operators in a row!");
                return;
            }
            
            if (num === "" && previousNum === "") {
                alert("Enter a number first!");
                return;
            }

            if (previousNum !== "" && num !== "") {
                // Perform calculation if there's a previous number
                let num1 = parseFloat(previousNum);
                let num2 = parseFloat(num);
                result = CalFunc(num1, num2, operation);
                screenText.innerText = result;
                previousNum = result.toString();
                num = "";
            } else {
                previousNum = num; // Store the first number
                num = "";
            }

            operation = btnValue; // Store the new operator
            smallScreen.innerText = `${previousNum} ${operation}`; // Update small screen
            screenText.innerText = ""; // Clear main screen
            operatorClicked = true; // Set flag to prevent double operator clicks
        } 
        
        else if (btnValue === "=") {
            if (previousNum === "" || num === "" || operation === "") {
                alert("Invalid calculation! Enter numbers first.");
                return;
            }
        
            let num1 = parseFloat(previousNum);
            let num2 = parseFloat(num);
        
            result = CalFunc(num1, num2, operation);
        
            screenText.innerText = result;
            smallScreen.innerText = `${previousNum} ${operation} ${num} =`; // Show full equation in small screen
            
            num = result.toString();
            previousNum = "";
            operation = "";
            operatorClicked = false; // Reset flag
        }
        
        else { 
            num += btnValue;
            screenText.innerText = num;
            operatorClicked = false; // Reset flag since a number is entered
        }
    });
});
