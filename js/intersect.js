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