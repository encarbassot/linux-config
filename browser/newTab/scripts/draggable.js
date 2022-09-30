

// const d = new Draggable()
// d.push(document.getElementById("mydiv"))


class Draggable_Window{
    constructor(parent,element){
        this.element=element
        this.parent=parent
        this.dragger=(element.getElementsByClassName("draggable"))
            ?element.getElementsByClassName("draggable")[0]
            :element
        
        this.dragger.addEventListener("mousedown",(e)=>{
            e = e || window.event;
            e.preventDefault();
            this.parent.grab(this,e.cilentX,e.clientY)
        })

        this.element.addEventListener("mouseup",(e)=>{
            this.parent.ungrab()
        })

        //this.move(Math.floor(Math.random()*window.innerWidth),Math.floor(Math.random()*window.innerHeight))

    }

    move(x,y){
        this.element.style.left = (this.element.offsetLeft - x) + "px";
        this.element.style.top = (this.element.offsetTop - y) + "px";
    }

    setZ(n){
        this.element.style.zIndex=n
    }
}

class Draggable{
    constructor(){
        document.addEventListener("mousemove",e=>this.move(e.x,e.y))
        this.list=[]
        this.grabbing=null
        this.x=0
        this.y=0
    }


    grab(el,x,y){
        this.x=x
        this.y=y
        this.grabbing = this.list.splice(this.list.indexOf(el),1)[0]
        //sort z-index
        this.grabbing.setZ(this.list.length)
        for(const [i,v]of this.list.entries()){
            if(v){
                v.setZ(i)
            }
        }
    }
    
    ungrab(){
        this.list.push(this.grabbing)
        this.grabbing=null
    }
    move(x,y){
        
        if(this.grabbing!=null){
            this.grabbing.move(this.x-x,this.y-y)
            this.x=x
            this.y=y
        }
    }

    push(element){
        this.list.push(new Draggable_Window(this,element))
    }

}
