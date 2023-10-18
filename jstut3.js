let data;
let expenditureArray = [];
let percentArray = [];
let colorArray = [];

function drawChart() {
    data = document.getElementById('json-data').value;
    populateArray(data);
    percentArray = createPercentArray();
    colorArray = createRandomColorArray();
    drawPie();
}

function populateArray(jsondata) {
    let expenseArray = JSON.parse(jsondata);
    for (let i = 0; i < expenseArray.expenditures.length; i++) {
        expenditureArray[i] = expenseArray.expenditures[i];
    }
}

function createPercentArray() {
    let localPercentArray = [];
    for (let i = 0; i < expenditureArray.length; i++) {
        localPercentArray[i] = parseFloat(expenditureArray[i].percent) / 100;
    }
    return localPercentArray;
}

function createRandomColorArray() {
    let randColorArr = [];
    for (let i = 0; i < expenditureArray.length; i++) {
        randColorArr[i] = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    return randColorArr;
}

function drawPie() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    let startAngle = 0;
    let endAngle = 0;

    for (let i = 0; i < percentArray.length; i++) {
        startAngle = endAngle;
        endAngle = endAngle + (percentArray[i] * 2 * Math.PI);

        drawSlice(context, 300, 200, 150, startAngle, endAngle, colorArray[i]
            );

            drawSliceText(context, 300, 200, 150, startAngle, endAngle, percentArray
            [i]*50);
    }
}

function drawSlice(context, sliceCenterX, sliceCenterY, radius, startAngle, endAngle, color) {
    context.fillStyle = color;
    context.beginPath();

    let medianAngle = (startAngle + endAngle)/2;
    xOffset = Math.cos(medianAngle) * 30;
    yOffset = Math.sin(medianAngle) * 30;

    context.moveTo(sliceCenterX + xOffset, sliceCenterY + yOffset);
    context.arc(sliceCenterX + xOffset, sliceCenterY + yOffset, radius, startAngle, endAngle);
    context.closePath();
    context.fill();
}

function drawSliceText(context, sliceCenterX, sliceCenterY, radius, startAngle, endAngle, percentText){
    let textX = sliceCenterX + Math.cos((startAngle + endAngle)/2) * radius;
    let textY = sliceCenterY + Math.sin((startAngle + endAngle)/2) * radius;

    context.fillStyle = 'black';
    context.font = '24px Calibri';
    context.fillText(percentText, textX, textY );
}