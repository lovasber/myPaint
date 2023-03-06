var canvas = new fabric.Canvas('canvas', { 
    width: 500,
    height: 500,
    selection: false 
});

const toggleDraw = () => {
    if(canvas.isDown) {
        canvas.isDown = false;
    } else {
        canvas.isDown = true;
    }
}

var rect, isDown, origX, origY;

canvas.on('mouse:down', function(o){
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    var pointer = canvas.getPointer(o.e);
    rect = new fabric.Rect({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: pointer.x-origX,
        height: pointer.y-origY,
        angle: 0,
        fill: 'rgba(255,0,0,0.5)',
        transparentCorners: false
    });
    canvas.add(rect);
});

canvas.on('mouse:move', function(o){
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);

    if(origX>pointer.x){
        rect.set({ left: Math.abs(pointer.x) });
    }
    if(origY>pointer.y){
        rect.set({ top: Math.abs(pointer.y) });
    }

    rect.set({ width: Math.abs(origX - pointer.x) });
    rect.set({ height: Math.abs(origY - pointer.y) });


    canvas.renderAll();
});

canvas.on('mouse:up', function(o){
  isDown = false;
});