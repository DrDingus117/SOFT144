class Graph {
   constructor() {
    this.adjacencyList = new Map();
    console.log(this.adjacencyList);
   }
   addLocation(location) {
    if (this.adjacencyList.has(location)) {
        return false;
    }
    this.adjacencyList.set(location, []);
    return true;
   }

}
const deliveryGraph = new Graph();
deliveryGraph.addLocation("Warehouse");
deliveryGraph.addLocation("Downtown");
deliveryGraph.addLocation("Airport");

console.log(deliveryGraph);