
class OrderHistoryStack {
    constructor() {
        this.items = [];
    }
    add(order) {
        this.items.push(order);
    }
    delete() {
        return this.items.pop();
    }
    view() {
        const index = this.items.length - 1;
        console.log(`index`, index);
        return this.items[index];
    }
    size() {
        return this.items.length;
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
class OrderQueue {
    constructor(capacity) {
        if (capacity <= 0 || !Number.isInteger(capacity)) {
            throw new Error("Capacity must be a positive integer.");
        }
        this.capacity = capacity;               
        this.items = new Array(capacity);       
        this.head = 0; 
        this.tail = 0; 
        this.count = 0; 
    }


    add(order) {
        if (this.isFull()) {
            throw new Error("Queue is full.");
        }

        this.items[this.tail] = order;
        const nextTail = (this.tail + 1) % this.capacity;
        console.log('nextTail', nextTail);
        this.tail = nextTail;
        this.count++;
    }

    
    remove() {
        
        if (this.isEmpty()) {
            return undefined;
        }

        
        const order = this.items[this.head];
        this.items[this.head] = undefined;
        this.head = (this.head + 1) % this.capacity;
        this.count--; 
        return order;
    }

    
    front() { 
        return this.isEmpty() ? undefined : this.items[this.head];
    }

    
    isEmpty() {
        return this.count === 0;
    }

    
    isFull() {
        return this.count === this.capacity;
    }

    size() {
        return this.count;
    }
}

const orderHistory = new OrderHistoryStack();
console.log(orderHistory, orderHistory.items);
console.log(orderHistory, orderHistory.size());
console.log(orderHistory, orderHistory.isEmpty());
console.log(orderHistory, orderHistory.view()); 
console.log(orderHistory, orderHistory.delete());

const orderQueue = new OrderQueue(5);
console.log(orderQueue, orderQueue.items);
console.log(orderQueue, orderQueue.size());
console.log(orderQueue, orderQueue.isEmpty());
console.log(orderQueue, orderQueue.isFull());


const order1 = { orderNumber: 1001, customer: "Jordan", item: "Keyboard" };
const order2 = { orderNumber: 1002, customer: "Maria", item: "Mouse" };
const order3 = { orderNumber: 1003, customer: "Chen", item: "Monitor" };
const order4 = { orderNumber: 1004, customer: "Priya", item: "Webcam" };
const order5 = { orderNumber: 1005, customer: "Sam", item: "Headset" };


const stack = new OrderHistoryStack();


console.assert(stack.isEmpty() === true, "stack should start empty");

stack.add(order1);
stack.add(order2);
stack.add(order3);
console.assert(stack.size() === 3, "stack size should be 3 after adding three orders");

console.assert(stack.view() === order3, "view() should return the most recent order");
console.assert(stack.size() === 3, "size() should still be 3 after view()");

console.assert(stack.delete() === order3, "first delete() should return order3");
console.assert(stack.delete() === order2, "second delete() should return order2");
console.assert(stack.delete() === order1, "third delete() should return order1");

console.assert(stack.isEmpty() === true, "stack should be empty after deleting all orders");
console.assert(stack.delete() === undefined, "delete() on an empty stack should return undefined");

const queue = new OrderQueue(3);

console.assert(queue.isEmpty() === true, "queue should start empty");

queue.add(order1);
queue.add(order2);
queue.add(order3);
console.assert(queue.size() === 3, "queue size should be 3 after adding three orders");
console.assert(queue.isFull() === true, "queue should be full after adding three orders");

console.assert(queue.front() === order1, "front() should return the oldest order");
console.assert(queue.size() === 3, "size() should still be 3 after front()");

console.assert(queue.remove() === order1, "first remove() should return order1");
console.assert(queue.isFull() === false, "queue should not be full after removing one order");

queue.add(order4);
console.assert(queue.isFull() === true, "queue should be full again after adding order4");

console.assert(queue.remove() === order2, "second remove() should return order2");
console.assert(queue.remove() === order3, "third remove() should return order3");
console.assert(queue.remove() === order4, "fourth remove() should return order4");

console.assert(queue.isEmpty() === true, "queue should be empty after removing all orders");
console.assert(queue.remove() === undefined, "remove() on an empty queue should return undefined");

const arrayQueue = [];
arrayQueue.push(order1);
arrayQueue.push(order2);
console.assert(arrayQueue.shift() === order1, "shift() should remove the first order");
console.assert(arrayQueue.length === 1, "one order should remain after shift()");

const n = 100000;

const pushArray = [];
console.time("push");
const pushStart = performance.now();
for (let i = 0; i < n; i++) {
    pushArray.push(i);
}
const pushTime = performance.now() - pushStart;
console.timeEnd("push");

const unshiftArray = [];
console.time("unshift");
const unshiftStart = performance.now();
for (let i = 0; i < n; i++) {
    unshiftArray.unshift(i);
}
const unshiftTime = performance.now() - unshiftStart;
console.timeEnd("unshift");

console.log(`push time: ${pushTime} ms`);
console.log(`unshift time: ${unshiftTime} ms`);
console.log("unshift() is usually slower because adding to the front means existing items have to move to new positions.");

console.log("\n===== FINAL SUMMARY =====");

console.log("Stack: The OrderHistoryStack tracks recently packed orders. The most recently packed order is on top, so an employee can review or undo the last action first (LIFO).");

console.log("Queue: The OrderQueue holds orders waiting to be processed. The first order received is the first one processed (FIFO), so customers are served in the order they ordered.");

console.log("O(1) operations: the stack's add, delete, view, size, and isEmpty, and the ring buffer's add, remove, front, size, isEmpty, and isFull. None of them loop over the stored orders.");

console.log("Why no shift() or unshift(): the ring buffer never moves orders around. It just moves the head and tail indexes forward with % capacity, wrapping back to the start of the array, so removing the oldest order doesn't require sliding every other order over.");

console.log(`Measured on my computer with n = ${n}:`);
console.log(`  push():    ${pushTime.toFixed(2)} ms`);
console.log(`  unshift(): ${unshiftTime.toFixed(2)} ms`);