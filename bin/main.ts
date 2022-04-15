import { Graph } from "../lib/graph";

import printTree from "print-tree";

function main() {
  const graph = new Graph();

  // const data: [string, string, number][] = [
  //   ["1", "2", 4],
  //   ["1", "3", 1],
  //   ["1", "4", 3],
  //   ["2", "3", 2],
  //   ["2", "4", 1],
  //   ["3", "4", 5],
  // ];
  const data: [string, string, number][] = [
    ["30", "15", 1],
    ["30", "70", 1],
    ["15", "05", 1],
    ["15", "20", 1],
    ["05", "10", 1],
    ["70", "50", 1],
    ["70", "85", 1],
    ["50", "35", 1],
    ["50", "60", 1],
    ["35", "40", 1],
    ["85", "80", 1],
    ["85", "90", 1],
  ];
  data.forEach(([source, destination, weight]) => {
    graph.addEdge(source, destination, weight, true);
  });
  console.log("Arbol");
  console.log(
    printTree(
      "30",
      (a: string) => a,
      (a: string) => graph.getNeighbors(a).map((x) => x.destination)
    )
  );

  console.log("Búsqueda por profundidad");
  console.log(graph.depthFirstSearch("30", "").join());

  console.log("Búsqueda por anchura");
  console.log(graph.breadthFirstSearch("30", "").join
}

main();
