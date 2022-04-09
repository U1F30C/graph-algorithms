import { Graph } from "../lib/graph";

// import * as printTree from "print-tree";

function main() {
  const graph = new Graph();
  const data: [string, string, number][] = [
    ["1", "2", 4],
    ["1", "3", 1],
    ["1", "4", 3],
    ["2", "3", 2],
    ["2", "4", 1],
    ["3", "4", 5],
  ];
  data.forEach(([source, destination, weight]) => {
    graph.addEdge(source, destination, weight);
  });
  console.log("Grafo");
  console.log(graph.getEdges());
  
  console.log("Ruta del viajero");
  console.log(graph.travellingSalesman("1"));
  // printTree(
  //   graph.kruskal(),
  //   (a: any) => a.key,
  //   (a: any) => a.children
  // );
}

main();
