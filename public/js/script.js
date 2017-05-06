$(function() {
    $('.edit-form').submit(function(e) {
        e.preventDefault();
        var url = $(this).attr('action');
        var data = $(this).serialize();

        $.ajax({
            url: url,
            method: 'PUT',
            data: data
        }).done(function() {
            window.location.href = '/profile';
        });
    });

    $('.delete-btn').click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href');

        $.ajax({
            url: url,
            method: 'DELETE'
        }).done(function() {
            window.location.href = '/profile';
        });
    });

    // $('.button-collapse').sideNav({
    //     menuWidth: 300, // Default is 300
    //     edge: 'right', // Choose the horizontal origin
    //     closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    //     draggable: true // Choose whether you can drag to open on touch screens
    // });

    // // Show sideNav
    // $('.button-collapse').sideNav('show');
    // // Hide sideNav
    // $('.button-collapse').sideNav('hide');
    // // Destroy sideNav
    // $('.button-collapse').sideNav('destroy');

});
