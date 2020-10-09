var ball;
var movingball, database, position;
function setup(){
    database= firebase.database();
    createCanvas(600,600);

    movingball = createSprite(250,250,10,10);
    movingball.shapeColor = "red";
    var movingballposition= database.ref('Ball/Position'); //reference to child node
    movingballposition.on("value", readposition, showerror); //reading values to the database
}

function draw(){
    background("white");
    //if(position!== undefined ){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
    //}
    
    drawSprites();
}

function writePosition(x,y){
    database.ref('Ball/Position').set({'x':position.x+x, 'y':position.y+y})
}

function readposition(data){
position= data.val();
movingball.x= position.x;
movingball.y= position.y;
}

function showerror(){
    console.log("errorindatabase");
}