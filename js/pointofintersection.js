var line1XSlider = document.getElementById('line1XSlider'),
    line1YSlider = document.getElementById('line1YSlider'),
    line2XSlider = document.getElementById('line2XSlider'),
    line2YSlider = document.getElementById('line2YSlider'),
    context = document.getElementById('canvas').getContext('2d'),
    display = document.getElementById('results');

function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
/*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
};

function drawPoint(x, y, color) {
    context.fillStyle = color || 'black';
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI, true);
    context.fill();
};

function drawLine(line, color) {
    color = color || 'black';
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(line.startX, line.startY);
    context.lineTo(line.endX, line.endY);
    context.stroke();
    drawPoint(line.startX, line.startY, color);
    drawPoint(line.endX, line.endY, color);
};

function update() {
    var line1 = {
        startX: 10,
        startY: 10,
        endX: line1XSlider.value,
        endY: line1YSlider.value
    },
        line2 = {
            startX: 390,
            startY: 10,
            endX: line2XSlider.value,
            endY: line2YSlider.value
        },
        results;
    context.clearRect(0, 0, 400, 300);
    drawLine(line1, 'red');
    drawLine(line2, 'blue');
    results = checkLineIntersection(line1.startX, line1.startY, line1.endX, line1.endY, line2.startX, line2.startY, line2.endX, line2.endY);
    drawPoint(results.x, results.y, 'green');
    display.innerHTML = 'x = ' + results.x + '<br />y = ' + results.y + '<br />onLine1 = ' + results.onLine1 + '<br />onLine2 = ' + results.onLine2;
};

update();

line1XSlider.onchange = update;
line1YSlider.onchange = update;
line2XSlider.onchange = update;
line2YSlider.onchange = update;