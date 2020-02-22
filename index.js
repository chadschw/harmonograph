
// refer to 
// http://www.walkingrandomly.com/?p=151
//
// see also
// https://ttencate.github.io/harmonograph/
// I think there is more to this one... source code is available...
//
let canvas;
let context;
let squareSize = 2;
let halfSquareSize = squareSize/2;
let h;
let w;

let x = 0;
let y = 0;

let A = 0.5;
let B = 0.5;

let f1 = 3.001;
let f2 = 2;
let f3 = 3;
let f4 = 2;

// 0 ... 2PI
let p1 = 0;
let p2 = 0;
let p3 = Math.PI/2;
let p4 = 3*Math.PI/2;

let d1 = 0.004;
let d2 = 0.0065;
let d3 = 0.008;
let d4 = 0.019;

let t = 0;
let step = 0.01;

let running = false;
let maxFrames = 500000;
let currentFrame = 0;
let first = true;
let animateSpeed;

let animateControl;
let animateSpeedControl;

let f1Control;
let f2Control;
let f3Control;
let f4Control;

let p1Control;
let p2Control;
let p3Control;
let p4Control;

let d1Control;
let d2Control;
let d3Control;
let d4Control;

function preset1() {
    f1 = 3.001;
    f2 = 2;
    f3 = 3;
    f4 = 2;

    // 0 ... 2PI
    p1 = 0;
    p2 = 0;
    p3 = Math.PI/2;
    p4 = 3*Math.PI/2;

    d1 = 0.004;
    d2 = 0.0065;
    d3 = 0.008;
    d4 = 0.019;
}

function preset2() {
    f1 = 10;
    f2 = 3;
    f3 = 1;
    f4 = 2;

    // 0 ... 2PI
    p1 = 0;
    p2 = 0;
    p3 = Math.PI/2;
    p4 = 0;

    d1 = 0.039;
    d2 = 0.006;
    d3 = 0.0;
    d4 = 0.0045;
}

function preset3() {
    f1 = 2.01;
    f2 = 3;
    f3 = 3;
    f4 = 2;

    // 0 ... 2PI
    p1 = 0;
    p2 = 7 * Math.PI/16;
    p3 = 0;
    p4 = 0;

    d1 = 0.0085;
    d2 = 0.0;
    d3 = 0.065;
    d4 = 0.0;
}

function preset4() {
    f1 = 2;
    f2 = 6;
    f3 = 1.002;
    f4 = 3;

    // 0 ... 2PI
    p1 = Math.PI/16;
    p2 = 3 * Math.PI/2;
    p3 = 13 * Math.PI/16;
    p4 = Math.PI;

    d1 = 0.02;
    d2 = 0.0315;
    d3 = 0.02;
    d4 = 0.02;
}

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.translate(canvas.clientWidth/2, canvas.clientHeight/2);
        
    h = canvas.clientHeight;
    w = canvas.clientWidth;

    A *= w/2;
    B *= h/2;

    context.fillRect(-w/2, -h/2, w, h);
    context.strokeStyle = "rgba(208, 164, 235, 0.75)";

    animateControl = document.getElementById("animate");
    animateSpeedControl = document.getElementById("animateSpeed");

    f1Control = document.getElementById("f1");
    f2Control = document.getElementById("f2");
    f3Control = document.getElementById("f3");
    f4Control = document.getElementById("f4");

    p1Control = document.getElementById("p1");
    p2Control = document.getElementById("p2");
    p3Control = document.getElementById("p3");
    p4Control = document.getElementById("p4");

    d1Control = document.getElementById("d1");
    d2Control = document.getElementById("d2");
    d3Control = document.getElementById("d3");
    d4Control = document.getElementById("d4");

    preset4();
}

function start() {
    running = false;
        
    animateSpeed = animateSpeedControl.value;

    f1 = f1Control.value/10;
    f2 = f2Control.value/10;
    f3 = f3Control.value/10;
    f4 = f4Control.value/10;

    p1 = p1Control.value/100;
    p2 = p2Control.value/100;
    p3 = p3Control.value/100;
    p4 = p4Control.value/100;

    d1 = d1Control.value/10000;
    d2 = d2Control.value/10000;
    d3 = d3Control.value/10000;
    d4 = d4Control.value/10000;

    setTimeout(function() { 
        currentFrame = 0;
        t = 0;
        context.fillRect(-w/2, -h/2, w, h);
        running = true;
        first = true;
    
        if (animateControl.checked) {
            render();
        } else {
            quick();
        }
    }, 10);
}

function render() {

    context.beginPath();
    context.moveTo(x, y);
    for (let i = 0; i < animateSpeed; i++) {
        innerRender();
    }
    context.stroke();

    if (running) {
        requestAnimationFrame(render);
    }
}

function innerRender() {
    // Rotate the canvas for spirograph style.
    //context.rotate(0.0005*Math.PI/180);

    calcPositionDamped();

    if (first) {
        context.moveTo(x, y);
        first = false;
    } else {
        context.lineTo(x, y);
    }
    
    t += step;
    if (++currentFrame >= maxFrames) {
        running = false;
    }
}

function calcPositionDamped() {
    x = A * Math.exp(-d1*t) * Math.sin(f1*t + p1) + A * Math.exp(-d2*t) * Math.sin(t*f2 + p2);
    y = B * Math.exp(-d3*t) * Math.sin(f3*t + p3) + B * Math.exp(-d4*t) * Math.sin(t*f4 + p4);
}

function quick() {

    context.beginPath();
    context.moveTo(x, y);

    for (let i = 0; i < maxFrames; i++) {
        innerRender();
    }

    context.stroke();
}
