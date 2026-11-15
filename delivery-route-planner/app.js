class Graph {
   constructor() {
    this.adjacencyList = new Map();
   }
   addLocation(location) {
    if (this.adjacencyList.has(location)) {
        return false;
    }
    this.adjacencyList.set(location, []);
    return true;
   }
   addRoad(from, to) {
    if (!this.adjacencyList.has(from) || !this.adjacencyList.has(to)) {
        return false;
    }
    this.adjacencyList.get(from).push(to);
    this.adjacencyList.get(to).push(from);
    return true;
   }
   hasLocation(location) {
    return this.adjacencyList.has(location);
   }
   hasRoad(from, to) {
    if (!this.adjacencyList.has(from) || !this.adjacencyList.has(to)) {
        return false;
    }
    return this.adjacencyList.get(from).includes(to);
   }
   getConnections(location) {
    if (!this.adjacencyList.has(location)) {
        return [];
    }
    return this.adjacencyList.get(location);
   }
   removeRoad(from, to) {
    if (!this.adjacencyList.has(from) || !this.adjacencyList.has(to)) {
        return false;
    }
    const fromIndex = this.adjacencyList.get(from).indexOf(to);
    const toIndex = this.adjacencyList.get(to).indexOf(from);
    if (fromIndex === -1 || toIndex === -1) {
        return false;
    }
    this.adjacencyList.get(from).splice(fromIndex, 1);
    this.adjacencyList.get(to).splice(toIndex, 1);
    return true;
   }
   removeLocation(location) {
    if (!this.adjacencyList.has(location)) {
        return false;
    }
    for (const connectedLocation of [...this.adjacencyList.get(location)]) {
        this.removeRoad(location, connectedLocation);
    }
    this.adjacencyList.delete(location);
    return true;
   }
   addRoad(locationA, locationB) {
  if (!this.adjacencyList.has(locationA) || !this.adjacencyList.has(locationB)) {
    return false;
  }
  // Prevent adding the same road more than once
  if (this.hasRoad(locationA, locationB)) {
    return false;
  }
  this.adjacencyList.get(locationA).push(locationB);
  this.adjacencyList.get(locationB).push(locationA);
  return true;
}
   breadthFirstSearch(startLocation) {
    if (!this.adjacencyList.has(startLocation)) {
        return [];
    }
    const visited = new Set();
    const queue = [startLocation];
    visited.add(startLocation);
    while (queue.length > 0) {
        const currentLocation = queue.shift();
        for (const connectedLocation of this.adjacencyList.get(currentLocation)) {
            if (!visited.has(connectedLocation)) {
                visited.add(connectedLocation);
                queue.push(connectedLocation);
            }
        }
    }
    return [...visited];
   }
   depthFirstSearch(startLocation) {
       if (!this.adjacencyList.has(startLocation)) {
        return [];
       }
       const visited = new Set();
       const stack = [startLocation];
       const order = [];

       while (stack.length > 0) {
        const currentLocation =stack.pop();
        if (visited.has(currentLocation)) {
          continue;
        }
        visited.add(currentLocation);
        order.push(currentLocation);
        
        const connections = this.adjacencyList.get(currentLocation);
        for (let i = connections.length - 1; i >= 0; i--) {
           if (!visited.has(connections[i])) {
            stack.push(connections[i]);
           }
        }

       }
       return order;
    
    }
         findRoute(startLocation, destination) {
    if (!this.adjacencyList.has(startLocation) || !this.adjacencyList.has(destination)) {
        return null;
    }
    const visited = new Set([startLocation]);
    const queue = [startLocation];
    const previous = new Map();

    while (queue.length > 0) {
        const currentLocation = queue.shift();

        if (currentLocation === destination) {
            const route = [];
            let step = destination;
            while (step !== undefined) {
                route.unshift(step);
                step = previous.get(step);
            }
            return route;
        }

        for (const connectedLocation of this.adjacencyList.get(currentLocation)) {
            if (!visited.has(connectedLocation)) {
                visited.add(connectedLocation);
                previous.set(connectedLocation, currentLocation);
                queue.push(connectedLocation);
            }
        }
    }
    return null;
   }
       locationCount() {
    return this.adjacencyList.size;
   }
   roadCount() {
    let total = 0;
    for (const connections of this.adjacencyList.values()) {
        total += connections.length;
    }
    return total / 2;
   }
}
const deliveryGraph = new Graph();
//Locations
deliveryGraph.addLocation("Warehouse");
deliveryGraph.addLocation("Downtown");
deliveryGraph.addLocation("Airport");
deliveryGraph.addLocation("North Station");
deliveryGraph.addLocation("Shopping Center");
deliveryGraph.addLocation("University");
deliveryGraph.addLocation("Hospital");
//From Warehouse
deliveryGraph.addRoad("Warehouse", "Downtown");
deliveryGraph.addRoad("Warehouse", "Airport");
deliveryGraph.addRoad("Downtown", "Shopping Center");
deliveryGraph.addRoad("Downtown", "University");
deliveryGraph.addRoad("Airport", "North Station");
deliveryGraph.addRoad("North Station", "Hospital");
deliveryGraph.addRoad("Shopping Center", "Hospital");
deliveryGraph.addRoad("University", "Hospital");

