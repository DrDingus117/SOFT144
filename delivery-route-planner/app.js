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
    for (const connectedLocation of this.adjacencyList.get(location)) {
        this.removeRoad(location, connectedLocation);
    }
    this.adjacencyList.delete(location);
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
//From Downtown
deliveryGraph.addRoad("Downtown", "Airport");
deliveryGraph.addRoad("Downtown", "North Station");
deliveryGraph.addRoad("Downtown", "Shopping Center");
deliveryGraph.addRoad("Downtown", "University");
deliveryGraph.addRoad("Downtown", "Hospital");
deliveryGraph.addRoad("Downtown", "Warehouse");
//From North Station
deliveryGraph.addRoad("North Station", "Downtown");
deliveryGraph.addRoad("North Station", "Airport");
deliveryGraph.addRoad("North Station", "Warehouse");
deliveryGraph.addRoad("North Station", "Hospital");
deliveryGraph.addRoad("North Station", "Shopping Center");
deliveryGraph.addRoad("North Station", "University");
//From Shopping Center
deliveryGraph.addRoad("Shopping Center", "Downtown");
deliveryGraph.addRoad("Shopping Center", "Airport");
deliveryGraph.addRoad("Shopping Center", "Warehouse");
deliveryGraph.addRoad("Shopping Center", "Hospital");
deliveryGraph.addRoad("Shopping Center", "North Station");
deliveryGraph.addRoad("Shopping Center", "University");
//From University
deliveryGraph.addRoad("University", "Hospital");
deliveryGraph.addRoad("University", "Downtown");
deliveryGraph.addRoad("University", "Airport");
deliveryGraph.addRoad("University", "Warehouse");
deliveryGraph.addRoad("University", "North Station");
deliveryGraph.addRoad("University", "Shopping Center");
deliveryGraph.addRoad("University", "North Station");
//From Hospital
deliveryGraph.addRoad("Hospital", "Downtown");
deliveryGraph.addRoad("Hospital", "Airport");
deliveryGraph.addRoad("Hospital", "Warehouse");
deliveryGraph.addRoad("Hospital", "North Station");
deliveryGraph.addRoad("Hospital", "Shopping Center");
deliveryGraph.addRoad("Hospital", "University");


console.log(deliveryGraph);