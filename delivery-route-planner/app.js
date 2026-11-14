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