for (const [location, connections] of deliveryGraph.adjacencyList) {
    console.log(`${location}: ${connections.join(", ")}`);
}

const bfsResult = deliveryGraph.breadthFirstSearch("Warehouse");
console.log("BFS:", bfsResult);
const dfsResult = deliveryGraph.depthFirstSearch("Warehouse");
console.log("DFS:", dfsResult);
const route = deliveryGraph.findRoute("Warehouse", "Hospital");
console.log("Delivery route:", route.join(" -> "));
deliveryGraph.addLocation("Remote Office");

console.log("Remote Office exists:", deliveryGraph.hasLocation("Remote Office"));
console.log("BFS reaches Remote Office:", deliveryGraph.breadthFirstSearch("Warehouse").includes("Remote Office"));
console.log("DFS reaches Remote Office:", deliveryGraph.depthFirstSearch("Warehouse").includes("Remote Office"));
console.log("Route to Remote Office:", deliveryGraph.findRoute("Warehouse", "Remote Office"));

// ---- Tests: adding and checking ----
const testGraph = new Graph();

console.assert(testGraph.addLocation("A") === true, "A location can be added");
console.assert(testGraph.addLocation("A") === false, "A duplicate location is not added");
testGraph.addLocation("B");
testGraph.addLocation("C");

console.assert(testGraph.addRoad("A", "B") === true, "A road can be added");
console.assert(testGraph.hasRoad("A", "B") === true, "Road is stored from A to B");
console.assert(testGraph.hasRoad("B", "A") === true, "Road is stored from B to A");
console.assert(testGraph.addRoad("A", "B") === false, "A duplicate road is not added");
console.assert(testGraph.getConnections("A").length === 1, "A has only one connection to B");
console.assert(testGraph.addRoad("A", "Missing") === false, "A road cannot be added when a location is missing");

console.assert(testGraph.hasLocation("A") === true, "hasLocation finds an existing location");
console.assert(testGraph.hasLocation("Missing") === false, "hasLocation returns false for a missing location");
console.assert(testGraph.hasRoad("A", "C") === false, "hasRoad returns false when there is no road");

// ---- Tests: searching, routes, and removing ----
const testGraph2 = new Graph();
["A", "B", "C", "D", "E"].forEach(name => testGraph2.addLocation(name));
testGraph2.addRoad("A", "B");
testGraph2.addRoad("B", "C");
testGraph2.addRoad("A", "C");
// D is connected to E, but neither connects to A, B or C
testGraph2.addRoad("D", "E");

const bfsTest = testGraph2.breadthFirstSearch("A");
const dfsTest = testGraph2.depthFirstSearch("A");

console.assert(bfsTest.length === 3, "BFS visits all reachable locations");
console.assert(dfsTest.length === 3, "DFS visits all reachable locations");
console.assert(new Set(bfsTest).size === bfsTest.length, "BFS has no repeated locations");
console.assert(new Set(dfsTest).size === dfsTest.length, "DFS has no repeated locations");

const testRoute = testGraph2.findRoute("A", "C");
console.assert(
    testRoute !== null && testRoute[0] === "A" && testRoute[testRoute.length - 1] === "C",
    "findRoute returns a valid route"
);
console.assert(testGraph2.findRoute("A", "D") === null, "A missing route returns null");

