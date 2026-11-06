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
    let n = arr.length;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j].total > arr[j + 1].total) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}

