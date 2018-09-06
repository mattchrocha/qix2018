function elementsIntersect(element1, element2){
  var collision = false;
  element1.boundaries.forEach(function(lineOfElement1){
    element2.boundaries.forEach(function(lineOfElement2){
      if (linesIntersect(lineOfElement1,lineOfElement2)){
        collision = true;
        console.log(elementsPointIntersect(element1,element2))
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
    return (0 <= lambda && lambda <= 1) && (0 <= gamma && gamma <=  1);
  };
};

/* –––––––––––––––––––––––––––––––––––––––––––––––––––––– */

function elementsPointIntersect(element1, element2){
  var newcoordenates;
  element1.boundaries.forEach(function(lineOfElement1){
    element2.boundaries.forEach(function(lineOfElement2){
      if (linesIntersect(lineOfElement1,lineOfElement2)){
        var intersection = linesPointOfIntersec(lineOfElement1,lineOfElement2);
        if (intersection.onLine1 && intersection.onLine2){
          newcoordenates = [intersection.x, intersection.y];
        }
      };
    });
  }); 
  return newcoordenates;
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



/* –––––––––––––––––––––––––––––––––––––––––––––––––––––– */

function pushNewBoundaries(stageBoundaries, newBoundaries){
  var index = arrangeAndGetIndexes(stageBoundaries, newBoundaries);
  var newEnd = stageBoundaries.slice(index.end)
  var newBeggining = stageBoundaries.slice(0, index.start+1)
  console.log(index)
  console.log(newBeggining)
  console.log(newBoundaries)
  console.log(newEnd)
  var newStartCoord = newBoundaries[0][0];
  var newEndCoord = newBoundaries[(newBoundaries.length - 1)][1]
  // console.log(newStartCoord)
  
  // newBeggining[index.start].splice(1,1,newStartCoord);
  // console.log(newBeggining[index.start][1])


  // newEnd[0].splice(0,1,newEndCoord);
  // console.log(newEnd[0][0])


  // loquesea(newBeggining[index.start][1], newStartCoord);
  // console.log(newBoundaries[newBoundaries.length - 1][1])
  //   console.log(newEnd[0][0])
  var totalBoundaries = newBeggining.concat(newBoundaries,newEnd);
  console.log(totalBoundaries)
  console.log(totalBoundaries[newBeggining.length + newBoundaries.length][0])
  console.log(totalBoundaries[newBeggining.length + newBoundaries.length - 1][1])
  // totalBoundaries[index.start][1] = totalBoundaries[index.start + 1][0]
  // totalBoundaries[newBeggining.length + newBoundaries.length][0] = totalBoundaries[newBeggining.length + newBoundaries.length - 1][1]
  // return stageBoundaries = totalBoundaries;
}




function loquesea(a, b){
  console.log("hace la funcion")
  a = b;
}


var inverted;

function arrangeAndGetIndexes(stageBoundaries, newBoundaries){
  var firstLine = newBoundaries[0];
  var lastLine = newBoundaries[newBoundaries.length - 1];
  inverted = null;
  var startIndex = getInvertedAndStartIndex(stageBoundaries, firstLine, lastLine)
  if (inverted === true){
    reverseCutout(newBoundaries);
    firstLine = newBoundaries[0];
    lastLine = newBoundaries[newBoundaries.length - 1];
  };
  var endIndex = getEndIndex(stageBoundaries, lastLine);
  inverted = null;
  return {start: startIndex, end: endIndex}
};

function getInvertedAndStartIndex(stageBoundaries,firstLine,lastLine){
  for (var i = 0; i < stageBoundaries.length && inverted === null; i++){
    if (
      linesIntersect(stageBoundaries[i],firstLine) === true &&
      linesIntersect(stageBoundaries[i],firstLine) === linesIntersect(stageBoundaries[i],lastLine)
    ){
      return inTheSameLineGetIndexAndInverted(stageBoundaries[i],i,firstLine,lastLine);
    } else if (linesIntersect(stageBoundaries[i],firstLine)){
      inverted = false;
      return i;
    } else if (linesIntersect(stageBoundaries[i],lastLine)){
      inverted = true;
      return i;
    }
  }
}

function getEndIndex(stageBoundaries, lastLine){
  var thisIndex;
  for (var i = 0; i < stageBoundaries.length; i++){
    if (linesIntersect(stageBoundaries[i],lastLine)){
      thisIndex = i;
    }
  }
  return thisIndex;
}

function inTheSameLineGetIndexAndInverted(baseline,i,firstLine,lastLine){
  var x1 = firstLine[0][0]
  var y1 = firstLine[0][1] 
  var x2 = lastLine[1][0]
  var y2 = lastLine[1][1]
  switch(lineDirection(baseline)){
    case "E":
      if (y1 > y2){
        inverted = true;
        return i;
      } else if (y1 < y2) {
        inverted = false;
        return i;
      };
    case "W":
      if (y1 > y2){
        inverted = false;
        return i;
      } else if (y1 < y2) {
        inverted = true;
        return i;
      };
    case "N":
      if (x1 > x2){
        inverted = false;
        return i;
      } else if (x1 < x2) {
        inverted = true;
        return i;
      };
    case "S":
      if (x1 > x2){
        inverted = true;
        return i;
      } else if (x1 < x2) {
        inverted = false;
        return i;
      };
  }
}

function lineDirection(line){
  var x1 = line[0][0]
  var y1 = line[0][1] 
  var x2 = line[1][0]
  var y2 = line[1][1]
  if (x1 == x2){
    if (y1 < y2){
      return "E"
    } else if (y1 > y2){
      return "W"
    }
  } else if (y1 == y2){
    if (x1 < x2){
      return "S"
    } else if (x1 > x2){
      return "N"
    }
  }
}


function reverseCutout(newBoundaries){
  newBoundaries.forEach(function(element){
    element.reverse()
  });
  return newBoundaries.reverse();
}


var testArrayInverted = [[[960,300],[760,300]],[[760,300],[760,70]],[[760,70],[960,70]]]


var testArray = [[[960,70],[760,70]],[[760,70],[760,300]],[[760,300],[960,300]]]


      function pushNewBoundaries(stageBoundaries, newBoundaries){
        var index = {start: 1, end: 1}
        var newEnd = stageBoundaries.slice(index.end)
        var newBeggining = stageBoundaries.slice(0, index.start+1)
        var newStartCoord = newBoundaries[0][0];
        var newEndCoord = newBoundaries[(newBoundaries.length - 1)][1]
        var totalBoundaries = newBeggining.concat(newBoundaries,newEnd);
        // totalBoundaries[index.start][1] = totalBoundaries[index.start + 1][0]
        // totalBoundaries[newBeggining.length + newBoundaries.length][0] = totalBoundaries[newBeggining.length + newBoundaries.length - 1][1];
      }

      var stage = [[[40,40],[960,40]],[[960,40],[960,580]],[[960,580],[40,580]],[[40,580],[40,40]]]

      var testArray = [[[960,70],[760,70]],[[760,70],[760,300]],[[760,300],[960,300]]]




[ [ [ 40, 40 ], [ 960, 40 ] ],  [ [ 960, 300 ], [ 960, 70 ] ],
  [ [ 960, 70 ], [ 760, 70 ] ],
  [ [ 760, 70 ], [ 760, 300 ] ],
  [ [ 760, 300 ], [ 960, 300 ] ],
  [ [ 960, 300 ], [ 960, 70 ] ],
  [ [ 960, 580 ], [ 40, 580 ] ],
  [ [ 40, 580 ], [ 40, 40 ] ] ]