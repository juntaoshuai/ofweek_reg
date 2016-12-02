jQuery(function($){
    //下拉列表整体操作
    var pulldown = function() {
     $(".pulldown").click(function() {

       $(this).parent().css("z-index",888).find(".pulldown-list").css("z-index",888).closest(".form-item").css("z-index",888).siblings().css("z-index",1).find(".pulldown-box").css("z-index",1).find(".pulldown-list").css("z-index",1).hide();

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





//验证不通过
function noPass(msg,obj){
    var $msg = $('<span class="nopass"></span>');
    $(obj).addClass("error").siblings(".nopass,.pass,.input-tips").remove();
    $msg.html(msg).appendTo($(obj).closest(".form-control"));
}
//验证通过
function pass(obj){
    var $pass = $('<span class="pass"></span>');
    $(obj).remove("error").siblings(".nopass,.pass,.input-tips").remove();
    $pass.appendTo($(obj).closest(".form-control"));

}

//正则表达式验证
function RegCheck(obj,regular){
    var objval=$(obj).val();
   if(regular.test(objval)){
        return true;
   }else{
        return false;
   }
}
//手机或邮箱实时验证
function remoteCheckMobileEmail(obj,url,msg){
    var objval=$(obj).val();
    $.ajax({
            url:url,
            data:{name:objval},
            success:function(data){
                var data=$.parseJSON(data);
                if(data.status=="n"){
                   noPass(msg, obj);
                }else{
                    //输入手机时，出现图片验证码,邮箱则隐藏
                    if(RegCheck(obj,RegConfig.mobile)){
                        $(obj).attr("data-method","mobile").closest(".form-group").next().show();
                    }else{
                        $(obj).attr("data-method","email").closest(".form-group").next().hide();
                    }
                    pass(obj);
                }
            }
        });
}

//手机或邮箱实时验证
function remoteCheck(obj,url,msg){
    var objval=$(obj).val();
    $.ajax({
            dataType:"json",
            url:url,
            data:{name:objval},
            success:function(data){
                if(data.status=="y"){
                    noPass(msg,obj);
                }else{
                    pass(obj);
                }
            }
        });
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


//验证码
//验证码倒计时
$("#getcode").click(function(){
    /*
        上面邮箱/手机为空   按钮灰色无法点击
        上面图片验证码为空   
        邮箱/手机不正确    
        图片验证码不正确    
    */
    if($(this).closest(".form-group").prevAll(".pass").length!=2){
       // $(this).attr("disabled","disabled");
       $(this).css("background","#ddd");
       return false;
    }


    var iCount=60,
        $this=$(this),
        timer=null;
    var url='';
    if($this.val()=="获取验证码")
    {
        var mobile=$("#account").val();
        if(mobile)
        {
            url="http://www.ieduchina.com/register.html?do=mobilecode";
        }
        else
        {
            mobile=$("#mobile").val();
            url="http://www.ieduchina.com/index.php?m=member&c=index&a=complete&do=mobilecode";
        }   

        if(mobile=="")
        {
            return false;
        }
        
        var myreg=/^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/; 
        if(mobile.length !=11)
        {
            return false;
        }
        if(!myreg.test(mobile))
        {
            return false;
        }   
        
        $.post(url,{'mobile':mobile},function(data){
            if(data==0){$this.parent().find("label.error").html('验证码发送手机失败!');return false;}
            if(data==1){$this.parent().find("label.error").html('验证码已发送，请查看手机!');}  
            if(data==2){$this.parent().find("label.error").html('请更换手机号!');return false;}
            if(data==3){$this.parent().find("label.error").html('该手机今日发送已达到上限!');return false;}
        });
    } 
    var mobile=$("#account").val();
    if(mobile=="")
    {
        return false;
    }
    
    $(this).attr("disabled","disabled");
    $this.val(iCount+"s后重新发送"); 
    timer=setInterval(function(){
        iCount--;
        if(iCount==0){
            $this.val("获取验证码");
            clearInterval(timer); 
           $this.attr("disabled",false);
        }else{
           $this.val(iCount+"s后重新发送");      
        }
        
    },1000);
    
 });

//密码验证
function checkPwd(obj) {
    $(obj).blur(function() {
        if (checkEmpty(obj)) {
            noPass("请输入密码",obj);
        }else if(!RegCheck(obj,RegConfig.pwd)){
            noPass("支持6-20位数字、字母和标点符号",obj);
        }else{
            pass(obj);
        }
       
    });

}

//确认密码
function checkRePwd(obj) {
    $(obj).blur(function() {
        if (checkEmpty(obj)) {
            noPass("请再次输入密码",obj);
        }else if($("#pwd").val()!=$(obj).val()){
            noPass("您2次输入的密码不一致",obj);
        }else{
            pass(obj);
        }
    });
}
//感兴趣行业
function checkRePwd(obj) {
    $(obj).blur(function() {
        if (checkEmpty(obj)) {
            noPass("请再次输入密码",obj);
        }else if($("#pwd").val()!=$(obj).val()){
            noPass("您2次输入的密码不一致",obj);
        }else{
            pass(obj);
        }
       
    });

}

//申报奖项
function checkInterest(obj,msg) {
    if($(obj).text()==msg){
        var $msg = $('<span class="nopass"></span>');
        $(obj).addClass("error").closest(".pulldown-box").siblings(".nopass,.pass,.input-tips").remove();
        $msg.html(msg).appendTo($(obj).closest(".form-control"));
    }else{
         var $pass = $('<span class="pass"></span>');
        $(obj).remove("error").closest(".pulldown-box").siblings(".nopass,.pass,.input-tips").remove();
        $pass.appendTo($(obj).closest(".form-control"));
    }       
}



//全局正则配置
var RegConfig={
    'mobile':/^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/,
    'email':/^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/,
    'pwd':/^(?=[\w\W])[^*]{6,20}$/,
    'name':/^[\u4e00-\u9fa5A-Za-z]{1,20}$/,
    'companyname':/^[\u4e00-\u9fa5A-Za-z_-()（）]{4,50}$/
}

var valiate={
    regform:function(){
        $("#regForm .txt").blur(function(){
           var id=$(this).attr("id"),
               $this=$(this);
            //手机或邮箱验证：
            if(id=="account"){
                if (checkEmpty($this)) {
                    noPass("请输入邮箱或手机",$this);
                }else if(checkLength($this,50)){      
                    noPass("邮箱长度超过限定",$this);
                }else if(!(RegCheck($this,RegConfig.email)) && !(RegCheck($this,RegConfig.mobile))){
                    noPass("邮箱或手机格式不正确",$this);
                }else{
                    remoteCheckMobileEmail($this,"js/data.txt","该邮箱/手机已经存在，请更换或 <a href='#'>登录</a>");
                }
            }
            //图片验证码
            if(id=="img_code"){
                if (checkEmpty($this)) {
                    noPass("请输入验证码",$this);
                }else{
                    remoteCheck($this,'js/data.txt',"您输入的验证码有误");      
                }

            }
            //密码
            if(id=="pwd"){
                if (checkEmpty($this)) {
                    noPass("请输入密码",$this);
                }else if(RegCheck($this,RegConfig.pwd)){
                    noPass("支持6-20位数字、字母和标点符号",$this);
                }else{
                    pass($this);
                }

            }
            //确认密码
            if(id=="repwd"){
                if (checkEmpty($this)) {
                    noPass("请再次输入密码",$this);
                }else if($("#pwd").val()!=$($this).val()){
                    noPass("您2次输入的密码不一致",$this);
                }else{
                    pass($this);
                }
            }
        });

        //按钮提交 
        $("#regForm .btn-red").click(function(ev){
            $(".form-control .txt").trigger("blur");
            checkInterest("#jselect","您可以选择5个行业");
            if($(".form-control .error").length){
                return false;
            }else{
                //ajax表单提交
                var data=$("#regForm").serialize();
                ///registerUserUpdate.do
                $.getJSON('js/data1.txt',data,function(data){
                    if(data.status=="y"){
                        location.href="complete_info.html?method="+$("#account").data("method");
                    }
                });

                
            }
        });
    },
    //完善信息
    completeForm:function(){
        $("#completeForm .txt").blur(function(){
            var id=$(this).attr("id"),
               $this=$(this);
               console.log($this);
            //手机或邮箱验证：
            if(id=="name"){
                if (checkEmpty($this)) {
                    noPass("请输入中文或英文，限20个字",$this);
                }else if(!RegCheck($this,RegConfig.name)){
                    noPass("请输入中文或英文，限20个字",$this);
                }else{
                    pass($this);
                }   
            }
            if(id=="email"){
                if (checkEmpty($this)) {
                    noPass("请输入邮箱",$this);
                }else if(!RegCheck($this,RegConfig.email)){
                    noPass("邮箱格式不正确",$this);

                }else if(checkLength($this,50)){
                    noPass("邮箱长度超过限定",$this);
                }else{
                    remoteCheck($this,'js/data1.json',"该邮箱已经存在，请更换");
                }
            }
            if(id=="mobile"){
                if (checkEmpty($this) || !RegCheck($this,RegConfig.mobile)) {
                    noPass("请输入正确的11位手机号码",$this);
                }else{
                    pass($this);                
                }
            }
            if(id=="job"){
                if (checkEmpty($this) || !RegCheck($this,RegConfig.name)) {
                    noPass("请输入中英文，限20个字",$this);
                }else{
                    pass($this);                
                }
            }
            if(id=="nickname"){
                if (checkEmpty($this) || !RegCheck($this,RegConfig.name)) {
                    noPass("请输入中英文，限20个字",$this);
                }else{
                    pass($this);                
                }
            }
            //当用户从在线展、研讨会、直播产品进入注册时必填写
            if(id=="company_name"){
                if (checkEmpty($this) || !RegCheck($this,RegConfig.companyname)) {
                    noPass("中英文、数字、_、-、（）、（ ）组成，4-50个字",$this);
                }else{
                    pass($this);                
                }
            }





        });



    }
}

/* $("#regForm .txt").blur(function(){
            var id=$(this).attr("id"),
               $this=$(this);
            //手机或邮箱验证：
            if(id=="account"){
                
            }
        });*/


valiate.regform();
valiate.completeForm();




 $(".apply-award :checkbox").click(function() {
    validateAwards();
 });

function getApplyAward(){
    var awardVal=$("#apply-award input:checked").map(function(){
        return $(this).val();
    }).get().join(",");
    $("input[name=applyAward]").val(awardVal);
}








});



//获取地址栏参数
function getUrlKey(key) {
    var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) {
        return r[2];  //返回未解码的值
    }else {
        return null;
    }
}
