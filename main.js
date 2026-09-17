let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let stats = document.getElementById("stats")

function reSize(){
    canvas.width = canvas.offsetWidth*2;
    canvas.height = canvas.offsetHeight*2;

    ctx.translate(canvas.width/2, canvas.height/2)
    ctx.scale(2,2)
}
reSize();
window.onresize =  reSize;

let prevTime = 0;
let i = 0
let deltaTimes = []
let sum = 0
let avg = 0
let movingCircleSpeed = 1

let isMouseDown = false; let mouseX = 0; let mouseY = 0;

document.addEventListener("keydown", (event) => {
    if(event.key === "ArrowUp"){
        movingCircleSpeed += 0.1
    }

})
document.addEventListener("keydown", (event) => {
    if(event.key === "ArrowDown" && movingCircleSpeed > 0.2){
        movingCircleSpeed -= 0.1
    }
}
)

document.addEventListener("mousedown", (event) => {
    isMouseDown = true
    mouseX_client = event.clientX
    mouseY_client = event.clientY
   
})
document.addEventListener("mouseup", (event) => {
    isMouseDown = false
})



function mainLoop(elapsed = 0){
    ctx.clearRect(-canvas.width,-canvas.height,canvas.width*2,canvas.height*2)
    const delta = (elapsed - prevTime)+ 1e-5
    
    deltaTimes.push(delta)
    if(i==60){
        
        i = 0; sum=0; 
        for (const element of deltaTimes) {sum += element}
        avg = 1000/(sum/deltaTimes.length)
        deltaTimes = []
    }
    stats.innerText = ``
    stats.innerText += `fps: ${avg.toFixed(1)}\n`
    stats.innerText += `RedCircle speed: ${movingCircleSpeed.toFixed(1)}\n (ArrowUp/ArrowDown)\n`
    stats.innerText += `Spam click to push BlueCircle\n`
    

    
    baseCircle.Update()
    baseCircle2.Update()

    movingCircle.Update()
    movingCircle2.Update()  
  
    

    /*
    //movingCircle.dx += radiusVector.getVector().x / radiusVector.getDistance() * 0.5
    movingCircle.dy += radiusVector.getVector().y / radiusVector.getDistance() *0.1
    */
    
    // a = v^2/r ---> 1^2/200
    
    
    movingCircle.dx += ( getVector(movingCircle.xpos,movingCircle.ypos,baseCircle.xpos,baseCircle.ypos).x / getDistance(baseCircle.xpos,baseCircle.ypos,movingCircle.xpos,movingCircle.ypos)) * (movingCircleSpeed**2/baseCircle.radius) // * acceleration
    movingCircle.dy += ( getVector(movingCircle.xpos,movingCircle.ypos,baseCircle.xpos,baseCircle.ypos).y / getDistance(baseCircle.xpos,baseCircle.ypos,movingCircle.xpos,movingCircle.ypos)) * (movingCircleSpeed**2/baseCircle.radius) // * acceleration
    setMovingCircleSpeed(movingCircleSpeed)
   

    movingCircle2.dx += ( getVector(movingCircle2.xpos,movingCircle2.ypos,baseCircle.xpos,baseCircle.ypos).x / getDistance(baseCircle.xpos,baseCircle.ypos,movingCircle2.xpos,movingCircle2.ypos)) * (4/200) 
    + (getVector(movingCircle2.xpos,movingCircle2.ypos,baseCircle2.xpos,baseCircle2.ypos).x / getDistance(baseCircle2.xpos,baseCircle2.ypos,movingCircle2.xpos,movingCircle2.ypos)) * (4/200)  // * acceleration

    movingCircle2.dy += ( getVector(movingCircle2.xpos,movingCircle2.ypos,baseCircle.xpos,baseCircle.ypos).y / getDistance(baseCircle.xpos,baseCircle.ypos,movingCircle2.xpos,movingCircle2.ypos)) * (4/200)
    + (getVector(movingCircle2.xpos,movingCircle2.ypos,baseCircle2.xpos,baseCircle2.ypos).y / getDistance(baseCircle2.xpos,baseCircle2.ypos,movingCircle2.xpos,movingCircle2.ypos)) * (4/200)// * acceleration
    
    if(isMouseDown){

        const rect = canvas.getBoundingClientRect();
        const mouseX = mouseX_client - rect.left - canvas.width/4;
        const mouseY = mouseY_client - rect.top - canvas.height/4;

        movingCircle2.dx += ( getVector(movingCircle2.xpos,movingCircle2.ypos,mouseX,mouseY).x / getDistance(mouseX,mouseY,movingCircle2.xpos,movingCircle2.ypos) * 0.1)
        movingCircle2.dy += ( getVector(movingCircle2.xpos,movingCircle2.ypos,mouseX,mouseY).y / getDistance(mouseX,mouseY,movingCircle2.xpos,movingCircle2.ypos) * 0.1)
    }
    drawLines(movingCircle2.xpos,movingCircle2.ypos,baseCircle.xpos,baseCircle.ypos)
    drawLines(movingCircle2.xpos,movingCircle2.ypos,baseCircle2.xpos,baseCircle2.ypos)

    
    


    

    i++
    prevTime = elapsed 
    requestAnimationFrame(mainLoop)
}
mainLoop()