const orders = [
    {
        orderNumber: 1005,
        customer: "Jordan Lee",
        total: 84.99,
        priority: 2
    },
    {
        orderNumber: 1002,
        customer: "Taylor Smith",
        total: 149.50,
        priority: 1
    },
    {
        orderNumber: 1008,
        customer: "Morgan Davis",
        total: 42.75,
        priority: 3
    },
    {
        orderNumber: 1009,
        customer: "Franklin Sierra",
        total: 89.99,
        priority: 2
    },
    {
        orderNumber: 1022,
        customer: "Amelie Griffith",
        total: 550.00,
        priority: 1
    },
    {
        orderNumber: 1098,
        customer: "Kylan Gentry",
        total: 75.00,
        priority: 3
    },
    {
        orderNumber: 1025,
        customer: "Leighton Kramer",
        total: 299.99,
        priority: 3
    },
    {
        orderNumber: 1052,
        customer: "Makoto Yuki",
        total: 1999.99,
        priority: 2
    },
    {
        orderNumber: 2000,
        customer: "Bowen Higgins",
        total: 499.99,
        priority: 1
    }
];

function bubbleSortByTotal(arr) {
    // Create a shallow copy of the array to avoid mutating the original
    let sortedArray = [...arr];
    let n = sortedArray.length;
    let comparisons = 0;
    let swaps = 0;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            comparisons++; // Increment comparison count
            
            if (sortedArray[j].total > sortedArray[j + 1].total) {
                // Swap the adjacent order objects
                let temp = sortedArray[j];
                sortedArray[j] = sortedArray[j + 1];
                sortedArray[j + 1] = temp;
                
                swaps++; // Increment swap count
                swapped = true;
            }
        }
        // Early exit if a complete pass happens with zero swaps
        if (!swapped) break;
    }
    
    return {
        sortedArray: sortedArray,
        comparisons: comparisons,
        swaps: swaps
    };
}
function bubbleSortByTotal(arr) {
    let sortedArray = [...arr];
    let n = sortedArray.length;
    let comparisons = 0;
    let swaps = 0;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            comparisons++;
            
            if (sortedArray[j].total > sortedArray[j + 1].total) {
                let temp = sortedArray[j];
                sortedArray[j] = sortedArray[j + 1];
                sortedArray[j + 1] = temp;
                
                swaps++;
                swapped = true;
            }
        }
        // Early-stop check: if no swaps occurred during this entire pass, stop early
        if (!swapped) {
            break;
        }
    }
    
    return {
        sortedArray: sortedArray,
        comparisons: comparisons,
        swaps: swaps
    };
}

function selectionSortByTotal(arr) {
    // Create a shallow copy of the array to avoid mutating the original
    let sortedArray = [...arr];
    let n = sortedArray.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            comparisons++; // Increment comparison count
            
            if (sortedArray[j].total < sortedArray[minIndex].total) {
                minIndex = j;
            }
        }

        // Swap the found minimum element with the first element of the unsorted section
        if (minIndex !== i) {
            let temp = sortedArray[i];
            sortedArray[i] = sortedArray[minIndex];
            sortedArray[minIndex] = temp;
            
            swaps++; // Increment swap count
        }
    }

    return {
        sortedArray: sortedArray,
        comparisons: comparisons,
        swaps: swaps
    };
}


console.log(
    order.orderNumber,
    order.customer,
    order.total
);

console.log("Bubble Sort Results:");
console.log("Selection Sort Results:");
console.log("Insertion Sort Results:");
