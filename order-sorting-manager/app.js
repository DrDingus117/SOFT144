// ============================================================================
// ORDER SORTING MANAGER
// Compares Bubble Sort, Selection Sort, Insertion Sort, and built-in sort()
// Run with: node app.js
// ============================================================================

// ----------------------------------------------------------------------------
// PART 2: ORDER DATA
// Priority: 1 = Express, 2 = Standard, 3 = Economy
// ----------------------------------------------------------------------------
const orders = [
    { orderNumber: 1005, customer: "Jordan Lee",      total: 84.99,   priority: 2 },
    { orderNumber: 1002, customer: "Taylor Smith",    total: 149.50,  priority: 1 },
    { orderNumber: 1008, customer: "Morgan Davis",    total: 42.75,   priority: 3 },
    { orderNumber: 1009, customer: "Franklin Sierra", total: 89.99,   priority: 2 },
    { orderNumber: 1022, customer: "Amelie Griffith", total: 550.00,  priority: 1 },
    { orderNumber: 1098, customer: "Kylan Gentry",    total: 75.00,   priority: 3 },
    { orderNumber: 1025, customer: "Leighton Kramer", total: 299.99,  priority: 3 },
    { orderNumber: 1052, customer: "Makoto Yuki",     total: 1999.99, priority: 2 },
    { orderNumber: 2000, customer: "Bowen Higgins",   total: 499.99,  priority: 1 }
];

// Snapshot used later to prove the original array was never changed
const originalSnapshot = JSON.stringify(orders);

// ----------------------------------------------------------------------------
// PART 3: BUBBLE SORT (by total, ascending)
// ----------------------------------------------------------------------------
function bubbleSortByTotal(arr) {
    const sortedOrders = [...arr];
    const n = sortedOrders.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {
            comparisons++;

            if (sortedOrders[j].total > sortedOrders[j + 1].total) {
                const temp = sortedOrders[j];
                sortedOrders[j] = sortedOrders[j + 1];
                sortedOrders[j + 1] = temp;
                swaps++;
                swapped = true;
            }
        }

        // Early-stop check: a full pass with no swaps means it's already sorted
        if (!swapped) {
            break;
        }
    }

    return { sortedOrders, comparisons, swaps };
}

// ----------------------------------------------------------------------------
// PART 4: SELECTION SORT (by total, ascending)
// ----------------------------------------------------------------------------
function selectionSortByTotal(arr) {
    const sortedOrders = [...arr];
    const n = sortedOrders.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            comparisons++;

            if (sortedOrders[j].total < sortedOrders[minIndex].total) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            const temp = sortedOrders[i];
            sortedOrders[i] = sortedOrders[minIndex];
            sortedOrders[minIndex] = temp;
            swaps++;
        }
    }

    return { sortedOrders, comparisons, swaps };
}

// ----------------------------------------------------------------------------
// PART 5: INSERTION SORT (by total, ascending)
// A "move" is counted each time an order changes position in the array
// (each shift to the right, plus the final placement of the inserted order).
// ----------------------------------------------------------------------------
function insertionSortByTotal(arr) {
    const sortedOrders = [...arr];
    const n = sortedOrders.length;
    let comparisons = 0;
    let moves = 0;

    for (let i = 1; i < n; i++) {
        const currentOrder = sortedOrders[i];
        let j = i - 1;

        while (j >= 0) {
            comparisons++;

            if (sortedOrders[j].total > currentOrder.total) {
                sortedOrders[j + 1] = sortedOrders[j];
                moves++;
                j--;
            } else {
                break;
            }
        }

        // Only place the order if it actually changed position
        if (j + 1 !== i) {
            sortedOrders[j + 1] = currentOrder;
            moves++;
        }
    }

    return { sortedOrders, comparisons, moves };
}

// ----------------------------------------------------------------------------
// PART 6: RUN ALL THREE ALGORITHMS ON THE SAME ORIGINAL DATA AND DISPLAY
// ----------------------------------------------------------------------------
const bubbleResult = bubbleSortByTotal(orders);
const selectionResult = selectionSortByTotal(orders);
const insertionResult = insertionSortByTotal(orders);

