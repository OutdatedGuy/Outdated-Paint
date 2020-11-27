var dottX; //x co-ordinate of tools
var dottY = 30; //y co-ordinate of tools
var size = 5; //size of brush
let extra1, extra2; //extra canvases
var trans = 180; //transparancy of position of brush
var akar = 0; //shape of brush
var timba = 0; //for number of points of user drawing shapes
var r, g, b; //red, green and blue value of pixels
var xTool, yTool, tempx1, tempy1, tempx2, tempy2; //for keeping co-ordinates of user drawing shapes
var border; //to draw shapes with border only
var reset; //clear button

function setup() {
  //for no trails
  createCanvas(1366, 768);

  //for trails
  extra1 = createGraphics(width, height);
  extra1.background(255);

  //for tools
  extra2 = createGraphics(width, 70);

  //tools setup
  akar = 0;
  size = 5;
  timba = 0;
  r = 255;
  g = 255;
  b = 255;
  border = 0;
  tools();
}

function draw() {
  extra2.stroke(0);
  extra2.line(0, 70, width, 70);
  background(0);

  //for drawing trails
  if (mouseIsPressed && mouseY > 70 && akar < 3) {
    extra1.noStroke();
    shape(1, mouseX, mouseY, size);
  }

  image(extra1, 0, 0); //adding drawing canvas

  //for position of brush(no trails)
  if (mouseY > 70) {
    if (akar < 4) {
      noStroke();
      shape(0, mouseX, mouseY, size);
    } else {
      stroke(0);
      strokeWeight(1);
      circle(mouseX, mouseY, 3);
    }
  }

  //to draw user shapes(no trail)
  if (akar > 2 && timba != 0) {
    userShape();
  }

  image(extra2, 0, 0); //adding tools canvas
}

//to select color of tools and brush
function giveColor(temp, rang) {
  noStroke();
  switch (rang) {
    case 0:
      //black color for tools and brush
      if (temp == 2) {
        extra2.fill(0, 0, 0);
      } else {
        r = 0;
        g = 0;
        b = 0;
        extra1.fill(r, g, b);
        fill(r, g, b, trans);
      }
      break;

    case 1:
      //red color for tools and brush
      if (temp == 2) {
        extra2.fill(255, 0, 0);
      } else {
        r = 255;
        g = 0;
        b = 0;
        extra1.fill(r, g, b);
        fill(r, g, b, trans);
      }
      break;

    case 2:
      //green color for tools and brush
      if (temp == 2) {
        extra2.fill(0, 255, 0);
      } else {
        r = 0;
        g = 255;
        b = 0;
        extra1.fill(r, g, b);
        fill(r, g, b, trans);
      }
      break;

    case 3:
      //blue color for tools and brush
      if (temp == 2) {
        extra2.fill(0, 0, 255);
      } else {
        r = 0;
        g = 0;
        b = 255;
        extra1.fill(r, g, b);
        fill(r, g, b, trans);
      }
      break;

    case 4:
      //yellow color for tools and brush
      if (temp == 2) {
        extra2.fill(255, 255, 0);
      } else {
        r = 255;
        g = 255;
        b = 0;
        extra1.fill(r, g, b);
        fill(r, g, b, trans);
      }
      break;

    case 5:
      //cyan color for tools and brush
      if (temp == 2) {
        extra2.fill(0, 255, 255);
      } else {
        r = 0;
        g = 255;
        b = 255;
        extra1.fill(r, g, b);
        fill(r, g, b, trans);
      }
      break;

    case 6:
      //pink color for tools and brush
      if (temp == 2) {
        extra2.fill(255, 0, 255);
      } else {
        r = 255;
        g = 0;
        b = 255;
        extra1.fill(r, g, b);
        fill(r, g, b, trans);
      }
      break;

    case 7:
      //white color for tools and brush
      if (temp == 2) {
        extra2.fill(255, 255, 255);
      } else {
        r = 255;
        g = 255;
        b = 255;
        extra1.fill(r, g, b);
        fill(r, g, b, trans);
      }
      break;
  }
  border = 1;
}

