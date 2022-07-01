//without obstacles
let graph = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
]

let graph1 = [
    [1,0,1,1],
    [0,1,0,0],
    [1,0,1,1],
]

class Node {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

}

let g = graph1;
let graphW = g[0].length;
let graphH = g.length;

console.log(g)
console.log(`graphW: ${graphW} graphH ${graphH}`)

let start = new Node(0,1);

bfs(start)

function bfs(A){
    frontier = []
    frontier.push(A);

    reached = []
    reached.push(A)

    neighbors = [[0,1],[0,-1],[1,0],[-1,0]]
    
    while(frontier.length!==0){

        current = frontier.pop();

        for(let i = 0; i < neighbors.length; i++){

            let x = current.x + neighbors[i][0];
            let y = current.y + neighbors[i][1];

            if(x < 0 || y < 0){
                continue;
            }
            else if(x >= graphW || y >= graphH){
                continue;
            }
            else if(g[y][x] === 1){
                continue;
            }
            else{
                
                let inReached = false;

                for(let j = 0; j < reached.length; j++){
                    if(reached[j].x === x && reached[j].y === y){
                        inReached = true;
                        break;
                }
                }
                if(!inReached){
                    frontier.push(new Node(x,y))
                    reached.push(new Node(x,y))
                }
            }

        }
    }

    console.log(reached)
}