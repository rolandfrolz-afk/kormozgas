class Cirlce{

    constructor(xpos,ypos,radius,mass, vx, vy,color){
        this.xpos = xpos
        this.ypos = ypos
        this.radius = radius
        this.mass = mass
        this.color = color

        this.dx = vx
        this.dy = vy
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
class Vector{

    constructor(){
        this.x1 = baseCircle.xpos
        this.x2 = movingCircle.xpos
        this.y1 = baseCircle.ypos
        this.y2 = movingCircle.ypos

        
    }

    getVector(){
        return {x: this.x1 - this.x2, y: this.y1 - this.y2}
    }
    getDistance(){
         return Math.sqrt( Math.pow(this.x1-this.x2,2) + Math.pow(this.y1-this.y2,2) )
    }

    Update(){
        this.x1 = baseCircle.xpos
        this.x2 = movingCircle.xpos
        this.y1 = baseCircle.ypos
        this.y2 = movingCircle.ypos
    }
}



let baseCircle = new Cirlce(0,0,200,5,0,0,"white")

let movingCircle = new Cirlce(0+baseCircle.radius, 0, 30, 1, 0, -1,"red")


let radiusVector = new Vector(baseCircle.xpos,movingCircle.xpos,baseCircle.ypos,movingCircle.ypos)