function mousePressed() {

  //to check if color is changed or selected
  if (mouseY > 20 && mouseY < 40) {
    for (i = 0, x1 = 20; i < 8; i++, x1 += 30) {
      if (mouseX > x1 && mouseX < x1 + 20) {
        giveColor(1, i);
        tools();
        break;
      }
    }
  }

  //to check if size is changed or selected
  if (mouseX > 270 && mouseX < 510 && mouseY > 10 && mouseY < 50) {
    for (i = 0, size1 = 5, y1 = 27.5, x1 = 282.5; i < 7; i++, x1 += size1 + 12.5, size1 += 5, y1 -= 2.5) {
      if (mouseY > y1 && mouseY < y1 + size1) {
        if (mouseX > x1 && mouseX < x1 + size1) {
          size = size1; //changing brush size
        }
      }
    }
  }

  //to check if shape is user drawn and draw it
  if (akar > 2) {
    if (timba == 0 && mouseY > 70) {

      //setting first point of user drawn shape
      xTool = mouseX;
      yTool = mouseY;
      timba++;
    } else {
      setPoint();
    }
  }

  //to check if brush shape is changed or selected
  if (mouseX > 530 && mouseY < 640) {
    for (i = 0, x = 530; i < 4; i++, x += 30) {
      if (mouseX > x && mouseX < x + 20 && mouseY > 20 && mouseY < 40) {
        akar = i;
        timba = 0;
        tools();
      }
    }
  }

  //to check if draw shape is changed or selected
  if (mouseX > 670 && mouseX < 870 && mouseY > 15 && mouseY < 40) {
    for (i = 0, x1 = 670; i < 7; i++, x1 += 30) {
      if (mouseX > x1 && mouseX < x1 + 20) {
        akar = i + 4;
        timba = 0;
        border = 0;
        tools();
        border = 0;
      }
    }
  }

  //to check if background color is changed or selected
  if (mouseX > 890 && mouseX < 1100 && mouseY > 10 && mouseY < 50) {
    for (i = 0, x1 = 890; i < 7; i++, x1 += 30) {
      if (mouseX > x1 && mouseX < x1 + 30) {
        giveBackColor(i);
      }
    }
  }
}

//to draw tools visuals on extra2 canvas
function tools() {
  extra2.background(255);

  //boxes for tools
  extra2.stroke(0);
  extra2.fill(210);
  extra2.rectMode(CORNER)
  extra2.rect(10, 10, 250, 40); //tool box 1
  extra2.rect(270, 10, 240, 40); //tool box 2
  extra2.rect(520, 10, 130, 40); //tool box 3
  extra2.rect(660, 10, 220, 40); //tool box 4
  extra2.rect(890, 10, 210, 40); //tool box 5

  //different shape to draw(box 4)
  extra2.stroke(0);
  extra2.strokeWeight(1);
  if (border == 0) {
    extra2.noFill();
  } else if (akar > 3) {
    extra2.fill(r, g, b);
  }
  extra2.circle(680, 30, 20);
  extra2.rectMode(CENTER);
  extra2.rect(710, 30, 20, 15);
  extra2.triangle(730, 40, 740, 20, 750, 40);
  extra2.quad(760, 40, 760, 20, 780, 30, 770, 40);
  extra2.ellipse(800, 30, 15, 25);
  extra2.arc(830, 40, 20, 30, PI, 0, CHORD);
  extra2.line(850, 40, 870, 20);

  //paint color(box 1) and background fill color(box 5)
  for (var i = 0, dottX = 30; i < 8; i++, dottX += 30) {
    //box 1 color with shape
    giveColor(2, i);
    shape(2, dottX, dottY, 20);

    //box 5 color
    if (i < 7) {
      extra2.rectMode(CENTER);
      extra2.rect(dottX + 875, dottY, 30, 40);
    }
  }

  //size of paint brush(box 2)
  for (i = 0, dottX = 285, size1 = 5; i < 7; i++, size1 += 5, dottX += size1 + 10) {
    shape(2, dottX, dottY, size1);
  }

  //shape of paint brush(box 3)
  extra2.circle(540, 30, 20);
  extra2.rect(570, 30, 20);
  extra2.triangle(590, 40, 600, 20, 610, 40);
  extra2.strokeWeight(4);
  extra2.line(620, 40, 640, 20);
  extra2.stroke(255);
  extra2.strokeWeight(3);
  extra2.line(620, 40, 640, 20);

  //clear or reset button(box 6)
  reset = createButton('Clear');
  reset.position(1110,10);
  reset.size(70,40);
  reset.style('font-size','20px');
  reset.mousePressed(setup);

  //box function names
  extra2.strokeWeight(1);
  extra2.fill(0);
  extra2.textSize(15);
  extra2.text("Paint Brush and Tools Color", 40, 65);
  extra2.text("Paint Brush Size", 330, 65);
  extra2.text("Paint Brush Shape", 524, 65);
  extra2.text("Drawing Tools", 720, 65);
  extra2.text("Background/Canvas Color", 910, 65);
  extra2.fill(255);
}

