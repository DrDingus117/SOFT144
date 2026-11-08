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

function insertionSortByTotal(arr) {
    // Create a shallow copy of the array to avoid mutating the original
    let sortedArray = [...arr];
    let n = sortedArray.length;
    let comparisons = 0;
    let moves = 0;

    for (let i = 1; i < n; i++) {
        let currentOrder = sortedArray[i];
        let j = i - 1;

        // An insertion sort comparison happens every time we check the loop condition
        while (j >= 0) {
            comparisons++; // Increment comparison count
            
            if (sortedArray[j].total > currentOrder.total) {
                // Shift the element to the right
                sortedArray[j + 1] = sortedArray[j];
                moves++; // An order changed position in the array
                j--;
            } else {
                // Found the correct spot; break the loop
                break;
            }
        }

        // Place the current order into its final position for this pass
        // If it moves to a new index, count it as a move
        if (j + 1 !== i) {
            sortedArray[j + 1] = currentOrder;
            moves++;
        }
    }

    return {
        sortedArray: sortedArray,
        comparisons: comparisons,
        moves: moves
    };
}

// --- Run the Sorting Algorithms ---
const bubbleResult = bubbleSortByTotal(orders);
const selectionResult = selectionSortByTotal(orders);
const insertionResult = insertionSortByTotal(orders);


// --- Display Bubble Sort Results ---
console.log("Bubble Sort Results:");
bubbleResult.sortedArray.forEach(order => {
    console.log(
        order.orderNumber,
        order.customer,
        order.total
    );
});
console.log(`Metrics -> Comparisons: ${bubbleResult.comparisons}, Swaps: ${bubbleResult.swaps}\n`);


// --- Display Selection Sort Results ---
console.log("Selection Sort Results:");
selectionResult.sortedArray.forEach(order => {
    console.log(
        order.orderNumber,
        order.customer,
        order.total
    );
});
console.log(`Metrics -> Comparisons: ${selectionResult.comparisons}, Swaps: ${selectionResult.swaps}\n`);


// --- Display Insertion Sort Results ---
console.log("Insertion Sort Results:");
insertionResult.sortedArray.forEach(order => {
    console.log(
        order.orderNumber,
        order.customer,
        order.total
    );
});
console.log(`Metrics -> Comparisons: ${insertionResult.comparisons}, Moves: ${insertionResult.moves}\n`);

// ==========================================
// TEST SUITE FOR SORTING ALGORITHMS
// ==========================================

// Run the core data through the algorithms for verification
const bRes = bubbleSortByTotal(orders);
const sRes = selectionSortByTotal(orders);
const iRes = insertionSortByTotal(orders);

// --- 1. First order has the lowest total & Last order has the highest total ---
console.assert(bRes.sortedArray[0].total === 42.75, "Bubble Sort: First item should have the lowest total (42.75)");
console.assert(bRes.sortedArray[bRes.sortedArray.length - 1].total === 1999.99, "Bubble Sort: Last item should have the highest total (1999.99)");

console.assert(sRes.sortedArray[0].total === 42.75, "Selection Sort: First item should have the lowest total (42.75)");
console.assert(sRes.sortedArray[sRes.sortedArray.length - 1].total === 1999.99, "Selection Sort: Last item should have the highest total (1999.99)");

console.assert(iRes.sortedArray[0].total === 42.75, "Insertion Sort: First item should have the lowest total (42.75)");
console.assert(iRes.sortedArray[iRes.sortedArray.length - 1].total === 1999.99, "Insertion Sort: Last item should have the highest total (1999.99)");


// --- 2. Every order is in ascending order by total ---
for (let i = 0; i < bRes.sortedArray.length - 1; i++) {
    console.assert(bRes.sortedArray[i].total <= bRes.sortedArray[i + 1].total, `Bubble Sort failed ascending check at index ${i}`);
    console.assert(sRes.sortedArray[i].total <= sRes.sortedArray[i + 1].total, `Selection Sort failed ascending check at index ${i}`);
    console.assert(iRes.sortedArray[i].total <= iRes.sortedArray[i + 1].total, `Insertion Sort failed ascending check at index ${i}`);
}


