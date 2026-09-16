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
    

    
    baseCircle.Update()
    movingCircle.Update()
    
    i++
    prevTime = elapsed 
    requestAnimationFrame(mainLoop)
}
mainLoop()