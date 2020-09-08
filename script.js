$('#submit').bind('click', e => {
    e.preventDefault();
    var y = $('#y').val();
    if (!(/-?\d+(\.\d+)?/.test(y) && Number(y) < 3 && Number(y) > -5)) {
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
          url: "form_checker.php",
          data: { x: x, y: y, r: r }
        }).done(msg => {
            var results = msg.split(" ");
            $('#results').append('<tr><td>' + x + '</td><td>' + y + '</td><td>'+ r + '</td><td>' + results[0] + 
                                        '</td><td>' + results[1] + '</td><td>' + results[2] + '</td></tr>');
        });
    }
});