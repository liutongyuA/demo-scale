const app = new PIXI.Application({ width:1800,height:900, background: 'black' ,forceCanvas: true});
document.getElementById('container').appendChild(app.view);
let btn = document.getElementById('btn')

container = new PIXI.Sprite();
container.zIndex = 1
app.stage.addChild(container);
const background = PIXI.Sprite.from('./2.png');

// center the sprite's anchor point
background.anchor.set(0.5);

// move the sprite to the center of the screen
background.x = app.screen.width / 2;
background.y = app.screen.height / 2;

container.addChild(background);

// create a texture from an image path
// new PIXI.Graphics()
//     .beginFill(0xffffff)
//     .lineStyle({ color: 0x111111, alpha: 0.87, width: 1 })
//     .drawCircle(0, 0, 8)
//     .endFill()
// Create the circle
let cross = new PIXI.Graphics()
.lineStyle({ color: 0xffffff,  width: 2 })
.moveTo(0, -2000)
.lineTo(0, 2000)
.moveTo(-2000, 0)
.lineTo(2000, 0)
//     const defaultIcon = 'url(\'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20191218/8ef76ff880a8447097e539de7999ee77.jpg\'),auto';
// app.renderer.events.cursorStyles.default = defaultIcon;
// circle.position.set(app.screen.width / 2, app.screen.height / 2);
//图标
const xiabiao = PIXI.Sprite.from('./04_Heat Detector.jpg');
xiabiao.scale.set(0.1)

// Enable interactivity!
app.stage.eventMode = 'static';

// Make sure the whole canvas area is interactive, not just the circle.
app.stage.hitArea = app.screen;


app.stage.addEventListener('pointermove', (e) =>{
    const circle = app.stage.addChild(cross);
    circle.position.copyFrom(e.global);
    xiabiao.position.x = e.global.x +10;
    xiabiao.position.y = e.global.y +10;
    app.stage.addChild(xiabiao);
});
app.stage.addEventListener('pointerout', (e) =>{
    app.stage.removeChild(cross);
    app.stage.removeChild(xiabiao);
});

app.stage.addEventListener('click', (e) =>{
    console.log(e)
    addPoint(e.global,e.movement)
    console.log(e.movement)
});

const addPoint = ({x, y},movement) => {
    const w = x
    const h = y 
    // const graphics = new PIXI.Graphics()
    // graphics.beginFill('red')
    // graphics.drawCircle(w, h, 8)
    // graphics.endFill()
    const bunny = PIXI.Sprite.from('./04_Heat Detector.jpg');
    bunny.scale.set(0.1)
    console.log(movement.x)
    bunny.x = x - (bunny.width / 2) 
    bunny.y = y - (bunny.height / 2)
    container.addChild(bunny)
}
btn.addEventListener('click',()=>{
    app.stage.off('pointermove')
    app.stage.off('click')
    app.stage.off('pointerout')
})
//缩放 移动
document.getElementById('container').onmousewheel=function(e){
    let ratio = e.deltaY  < 0 ? 1.1 : 0.9;
    const newScale = { x: container.scale.x * ratio, y: container.scale.y * ratio };
    container.scale.x = newScale.x;
    container.scale.y = newScale.y;
}
let lastPosition = null 
document.getElementById('container').onmousedown=function(e){
    lastPosition = {x:e.offsetX,y:e.offsetY}
}
document.getElementById('container').onmouseup=function(e){
    lastPosition = null
}
document.getElementById('container').onmousemove=function(e){
    let x1 = e.offsetX
    let y1 = e.offsetY
    if (lastPosition) {
        const element = container;
        // x += x1 - lastPosition.x;
        // y += y1 - lastPosition.y;
        element.x += x1 - lastPosition.x;
        element.y += y1 - lastPosition.y;
        lastPosition = { x: x1, y: y1 };
        // 布点容器调整
      }
}

let dragTarget = null;

app.stage.interactive = true;
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

function onDragMove(event) {
    if (dragTarget) {
        dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
}

function onDragStart() {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    // this.data = event.data;
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);
}

function onDragEnd() {
    if (dragTarget) {
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
    }
}