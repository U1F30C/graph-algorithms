import { Dictionary, DisjointSet } from "./disjoint-set";
import { head, last, minBy, sumBy } from "lodash";
interface Edge {
  weight: number;
  source: string;
  destination: string;
}

export class Graph {
  private adjacencyDescriptor: Dictionary<Dictionary<number>> = {};
  private edges: Edge[] = [];
  private vertices: Dictionary<true> = {};

  getVertices() {
    return Object.keys(this.vertices);
  }

  getEdges() {
    return Array.from(this.edges);
  }

  addEdge(
    source: string,
    destination: string,
    weight: number = 1,
    directed = false
  ) {
    this.vertices[source] = true;
    this.vertices[destination] = true;
    this.edges.push({ source, destination, weight });
    if (this.adjacencyDescriptor[source]) {
      this.adjacencyDescriptor[source][destination] = weight;
    } else {
      this.adjacencyDescriptor[source] = { [destination]: weight };
    }
    if (!directed) {
      this.addEdge(destination, source, weight, true);
    }
  }

  kruskal() {
    const treeDescription: Edge[] = [];
    const disjointSet = new DisjointSet();
    this.getVertices().forEach((vertex) => disjointSet.makeSet(vertex));
    const edges = Array.from(this.edges).sort((a, b) => a.weight - b.weight);
    edges.forEach((edge) => {
      const representative1 = disjointSet.findRepresentative(edge.source);
      const representative2 = disjointSet.findRepresentative(edge.destination);
      if (representative1 != representative2) {
        disjointSet.merge(representative1.key, representative2.key);
        treeDescription.push(edge);
      }
    });

    return treeDescription;
  }

  getNeighbors(source: string) {
    return this.getEdges().filter((edge) => edge.source == source);
  }

  dijkstra(source: string, destination: string) {
    const distances: Dictionary<number> = {};
    const pathMap: Dictionary<Edge[]> = {};
    const orderedUnvisitedVertices = this.getVertices();
    orderedUnvisitedVertices.forEach((vertex) => {
      distances[vertex] = Infinity;
    });
    distances[source] = 0;
    orderedUnvisitedVertices.sort((a, b) => distances[a] - distances[b]);
    while (orderedUnvisitedVertices.length > 0) {
      const currentVertex = <string>orderedUnvisitedVertices.shift();
      const neighbors = this.getNeighbors(currentVertex);
      neighbors
        .filter((neighborEdge) =>
          orderedUnvisitedVertices.includes(neighborEdge.destination)
        )
        .forEach((neighborEdge) => {
          const neighbor = neighborEdge.destination;
          const newDistance = distances[currentVertex] + neighborEdge.weight;
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            pathMap[neighbor] = (pathMap[currentVertex] ?? []).concat([
              neighborEdge,
            ]);
          }
        });
      orderedUnvisitedVertices.sort((a, b) => distances[a] - distances[b]);
    }
    const pathDescription: Edge[] = pathMap[destination];
    return pathDescription;
  }

  private _travellingSalesman(start: string, remaining: string[]): Edge[] {
    console.log(start, remaining);
    const startNeighbours = this.getNeighbors(start);
    if (remaining.length == 1) {
      return startNeighbours.filter(
        (edge) => edge.destination == head(remaining)
      );
    }
    const alternatives = remaining.map((nextStop) => {
      const pathHead = <Edge>(
        startNeighbours.find((edge) => edge.destination == nextStop)
      );
      const pathTail = this._travellingSalesman(
        nextStop,
        remaining.filter((stop) => stop != nextStop)
      );
      return [pathHead, ...pathTail];
    });
    let preferredPath = <Edge[]>(
      minBy(alternatives, (possiblePath) =>
        sumBy(possiblePath, (edge) => edge.weight)
      )
    );
    return preferredPath;
  }

  travellingSalesman(start: string) {
    let path = this._travellingSalesman(
      start,
      this.getVertices().filter((stop) => stop != start)
    );

    const lastEdge = this.getNeighbors((<Edge>last(path)).destination).filter(
      (edge) => edge.destination == start
    );
    path = path.concat(lastEdge);
    return path;
  }
}
