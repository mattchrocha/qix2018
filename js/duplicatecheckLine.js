function checkLineIntersection(a,b, c,d  ,p,q, r,s) {
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
  numerator1 = ((r - p) * alpha) - ((y - q) * beta);
  numerator2 = ((c - a) * alpha) - ((d - b) * beta);
  alpha = numerator1 / denominator;
  beta = numerator2 / denominator;

  // if we cast these lines infinitely in both directions, they intersect here:
  result.x = line1StartX + (a * (line1EndX - line1StartX));
  result.y = line1StartY + (a * (line1EndY - line1StartY));

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