function printOrders(label, sortedOrders) {
    console.log(label);
    sortedOrders.forEach(order => {
        console.log(order.orderNumber, order.customer, order.total);
    });
}

console.log("========================================================");
console.log("PART 6: SORTED ORDERS (LOWEST TOTAL TO HIGHEST TOTAL)");
console.log("========================================================\n");

printOrders("Bubble Sort Results:", bubbleResult.sortedOrders);
console.log(`Comparisons: ${bubbleResult.comparisons} | Swaps: ${bubbleResult.swaps}\n`);

printOrders("Selection Sort Results:", selectionResult.sortedOrders);
console.log(`Comparisons: ${selectionResult.comparisons} | Swaps: ${selectionResult.swaps}\n`);

printOrders("Insertion Sort Results:", insertionResult.sortedOrders);
console.log(`Comparisons: ${insertionResult.comparisons} | Moves: ${insertionResult.moves}\n`);

// ----------------------------------------------------------------------------
// PART 7: TESTS WITH console.assert()
// (Nothing prints from console.assert when a test passes.)
// ----------------------------------------------------------------------------
const results = {
    "Bubble Sort": bubbleResult,
    "Selection Sort": selectionResult,
    "Insertion Sort": insertionResult
};

function isAscending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].total > arr[i + 1].total) return false;
    }
    return true;
}

// Tests 1-3: lowest first, highest last, fully ascending
for (const [name, result] of Object.entries(results)) {
    const sorted = result.sortedOrders;
    console.assert(sorted[0].total === 42.75, `${name}: first order should have the lowest total`);
    console.assert(sorted[sorted.length - 1].total === 1999.99, `${name}: last order should have the highest total`);
    console.assert(isAscending(sorted), `${name}: every order should be in ascending order by total`);
}

// Test 4: each algorithm returns the same number of orders
for (const [name, result] of Object.entries(results)) {
    console.assert(result.sortedOrders.length === orders.length, `${name}: should return ${orders.length} orders`);
}

// Test 5: each algorithm produces the same sorted order
for (let i = 0; i < orders.length; i++) {
    console.assert(
        bubbleResult.sortedOrders[i].orderNumber === selectionResult.sortedOrders[i].orderNumber,
        `Bubble and Selection Sort differ at index ${i}`
    );
    console.assert(
        bubbleResult.sortedOrders[i].orderNumber === insertionResult.sortedOrders[i].orderNumber,
        `Bubble and Insertion Sort differ at index ${i}`
    );
}

// Test 6: the original order array was not changed
console.assert(JSON.stringify(orders) === originalSnapshot, "The original orders array was modified");

// Test 7: an empty array can be sorted without an error
const emptyArr = [];
console.assert(bubbleSortByTotal(emptyArr).sortedOrders.length === 0, "Bubble Sort failed on an empty array");
console.assert(selectionSortByTotal(emptyArr).sortedOrders.length === 0, "Selection Sort failed on an empty array");
console.assert(insertionSortByTotal(emptyArr).sortedOrders.length === 0, "Insertion Sort failed on an empty array");

// Test 8: an array with one order can be sorted
const singleArr = [{ orderNumber: 9999, customer: "Solo Test", total: 10.00, priority: 1 }];
console.assert(bubbleSortByTotal(singleArr).sortedOrders[0].orderNumber === 9999, "Bubble Sort failed on a single order");
console.assert(selectionSortByTotal(singleArr).sortedOrders[0].orderNumber === 9999, "Selection Sort failed on a single order");
console.assert(insertionSortByTotal(singleArr).sortedOrders[0].orderNumber === 9999, "Insertion Sort failed on a single order");

// Test 9: orders with the same total can be sorted without losing data
const duplicateTotals = [
    { orderNumber: 5001, customer: "A", total: 25.00, priority: 1 },
    { orderNumber: 5002, customer: "B", total: 10.00, priority: 2 },
    { orderNumber: 5003, customer: "C", total: 25.00, priority: 3 }
];
const expectedNumbers = duplicateTotals.map(o => o.orderNumber).sort((a, b) => a - b).join(",");
const duplicateResults = {
    "Bubble Sort": bubbleSortByTotal(duplicateTotals).sortedOrders,
    "Selection Sort": selectionSortByTotal(duplicateTotals).sortedOrders,
    "Insertion Sort": insertionSortByTotal(duplicateTotals).sortedOrders
};
for (const [name, sorted] of Object.entries(duplicateResults)) {
    const gotNumbers = sorted.map(o => o.orderNumber).sort((a, b) => a - b).join(",");
    console.assert(sorted.length === 3, `${name}: lost data with duplicate totals`);
    console.assert(gotNumbers === expectedNumbers, `${name}: order numbers changed with duplicate totals`);
    console.assert(isAscending(sorted), `${name}: duplicate totals not sorted correctly`);
}