console.assert(testGraph2.removeRoad("A", "C") === true, "A road can be removed");
console.assert(testGraph2.hasRoad("A", "C") === false, "Road is removed from A to C");
console.assert(testGraph2.hasRoad("C", "A") === false, "Road is removed from C to A");
console.assert(testGraph2.removeRoad("A", "C") === false, "Removing a missing road returns false");

console.assert(testGraph2.removeLocation("B") === true, "A location can be removed");
console.assert(testGraph2.hasLocation("B") === false, "The removed location no longer exists");
console.assert(!testGraph2.getConnections("A").includes("B"), "Removed location is gone from A's connections");
console.assert(!testGraph2.getConnections("C").includes("B"), "Removed location is gone from C's connections");

// ---- Larger performance test ----
const largeGraph = new Graph();
const total = 1000;

for (let i = 1; i <= total; i++) {
    largeGraph.addLocation(`Location-${i}`);
}

// Connect each location to the next one
for (let i = 1; i < total; i++) {
    largeGraph.addRoad(`Location-${i}`, `Location-${i + 1}`);
}

// Extra roads to create multiple route choices
for (let i = 1; i <= total - 10; i += 10) {
    largeGraph.addRoad(`Location-${i}`, `Location-${i + 10}`);
}

console.time("BFS");
largeGraph.breadthFirstSearch("Location-1");
console.timeEnd("BFS");

console.time("DFS");
largeGraph.depthFirstSearch("Location-1");
console.timeEnd("DFS");

console.time("Find route");
largeGraph.findRoute("Location-1", `Location-${total}`);
console.timeEnd("Find route");

const t1 = performance.now();
largeGraph.breadthFirstSearch("Location-1");
const bfsTime = (performance.now() - t1).toFixed(3);

const t2 = performance.now();
largeGraph.depthFirstSearch("Location-1");
const dfsTime = (performance.now() - t2).toFixed(3);

const t3 = performance.now();
largeGraph.findRoute("Location-1", `Location-${total}`);
const routeTime = (performance.now() - t3).toFixed(3);

console.log("\n--- Final Summary ---");
console.log("The delivery company used a graph to represent locations as vertices and roads as edges.");
console.log("Number of locations:", deliveryGraph.locationCount());
console.log("Number of roads:", deliveryGraph.roadCount());
console.log("BFS order:", bfsResult.join(", "));
console.log("DFS order:", dfsResult.join(", "));
console.log("Route from Warehouse to Hospital:", route.join(" -> "));
console.log("Unreachable test: Remote Office exists but BFS, DFS and findRoute cannot reach it (route is null).");
console.log(`Large graph (${total} locations): BFS ${bfsTime}ms, DFS ${dfsTime}ms, route ${routeTime}ms`);
console.log("Key difference: BFS visits nearby locations first (queue), while DFS follows one route as far as it can before backing up (stack).");

/*
EXPLANATION

What does a vertex represent in the delivery system?
A vertex is a delivery location, such as the Warehouse, Airport, or Hospital.

What does an edge represent?
An edge is a road connecting two locations. The roads are two-way, so the graph is undirected.

What is an adjacency list?
An adjacency list stores each location along with a list of the locations directly connected to it. This program uses a Map for it.

What is the difference between BFS and DFS?
BFS uses a queue and visits nearby locations before moving farther away. DFS uses a stack and follows one route as far as it can before backing up to try another.

Why does a graph need to track visited locations?
Graphs can contain loops, so without tracking, the search could keep revisiting the same locations forever. Tracking also makes sure each location is visited only once.

Why is BFS useful for finding a route with the fewest roads?
BFS explores all locations one road away, then two roads away, and so on. The first time it reaches the destination, it got there using the fewest roads.

What happens when a location cannot be reached?
The search never visits it. BFS and DFS leave it out of their results, and findRoute returns null.

TIME COMPLEXITY
- Adding a location to a Map is usually O(1).
- Checking whether a location exists is usually O(1).
- BFS is O(V + E), where V is the number of vertices and E is the number of edges.
- DFS is O(V + E).
- Removing a road or checking a connection may need to search a location's connection list, so the time depends on how many neighbors it has.
*/