class WeightedEdge {

    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.weight = w; 
    }

    other(v) {

        if (v === this.i) {
            return this.j;
        }

        return this.i;
    }

    vertex() {
        return this.j;
    }

    getWeight() {
        return this.weight;
    }
}

class LevelGraph {

    // TODO: Nota moveTowards til þess að færa vondukallana að réttum punkti.
    
    // edges fylkið geymir nágranna hvers hnúts
    edges = [];
    allEdges = [];

    // coords fylkið geymir hnit hnútanna,
    coords = [];

    v = 0;
    e = 0;

    constructor(n) {
        this.v = n;
        for (let i = 0; i < n; i++) {
            this.edges.push([]);
            this.coords.push([]);
        }
    }

    setCoords(v, coords) {
        this.coords[v] = coords;
    }

    getCoords(v) {
        return this.coords[v];
    }

    getEdges(v) {
        return this.edges[v];
    }

    addEdge(i, j, w) {
        if (!w) { // Látum vikt leggjarins vera fjarlægðina á milli hnútanna.
            const coords1 = this.coords[i];
            const coords2 = this.coords[j];

            if (coords1 == [] || coords2 == []) {
                throw 'vikt vantar og hnit hnúta ekki skilgreind';
            }

            if (coords1[0] == coords2[0]) {
                w = Math.abs(coords1[1] - coords2[1]);
            } else if (coords1[1] == coords2[1]) {
                w = Math.abs(coords1[0] - coords2[0]);
            } else {
                throw 'Hnútar eru ekki samsíða á x-ás eða y-ás';
            }
        }

        this.e = this.e + 1;
        this.edges[i].push(new WeightedEdge(i, j, w));
        this.edges[j].push(new WeightedEdge(i, j, w));
        this.allEdges.push(new WeightedEdge(i, j, w));
    }

    getV() {
        return this.v;
    }

    getE() {
        return this.e;
    }

    getAllEdges() {
        return this.allEdges;
    }
}

class IndexMinPQ {

    weights = [];
    pq = [];
    qp = [];
    maxSize;
    size = 0;

    constructor(maxSize) {
        this.maxSize = maxSize;

        for (let i = 0; i < this.maxSize + 1; i++) {
            this.weights.push(null);
            this.pq.push(null);
            this.qp.push(null);
        }
    }

    swap(i, j) {
        let temp = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = temp;

        this.qp[this.pq[i]] = i;
        this.qp[this.pq[i]] = j;
    }

    sink(k) {

        while(2*k <= this.size) {

            let j = 2 * k;

            if (j < this.size && this.weights[this.pq[j]] > this.weights[this.pq[j+1]]) {
                j = j + 1;
            }
            
            if (this.weights[this.pq[j]] >= this.weights[this.pq[k]]) {
                break;
            }

            this.swap(j, k);
            k = j;
        }
    }

    swim(k) {
        while(Math.floor(k / 2) > 0) {
            let j = Math.floor(k / 2);

            if (this.weights[this.pq[j]] <= this.weights[this.pq[k]]) {
                break;
            }

            this.swap(j, k);
            k = j;
        }
    }

    contains(i) {
        return this.weights[i + 1] !== null;
    }

    insert(i, w) {
        if (this.contains(i)) {
            throw 'Value already in pq';
        }

        i++;
        this.size++;
        this.weights[i] = w;
        this.pq[this.size] = i;
        this.qp[i] = this.size;
        this.swim(this.size);
    }

    update(i, w) {
        i++;

        const oldWeight = this.weights[i];

        this.weights[i] = w;

        if (oldWeight > w) {
            this.swim(this.qp[i]);
        } else if (oldWeight < w) {
            this.sink(this.qp[i]);

        }
    }

    isEmpty() {
        return this.size === 0;
    }

    pop() {
        if (this.size === 0) {
            throw 'priority queue empty';
        }

        let value = [this.pq[1] - 1, this.weights[this.pq[1]]];
        
        this.weights[this.pq[1]] = null;

        this.pq[1] = this.pq[this.size];
        this.qp[this.pq[1]] = 1;
        this.pq[this.size] = null;
        this.qp[value[0] + 1] = null;

        this.size--;
        this.sink(1);

        return value;
    }
}

class shortestPathHomeUtil {
    
    pq;
    edgeTo = [];
    distTo = [];
    graph;

    constructor(graph) {
        this.graph = graph;
        this.pq = new IndexMinPQ(graph.getV());

        for (let i = 0; i < graph.getV(); i++) {
            this.edgeTo.push(null);
            this.distTo.push(Number.POSITIVE_INFINITY);
        }

        this.pq.insert(21, 0);
        this.distTo[21] = 0;
        while(!this.pq.isEmpty()) {
            this.relax(this.pq.pop()[0]);
        }

    }

    relax(v) {
        for (let i = 0; i < this.graph.getEdges(v).length; i++) {
            let edge = this.graph.getEdges(v)[i];
            let w = edge.other(v);

            if (this.distTo[w] > this.distTo[v] + edge.getWeight()) {
                this.distTo[w] = this.distTo[v] + edge.getWeight();

                this.edgeTo[w] = edge;

                if (this.pq.contains(w)) {
                    this.pq.update(w, this.distTo[w]);
                } else {
                    this.pq.insert(w, this.distTo[w]);
                }
            }
        }
    }

    pathTo(v) {
        let nodes = [];
        nodes.push(v);

        if (v === 21) {
            nodes.push(21);
            return nodes;
        }

        while (this.edgeTo[v] !== null) {
            nodes.push(this.edgeTo[v].other(v));
            v = this.edgeTo[v].other(v);
        }

        return nodes;
    }
}