//to select color of background
function giveBackColor(back) {
  switch (back) {
    case 0:
      //black color background
      extra1.background(0);
      break;

    case 1:
      //red color background
      extra1.background(255, 0, 0);
      break;

    case 2:
      //green color background
      extra1.background(0, 255, 0);
      break;

    case 3:
      //blue color background
      extra1.background(0, 0, 255);
      break;

    case 4:
      //yellow color background
      extra1.background(255, 255, 0);
      break;

    case 5:
      //cyan color background
      extra1.background(0, 255, 255);
      break;

    case 6:
      //pink color background
      extra1.background(255, 0, 255);
      break;
  }
}

//to draw or present selected shape
function shape(temp, x, y, motha) {

  //to check which canvas to draw or present shape
  switch (temp) {
    case 0:
      //no trail canvas
      fill(r, g, b, trans);
      if (akar == 0) {
        circle(x, y, motha);
      } else if (akar == 1) {
        rectMode(CENTER);
        rect(x, y, motha);
      } else if (akar == 2) {
        triangle(x, y - motha / 2, x - motha / 2, y + motha / 2, x + motha / 2, y + motha / 2);
      } else if (akar > 2) {
        circle(x, y, motha);
      }
      break;

    case 1:
      //trail canvas
      extra1.fill(r, g, b);
      if (akar == 0) {
        extra1.circle(x, y, motha);
      } else if (akar == 1) {
        extra1.rectMode(CENTER);
        extra1.rect(x, y, motha);
      } else if (akar == 2) {
        extra1.triangle(x, y - motha / 2, x - motha / 2, y + motha / 2, x + motha / 2, y + motha / 2);
      } else if (akar > 2) {
        extra1.circle(x, y, motha);
      }
      break;

    case 2:
      //tool canvas
      if (akar == 0) {
        extra2.circle(x, y, motha);
      } else if (akar == 1) {
        extra2.rectMode(CENTER);
        extra2.rect(x, y, motha);
      } else if (akar == 2) {
        extra2.triangle(x, y - motha / 2, x - motha / 2, y + motha / 2, x + motha / 2, y + motha / 2);
      } else if (akar > 2) {
        extra2.circle(x, y, motha);
      }
      break;
  }
}

//rough presentation of user drawn shapes(no trails)
function userShape() {
  if (border == 0) {
    noFill();
  } else {
    fill(r, g, b, trans);
  }
  tempX = mouseX - xTool;
  tempY = mouseY - yTool;
  stroke(0);
  strokeWeight(1);

  switch (akar) {
    case 3:
      //brush of line shape
      stroke(r, g, b, trans);
      strokeWeight(size);
      straightLine(0);
      break;

    case 4:
      //user drawn circle
      makePositive();
      stroke(0);
      strokeWeight(1);
      if (tempX > tempY) {
        circle(xTool, yTool, 2 * tempX)
      } else {
        circle(xTool, yTool, 2 * tempY)
      }
      break;

    case 5:
      //user drawn rectangle
      stroke(0);
      strokeWeight(1);
      rectMode(CORNER);
      straightRect(0);
      break;

    case 6:
      //user drawn triangle
      stroke(0);
      strokeWeight(1);
      straightTriagngle(0);
      break;

    case 7:
      //user drawn quad shape
      stroke(0);
      strokeWeight(1);
      straightQuad(0);
      break;

    case 8:
      //user drawn ellipse
      stroke(0);
      strokeWeight(1);
      ellipse(xTool, yTool, 2 * tempX, 2 * tempY);
      break;

    case 9:
      //user drawn arc
      stroke(0);
      strokeWeight(1);
      checkAngle();
      arc(xTool, yTool, 2 * tempX, 2 * tempY, tempx2, tempy2, CHORD)
      break;

    case 10:
      //user drawn line
      stroke(0);
      strokeWeight(1);
      straightLine(0);
      break;
  }
}


