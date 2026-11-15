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

console.log("\n--- Final Summary ---");
console.log("The delivery company used a graph to represent locations as vertices and roads as edges.");
console.log("Number of locations:", deliveryGraph.adjacencyList.size);