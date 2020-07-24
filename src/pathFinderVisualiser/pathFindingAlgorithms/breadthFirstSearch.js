export function bfs(grid = [], startNode, finishNode) {
    const queue = [];
    const visitedNodesInOrder = [];

    startNode.isVisited = true; //isVisited is a property of node
    queue.push(startNode); //grid[i][j]

    while (!!queue.length) { // why !!
        let node = queue.shift(); //pop

        if (finishNode === node)
            return [visitedNodesInOrder, calculatePath(finishNode)];

        if (node.isWall) continue; //grid[i][j] = 1;

        const neighbors = getAllNeighbors(grid, node);

        for (const neighbor of neighbors) {
            neighbor.isVisited = true;
            neighbor.previousNode = node;
            visitedNodesInOrder.push(neighbor);
            queue.push(neighbor);
        }
    }

    return [visitedNodesInOrder, calculatePath(finishNode)];
}

function calculatePath(finishNode) {
    const shortestPathNodes = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        shortestPathNodes.unshift(currentNode);//adding
        currentNode = currentNode.previousNode;
    }
    return shortestPathNodes;
}

function getAllNeighbors(grid = [], node) {
    const ROWS = grid.length;
    const COLS = grid[0].length;

    const { row, col } = node;
    const neighbors = [];

    if (
        row + 1 >= 0 &&
        row + 1 < ROWS &&
        col >= 0 &&
        col < COLS &&
        !grid[row + 1][col].isVisited &&
        !grid[row + 1][col].isWall
    ) {
        neighbors.push(grid[row + 1][col]);
    }
    if (
        row - 1 >= 0 &&
        row - 1 < ROWS &&
        col >= 0 &&
        col < COLS &&
        !grid[row - 1][col].isWall &&
        !grid[row - 1][col].isVisited
    ) {
        neighbors.push(grid[row - 1][col]);
    }
    if (
        row >= 0 &&
        row < ROWS &&
        col - 1 >= 0 &&
        col - 1 < COLS &&
        !grid[row][col - 1].isWall &&
        !grid[row][col - 1].isVisited
    ) {
        neighbors.push(grid[row][col - 1]);
    }
    if (
        row >= 0 &&
        row < ROWS &&
        col + 1 >= 0 &&
        col + 1 < COLS &&
        !grid[row][col + 1].isWall &&
        !grid[row][col + 1].isVisited
    ) {
        neighbors.push(grid[row][col + 1]);
    }

    return neighbors;
}