// --- 3. Each algorithm returns the same number of orders ---
console.assert(bRes.sortedArray.length === 9, "Bubble Sort should return exactly 9 items");
console.assert(sRes.sortedArray.length === 9, "Selection Sort should return exactly 9 items");
console.assert(iRes.sortedArray.length === 9, "Insertion Sort should return exactly 9 items");


// --- 4. Each algorithm produces the same sorted order ---
for (let i = 0; i < 9; i++) {
    console.assert(bRes.sortedArray[i].orderNumber === sRes.sortedArray[i].orderNumber, `Mismatch between Bubble and Selection sort at index ${i}`);
    console.assert(bRes.sortedArray[i].orderNumber === iRes.sortedArray[i].orderNumber, `Mismatch between Bubble and Insertion sort at index ${i}`);
}


// --- 5. The original order array was not changed (Immutability check) ---
console.assert(orders[0].orderNumber === 1005, "Mutation Check: Original array element 0 was modified");
console.assert(orders[1].orderNumber === 1002, "Mutation Check: Original array element 1 was modified");
console.assert(orders.length === 9, "Mutation Check: Original array length changed");


// --- 6. An empty array can be sorted without an error ---
const emptyArr = [];
console.assert(bubbleSortByTotal(emptyArr).sortedArray.length === 0, "Bubble Sort failed to handle an empty array");
console.assert(selectionSortByTotal(emptyArr).sortedArray.length === 0, "Selection Sort failed to handle an empty array");
console.assert(insertionSortByTotal(emptyArr).sortedArray.length === 0, "Insertion Sort failed to handle an empty array");


// --- 7. An array containing one order can be sorted ---
const singleArr = [{ orderNumber: 9999, customer: "Solo Test", total: 10.00 }];
console.assert(bubbleSortByTotal(singleArr).sortedArray[0].total === 10.00, "Bubble Sort failed to sort a single item");
console.assert(selectionSortByTotal(singleArr).sortedArray[0].total === 10.00, "Selection Sort failed to sort a single item");
console.assert(insertionSortByTotal(singleArr).sortedArray[0].total === 10.00, "Insertion Sort failed to sort a single item");


// --- 8. Orders with the same total can be sorted without losing data ---
const duplicateTotals = [
    { orderNumber: 5001, total: 25.00 },
    { orderNumber: 5002, total: 10.00 },
    { orderNumber: 5003, total: 25.00 }
];
const dupBubble = bubbleSortByTotal(duplicateTotals).sortedArray;
const dupSelection = selectionSortByTotal(duplicateTotals).sortedArray;
const dupInsertion = insertionSortByTotal(duplicateTotals).sortedArray;

console.assert(dupBubble.length === 3 && dupBubble[0].total === 10 && dupBubble[2].total === 25, "Bubble Sort dropped data or sorted incorrectly with duplicate values");
console.assert(dupSelection.length === 3 && dupSelection[0].total === 10 && dupSelection[2].total === 25, "Selection Sort dropped data or sorted incorrectly with duplicate values");
console.assert(dupInsertion.length === 3 && dupInsertion[0].total === 10 && dupInsertion[2].total === 25, "Insertion Sort dropped data or sorted incorrectly with duplicate values");

console.log("Tests completed! If no failed assetions appeared above, all tests passed successfully.");

// --- Report 1: Highest Total to Lowest Total (Descending) ---
const ordersByTotalDesc = [...orders];
ordersByTotalDesc.sort((a, b) => b.total - a.total);

console.log("Orders Sorted by Total (Highest to Lowest):");
ordersByTotalDesc.forEach(order => {
    console.log(order.orderNumber, order.customer, order.total);
});
console.log("\n");


// --- Report 2: Lowest Order Number to Highest Order Number (Ascending) ---
const ordersByNumberAsc = [...orders];
ordersByNumberAsc.sort((a, b) => a.orderNumber - b.orderNumber);

console.log("Orders Sorted by Order Number (Lowest to Highest):");
ordersByNumberAsc.forEach(order => {
    console.log(order.orderNumber, order.customer, order.total);
});
console.log("\n");


// --- Report 3: Delivery Priority (Priority 1 First) ---
const ordersByPriority = [...orders];
ordersByPriority.sort((a, b) => a.priority - b.priority);

console.log("Orders Sorted by Delivery Priority (Priority 1 First):");
ordersByPriority.forEach(order => {
    console.log(order.orderNumber, order.customer, `Priority: ${order.priority}`);
});
