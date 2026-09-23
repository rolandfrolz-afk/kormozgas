class Cirlce{

    constructor(xpos,ypos,radius,mass, dx, dy,color){
        this.xpos = xpos
        this.ypos = ypos
        this.radius = radius
        this.mass = mass
        this.color = color

        this.dx = dx
        this.dy = dy
    }

    Draw(){
        //circle itself
        ctx.beginPath()
            ctx.strokeStyle = this.color;
            ctx.lineWidth=2;
            ctx.arc(this.xpos,this.ypos,this.radius,0,2*Math.PI)
            ctx.stroke()
        ctx.closePath()

        //center
        ctx.beginPath()
            ctx.fillStyle = "white"
            ctx.arc(this.xpos,this.ypos,2,0,2*Math.PI)
            ctx.fill()
        ctx.closePath()
    }
    
    Update(){
        this.Draw()

        this.xpos += this.dx
        this.ypos += this.dy

    }
    
}

function getDistance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
}

function getVector(x1,y1,x2,y2){
    return {x: x2-x1, y: y2-y1}
}

function setMovingCircleSpeed(speed){
    const currentSpeed = Math.hypot(movingCircle.dx, movingCircle.dy)

    if(currentSpeed === 0) return

    const speedRatio = speed / currentSpeed
    movingCircle.dx *= speedRatio
    movingCircle.dy *= speedRatio
}

function drawLines(x1,y1,x2,y2){
    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.lineWidth=2;
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
    ctx.stroke()
    ctx.closePath()
}

function drawOrbit(x,y,r,color){
    ctx.beginPath()
        ctx.arc(x,y,r,0,2*Math.PI)
        ctx.strokeStyle = color
        ctx.stroke()
    ctx.closePath()
}


let baseCircle = new Cirlce(-100,-100,200,5,0,0,"white")

let baseCircle2 = new Cirlce(500,200,100,5,0,0,"white")

let movingCircle = new Cirlce(baseCircle.radius-100, -100, 30, 1, 0, -1,"red")

let movingCircle2 = new Cirlce(baseCircle.radius, -100, 30, 1, 0, -2,"blue")


let lotCircles = []

for (let index = 0; index < 20; index++) {
    let randomX = Math.floor(Math.random() * 500)
    let randomY = Math.floor(Math.random() * 500)
    lotCircles.push(new Cirlce(randomX,randomY,20,0,1,1,"green"))
    
}
