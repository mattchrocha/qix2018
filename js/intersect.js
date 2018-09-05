function elementsIntersect(element1, element2){
  var collision = false;
  element1.boundaries.forEach(function(lineOfElement1){
    element2.boundaries.forEach(function(lineOfElement2){
      if (linesIntersect(lineOfElement1,lineOfElement2)){
        collision = true;
      };
    });
  });
  return collision;
};

function linesIntersect(line1,line2){
  var a = line1[0][0];
  var b = line1[0][1];
  var c = line1[1][0];
  var d = line1[1][1];
  var p = line2[0][0];
  var q = line2[0][1];
  var r = line2[1][0];
  var s = line2[1][1];
  return intersects(a,b,c,d,p,q,r,s);
};

function intersects(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  };
};

function linesPointOfIntersec(line1,line2){
  var a = line1[0][0];
  var b = line1[0][1];
  var c = line1[1][0];
  var d = line1[1][1];
  var p = line2[0][0];
  var q = line2[0][1];
  var r = line2[1][0];
  var s = line2[1][1];
  return pointOfIntersection(a,b,c,d,p,q,r,s);
};

function pointOfIntersection(a,b,c,d,p,q,r,s) {
  var denominator, alpha, beta, numerator1, numerator2, result = {
    x: null,
    y: null,
    onLine1: false,
    onLine2: false
  };
  denominator = ((s - q) * (c - a)) - ((r - p) * (d - b));
  if (denominator == 0) {
    return result;
  };
  alpha = b - q;
  beta = a - p;
  numerator1 = ((r - p) * alpha) - ((s - q) * beta);
  numerator2 = ((c - a) * alpha) - ((d - b) * beta);
  alpha = numerator1 / denominator;
  beta = numerator2 / denominator;

  // if we cast these lines infinitely in both directions, they intersect here:
  result.x = a + (alpha * (c - a));
  result.y = b + (alpha * (d - b));

  // if line1 is a segment and line2 is infinite, they intersect if:
  if (alpha > 0 && alpha < 1) {
    result.onLine1 = true;
  }
  // if line2 is a segment and line1 is infinite, they intersect if:
  if (beta > 0 && beta < 1) {
    result.onLine2 = true;
  }
  // if line1 and line2 are segments, they intersect if both of the above are true
  return result;
}