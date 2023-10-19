class Grid {
    constructor(gridSize, gridColor, width, height, scale) {
        this.gridSize = gridSize;
        this.gridColor = gridColor;
        this.gridWidth = width;
        this.gridHeight = height;
        this.scale = scale;
        this.titleColor = 'black'
        this.isAfine = false;
        this.r0 = [];
        this.rX = [];
        this.rY = [];

        this.isProective = false;
        this.pO = [];
        this.pX = [];
        this.pY = [];
    }

    isInAfine() {
        return this.isAfine;
    }

    isInProecive() {
        return this.isProective;
    }

    resetCoordinates() {
        this.isProective = false;
        this.isAfine = false;
    }

    setR0(r0) {
        this.r0 = r0;
    }

    setRX(rX) {
        this.rX = rX;
    }

    setRY(rY) {
        this.rY = rY;
    }

    setPO(pO) {
        this.pO = pO;
    }

    setPX(pX) {
        this.pX = pX;
    }

    setPY(pY) {
        this.pY = pY;
    }

    getGridSize() {
        return this.gridSize
    }
    setGridSize(newSize) {
        this.gridSize = newSize
    }

    setScale(scale) {
        this.scale = scale;
    }

    getScale() {
        return this.scale;
    }

    convertToGridCoordinates(x, y) {
        let newX, newY;
        x == parseInt(this.gridWidth / 2) ? newX = 0 : newX = ((x - parseInt(this.gridWidth / 2)) / this.gridSize) * this.scale;
        y == parseInt(this.gridHeight / 2) ? newY = 0 : newY = ((y - parseInt(this.gridHeight / 2)) / this.gridSize) * this.scale;

        return [newX, newY * (-1)]
    }
    convertToGridPoint(point) {
        let newX, newY;
        point[0] == parseInt(this.gridWidth / 2) ? newX = 0 : newX = ((point[0] - parseInt(this.gridWidth / 2)) / this.gridSize) * this.scale;
        point[1] == parseInt(this.gridHeight / 2) ? newY = 0 : newY = ((point[1] - parseInt(this.gridHeight / 2)) / this.gridSize) * this.scale;

        return [newX, newY * (-1)]
    }

    convertXToGridCoordinates(x) {
        let newX;
        x == parseInt(this.gridWidth / 2) ? newX = 0 : newX = ((x - parseInt(this.gridWidth / 2)) / this.gridSize) * this.scale;

        return newX;
    }

    convertYToGridCoordinates(y) {
        let newY;
        y == parseInt(this.gridHeight / 2) ? newY = 0 : newY = ((y - parseInt(this.gridHeight / 2)) / this.gridSize) * this.scale;

        return (newY * (-1));
    }

    convertXFromGridCoordinates(x) {
        let newX;
        x == 0 ? newX = parseInt(this.gridWidth / 2) : newX = x / this.scale * this.gridSize + parseInt(this.gridWidth / 2);

        return newX;
    }

    convertYFromGridCoordinates(y) {
        let newY;
        y == 0 ? newY = parseInt(this.gridHeight / 2) : newY = (-1 * y) / this.scale * this.gridSize + parseInt(this.gridHeight / 2);

        return (newY);
    }

    convertFromGridCoordinates(x, y) {
        let newX, newY;
        x == 0 ? newX = parseInt(this.gridWidth / 2) : newX = x / this.scale * this.gridSize + parseInt(this.gridWidth / 2);
        y == 0 ? newY = parseInt(this.gridHeight / 2) : newY = (-1 * y) / this.scale * this.gridSize + parseInt(this.gridHeight / 2);

        return [newX, newY]
    }

    convertFromGridPoint(point) {
        let newX, newY;
        point[0] == 0 ? newX = parseInt(this.gridWidth / 2) : newX = point[0] / this.scale * this.gridSize + parseInt(this.gridWidth / 2);
        point[1] == 0 ? newY = parseInt(this.gridHeight / 2) : newY = (-1 * point[1]) / this.scale * this.gridSize + parseInt(this.gridHeight / 2);

        return [newX, newY]
    }

    convertLenghtToGrid(length) {
        return length * this.gridSize / this.scale;
    }

    convertLenghtFromGrid(length) {
        return length / this.gridSize * this.scale;
    }



    drawAxis(layer) {
        const xCenter = this.gridWidth / 2;
        const yCenter = this.gridHeight / 2;
        let arrowY, arrowX;
        var pointsAX, pointsAY;
        if (this.isAfine) {
            let lineStart, lineEnd;
            lineStart = this.affinePointTransform([xCenter, this.gridHeight]);
            lineEnd = this.affinePointTransform([xCenter, 0]);
            pointsAY = lineStart.concat(lineEnd);

            lineStart = this.affinePointTransform([0, yCenter]);
            lineEnd = this.affinePointTransform([this.gridWidth - 5, yCenter]);
            pointsAX = lineStart.concat(lineEnd);

        } else if(this.isProective) {
            let lineStart, lineEnd;
            lineStart = this.proectivePointTransform([xCenter, this.gridHeight]);
            lineEnd = this.proectivePointTransform([xCenter, 0]);
            pointsAY = lineStart.concat(lineEnd);

            lineStart = this.proectivePointTransform([0, yCenter]);
            lineEnd = this.proectivePointTransform([this.gridWidth - 5, yCenter]);
            pointsAX = lineStart.concat(lineEnd);

        } else {

            pointsAY = [xCenter, this.gridHeight, xCenter, 5];
            pointsAX = [0, yCenter, this.gridWidth - 5, yCenter];
        }

        if(pointsAX[3] < 0) {
            pointsAX[3] = pointsAX[3];
        }

        arrowX = new Konva.Arrow({
            points: pointsAX,
            stroke: 'black',
            fill: 'black',
            strokeWidth: 2,
            pointerLength: 20,
            pointerWidth: 20,
        });
        arrowY = new Konva.Arrow({
            points: pointsAY,
            stroke: 'black',
            fill: 'black',
            strokeWidth: 2,
            pointerLength: 20,
            pointerWidth: 20,
        });

        // Створюємо текстові об'єкти для обозначення координат
        var textX = new Konva.Text({
            x: (pointsAX[2]) - 20, // Центруємо текст по середині стрілки X
            y: pointsAX[1] + 20, // Зміщуємо текст вгору, щоб він був над стрілкою
            text: 'X', // Текст для відображення (можете вказати координати або інший текст)
            fontSize: 18,
            fill: 'black'
        });

        var textY = new Konva.Text({
            x: pointsAY[0] + 20, // Зміщуємо текст вліво, щоб він був ліворуч від стрілки Y
            y: pointsAY[3] + 5, // Центруємо текст по середині стрілки Y
            text: 'Y', // Текст для відображення (можете вказати координати або інший текст)
            fontSize: 18,
            fill: 'black'
        });

        if(!this.isAfine && !this.isProective) {
            layer.add(textX);
            layer.add(textY);
        }

        layer.add(arrowY);
        layer.add(arrowX);
    }


    drawTitels(layer) {


        const gridSizeScaled = this.convertLenghtToGrid(this.scale);
        const xCenter = this.gridWidth / 2;
        const yCenter = this.gridHeight / 2;

        // Вычисляем смещение осей относительно центра координат

        let label = new Konva.Text({
            x: xCenter - this.gridSize / 3,
            y: yCenter + 5,
            text: '0',
            fontSize: this.gridSize / 2,
            fill: this.titleColor,
        });
        layer.add(label);



        for (let x1 = xCenter + gridSizeScaled, x2 = xCenter - gridSizeScaled; x1 < this.gridWidth - gridSizeScaled; x1 += gridSizeScaled, x2 -= gridSizeScaled) {
            let label;
            label = new Konva.Text({
                x: x1 - 6,
                y: yCenter + 10,
                text: this.convertToGridCoordinates(x1, 0)[0].toString(),
                fontSize: this.gridSize / 2,
                fill: this.titleColor,
            });
            layer.add(label);

            label = new Konva.Text({
                x: x2 - 6,
                y: yCenter + 10,
                text: this.convertToGridCoordinates(x2, 0)[0].toString(),
                fontSize: this.gridSize / 2,
                fill: this.titleColor,
            });
            layer.add(label);
        }

        for (let y1 = yCenter + gridSizeScaled, y2 = yCenter - gridSizeScaled; y1 < this.gridHeight - gridSizeScaled; y1 += gridSizeScaled, y2 -= gridSizeScaled) {
            let label;
            label = new Konva.Text({
                x: xCenter + 5,
                y: y1 - 6,
                text: this.convertToGridCoordinates(0, y1)[1].toString(),
                fontSize: this.gridSize / 2,
                fill: this.titleColor,
            });
            layer.add(label);

            label = new Konva.Text({
                x: xCenter + 5,
                y: y2 - 6,
                text: this.convertToGridCoordinates(0, y2)[1].toString(),
                fontSize: this.gridSize / 2,
                fill: this.titleColor,
            });
            layer.add(label);
        }

    }

    drawGrid(layer) {
        const gridSizeScaled = this.convertLenghtToGrid(this.scale);
        const xCenter = this.gridWidth / 2;
        const yCenter = this.gridHeight / 2;

        // Вычисляем смещение осей относительно центра координат
        const xOffset = xCenter % gridSizeScaled;
        const yOffset = yCenter % gridSizeScaled;

        for (let x = xOffset; x < this.gridWidth; x += this.gridSize) {
            const line = new Konva.Line({
                points: [x, 0, x, this.gridHeight],
                stroke: this.gridColor,
                strokeWidth: 1,
            });
            layer.add(line);
        }

        for (let y = yOffset; y < this.gridHeight; y += this.gridSize) {
            const line = new Konva.Line({
                points: [0, y, this.gridWidth, y],
                stroke: this.gridColor,
                strokeWidth: 1,
            });
            layer.add(line);
        }

        this.drawAxis(layer);
        this.drawTitels(layer);

        layer.draw();
    }

    drawAffineGrid(layer) {
        this.isAfine = true;
        this.isProective = false;

        const gridSizeScaled = this.convertLenghtToGrid(this.scale);
        const xCenter = this.gridWidth / 2;
        const yCenter = this.gridHeight / 2;

        // Вычисляем смещение осей относительно центра координат
        const xOffset = xCenter % gridSizeScaled;
        const yOffset = yCenter % gridSizeScaled;

        let lineStart, lineEnd;

        for (let x = xOffset; x < this.gridWidth; x += this.gridSize) {

            lineStart = this.affinePointTransform([x, 0]);
            lineEnd = this.affinePointTransform([x, this.gridHeight]);

            const line = new Konva.Line({
                points: lineStart.concat(lineEnd),
                stroke: this.gridColor,
                strokeWidth: 1,
            });
            layer.add(line);
        }

        for (let y = yOffset; y < this.gridHeight; y += this.gridSize) {
            lineStart = this.affinePointTransform([0, y]);
            lineEnd = this.affinePointTransform([this.gridWidth, y]);
            const line = new Konva.Line({
                points: lineStart.concat(lineEnd),
                stroke: this.gridColor,
                strokeWidth: 1,
            });
            layer.add(line);
        }

        this.drawAxis(layer);
        //this.drawTitels(layer);

        layer.draw();

    }

    drawProectiveGrid(layer) {
        this.isProective = true;
        this.isAfine = false;

        const gridSizeScaled = this.convertLenghtToGrid(this.scale);
        const xCenter = this.gridWidth / 2;
        const yCenter = this.gridHeight / 2;

        // Вычисляем смещение осей относительно центра координат
        const xOffset = xCenter % gridSizeScaled;
        const yOffset = yCenter % gridSizeScaled;

        let lineStart, lineEnd;

        for (let x = xOffset; x < this.gridWidth; x += this.gridSize) {

            lineStart = this.proectivePointTransform([x, 0]);
            lineEnd = this.proectivePointTransform([x, this.gridHeight]);

            const line = new Konva.Line({
                points: lineStart.concat(lineEnd),
                stroke: this.gridColor,
                strokeWidth: 1,
            });
            layer.add(line);
        }

        for (let y = yOffset; y < this.gridHeight; y += this.gridSize) {
            lineStart = this.proectivePointTransform([0, y]);
            lineEnd = this.proectivePointTransform([this.gridWidth, y]);
            const line = new Konva.Line({
                points: lineStart.concat(lineEnd),
                stroke: this.gridColor,
                strokeWidth: 1,
            });
            layer.add(line);
        }

        this.drawAxis(layer);
        //this.drawTitels(layer);

        layer.draw();

    }

    movePoint2D(point, mX, mY) {
        point[0] += mX;
        point[1] -= mY;
        return point;
    }

    rotation2D(point, angle) {
        angle = angle * (Math.PI / 180)
        const convertedPoint = this.convertToGridPoint(point)

        let rX = convertedPoint[0];
        let rY = convertedPoint[1]
        convertedPoint[0] = rX * Math.cos(angle) - rY * Math.sin(angle);
        convertedPoint[1] = rX * Math.sin(angle) + rY * Math.cos(angle);
        return this.convertFromGridPoint(convertedPoint);
    }

    rotation2DtoPoint(point, rotationPoint, angle) {
        angle = angle * (Math.PI / 180)
        const convertedPoint = this.convertToGridPoint(point)


        let rX = convertedPoint[0];
        let rY = convertedPoint[1]
        convertedPoint[0] = (rX - rotationPoint[0]) * Math.cos(angle) - (rY - rotationPoint[1]) * Math.sin(angle);
        convertedPoint[1] = (rX - rotationPoint[0]) * Math.sin(angle) + (rY - rotationPoint[1]) * Math.cos(angle);

        convertedPoint[0] += rotationPoint[0]
        convertedPoint[1] += rotationPoint[1]

        return this.convertFromGridPoint(convertedPoint);
    }

    affinePointTransform(point) {
        const convertedPoint = this.convertToGridPoint(point);

        const affinePoint = [];

        affinePoint.push(this.r0.x + this.rX.x * convertedPoint[0] + this.rY.x * convertedPoint[1]);
        affinePoint.push(this.r0.y + this.rX.y * convertedPoint[0] + this.rY.y * convertedPoint[1]);
        return this.convertFromGridPoint(affinePoint);
    }

    proectivePointTransform(point) {
        const convertedPoint = this.convertToGridPoint(point);

        const proectivePoint = [];

        proectivePoint.push((this.pO.x * this.pO.w + this.pX.x * this.pX.w * convertedPoint[0] + this.pX.y * this.pY.w * convertedPoint[1])/(this.pO.w + this.pX.w * convertedPoint[0] + this.pY.w * convertedPoint[1]));
        proectivePoint.push((this.pO.y * this.pO.w + this.pX.y * this.pX.w * convertedPoint[0] + this.pY.y * this.pY.w * convertedPoint[1])/(this.pO.w + this.pX.w * convertedPoint[0] + this.pY.w * convertedPoint[1]));
        
        return this.convertFromGridPoint(proectivePoint);
    }
}

