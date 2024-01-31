$(document).ready(function()
    {
        $('#booking-form').submit(function(event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '../email/booking.php',
                data: $(this).serialize(),
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    $('#result').html(data.msg);
                },
                error: function (data) {
                    console.log(data);
                    $('#result').html(data.msg);
                }
            });
        });
    });