//set points according to user drawn shape(trails)
function setPoint() {
  if (border == 0) {
    extra1.noFill();
  } else {
    extra1.fill(r, g, b);
  }
  if (akar == 3 && timba == 1 && mouseY > 70) {
    extra1.stroke(r, g, b);
    extra1.strokeWeight(size);

    //to draw brush-line on trail canvas
    straightLine(1);
    timba = 0; //reseting points
  } else if (akar == 4 && timba == 1 && mouseY > 70) {
    extra1.stroke(0);
    extra1.strokeWeight(1);

    //to draw circle according higher mouse position on trail canvas
    if (tempX > tempY) {
      extra1.circle(xTool, yTool, 2 * tempX);
    } else {
      extra1.circle(xTool, yTool, 2 * tempY);
    }
    timba = 0; //reseting points
  } else if (akar == 5 && timba == 1 && mouseY > 70) {
    extra1.stroke(0);
    extra1.strokeWeight(1);

    //to draw rectangle on trail canvas
    extra1.rectMode(CORNER);
    straightRect(1);
    timba = 0; //reseting points
  } else if (akar == 6 && mouseY > 70 && timba != 0) {
    extra1.stroke(0);
    extra1.strokeWeight(1);

    //to draw triangle on trail canvas
    straightTriagngle(1);
  } else if (akar == 7 && mouseY > 70 && timba != 0) {
    extra1.stroke(0);
    extra1.strokeWeight(1);

    //to draw quad shape on trail canvas
    straightQuad(1);
  } else if (akar == 8 && mouseY > 70 && timba != 0) {
    extra1.stroke(0);
    extra1.strokeWeight(1);

    //to draw ellipse on trail canvas
    extra1.ellipse(xTool, yTool, 2 * tempX, 2 * tempY);
    timba = 0; //reseting points
  } else if (akar == 9 && mouseY > 70 && timba != 0) {
    extra1.stroke(0);
    extra1.strokeWeight(1);

    //to draw arc on trail canvas
    extra1.arc(xTool, yTool, 2 * tempX, 2 * tempY, tempx2, tempy2, CHORD);
    timba = 0; //reseting points
  } else if (akar == 10 && mouseY > 70 && timba != 0) {
    extra1.stroke(0);
    extra1.strokeWeight(1);

    //to draw line on trail canvas
    straightLine(1);
    timba = 0; //reseting points
  }
}

//to set angle of arc according to position of mouse
function checkAngle() {
  tempx1 = tempX;
  tempy1 = tempY;
  if (tempx1 < 0) {
    tempx1 = -tempx1;
  }
  if (tempy1 < 0) {
    tempy1 = -tempy1;
  }
  if (tempx1 > tempy1) {
    if (tempX < 0) {
      //left side arc
      tempx2 = HALF_PI;
      tempy2 = HALF_PI + PI;
    } else {
      //right side arc
      tempx2 = HALF_PI + PI;
      tempy2 = HALF_PI;
    }
  } else if (tempx1 < tempy1) {
    if (tempY > 0) {
      //lower side arc
      tempx2 = 0;
      tempy2 = PI;
    } else {
      //upper side arc
      tempx2 = PI;
      tempy2 = 0;
    }
  } else {
    //point(no angle)
    tempx2 = 0;
    tempy2 = 0;
  }
}

//to make distance of x and y co-ordinate of mouse from a point +ve
function makePositive() {
  if (tempX < 0) {
    tempX = -tempX;
  }
  if (tempY < 0) {
    tempY = -tempY;
  }
}

