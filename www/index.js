import * as wasm from "wasm_website";

let canvas = document.getElementById("rustCanvas");
const gl = canvas.getContext('webgl', {antialias: true});

if (!gl) {
    alert('Failed to initialize WebGL');
}

const FPS_MAX = 1000.0 / 30.0; // ms/frame
const client = new wasm.Client();
const initialTime = Date.now()

let lastDrawTime = -1;

function render() {
    window.requestAnimationFrame(render);
    const curTime = Date.now();
    
    if(curTime >= lastDrawTime + FPS_MAX) {
        lastDrawTime = curTime;

        if (window.innerHeight != canvas.height || window.innerWidth != canvas.width) {
            canvas.height = window.innerHeight;
            canvas.style.height = window.innerHeight;

            canvas.width = window.innerWidth;
            canvas.style.width = window.innerWidth;
            
            gl.viewport(0,0, window.innerWidth, window.innerHeight);
        }

        let elapsedTime = curTime - initialTime;
        // rust update
        client.update(elapsedTime, window.innerHeight, window.innerWidth);
        // rust render
        client.render();
    }
}
render();

