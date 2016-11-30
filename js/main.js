jQuery(function($){
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

//完善信息页面性别选中
$(".form-control .sex").click(function(){
	$(this).addClass("selected").siblings(".sex").removeClass("selected");
	$("input[name=sex]").val($(this).index());
});

//全局正则配置
var RegConfig={
	'mobile':/^[0-9]*[-]*[0-9]*$/,
	'email':/^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/
}



//验证不通过
function noPass(msg,obj){
	var $msg = $('<span class="nopass"></span>');
    $(obj).addClass("error").siblings(".nopass,.pass").remove();
	$msg.html(msg).insertAfter($(obj));
}
//验证通过
function Pass(obj){
	var $pass = $('<span class="pass"></span>');
    $(obj).remove("error").siblings(".nopass,.pass").remove();
    $pass.insertAfter($(obj));
}

//正则表达式验证
function RegCheck(obj,regular){
    var objval=$(obj).val();
   if(!regular.test(objval)){
        return true;
   }else{
        return false;
   }
}
//ajax验证
var isHave;
function remoteCheck(obj,url,string){
    var objval=$(obj).val();
    
           
    $.ajax({
            
            url:url,
            data:{name:objval},
            success:function(data){
                var data=$.parseJSON(data);
                if(data.status==1){
                   noPass(string, obj);
                }else{
                   pass();

                }
            }
        });
    return isHave;
}

//账号注册验证
function checkEmpty(obj) {
    if($.trim($(obj).val()) == ""){
        return true;
    }else{
        return false;
    }
}

function checkLength(obj,len){
    if($.trim($(obj).val()).length>len){
        return true;
    }else{
        return false;
    }
}

function checkPhoneAndEmail(obj) {
    $(obj).blur(function() {
        if (checkEmpty(obj)) {
            noPass("请输入邮箱或手机",obj);
        }else if(checkLength(obj,50)){
            noPass("邮箱长度超过限定",obj);
        }else if(RegCheck(obj,RegConfig.email) || RegCheck(obj,RegConfig.mobile)){
            noPass("邮箱或手机格式不正确",obj);
        }else if(remoteCheck(obj,"http://www.baidu.com")){
            noPass("该邮箱/手机已经存在，请更换或 <a href='#'>登录</a>",obj);
        }else{
       
            remoteCheck(obj,"js/data.txt","该邮箱/手机已经存在，请更换或 <a href='#'>登录</a>")
        }
        /*if(remoteCheck(obj,"js/data.txt")){
            alert(123)
            noPass("该邮箱/手机已经存在，请更换或 <a href='#'>登录</a>",obj);
        }*/

    });

}
//申报奖项
function validateAwards() {
        var $award = $(".apply-award");
        var $msg = $('<span class="Validform_checktip"></span>');
        $award.find(".Validform_checktip").remove();
        if (!$award.find(":checked").length) {
            $msg.html("请选择申报奖项").appendTo($(".apply-award"));
            $award.addClass("error");
        } else if ($award.find(":checked").length > 2) {
            $msg.html("不能超过2项").appendTo($(".apply-award"));
            $award.addClass("error");
        } else {
            $award.removeClass("error");

        }
}


var valiate={
	regform:function(){
		checkPhoneAndEmail("#account");

	
	
	}
}

valiate.regform();



 $(".apply-award :checkbox").click(function() {
 	validateAwards();
 });

function getApplyAward(){
	var awardVal=$("#apply-award input:checked").map(function(){
	   	return $(this).val();
	}).get().join(",");
	$("input[name=applyAward]").val(awardVal);
}


$("#reg-btn").click(function(ev) {
    ev.preventDefault();
	$(".form-item input,.form-item textarea").trigger("blur");
    validateAwards();
    //给申报奖项隐藏域设值
    getApplyAward();

    $(".form-item .txt,.form-item textarea").each(function(){
    	if($(this).hasClass("error")){
    	//把光标定到第一个错误的文本框
           $(this).focus();
           $("html,body").animate({'scrollTop':$(this).offset().top-30},300);
           return false;
    	}
    });









});
});

