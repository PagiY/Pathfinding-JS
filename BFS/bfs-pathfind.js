class Node{
    constructor(x, y, cameFrom){
        this.x = x,
        this.y = y,
        this.cameFrom = cameFrom
    }
}

let graph = [
    [0,0,1,0,0],
    [0,0,0,0,0],
    [0,0,0,1,0],
    [0,0,0,0,0],
]

let g = graph;
let graphW = g[0].length;
let graphH = g.length;

//g[y][x]

console.log(g)
console.log(`graphW: ${graphW} graphH ${graphH}`)

let start = new Node(0,0, undefined)
let end   = new Node(2,3, undefined)

bfs_pathfind(start, end)

function bfs_pathfind(start, end){

    //draw starting and ending 
    g[start.y][start.x] = 2
    g[end.y][end.x] = 2

    frontier= [] //should be queue
    frontier.push(start)

    cameFrom = []
    cameFrom.push(start)
    
    neighbors = [[0,1],[0,-1],[1,0],[-1,0]]
    
    while (frontier.length!==0){
        current = frontier.pop();

        //early exit
        if(current.x === end.x && current.y === end.y){
            break;
        }

        for(let i = 0; i < neighbors.length; i++){
            let x = current.x + neighbors[i][0];
            let y = current.y + neighbors[i][1];

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

                let inReached = false;

                    for(let j = 0; j < cameFrom.length; j++){
                        if(cameFrom[j].x === x && cameFrom[j].y === y){
                            inReached = true;
                            break;
                        }
                    }
                    if(!inReached){
                        let node = new Node(x,y, {x: current.x, y: current.y})
                        frontier.push(node)
                        cameFrom.push(node)
                    }
                    
            }

        }
    }

    console.log(cameFrom)
    
    for(let i = 0; i < cameFrom.length; i++){
        if(cameFrom[i].x === end.x && cameFrom[i].y === end.y){
            current = cameFrom[i]
            break;
        }
    }

    path = []
    //console.log(current)

    iter = 0

    while(current.x !== start.y || current.y !== start.y){  

        path.push(current)

        for(let i = 0; i < cameFrom.length; i++){

            if(cameFrom[i].x === current.cameFrom.x && cameFrom[i].y === current.cameFrom.y){

                current = cameFrom[i];
                g[current.y][current.x] = 4; //draw the path
                break;

            }
        }

        iter+=1
    }
    
    path.push(current)

    console.log(path)
}

