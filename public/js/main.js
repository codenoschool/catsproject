$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/delete/'+id,
      success: function(response){
        window.location.href='/';
        alert('Deleting Article');
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