//to check if Shift is pressed and draw straight line if is pressed
function straightLine(temp) {
  makePositive();
  if (temp == 0) {
    if (keyIsPressed && key == 'Shift') {
      if (tempX > tempY) {
        line(xTool, yTool, mouseX, yTool);
      } else {
        line(xTool, yTool, xTool, mouseY);
      }
    } else {
      line(xTool, yTool, mouseX, mouseY);
    }
  } else {
    if (keyIsPressed && key == 'Shift') {
      if (tempX > tempY) {
        extra1.line(xTool, yTool, mouseX, yTool);
      } else {
        extra1.line(xTool, yTool, xTool, mouseY);
      }
    } else {
      extra1.line(xTool, yTool, mouseX, mouseY);
    }
  }
}

//to check if Shift is pressed and draw straight line for quad if is pressed
function straightQuad(temp) {
  if (temp == 0) {
    if (keyIsPressed && key == 'Shift') {
      if (timba == 1) {
        makePositive();
        if (tempX > tempY) {
          quad(xTool, yTool, mouseX, yTool, mouseX, yTool, mouseX, yTool);
        } else {
          quad(xTool, yTool, xTool, mouseY, xTool, mouseY, xTool, mouseY);
        }
      } else if (timba == 2) {
        tempX = mouseX - tempx1;
        tempY = mouseY - tempy1;
        makePositive();
        if (tempX > tempY) {
          quad(xTool, yTool, tempx1, tempy1, mouseX, tempy1, mouseX, tempy1);
        } else {
          quad(xTool, yTool, tempx1, tempy1, tempx1, mouseY, tempx1, mouseY);
        }
      } else if (timba == 3) {
        tempX = mouseX - tempx2;
        tempY = mouseY - tempy2;
        makePositive();
        if (tempX > tempY) {
          quad(xTool, yTool, tempx1, tempy1, tempx2, tempy2, mouseX, tempy2);
        } else {
          quad(xTool, yTool, tempx1, tempy1, tempx2, tempy2, tempx2, mouseY);
        }
      }
    } else {
      if (timba == 1) {
        quad(xTool, yTool, mouseX, mouseY, mouseX, mouseY, mouseX, mouseY);
      } else if (timba == 2) {
        quad(xTool, yTool, tempx1, tempy1, mouseX, mouseY, mouseX, mouseY);
      } else if (timba == 3) {
        quad(xTool, yTool, tempx1, tempy1, tempx2, tempy2, mouseX, mouseY);
      }
    }
  } else {
    if (keyIsPressed && key == 'Shift') {
      if (timba == 1) {
        makePositive();
        if (tempX > tempY) {
          tempx1 = mouseX;
          tempy1 = yTool;
        } else {
          tempx1 = xTool;
          tempy1 = mouseY;
        }
        timba++;
      } else if (timba == 2) {
        tempX = mouseX - tempx1;
        tempY = mouseY - tempy1;
        makePositive();
        if (tempX > tempY) {
          tempx2 = mouseX;
          tempy2 = tempy1;
        } else {
          tempx2 = tempx1;
          tempy2 = mouseY;
        }
        timba++;
      } else if (timba == 3) {
        tempX = mouseX - tempx2;
        tempY = mouseY - tempy2;
        makePositive();
        if (tempX > tempY) {
          extra1.quad(xTool, yTool, tempx1, tempy1, tempx2, tempy2, mouseX, tempy2);
        } else {
          extra1.quad(xTool, yTool, tempx1, tempy1, tempx2, tempy2, tempx2, mouseY);
        }
        timba = 0;
      }
    } else {
      if (timba == 1) {
        //for setting 2nd point of quad shape
        tempx1 = mouseX;
        tempy1 = mouseY;
        timba++;
      } else if (timba == 2) {
        //for setting 3rd point of quad shape
        tempx2 = mouseX;
        tempy2 = mouseY;
        timba++;
      } else if (timba == 3) {
        extra1.stroke(0);
        extra1.strokeWeight(1);

        //to draw quad shape on trail canvas
        extra1.quad(xTool, yTool, tempx1, tempy1, tempx2, tempy2, mouseX, mouseY);
        timba = 0; //reseting points
      }
    }
  }
}