console.log("Tests completed! If no 'Assertion failed' messages appeared above, all tests passed.\n");

// ----------------------------------------------------------------------------
// PART 8: OTHER REPORTS USING BUILT-IN sort()
// ----------------------------------------------------------------------------
console.log("========================================================");
console.log("PART 8: OTHER REPORTS (BUILT-IN sort())");
console.log("========================================================\n");

// Highest total to lowest total
const ordersByTotalDesc = [...orders];
ordersByTotalDesc.sort((a, b) => b.total - a.total);
console.log("Orders Sorted by Total (Highest to Lowest):");
ordersByTotalDesc.forEach(order => {
    console.log(order.orderNumber, order.customer, order.total);
});
console.log("");

// Lowest order number to highest order number
const ordersByNumberAsc = [...orders];
ordersByNumberAsc.sort((a, b) => a.orderNumber - b.orderNumber);
console.log("Orders Sorted by Order Number (Lowest to Highest):");
ordersByNumberAsc.forEach(order => {
    console.log(order.orderNumber, order.customer, order.total);
});
console.log("");

// Delivery priority (1 = Express first)
const ordersByPriority = [...orders];
ordersByPriority.sort((a, b) => a.priority - b.priority);
console.log("Orders Sorted by Delivery Priority (Priority 1 First):");
ordersByPriority.forEach(order => {
    console.log(order.orderNumber, order.customer, `Priority: ${order.priority}`);
});
console.log("");

