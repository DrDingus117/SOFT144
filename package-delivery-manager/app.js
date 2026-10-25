// ---------- Part 2: Package data ----------
const packages = [
    { trackingNumber: "PKG1002", customer: "Jordan Lee",    address: "120 Pine Street", priority: 2 },
    { trackingNumber: "PKG1003", customer: "Taylor Smith",  address: "45 Oak Avenue",   priority: 1 },
    { trackingNumber: "PKG1001", customer: "Morgan Davis",  address: "800 River Road",  priority: 3 },
    { trackingNumber: "PKG1004", customer: "Jordan Guy",    address: "120 Pine Street", priority: 1 },
    { trackingNumber: "PKG1006", customer: "John Happens",  address: "45 Oak Avenue",   priority: 2 },
    { trackingNumber: "PKG1005", customer: "Miles Davis",   address: "800 River Road",  priority: 3 },
    { trackingNumber: "PKG1008", customer: "Casey Brown",   address: "22 Maple Lane",   priority: 2 },
    { trackingNumber: "PKG1007", customer: "Riley Johnson", address: "310 Cedar Court", priority: 1 }
];

// Holds the comparison count of the most recent search (used in Part 8)
let lastComparisons = 0;

// ---------- Part 3: Linear search ----------
function linearSearch(array, target, verbose = true) {
    let comparisons = 0;

    for (let i = 0; i < array.length; i++) {
        comparisons++;
        if (array[i].trackingNumber === target) {
            lastComparisons = comparisons;
            if (verbose) console.log(`Linear search comparisons: ${comparisons}`);
            return array[i];
        }
    }

    lastComparisons = comparisons;
    if (verbose) console.log(`Linear search comparisons: ${comparisons}`);
    return null;
}

// ---------- Part 4: Sorted copy ----------
const sortedPackages = [...packages];
sortedPackages.sort((a, b) => a.trackingNumber.localeCompare(b.trackingNumber));
console.log("Sorted tracking numbers:", sortedPackages.map(p => p.trackingNumber));