//to check if Shift is pressed and draw straight line for triangle if is pressed
function straightTriagngle(temp) {
  if (temp == 0) {
    if (keyIsPressed && key == 'Shift') {
      if (timba == 1) {
        makePositive();
        if (tempX > tempY) {
          triangle(xTool, yTool, mouseX, yTool, mouseX, yTool);
        } else {
          triangle(xTool, yTool, xTool, mouseY, xTool, mouseY);
        }
      } else if (timba == 2) {
        tempX = mouseX - tempx1;
        tempY = mouseY - tempy1;
        makePositive();
        if (tempX > tempY) {
          triangle(xTool, yTool, tempx1, tempy1, mouseX, tempy1);
        } else {
          triangle(xTool, yTool, tempx1, tempy1, tempx1, mouseY);
        }
      }
    } else {
      if (timba == 1) {
        triangle(xTool, yTool, mouseX, mouseY, mouseX, mouseY);
      } else if (timba == 2) {
        triangle(xTool, yTool, tempx1, tempy1, mouseX, mouseY);
      }
    }
  } else {
    if (keyIsPressed && key == 'Shift') {
      if (timba == 1) {
        makePositive();
        if (tempX > tempY) {
          tempx1 = mouseX;
          tempy1 = yTool;
        } else {
          tempx1 = xTool;
          tempy1 = mouseY;
        }
        timba++;
      } else if (timba == 2) {
        tempX = mouseX - tempx1;
        tempY = mouseY - tempy1;
        makePositive();
        if (tempX > tempY) {
          extra1.triangle(xTool, yTool, tempx1, tempy1, mouseX, tempy1);
        } else {
          extra1.triangle(xTool, yTool, tempx1, tempy1, tempx1, mouseY);
        }
        timba = 0;
      }
    } else {
      if (timba == 1) {
        //for setting 2nd point of triangle shape
        tempx1 = mouseX;
        tempy1 = mouseY;
        timba++;
      } else if (timba == 2) {
        extra1.stroke(0);
        extra1.strokeWeight(1);

        //to draw triangle shape on trail canvas
        extra1.triangle(xTool, yTool, tempx1, tempy1, mouseX, mouseY);
        timba = 0; //reseting points
      }
    }
  }
}

//to draw a square id Shift is pressed
function straightRect(temp) {
  if (temp == 0) {
    if (keyIsPressed && key == 'Shift') {
      if (tempX > 0 && tempY > 0) {
        if (tempX > tempY) {
          rect(xTool, yTool, tempX);
        } else {
          rect(xTool, yTool, tempY);
        }
      } else if (tempX < 0 && tempY > 0) {
        if (-tempX > tempY) {
          rect(xTool, yTool, tempX, -tempX);
        } else {
          rect(xTool, yTool, -tempY, tempY);
        }
      } else if (tempX > 0 && tempY < 0) {
        if (tempX > -tempY) {
          rect(xTool, yTool, tempX, -tempX);
        } else {
          rect(xTool, yTool, -tempY, tempY);
        }
      } else if (tempX < 0 && tempY < 0) {
        if (tempX < tempY) {
          rect(xTool, yTool, tempX);
        } else {
          rect(xTool, yTool, tempY);
        }
      }
    } else {
      rect(xTool, yTool, tempX, tempY);
    }
  } else {
    if (keyIsPressed && key == 'Shift') {
      if (tempX > 0 && tempY > 0) {
        if (tempX > tempY) {
          extra1.rect(xTool, yTool, tempX);
        } else {
          extra1.rect(xTool, yTool, tempY);
        }
      } else if (tempX < 0 && tempY > 0) {
        if (-tempX > tempY) {
          extra1.rect(xTool, yTool, tempX, -tempX);
        } else {
          extra1.rect(xTool, yTool, -tempY, tempY);
        }
      } else if (tempX > 0 && tempY < 0) {
        if (tempX > -tempY) {
          extra1.rect(xTool, yTool, tempX, -tempX);
        } else {
          extra1.rect(xTool, yTool, -tempY, tempY);
        }
      } else if (tempX < 0 && tempY < 0) {
        if (tempX < tempY) {
          extra1.rect(xTool, yTool, tempX);
        } else {
          extra1.rect(xTool, yTool, tempY);
        }
      }
    } else {
      extra1.rect(xTool, yTool, tempX, tempY);
    }
  }
}