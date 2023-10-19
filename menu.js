const blocks = {
    'linear' : $('#linear'),
    'affine' : $('#affine'),
    'proectional' : $('#proectional')
}

function findActive() {
    for (const key in blocks) {
        if (blocks[key].is(':visible')) {
            return key
        }
    }
}

$('.linear').on('click', function() {
    let active = findActive()
    if(active == 'linear') {
        return;
    } else {
        blocks[active].hide();
        blocks.linear.show();

    }
});

$('.affine').on('click', function() {
    let active = findActive()
    if(active == 'affine') {
        return;
    } else {
        blocks[active].hide();
        blocks.affine.show();

    }
});

$('.proectional').on('click', function() {
    let active = findActive();
    if (active === 'proectional') {
        return;
    } else {
        blocks[active].hide();
        blocks.proectional.show();
    }
});

$('.clear').on('click', function() {
    layer.removeChildren();
    grid.resetCoordinates()
    grid.drawGrid(layer);

    figureAtributes[1] = 'black'
    $('#colorPicker').val('black');
    figure = new Figure(figureAtributes[0], figureAtributes[1], figureAtributes[2], figureAtributes[3], figureAtributes[4]);
    lines = figure.getFigure()
    lines.forEach(el => {
        layer.add(el);
    })
    layer.batchDraw();
});

