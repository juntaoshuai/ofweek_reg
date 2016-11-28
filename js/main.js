$(function(){
	//下拉列表整体操作
	var pulldown = function() {
	 $(".pulldown").click(function() {

	   $(this).parent().css("z-index",999).find(".pulldown-list").css("z-index",999).closest(".form-item").css("z-index",999).siblings().css("z-index",1).find(".pulldown-box").css("z-index",1).find(".pulldown-list").css("z-index",1).hide();

	    $(this).next().toggle().css({
	        'width':$(this).width(),
	        'top':$(this).height()
	   });

	    return false;
	});

	$(".pulldown-list li").click(function() {
	    var id = $(this).data("id");
	    $(this).closest(".pulldown-box").find(".select-txt").html($(this).html());
	    $(this).parent().hide();
	    if (id) {
	        $(this).parent().next().val(id);
	    }else{
	        $(this).parent().next().val($(this).html());
	    }
	});

	$(document).click(function() {
	    $(".pulldown-list").hide();
	});

	}

	pulldown();






});

