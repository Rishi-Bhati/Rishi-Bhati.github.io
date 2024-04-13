document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const keys = document.querySelectorAll(".keys button");
    let count = 1;

    keys.forEach(key => {
        key.addEventListener("click", function() {
            const keyValue = key.textContent;
            
            if (keyValue === "=") {
                try {
                    // display.value = eval(display.value);
                    const result = new Function('return ' + display.value)();
                    display.value = isNaN(result) ? 'Error' : result;
                } catch (error) {
                    display.value = "Error";
                }
            } else if (keyValue === "C") {
                display.value = "";
                count = 1;
            } else if (keyValue === "( )") {
                if (count == 1) {
                    
                    const expressionBeforeCaret = display.value.substring(0, display.selectionStart);
                    const matches = expressionBeforeCaret.match(/[0-9.]+$/);
                    if (matches) {
                        const lastNumber = matches[0];
                        display.value = expressionBeforeCaret.replace(/[0-9.]+$/, lastNumber + "*");
                    }
                    display.value += "(";
                    count = 2;
                } else if (count == 2) {
                    const expressionBeforeCaret = display.value.substring(0, display.selectionStart);
                    const matches = expressionBeforeCaret.match(/["("]+$/);
                    if (matches) {
                        const lastNumber = matches[0];
                        display.value = expressionBeforeCaret.replace(/["("]+$/, lastNumber + "0");
                    }
                    display.value += ")";
                    count = 1;
                }
            } else if (keyValue == "<=") {
                const expressionBeforeCaret = display.value.substring(0, display.selectionStart-1);
                display.value = expressionBeforeCaret;
            }
            
            else if (keyValue === "%") {
                 
                const expressionBeforeCaret = display.value.substring(0, display.selectionStart);
                
                const matches = expressionBeforeCaret.match(/[0-9.]+$/);
                if (matches) {
                    const lastNumber = parseFloat(matches[0]);
                    display.value = expressionBeforeCaret.replace(/[0-9.]+$/, lastNumber / 100);
                } } else {
                display.value += keyValue;
            }
        });
    });
});