function deleteStudent(id) {
    $.ajax({
        url: '/deleteStudent/' + id,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    });
}
