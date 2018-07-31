
import { TweenMax, Power2, TimelineLite } from "gsap/TweenMax";

interface Option {
    tooltip?: any;
    data: object[];
    positions: object[];
}


interface loopOption {
    id: number; 
    width: number;
    height: number;
    posX: number; 
    posY: number 
}

export default class Canvas {
    canvas: any;
    context: any;
    postions: any;
    collectionData: object[];
    radius: any;
    devicePixelRatio: number;
    startTime: number;
    redraw: any;

    constructor(dom: HTMLElement) {
        this.canvas = dom;
        let w = this.canvas.width;
        let h = this.canvas.height;
        this.devicePixelRatio = window.devicePixelRatio || 1;
        
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.canvas.width = this.devicePixelRatio * w;
        this.canvas.height = this.devicePixelRatio * h;        
        this.context = this.canvas.getContext('2d');
        this.startTime = null;
    }

    init(option: Option) {
        
        var objectLength = option.data.length;
        
        this.collectionData = option.data.map((data, index)=> {
            while(objectLength > 0) {
                objectLength--;
                return { ...data, ...option.positions[index]};
            }  
        })
        
        this.draw();
        this.clickListener();
        // TweenMax.ticker.fps(5);

        TweenMax.ticker.addEventListener("tick", this.animateRedraw, this);
    }
    clickListener() {
        this.canvas.addEventListener("click", (e)=> {
            let BoundingClientRect = e.target.getBoundingClientRect();
            let clickX = (e.clientX - BoundingClientRect.left) * this.devicePixelRatio; 
            let clickY = (e.clientY - BoundingClientRect.top) * this.devicePixelRatio;
            
            this.collectionData.forEach((data: loopOption)=> {
                if(clickX >= data.posX && clickX < data.posX + data.width && clickY >= data.posY && clickY < data.height + data.posY) {
                    alert(data.id);
                }
            })

        })
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        this.collectionData.forEach((obj: loopOption)=> {
            this.context.rect(obj.posX, obj.posY, obj.width, obj.height);
            this.context.stroke();
        })
    }

    animateRedraw(value) {
        var _this = this;
        this.startTime = value;
        

        this.collectionData.forEach((data: any)=> {
            if(data.posX <= 0) {
                data.posX = this.canvas.width    
            } else {
                data.posX -= 1;
            }
            
        })
        _this.draw()
        // var tween = TweenMax.staggerFrom(this.collectionData, 1, {
        //         posX: 
        //         onUpdateParams: function(value) {
        //             debugger;
        //             // _this.draw()
        //     }
        // });

        // this.draw();

    }
}