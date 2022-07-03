class PriorityQueue{
    constructor(){
        this.pq = [];
    }

    enqueue(item){
        this.pq.push(item);        
    }

    peek(){
        let highestPrio = Number.MAX_SAFE_INTEGER;
        let ind = -1;

        for(let i = 0; i < this.pq.length; i++){

            if(this.pq[i].prio < highestPrio){
                highestPrio = this.pq[i].prio;
                ind = i;
            }
        }
        return ind;
    }

    dequeue(){
        let ind = this.peek();
    
        return this.pq.splice(ind,1)

    }
}


class Node{
    constructor(coord, prio, cameFrom ){
        this.coord = coord
        this.prio  = prio
        this.cameFrom = cameFrom
    }
}

//queue tests:
// let queue = new PriorityQueue();

// queue.enqueue(new Node({x: 0, y: 0}, 20, {x: 0, y: 0}))
// queue.enqueue(new Node({x: 0, y: 0}, 55, {x: 0, y: 0}))
// queue.enqueue(new Node({x: 0, y: 0}, 19, {x: 0, y: 0}))
// queue.enqueue(new Node({x: 0, y: 0}, 34, {x: 0, y: 0}))
// queue.enqueue(new Node({x: 0, y: 0}, 10, {x: 0, y: 0}))
// queue.enqueue(new Node({x: 0, y: 0}, 15, {x: 0, y: 0}))

// console.log('splice:')
// console.log(queue.dequeue())
// console.log(queue.pq)

let graph = [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
]

let g = graph;
let graphW = g[0].length;
let graphH = g.length;

let start = new Node({x: 0, y: 0}, 0, undefined)
let end = new Node({x: 3, y: 3}, 0, undefined)

dijkstra(start, end)

function dijkstra(start, end){
    let frontier = new PriorityQueue();
    frontier.enqueue(start);

    let cameFrom  = [];
    cameFrom.push(start);

    let neighbors = [[0,1],[0,-1],[1,0],[-1,0]]

    while(frontier.pq.length !== 0){

        let current = frontier.dequeue()[0];

        if(current.coord.x === end.coord.x && current.coord.y === end.coord.y){
            break;
        }
        
        for(let i = 0; i < neighbors.length; i++){
            let x = current.coord.x + neighbors[i][0];
            let y = current.coord.y + neighbors[i][1];

            if(x < 0 || y < 0){ //if end of map
                continue;
            }
            else if(x >= graphW || y >= graphH){ //if end of map
                continue;
            }
            else if(g[y][x] === 1){ //if obstacle
                continue;
            }
            else{
                let inCameFrom = false;

                for(let j = 0; j < cameFrom.length; j++){
                    if(cameFrom[j].coord.x === x && cameFrom[j].coord.y === y){
                        inCameFrom = true;
                        break;
                    }
                }
                if(!inCameFrom){
                    let priority = manhattan({x:x, y:y}, {x : end.coord.x, y: end.coord.y})
                    let node = new Node({x:x, y:y}, priority, {x: current.coord.x, y: current.coord.y})
                    frontier.enqueue(node)
                    cameFrom.push(node)
                }

            }
        }

    }

    console.log(cameFrom)


}

function manhattan(a,b){
    let x = Math.abs(a.x - b.x)
    let y = Math.abs(a.y - b.y);   

    return x + y;
}

