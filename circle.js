class Cirlce{

    constructor(xpos,ypos,radius,mass, vx, vy){
        this.xpos = xpos
        this.ypos = ypos
        this.radius = radius
        this.mass = mass
        

        this.dx = vx
        this.dy = vy
    }

    Draw(){
        ctx.beginPath()
        ctx.arc(this.xpos,this.ypos,this.radius,0,2*Math.PI)
        ctx.stroke()

    }
    
    Update(){
        this.Draw()

        this.xpos += this.dx
        this.ypos += this.dy

    }
    
}




let baseCircle = new Cirlce(0,0,100,5,0,0)

let movingCircle = new Cirlce(0+baseCircle.radius, 0, 20, 1, 0, -1 )