//BUSINESS LOGIC//


//USER LOGIC//
$(document).ready(function(){
  $(".col-xs-4").click(function(){
    $("p").hide();
      $( "p",this).toggle();

  });
  $("form").submit(function(event){
    event.preventDefault();

    var adoptionVal = $("#adoptionFilter select").val();
    if(adoptionVal === "available"){
      $(".adopted").each(function(element){
        $(".adopted").hide();
        $(".adopted").siblings().hide();
      });
    } else if(adoptionVal === "adopted"){
      $(".available").each(function(element){
        $(".available").hide();
        $(".available").siblings().hide();
      });

    }else{
      $(".available").show();
      $(".available").siblings().show();
      $(".adopted").show();
      $(".adopted").siblings().show();
    }


  });
});
