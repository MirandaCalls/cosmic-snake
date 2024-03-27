// _________                      .__           _________              __           
// \_   ___ \  ____  ______ _____ |__| ____    /   _____/ ____ _____  |  | __ ____  
// /    \  \/ /  _ \/  ___//     \|  |/ ___\   \_____  \ /    \\__  \ |  |/ // __ \ 
// \     \___(  <_> )___ \|  Y Y  \  \  \___   /        \   |  \/ __ \|    <\  ___/ 
//  \______  /\____/____  >__|_|  /__|\___  > /_______  /___|  (____  /__|_ \\___  >
//         \/           \/      \/        \/          \/     \/     \/     \/    \/ 

import runServer from './server.js';

function info()
{
    console.log("INFO");

    return {
        apiversion: "1",
        author: "mirandacalls",
        color: "#fe64d4",
        head: "scarf",
        tail: "default",
    };
}

function start(gameState)
{
    console.log("GAME START");
}

function end(gameState)
{
    console.log("GAME OVER\n");
}

function move(gameState)
{
    let isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
    };

    const myHead = gameState.you.body[0];
    const myNeck = gameState.you.body[1];
    const boardWidth = gameState.board.width;
    const boardHeight = gameState.board.height;
    const myBody = gameState.you.body;

    preventMoveBackwards(isMoveSafe, myHead, myNeck)
    preventOutOfBounds(isMoveSafe, myHead, boardWidth, boardHeight);
    preventBodyCollision(isMoveSafe, myHead, myBody)

    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // opponents = gameState.board.snakes;

    // Are there any safe moves left?
    const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        return { move: "down" };
    }

    // Choose a random move from the safe moves
    const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // food = gameState.board.food;

    console.log(isMoveSafe);
    console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    return { move: nextMove };
}

function preventMoveBackwards(isMoveSafe, myHead, myNeck)
{
    if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
        isMoveSafe.left = false;

    } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
        isMoveSafe.right = false;

    } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
        isMoveSafe.down = false;

    } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
        isMoveSafe.up = false;
    }
}

function preventOutOfBounds(isMoveSafe, myHead, boardWidth, boardHeight)
{
    console.log(myHead);
    if ((myHead.x - 1) < 0) {
        isMoveSafe.left = false;
    }
    if ((myHead.x + 1) > (boardWidth-1)) {
        isMoveSafe.right = false;
    }
    if ((myHead.y - 1) < 0) {
        isMoveSafe.down = false;
    }
    if ((myHead.y + 1) > (boardHeight-1)) {
        isMoveSafe.up = false;
    }
}

function preventBodyCollision(isMoveSafe, myHead, myBody)
{
    myBody.forEach((bodyPart) => {
        if (myHead.x - 1 == bodyPart.x && myHead.y == bodyPart.y) {
            isMoveSafe.left = false;
        }
        if (myHead.x + 1 == bodyPart.x && myHead.y == bodyPart.y) {
            isMoveSafe.right = false;
        }
        if (myHead.y - 1 == bodyPart.y && myHead.x == bodyPart.x) {
            isMoveSafe.down = false;
        }
        if (myHead.y + 1 == bodyPart.y && myHead.x == bodyPart.x) {
            isMoveSafe.up = false;
        }
    });
}

runServer({
    info: info,
    start: start,
    move: move,
    end: end
});
