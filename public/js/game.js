var coordinates = new Array;
var iterations = 0;
var id_time;
var cursorPointer = [];
var interval = 0;
var increment = true;
var start = false;
function coordinates_display(canvas, event) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var rect = canvas.getBoundingClientRect();
    var x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;     // Get the horizontal coordinate
    var y = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height; // Get the vertical coordinate
    if (iterations < 4) {
        coordinates[iterations++] = [x, y];
    }
}

function startGame() {
    var message = document.getElementById("error_game");
    message.style.padding = "10px";
    message.style.display = "inline";
    message.style.background = "#fe8b8e";

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var rect = canvas.getBoundingClientRect();

    let all_shapes = [1, 2, 3, 4, 5];
    for (var i = 0; i < iterations; i++) {
        var random = Math.floor(Math.random() * all_shapes.length - 1) + 1;
        let current = all_shapes.splice(random, 1)[0];
        cursorPointer.push(current);
    }

    if (iterations == 4) {
        error_game.style.display = "none";
        id_time = setInterval(function () {
            createshape(ctx, canvas, coordinates, rect);
            if (increment) {
                interval += 4;
            } else {
                interval -= 4;
            }
        }, 500);
    }
    else {
        text = "Please click on more " + (4 - iterations) + " spots";
        message.innerHTML = text;
    }
}
function myStopFunction() {
    var message = document.getElementById("error_game");
    error_game.style.display = "none";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    clearInterval(id_time);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    iterations = 0;
    coordinates = [];
    interval = 0;
    increment = true;
    start = false;
}
function createshape(ctx, canvas, coordinates, rect) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    l = 20 + interval;
    w = 25 + interval;
    if (l >= 100) {
        increment = false;
    }
    if (l <= 20) {
        increment = true;
    }
    for (i = 0; i < 4; i++) {
        x = coordinates[i][0];
        y = coordinates[i][1];
        var c1 = colours((Math.random() * 255) + 1);
        var c2 = colours((Math.random() * 255) + 1);
        var c3 = colours((Math.random() * 255) + 1);
        var c4 = colours((Math.random() * 255) + 1);
        var c5 = colours((Math.random() * 255) + 1);

        switch (cursorPointer[i]) {
            case 1: triangle(ctx, canvas, l, w, x, y, c1); break;
            case 2: circle(ctx, canvas, l, w, x, y, c2); break;
            case 3: oval(ctx, canvas, l, w, x, y, c3); break;
            case 4: arc(ctx, canvas, l, w, x, y, c4); break;
            case 5: rectangle(ctx, canvas, l, w, x, y, c5); break;
            default: rectangle(ctx, canvas, l, w, x, y, c5); break;
        }
    }
}
function colours(p) {
    var rgb = colourChange(p / 100.0 * 0.85, 1.0, 1.0);
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
}
function colorSelect() {

    var caseNo = Math.floor(Math.random() * 7) + 1;
    switch (caseNo % 7) {
        case 1: return "red"; break;
        case 2: return "orange"; break;
        case 3: return "green"; break;
        case 4: return "cyan"; break;
        case 5: return "blue"; break;
        case 6: return "purple"; break;
        case 7: return "yellow"; break;
        default: return "white"; break;
    }

}
function triangle(ctx, canvas, l, w, x, y, colourOfRect) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + l, y);
    ctx.lineTo(x + l, y + w);
    ctx.closePath();
    ctx.fillStyle = colourOfRect;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();  
}
function colourChange(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
function rectangle(ctx, canvas, l, w, x, y, colourOfRect) {
    ctx.rect(x, y, l, w);
    ctx.fillStyle = colourOfRect;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();

}
function circle(ctx, canvas, l, w, x, y, colourOfRect) {
    ctx.beginPath();
    ctx.arc(x, y, l, 0, 2 * Math.PI);
    ctx.fillStyle = colourOfRect;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
 
}
function arc(ctx, canvas, l, w, x, y, colourOfRect) {
    ctx.beginPath();
    ctx.arc(x, y, l, 0, Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = colourOfRect;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}
function oval(ctx, canvas, l, w, x, y, colourOfRect) {
    ctx.beginPath();
    ctx.ellipse(x, y, l, w, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fillStyle = colourOfRect;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}