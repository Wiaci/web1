window.onload = e => {
    $.ajax({
        method: "GET",
        url: "php/get_history.php"
    }).done(msg => {
        var strs = msg.split("<br>");
        strs.forEach(str => addRow(str))
    });
}

$('#clear').hover(e => {
    $('.to-delete').css('background-color', '#FF9B9B')
}, e => $('.to-delete').css('background-color', '#f2facf'));

$('#clickable').click(e => {
    $("#clear_wrapper").css('background-image', 'url(images/1cz.png)');
    $("#clear").prop('disabled', false);
    $("#clear").css('opacity', 1);
    $("#clickable").css('cursor', 'auto');
})

/*$('#clear').bind('hover', e => {
    $('#clear').css('background-color', '#FF9B9B');
    //$('.to-delete').each(str => str.css('background-color', '#FF9B9B'))
})*/

$('#clear').click(e => delete_history());

$('#submit').click(e => {
    e.preventDefault();
    var y = $('#y').val().replace(",", ".");
    if (!(/-?\d+((\.|,)\d+)?/.test(y) && Number(y) < 3 && Number(y) > -5)) {
        $('#y').css('background-color', '#FF9B9B');
        $('#incorrect').text("(-5;3)!");
    } else {
        $('#y').css('background-color', 'white');
        $('#incorrect').text("");

        var x = $('input[name="x-vals"]:checked').val();
        var r = $('input[name="r-vals"]:checked').val();

        $('#cur-point').attr("cx", 150 + x / r * 100);
        $('#cur-point').attr("cy", 150 - y / r * 100);

        $.ajax({
          method: "POST",
          url: "php/form_checker.php",
          data: { x: x, y: y, r: r }
        }).done(msg => addRow(msg));
    }
});

function addRow (str) {
    var results = str.split(" ");
    if (results[0] === "" || results[0] === "wrong_data") return;
    $('#results').append(`<tr class="to-delete"><td>${results[0]}</td><td>${results[1]}</td><td>${results[2]}</td>
        <td>${results[3]}</td><td>${results[4]}</td><td>${Math.round(results[5]*1e10)/1e10}</td></tr>`);
}

function delete_history () {
    $('table').html('<table id="results"><tr id="header"><td>X</td><td>Y</td><td>R</td>' + 
        '<td>Попадание</td><td>Тек. время</td><td>Время исполнения</td></tr></table>');
    $.ajax({
        method: "GET",
        url: "php/clear_history.php"
    })
}