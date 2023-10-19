class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setR(r) {
        this.r = r;
    }

    getX() {
        return this.x;
    }

    getY(y) {
        return this.y;
    }

    getR(r) {
        return this.r;
    }

    setCenter(point) {
        this.x = point[0]
        this.y = point[1]
    }

    getPointOnCircle(angle) {
        angle *= (Math.PI / 180)
        const x = this.x + this.r * Math.cos(angle);
        const y = this.y + this.r * Math.sin(angle);
        return [x, y];
    }

    getPartialCircle(startAngle, endAngle, approx) {
        startAngle *= (Math.PI / 180);
        endAngle *= (Math.PI / 180);
        const circlePoints = []
    
        // Угол між кожною лінією
        var angleIncrement = (endAngle - startAngle) / approx;
    
        for (var i = 0; i < approx; i++) {
            var currentAngle = startAngle + i * angleIncrement;
            var nextAngle = startAngle + (i + 1) * angleIncrement;
    
            var startX = this.x + this.r * Math.cos(currentAngle);
            var startY = this.y + this.r * Math.sin(currentAngle);
            var endX = this.x + this.r * Math.cos(nextAngle);
            var endY = this.y + this.r * Math.sin(nextAngle);
    
            circlePoints.push([startX, startY, endX, endY])
        }
        return circlePoints;
    }
    
    

    getCircle(approx) {
        const circlePoints = []
        // Угол между каждой линией
        var angleIncrement = (2 * Math.PI) / approx;

        for (var i = 0; i < approx; i++) {
            var startAngle = i * angleIncrement;
            var endAngle = (i + 1) * angleIncrement;

            var startX = this.x + this.r * Math.cos(startAngle);
            var startY = this.y + this.r * Math.sin(startAngle);
            var endX = this.x + this.r * Math.cos(endAngle);
            var endY = this.y + this.r * Math.sin(endAngle);
            circlePoints.push([startX, startY, endX, endY])

        }
        return circlePoints;
    }
}