// ----------------------------------------------------------------------------
// PART 9: NUMBER-BASED VERSIONS + DIFFERENT INPUT ORDERS
// ----------------------------------------------------------------------------
function bubbleSortNumbers(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    let comparisons = 0;
    let operations = 0; // swaps

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            comparisons++;
            if (sorted[j] > sorted[j + 1]) {
                const temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
                operations++;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return { sorted, comparisons, operations };
}

function selectionSortNumbers(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    let comparisons = 0;
    let operations = 0; // swaps

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            if (sorted[j] < sorted[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            const temp = sorted[i];
            sorted[i] = sorted[minIndex];
            sorted[minIndex] = temp;
            operations++;
        }
    }
    return { sorted, comparisons, operations };
}

function insertionSortNumbers(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    let comparisons = 0;
    let operations = 0; // moves

    for (let i = 1; i < n; i++) {
        const current = sorted[i];
        let j = i - 1;

        while (j >= 0) {
            comparisons++;
            if (sorted[j] > current) {
                sorted[j + 1] = sorted[j];
                operations++;
                j--;
            } else {
                break;
            }
        }
        if (j + 1 !== i) {
            sorted[j + 1] = current;
            operations++;
        }
    }
    return { sorted, comparisons, operations };
}

const datasets = {
    "Already Sorted": [10, 20, 30, 40, 50, 60, 70, 80],
    "Reverse Sorted": [80, 70, 60, 50, 40, 30, 20, 10],
    "Random Order":   [40, 10, 70, 30, 80, 20, 60, 50]
};

const algorithms = [
    { name: "Bubble Sort",    fn: bubbleSortNumbers,    label: "Swaps" },
    { name: "Selection Sort", fn: selectionSortNumbers, label: "Swaps" },
    { name: "Insertion Sort", fn: insertionSortNumbers, label: "Moves" }
];

// experiment[inputType][algorithmName] = { comparisons, operations }
const experiment = {};

console.log("========================================================");
console.log("PART 9: DIFFERENT INPUT ORDERS (8 NUMBERS)");
console.log("========================================================\n");

for (const [inputType, data] of Object.entries(datasets)) {
    experiment[inputType] = {};

    algorithms.forEach(algo => {
        const metrics = algo.fn(data);
        experiment[inputType][algo.name] = metrics;

        console.assert(metrics.sorted.every((v, i, a) => i === 0 || a[i - 1] <= v),
            `${algo.name} did not sort the ${inputType} numbers`);

        console.log(`Algorithm:   ${algo.name}`);
        console.log(`Input Type:  ${inputType}`);
        console.log(`Comparisons: ${metrics.comparisons}`);
        console.log(`${algo.label}:       ${metrics.operations}`);
        console.log("---------------------------------------");
    });
}
console.log("");

// ----------------------------------------------------------------------------
// PART 10: LARGER PERFORMANCE TEST (5000 RANDOM NUMBERS)
// ----------------------------------------------------------------------------
const numbers = [];
for (let i = 0; i < 5000; i++) {
    numbers.push(Math.floor(Math.random() * 100000));
}

// Separate copy for each algorithm so every one gets the same starting data
const bubbleNumbers = [...numbers];
const selectionNumbers = [...numbers];
const insertionNumbers = [...numbers];
const builtInNumbers = [...numbers];

// Uses console.time()/console.timeEnd() for printing, and performance.now()
// so the same time can be reused in the summary.
function timeIt(label, fn) {
    console.time(label);
    const start = performance.now();
    fn();
    const elapsed = performance.now() - start;
    console.timeEnd(label);
    return elapsed;
}

console.log("========================================================");
console.log(`PART 10: PERFORMANCE TEST (${numbers.length} RANDOM NUMBERS)`);
console.log("========================================================\n");

const times = {};
times["Bubble Sort"]    = timeIt("Bubble Sort",    () => bubbleSortNumbers(bubbleNumbers));
times["Selection Sort"] = timeIt("Selection Sort", () => selectionSortNumbers(selectionNumbers));
times["Insertion Sort"] = timeIt("Insertion Sort", () => insertionSortNumbers(insertionNumbers));
times["Built-in sort()"] = timeIt("Built-in sort()", () => builtInNumbers.sort((a, b) => a - b));
console.log("");

// Find the fastest custom algorithm from the measured times
const customNames = ["Bubble Sort", "Selection Sort", "Insertion Sort"];
const fastestCustom = customNames.reduce((best, name) => (times[name] < times[best] ? name : best));

// ----------------------------------------------------------------------------
// PART 11: TIME COMPLEXITY
// ----------------------------------------------------------------------------
console.log("========================================================");
console.log("PART 11: TIME COMPLEXITY");
console.log("========================================================\n");

console.log("* Bubble Sort:");
console.log("  - Usually has a time complexity of O(n²).");
console.log("  - With an early-stop check, the best case is O(n) when the data is already sorted.\n");

console.log("* Selection Sort:");
console.log("  - Has a time complexity of O(n²).\n");

console.log("* Insertion Sort:");
console.log("  - Has a worst case of O(n²).");
console.log("  - Can perform well when the data is small or already close to sorted.\n");

console.log("* Memory:");
console.log("  - Sorting algorithms that create a copy of the array require additional memory.\n");

// ----------------------------------------------------------------------------
// PART 12: ANALYZE THE RESULTS
// Answers use the measured numbers from this run.
// ----------------------------------------------------------------------------
function minName(inputType, key) {
    const entries = Object.entries(experiment[inputType]);
    const min = Math.min(...entries.map(([, m]) => m[key]));
    const winners = entries.filter(([, m]) => m[key] === min).map(([name]) => name);
    return `${winners.join(" / ")} (${min})`;
}

const sortedExp = experiment["Already Sorted"];
const reverseExp = experiment["Reverse Sorted"];
const randomExp = experiment["Random Order"];

console.log("========================================================");
console.log("PART 12: ANALYSIS OF RESULTS");
console.log("========================================================\n");

console.log("1. Which custom algorithm was fastest in the performance test?");
console.log(`   ${fastestCustom} (${times[fastestCustom].toFixed(3)} ms on this run).\n`);

console.log("2. Which algorithm made the fewest comparisons? (random 8-number data)");
console.log(`   ${minName("Random Order", "comparisons")}.\n`);

console.log("3. Which algorithm made the fewest swaps or moves? (random 8-number data)");
console.log(`   ${minName("Random Order", "operations")}. Selection Sort makes at most one swap per pass,`);
console.log("   so it usually does the least writing, even though it compares the most.\n");

console.log("4. How did Bubble Sort perform with already sorted data?");
console.log(`   It made ${sortedExp["Bubble Sort"].comparisons} comparisons and ${sortedExp["Bubble Sort"].operations} swaps.`);
console.log("   The early-stop check ended it after one pass, which is its O(n) best case.\n");

console.log("5. How did the algorithms perform with reverse-sorted data?");
algorithms.forEach(algo => {
    const m = reverseExp[algo.name];
    console.log(`   ${algo.name}: ${m.comparisons} comparisons, ${m.operations} ${algo.label.toLowerCase()}`);
});
console.log("   This is the worst case for Bubble Sort and Insertion Sort. Selection Sort");
console.log(`   still made ${reverseExp["Selection Sort"].comparisons} comparisons, the same as on any other input.\n`);

console.log("6. Was JavaScript's built-in sort() faster?");
console.log(`   ${times["Built-in sort()"] < times[fastestCustom] ? "Yes" : "No"}. Built-in: ${times["Built-in sort()"].toFixed(3)} ms vs. fastest custom (${fastestCustom}): ${times[fastestCustom].toFixed(3)} ms.\n`);

console.log("7. Which algorithm would I choose for a small, nearly sorted list?");
console.log("   Insertion Sort. On nearly sorted data it does very few comparisons and moves,");
console.log("   approaching O(n), and it is simple with low overhead.\n");

console.log("8. Why use the built-in sort() in a real project?");
console.log("   It is highly optimized (V8 uses Timsort), runs in O(n log n), is thoroughly");
console.log("   tested for edge cases, and is much faster than custom O(n²) loops on large data.\n");

// ----------------------------------------------------------------------------
// PART 13: FINAL SUMMARY
// ----------------------------------------------------------------------------
console.log("========================================================");
console.log("            ONLINE STORE PERFORMANCE SUMMARY            ");
console.log("========================================================\n");

console.log("1. How the store used sorting algorithms:");
console.log("   - Custom Bubble, Selection, and Insertion Sort organized orders by total (low to high).");
console.log("   - The built-in sort() produced the other reports: total (high to low),");
console.log("     order number (low to high), and delivery priority (Express first).\n");

console.log(`2. Fastest algorithm on this computer (${numbers.length} random numbers):`);
console.log(`   - Fastest custom algorithm: ${fastestCustom}`);
console.log(`   - Fastest overall: ${times["Built-in sort()"] < times[fastestCustom] ? "Built-in sort()" : fastestCustom}`);
console.log("   - Execution times:");
Object.entries(times).forEach(([name, ms]) => {
    console.log(`     * ${name}: ${ms.toFixed(3)} ms`);
});
console.log("");

console.log("3. Comparison and swap/move counts (8 random numbers):");
algorithms.forEach(algo => {
    const m = randomExp[algo.name];
    console.log(`   - ${algo.name}: ${m.comparisons} comparisons, ${m.operations} ${algo.label.toLowerCase()}`);
});
console.log("");

console.log("4. Effect of sorted and reverse-sorted input:");
algorithms.forEach(algo => {
    const s = sortedExp[algo.name];
    const r = reverseExp[algo.name];
    console.log(`   - ${algo.name}: sorted = ${s.comparisons} comparisons / ${s.operations} ${algo.label.toLowerCase()}; ` +
                `reverse = ${r.comparisons} comparisons / ${r.operations} ${algo.label.toLowerCase()}`);
});
console.log("");

console.log("5. One important difference between the algorithms:");
console.log("   - Selection Sort always scans the whole unsorted section and makes at most one swap");
console.log("     per pass, so its comparisons never change with input order. Bubble Sort and Insertion");
console.log("     Sort adapt to the input and do far less work on data that is already sorted.\n");

console.log("6. Sorting method I would use in a real application:");
console.log("   - The built-in sort(). It is fast (O(n log n)), well tested, and easy to use.\n");

console.log("========================================================");