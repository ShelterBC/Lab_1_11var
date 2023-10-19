var drawWidth = parseFloat($('#drawWrap').css('width'))

drawWidth = drawWidth - (drawWidth % 10)

var stage = new Konva.Stage({
    container: 'drawWrap',   // id of container <div>
    width: drawWidth,
    height: 600
});


// then create layer
var layer = new Konva.Layer();

const grid = new Grid(15, 'lightGray', drawWidth, 600, 1);

$('#gridSize').val(grid.getGridSize())
$('#Scale').val(grid.getScale())

const circles = []

circles.push(new Circle(0, -7, 3))

const figureAtributes = [grid, 'black', circles, 5, 4]


var figure = new Figure(figureAtributes[0], figureAtributes[1], figureAtributes[2], figureAtributes[3], figureAtributes[4]);
var lines = figure.getFigure()

const copyLines = figure.getFigure()


grid.drawGrid(layer)



lines.forEach(el => {
    layer.add(el);
})

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();

$('#makeMove').on('click', function (event) {
    let mX = grid.convertLenghtToGrid($('#moveX').val());
    let mY = grid.convertLenghtToGrid($('#moveY').val());


    lines.forEach(el => {
        el.remove()
        let linePoints = el.getPoints();
        let lineStart = grid.movePoint2D([linePoints[0], linePoints[1]], mX, mY);
        let lineEnd = grid.movePoint2D([linePoints[2], linePoints[3]], mX, mY);

        el.setPoints(lineStart.concat(lineEnd))

        layer.add(el);
    });

    layer.batchDraw();
});


$("#makeRotate").on("click", function () {
    const sliderValue = $("#rotateInputAngle").val();

    let linePoints, lineStart, lineEnd;
    let rotationPoint = [];

    rotationPoint.push($("#rotateX").val())
    rotationPoint.push($("#rotateY").val())

    rotationPoint[0] = parseFloat(rotationPoint[0]);
    rotationPoint[1] = parseFloat(rotationPoint[1]);


    for (let i = 0; i < lines.length; i++) {
        lines[i].remove()
        linePoints = lines[i].getPoints();
        if (rotationPoint[0] == 0 && rotationPoint[1] == 0) {
            lineStart = grid.rotation2D([linePoints[0], linePoints[1]], sliderValue);
            lineEnd = grid.rotation2D([linePoints[2], linePoints[3]], sliderValue);
        } else {
            lineStart = grid.rotation2DtoPoint([linePoints[0], linePoints[1]], rotationPoint, sliderValue);
            lineEnd = grid.rotation2DtoPoint([linePoints[2], linePoints[3]], rotationPoint, sliderValue);
        }

        lines[i].setPoints(lineStart.concat(lineEnd))
        layer.add(lines[i]);
    }

    layer.batchDraw();
});

$("#makeAffine").on("click", function () {

    let r0 = {
        'x': parseFloat($("#r0X").val()),
        'y': parseFloat($("#r0Y").val())
    }
    let rX = {
        'x': parseFloat($("#rXX").val()),
        'y': parseFloat($("#rXY").val())
    }
    let rY = {
        'x': parseFloat($("#rYX").val()),
        'y': parseFloat($("#rYY").val())
    }

    grid.setR0(r0);
    grid.setRX(rX);
    grid.setRY(rY);

    layer.removeChildren();
    grid.drawAffineGrid(layer);


    for (let i = 0; i < lines.length; i++) {
        linePoints = lines[i].getPoints();
        lineStart = grid.affinePointTransform([linePoints[0], linePoints[1]]);
        lineEnd = grid.affinePointTransform([linePoints[2], linePoints[3]]);

        lines[i].setPoints(lineStart.concat(lineEnd))
        layer.add(lines[i]);
    }

    layer.batchDraw();
});

$("#makeProectional").on("click", function () {

    let X = {
        'x': parseFloat($("#Xx").val()),
        'y': parseFloat($("#Xy").val()),
        'w': parseFloat($("#wX").val())
    }
    let Y = {
        'x': parseFloat($("#Yx").val()),
        'y': parseFloat($("#Yy").val()),
        'w': parseFloat($("#wY").val())
    }
    let O = {
        'x': parseFloat($("#0x").val()),
        'y': parseFloat($("#0y").val()),
        'w': parseFloat($("#w0").val())
    }

    grid.setPO(O);
    grid.setPX(X);
    grid.setPY(Y);

    layer.removeChildren();
    grid.drawProectiveGrid(layer);

    lines.forEach(el => {
        el.remove()
        linePoints = el.getPoints();
        lineStart = grid.proectivePointTransform([linePoints[0], linePoints[1]]);
        lineEnd = grid.proectivePointTransform([linePoints[2], linePoints[3]]);


        el.setPoints(lineStart.concat(lineEnd))
        layer.add(el);
    })

    layer.batchDraw();
});


$('#changeGrid').on('click', function () {
    lines.forEach(el => {

        let linePoints = el.getPoints();
        let lineStart = grid.convertToGridPoint([linePoints[0], linePoints[1]]);
        let lineEnd = grid.convertToGridPoint([linePoints[2], linePoints[3]]);

        el.setPoints(lineStart.concat(lineEnd))
    })

    grid.setGridSize(parseFloat($("#gridSize").val()));
    grid.setScale(parseFloat($("#Scale").val()));

    layer.removeChildren();
    if (grid.isInAfine()) {
        grid.drawAffineGrid(layer)
    } else if (grid.isInProecive()) {
        grid.drawProectiveGrid(layer)
    } else {
        grid.drawGrid(layer);
    }

    lines.forEach(el => {

        let linePoints = el.getPoints();
        let lineStart = grid.convertFromGridPoint([linePoints[0], linePoints[1]]);
        let lineEnd = grid.convertFromGridPoint([linePoints[2], linePoints[3]]);

        el.setPoints(lineStart.concat(lineEnd))
        layer.add(el);
    })

    layer.batchDraw();
});

$('#colorPicker').on('input', function () {
    lines.forEach(el => {
        el.remove()
        el.setStroke($(this).val());
        layer.add(el);
    })
    figure.setFigureColor($(this).val());
});
