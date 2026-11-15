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
deliveryGraph.addRoad("Warehouse", "Hospital");
deliveryGraph.addRoad("Warehouse", "North Station");
deliveryGraph.addRoad("Warehouse", "Shopping Center");
deliveryGraph.addRoad("Warehouse", "University");


console.log(deliveryGraph);