// ---------- Part 5: Binary search ----------
function binarySearch(sortedArray, target, verbose = true) {
    let low = 0;
    let high = sortedArray.length - 1;
    let comparisons = 0;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        comparisons++;

        if (sortedArray[mid].trackingNumber === target) {
            lastComparisons = comparisons;
            if (verbose) console.log(`Binary search comparisons: ${comparisons}`);
            return sortedArray[mid];
        } else if (sortedArray[mid].trackingNumber < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    lastComparisons = comparisons;
    if (verbose) console.log(`Binary search comparisons: ${comparisons}`);
    return null;
}

// ---------- Part 6: Tests (silence = pass) ----------
console.log("\n--- Running tests ---");

const nearStart = linearSearch(packages, "PKG1002");
console.assert(nearStart !== null && nearStart.trackingNumber === "PKG1002",
    "Linear search should find PKG1002 near the beginning");

const nearEnd = linearSearch(packages, "PKG1007");
console.assert(nearEnd !== null && nearEnd.trackingNumber === "PKG1007",
    "Linear search should find PKG1007 near the end");

const binaryFound = binarySearch(sortedPackages, "PKG1005");
console.assert(binaryFound !== null && binaryFound.trackingNumber === "PKG1005",
    "Binary search should find PKG1005");

console.assert(linearSearch(packages, "PKG9999") === null,
    "Linear search should return null for a missing package");
console.assert(binarySearch(sortedPackages, "PKG9999") === null,
    "Binary search should return null for a missing package");

console.assert(packages[0].trackingNumber === "PKG1002" &&
               packages[7].trackingNumber === "PKG1007",
    "Original array should not be changed by sorting the copy");
console.assert(packages !== sortedPackages,
    "sortedPackages should be a separate copy");
console.log("--- Tests finished (no 'Assertion failed' above means all passed) ---");

// ---------- Part 7: Sort by priority ----------
function sortByPriority(array) {
    const copy = [...array];
    copy.sort((a, b) => a.priority - b.priority);
    return copy;
}

console.log("\n--- Packages by priority ---");
sortByPriority(packages).forEach(p => {
    console.log(`${p.trackingNumber} - priority ${p.priority}`);
});

// ---------- Part 8: Compare comparison counts ----------
function compareSearches(target) {
    linearSearch(packages, target, false);
    const linearCount = lastComparisons;
    binarySearch(sortedPackages, target, false);
    const binaryCount = lastComparisons;

    let winner;
    if (linearCount < binaryCount) winner = "Linear search";
    else if (binaryCount < linearCount) winner = "Binary search";
    else winner = "Tie";

    console.log(`\nTracking number: ${target}`);
    console.log(`  Linear search comparisons: ${linearCount}`);
    console.log(`  Binary search comparisons: ${binaryCount}`);
    console.log(`  Fewer comparisons: ${winner}`);
}

console.log("\n--- Comparison counts ---");
compareSearches("PKG1002"); // near the beginning of the original array
compareSearches("PKG1007"); // near the end of the original array
compareSearches("PKG9999"); // does not exist

// ---------- Part 9: Large performance test ----------
const bigPackages = [];
for (let i = 1; i <= 10000; i++) {
    bigPackages.push({
        trackingNumber: "PKG" + String(i).padStart(5, "0"),
        customer: `Customer ${i}`,
        address: `${i} Main Street`,
        priority: (i % 3) + 1
    });
}
// Shuffle so linear search faces unsorted data, then sort a copy for binary search
const shuffled = [...bigPackages].sort(() => Math.random() - 0.5);
const bigSorted = [...shuffled].sort((a, b) => a.trackingNumber.localeCompare(b.trackingNumber));

const existingTarget = "PKG09500";
const missingTarget = "PKG99999";
const RUNS = 1000;
const times = {};

function timeSearch(label, fn) {
    console.time(label);
    const start = performance.now();
    for (let i = 0; i < RUNS; i++) fn();
    const elapsed = performance.now() - start;
    console.timeEnd(label);
    times[label] = elapsed;
}

console.log(`\n--- Performance test (10,000 packages, ${RUNS} runs each) ---`);
timeSearch("Linear Search (existing)", () => linearSearch(shuffled, existingTarget, false));
timeSearch("Binary Search (existing)", () => binarySearch(bigSorted, existingTarget, false));
timeSearch("Linear Search (missing)",  () => linearSearch(shuffled, missingTarget, false));
timeSearch("Binary Search (missing)",  () => binarySearch(bigSorted, missingTarget, false));

linearSearch(shuffled, missingTarget, false);
const bigLinearCount = lastComparisons;
binarySearch(bigSorted, missingTarget, false);
const bigBinaryCount = lastComparisons;
console.log(`Missing package comparisons: linear = ${bigLinearCount}, binary = ${bigBinaryCount}`);

// ---------- Part 10: Time complexity ----------
console.log("\n--- Time complexity ---");
console.log("Linear search is O(n) because it may need to check every package.");
console.log("Binary search is O(log n) because it removes half of the remaining search area after each comparison.");
console.log("Accessing an array element by its index is O(1).");
console.log("Sorting is generally more expensive than one search, but a sorted list makes repeated searches faster.");

// ---------- Part 11: Final summary ----------
console.log("\n--- Final summary ---");
console.log("Searching and sorting: the delivery company searches by tracking number to find a package quickly, and sorts by priority so urgent packages are delivered first.");
console.log("Linear search checks packages one at a time from the start; binary search checks the middle and discards half of the list each step.");
console.log("Binary search requires sorted data because it decides which half to discard by whether the target is bigger or smaller than the middle item. On unsorted data that decision would be wrong.");
console.log(`Fewer comparisons: binary search (missing package in 10,000: ${bigBinaryCount} vs ${bigLinearCount}).`);
console.log(`Measured times for ${RUNS} runs on this computer:`);
for (const label in times) {
    console.log(`  ${label}: ${times[label].toFixed(3)} ms`);
}
console.log("Linear search is still useful for small or unsorted lists, or when you only search once (sorting first would cost more than the search).");
console.log("Binary search is better for large sorted lists that are searched many times, like a database of thousands of tracking numbers.");