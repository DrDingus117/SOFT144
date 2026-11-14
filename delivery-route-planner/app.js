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
   addRoute(from, to) {
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
   hasRoute(from, to) {
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
   removeRoute(from, to) {
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
        this.removeRoute(location, connectedLocation);
    }
    this.adjacencyList.delete(location);
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
deliveryGraph.addRoute("Warehouse", "Downtown");
deliveryGraph.addRoute("Warehouse", "Airport");
deliveryGraph.addRoute("Warehouse", "Downtown");
deliveryGraph.addRoute("Warehouse", "Airport");
//From Downtown
deliveryGraph.addRoute("Downtown", "Airport");
deliveryGraph.addRoute("Downtown", "North Station");
deliveryGraph.addRoute("Downtown", "Shopping Center");
deliveryGraph.addRoute("Downtown", "University");
deliveryGraph.addRoute("Downtown", "Hospital");
//From North Station
deliveryGraph.addRoute("North Station", "Downtown");
deliveryGraph.addRoute("North Station", "Airport");
deliveryGraph.addRoute("North Station", "Warehouse");
//From Shopping Center
deliveryGraph.addRoute("Shopping Center", "Downtown");
deliveryGraph.addRoute("Shopping Center", "Airport");
deliveryGraph.addRoute("Shopping Center", "Warehouse");
deliveryGraph.addRoute("Shopping Center", "Hospital");
//From University
deliveryGraph.addRoute("University", "Hospital");
deliveryGraph.addRoute("University", "Downtown");
deliveryGraph.addRoute("University", "Airport");
deliveryGraph.addRoute("University", "Warehouse");
deliveryGraph.addRoute("University", "North Station");
deliveryGraph.addRoute("University", "Shopping Center");
//From Hospital
deliveryGraph.addRoute("Hospital", "Downtown");
deliveryGraph.addRoute("Hospital", "Airport");
deliveryGraph.addRoute("Hospital", "Warehouse");
deliveryGraph.addRoute("Hospital", "North Station");
deliveryGraph.addRoute("Hospital", "Shopping Center");
deliveryGraph.addRoute("Hospital", "University");


console.log(deliveryGraph);