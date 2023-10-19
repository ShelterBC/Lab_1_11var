class Figure {

    constructor(grid, figureColor, circles, rightIndent, leftIndet) {

        this.figureColor = figureColor;
        this.rightIndent = rightIndent;
        this.leftIndet = leftIndet;

        this.grid = grid;

        this.circles = [];

        circles.forEach(el => {
            let newX = this.grid.convertXFromGridCoordinates(el.getX())
            let newY = this.grid.convertYFromGridCoordinates(el.getY())
            let newR = this.grid.convertLenghtToGrid(el.getR());
            this.circles.push(new Circle(newX, newY, newR))
        });

    }

    setFigureColor(newColor) {
        this.figureColor = newColor

    }


    createLines() {

        const lines = [];

        //нижня частина кола
        let newCircle = this.circles[0].getPartialCircle(-48, 228, 30);
        newCircle.forEach(el => {
            lines.push(new Konva.Line({
                points: el,
                stroke: this.figureColor,
                tension: 1
            }));
        });

        let lastCircleLine = newCircle[newCircle.length - 1];
        let firstCircleLine = newCircle[0];

        //лінія від кола до координатної сітки
        lines.push(new Konva.Line({
            points: [lastCircleLine[2], lastCircleLine[3], lastCircleLine[2], this.grid.convertYFromGridCoordinates(0)],
            stroke: this.figureColor,
            tension: 1
        }));

        lines.push(new Konva.Line({
            points: [firstCircleLine[0], firstCircleLine[1], firstCircleLine[0], this.grid.convertYFromGridCoordinates(0)],
            stroke: this.figureColor,
            tension: 1
        }));

        const tempLines = []
        //права лінія до середини кола
        let trueIndent = this.grid.convertLenghtToGrid(this.rightIndent)
        let tempPoints = lines[lines.length-1].getPoints();

        tempLines.push(new Konva.Line({
            points: [tempPoints[2] + trueIndent, tempPoints[3], tempPoints[2] + trueIndent, this.circles[0].getY()],
            stroke: this.figureColor,
            tension: 1
        }));

        //відстп вправо від попередної лінії
        tempPoints = tempLines[0].getPoints();
        tempLines.push(new Konva.Line({
            points: [tempPoints[2], tempPoints[3], tempPoints[2] + this.circles[0].getR(), tempPoints[3]],
            stroke: this.figureColor,
            tension: 1
        }));

        //відстп вниз від попередної лінії
        tempPoints = tempLines[1].getPoints();
        tempLines.push(new Konva.Line({
            points: [tempPoints[2], tempPoints[3], tempPoints[2], tempPoints[3] + this.circles[0].getR()],
            stroke: this.figureColor,
            tension: 1
        }));


        //ліва лінія до низа кола
        trueIndent = this.grid.convertLenghtToGrid(this.leftIndet)
        tempPoints = lines[lines.length-2].getPoints();

        tempLines.push(new Konva.Line({
            points: [tempPoints[2] - trueIndent, tempPoints[3], tempPoints[2] - trueIndent, this.circles[0].getY() + this.circles[0].getR()],
            stroke: this.figureColor,
            tension: 1
        }));

        //крайня нижня лінія

        //Початок нижної лінії
        const tempPointA = {
            'x' : tempPoints[0] - (this.circles[0].getR() / 4),
            'y' : this.circles[0].getY() + (this.circles[0].getR() * 1.5)
        }

        //Кінець нижної лінії
        tempPoints = tempLines[0].getPoints();


        const tempPointB = {
            'x' : tempPoints[2],
            'y' : tempPointA.y
        }

        tempLines.push(new Konva.Line({
            points: [tempPointA.x, tempPointA.y, tempPointB.x, tempPointB.y],
            stroke: this.figureColor,
            tension: 1
        }));

        //з'єднуємо нижню лінію
        tempPoints = tempLines[3].getPoints();
        tempLines.push(new Konva.Line({
            points: [tempPointA.x, tempPointA.y, tempPoints[2], tempPoints[3]],
            stroke: this.figureColor,
            tension: 1
        }));


        tempPoints = tempLines[2].getPoints();

        tempLines.push(new Konva.Line({
            points: [tempPointB.x, tempPointB.y, tempPoints[2], tempPoints[3]],
            stroke: this.figureColor,
            tension: 1
        }));


        //додаємо створені лінії до основного малюнка
        tempLines.forEach(el => {
            lines.push(el)
        })




        return lines;
    }

    findTangentPoints(circleCenterX, circleCenterY, radius, pointX, pointY) {
        // Знаходимо нахил дотичної (m)
        const m = -(pointX - circleCenterX) / (pointY - circleCenterY);

        // Знаходимо точки дотику (x, y)
        const A = 1 + m ** 2;
        const B = 2 * (m * (pointY - m * pointX) - circleCenterX);
        const C = (pointY - m * pointX) ** 2 - radius ** 2;

        const discriminant = B ** 2 - 4 * A * C;
        const x1 = (-B + Math.sqrt(discriminant)) / (2 * A);
        const x2 = this.grid.convertXFromGridCoordinates(0)

        const y1 = m * (x1 - pointX) + pointY;
        const y2 = m * (x2 - pointX) + pointY;

        return [x1, y1, x2, y2];
    }



    getFigure() {

        const lines = this.createLines()

        //відзекалюємо нижню частину фігури
        const reflectedLines = [];

        lines.forEach(el => {
            reflectedLines.push(this.makeReflect(el, "X"))
        })

        reflectedLines.forEach(el => {
            lines.push(el)
        })


        return lines;
    }


    getCircle(x, y, radius, approx) {
        var lines = [];

        // Угол между каждой линией
        var angleIncrement = (2 * Math.PI) / approx;

        for (var i = 0; i < approx; i++) {
            var startAngle = i * angleIncrement;
            var endAngle = (i + 1) * angleIncrement;

            var startX = x + radius * Math.cos(startAngle);
            var startY = y + radius * Math.sin(startAngle);
            var endX = x + radius * Math.cos(endAngle);
            var endY = y + radius * Math.sin(endAngle);


            // Добавляем линию в массив
            lines.push(new Konva.Line({
                points: [startX, startY, endX, endY],
                stroke: this.figureColor,
                tension: 1
            }));
        }
        return lines;
    }


    makeReflect(line, axis) {

        let ParCoord = line.getAttr('points');

        let newFirstPoint = grid.convertToGridPoint(ParCoord.slice(0, 2))
        let newSecondPoint = grid.convertToGridPoint(ParCoord.slice(2))


        switch (axis) {
            case "X":

                newFirstPoint[1] *= -1;
                newSecondPoint[1] *= -1;

                break;
            case "Y":

                newFirstPoint[0] *= -1;
                newSecondPoint[0] *= -1;

                break;
            case "XY":
                newFirstPoint[1] *= -1;
                newSecondPoint[1] *= -1;
                newFirstPoint[0] *= -1;
                newSecondPoint[0] *= -1;
                break;
        }

        return new Konva.Line({
            points: [
                grid.convertXFromGridCoordinates(newFirstPoint[0]),
                grid.convertYFromGridCoordinates(newFirstPoint[1]),
                grid.convertXFromGridCoordinates(newSecondPoint[0]),
                grid.convertYFromGridCoordinates(newSecondPoint[1])],
            stroke: this.figureColor,
            tension: 1
        });
    }

}
