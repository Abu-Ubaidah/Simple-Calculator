// let num = "";
// let counter = 0;
// let result = "Nan";
// let operation = "";
// let previousNum = "";
// let cut= "";
// function  CalFunc(num1,num2,operator) {
//     switch(operator) {
//         case '+':
//             result = num1 + num2;
//             break;
//         case '-':
//             result = num1 - num2;
//             break;
//         case '*':
//             result = num1 * num2;
//             break;
//         case '/':
//             if (num2 !== 0) {
//                 result = num1 / num2;
//             } else {
//                 result = "Cannot divide by zero";
//             }
//             break;
//         default:
//             result = "NaN";
//     }
    
//     return result;

// }
 

// document.querySelectorAll("button").forEach((button) => {
//   button.addEventListener("click", function () {
    
//     if (this.innerText == "cl") {
//       document.getElementById("screen").innerText = ``;
//       num = "";
//       previousNum="";
//       operation="";
//     }

//      else if (this.innerText == "x") {
//        cut = num.length - 1;
//       num = num.slice(0, cut);
//       document.getElementById("screen").innerText = `${num}`;
//     } 


//     else if (this.innerText == "+" || this.innerText == "-"|| this.innerText == "*"|| this.innerText == "/") {
//         counter ++;
//         if(counter>1&&num==""){
//             counter=0;
//             alert("cannot use operator two times without putting any other value");
            
        
//         }
//         else{
//         operation = this.innerText;
//      previousNum = num;
//       num ="";
//       document.getElementById("screen").innerText = ``;
      
//     }
      
//     }

//     else if (this.innerText == "=") {
//         counter++;
//         if (counter>2&&operation==""){
            
//             operation= "";
//             alert("first choose operator to perform action");
//             counter = counter-1
//         }
//         else{
//        let num1 = parseFloat(previousNum);
//         let num2 = parseFloat(num);
//         let operator =operation;
        

//         document.getElementById("screen").innerText = `${CalFunc(num1,num2,operator)}`;
//         console.log(num1,operator,num2,"=",result);
//         num=result;
//         operation="";
//         }

       
//       }

//     else {
//       num = num + this.innerText;
//       document.getElementById("screen").innerText = `${num}`;
//     }
    
//   });
// });

// /*when a user click on a button it stores it and whenuser click on operater save previous number in a vairable and gets ready to store another variavle  it stores another number */

let num = "";
let result = null;
let operation = "";
let previousNum = "";

function CalFunc(num1, num2, operator) {
    switch (operator) {
        case '+': return (num1 + num2).toFixed(3);
        case '-': return (num1 - num2).toFixed(3);
        case '*': return (num1 * num2).toFixed(3);
        case '÷': return num2 !== 0 ? (num1 / num2).toFixed(3) : "Cannot divide by zero";
        default: return "NaN";
    }
}


document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
        let screen = document.getElementById("screen");
        let btnValue = this.innerText;

        if (btnValue === "CL") { 
            num = "";
            previousNum = "";
            operation = "";
            result = null;
            screen.innerText = "";
        } 
        
        else if (btnValue === "DEL") { 
            num = num.slice(0, -1);
            screen.innerText = num || "0";
        } 
        
        else if (["+", "-", "*", "÷"].includes(btnValue)) {
            if (num === "" && previousNum === "") {
                alert("Enter a number first!");
                return;
            }

            if (previousNum !== "" && num !== "") {
                // Perform calculation if there's a previous number
                let num1 = parseFloat(previousNum);
                let num2 = parseFloat(num);
                result = CalFunc(num1, num2, operation);
                screen.innerText = result;
                previousNum = result.toString();
                num = "";
            } else {
                // If first time entering an operator
                previousNum = num;
                num = "";
            }

            operation = btnValue; // Store the new operator
        } 
        
        else if (btnValue === "=") {
            if (previousNum === "" || num === "" || operation === "") {
                alert("Invalid calculation! Enter numbers first.");
                return;
            }
        
            let num1 = parseFloat(previousNum);
            let num2 = parseFloat(num);
        
            result = parseFloat(CalFunc(num1, num2, operation)); // Ensure it's a number
        
            screen.innerText = result;
            num = result.toString();
            previousNum = "";
            operation = "";
        }
        
        else { 
            num += btnValue;
            screen.innerText = num;
        }
    });
});
