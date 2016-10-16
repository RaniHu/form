/**
 * Created by Administrator on 09/22/2016.
 */
$(function () {

    changeWidth();

    //当窗口大小改变时
    window.onresize = function () {
        changeWidth();
    };

    //当浏览器窗口大小改变时
    function changeWidth() {

        //input输入框的宽度
        var input_group_width = $(".Xht_inputgroup_li").width();                               //input外层盒子的宽度
        var label_width = $(".Xht_inputgroup_li label.Xht_label").width();                     //label标签的宽度
        $(".two_element_inline .Xht_inputwrap").width(input_group_width - label_width - 1);    //一行两个元素的input宽度


        //设置弹出框的位置(水平垂直居中)
        var clientW = $(window).width();                       //浏览器可是窗口宽度
        var clientH = $(window).height();                      //浏览器可是窗口高度
        var Xht_dialog = $(".Xht_dialog");
        var dialog_width = Xht_dialog.innerWidth();                 //弹出框的宽度
        var dialog_height = Xht_dialog.innerHeight();               //弹出框的高度
        Xht_dialog.css({
            'margin-top': (clientH - dialog_height) / 2,       //弹出框的负上边距=  (浏览器高度-对话框高度)/2
            'margin-left': (clientW - dialog_width) / 2        //弹出框的负左边距=  (浏览器宽度-对话框宽度)/2
        });
    }

    //点击按钮遮罩层和对话框弹出(pc端)
    var Xht_dialog = $(".Xht_dialog");
    var mask="<div class='mask'></div>";
    showElement($("#display_dialog_btn"), Xht_dialog);
    appendElement($("#display_dialog_btn"), mask);
    removeElement($(".Xht_dialog .Xht_btn"), mask);

    /*点击关闭小图标隐藏对话框*/
    hideElement($(".Xht_dialog .close_icon"), Xht_dialog);
    removeElement($(".Xht_dialog .close_icon"),$(".mask"));

    //隐藏元素
    function hideElement(clickObj, displayObj) {
        clickObj.click(function () {
            displayObj.hide();
        })
    }

    //显示元素
    function showElement(clickObj, displayObj) {
        clickObj.click(function () {
            displayObj.show();
        })
    }

    //追加元素
    function appendElement(clickObj, appendObj) {
        clickObj.click(function () {
            $(document.body).append(appendObj);
        })
    }
    //删除元素
    function removeElement(clickObj, removeObj) {
        clickObj.click(function () {
            removeObj.remove();
        })
    }


    //下拉框
    //点击小图标时，下拉框弹出
    $(".selectbox").click(function (e) {
        $(this).find(".select").slideToggle();
        $(".selectbox").toggleClass("open");
        e.stopPropagation();                            //阻止事件冒泡
    });
    //点击每个选项时
    $(".select li").click(function (e) {
        var _this = $(this);
        $("p").text(_this.text());
        $(".selectbox").removeClass("open");
        $(".select").css("display", "none");
        e.stopPropagation();
    });
    //点击页面空白处收起下拉框
    $(document).click(function () {
        $(".selectbox").removeClass("open");
        $(".select").css("display", "none");
    });



    //选项卡
    //点击每个选项，出现相应内容
    var Xht_tabs=$(".Xht_tabs");
    Xht_tabs.each(function(){
        var Xht_tabs_a=$(this).find(".Xht_tabs_menu li a");
        var Xht_tabs_content_detail=$(this).find(".Xht_tabs_content .content_detail");
        Xht_tabs_a.first().addClass("active");                              //给选项卡的第一项加上类名
        Xht_tabs_content_detail.first().show();                             //第一项内容显示
        $(this).find(".Xht_tabs_menu li").click(function(){
            var _this=$(this).index();
            $(this).find("a").addClass("active").parent().siblings().find("a").removeClass("active");
            Xht_tabs_content_detail.eq(_this).show().siblings().hide();
        })
    });
    //计算不同tab选项卡的长度
    $(".Xht_tabs_menu").each(function(){
        var num=$(this).find("li").size();        //获取选项菜单li标签的个数
        var li_width=100/num;
        $(this).find("li").width(li_width+'%');
    });



    //点击按钮弹出清除缓存
    $("#display_dialog_waiting").click(function () {
        $(".Xht_dialog.waiting").show();
       var time= setTimeout(function(){
            $(".Xht_dialog.waiting").hide();
            $(".Xht_dialog.waiting_over").show();
           clearTimeout(time);
       var time2=setTimeout(function(){
            $(".Xht_dialog.waiting_over").hide();
            clearTimeout(time2);
            },1000);

        },2000);


    });
    //关闭缓存框
    hideElement($("#close_dialog_waiting"),  $(".Xht_dialog.waiting_over"));


    //开关按钮
    //点击打开开关时 启动关闭开关
    $(".Xht_switch_on").click(function(){
        $(this).toggleClass("Xht_switch_close");
        $(this).find("i").animate({'margin-left':'-25'},200);
        $(this).toggleClass("Xht_switch_on");
    });
    //点击关闭开关时 启动开启开关
    $(".Xht_switch_close").click(function(){
        $(this).toggleClass("Xht_switch_on");
        $(this).find("i").animate({'margin-left':'0'},200);
        $(this).toggleClass("Xht_switch_close");
        $(this).toggleClass("switch_close_default");
    });
    //手指触摸屏幕
    var startX = 0;
    var endX = 0;
    document.addEventListener('touchstart', function (event) {
        startX = event.touches[0].pageX;
        event.stopPropagation();
    });
    //手指离开屏幕
    document.addEventListener('touchend', function (event) {
        endX = event.changedTouches[0].pageX;
        event.stopPropagation();
        var disX = endX - startX;
        if (Math.abs(disX) < 15) {
            return;
        }

        //当手指开始的地方距离屏幕左边3px以内 向右滑动
        if (startX<3&&disX > 15) {
            //点击打开开关时 启动关闭开关
            $(".Xht_switch_on").click(function(){
                $(this).toggleClass("Xht_switch_close");
                $(this).find("i").animate({'margin-left':'-25'},200);
                $(this).toggleClass("Xht_switch_on");
            });
            //点击关闭开关时 启动开启开关
            $(".Xht_switch_close").click(function(){
                $(this).toggleClass("Xht_switch_on");
                $(this).find("i").animate({'margin-left':'0'},200);
                $(this).toggleClass("Xht_switch_close");
                $(this).toggleClass("switch_close_default");
            });

            //侧边栏滑出
            side_menu_main.parent(".Xht_side_menu_wrapper").animate({'margin-left':0},150);

        }
    });

    //底部菜单
    var bottom_menu=$(".Xht_bottom_menu");
    //var bottom_menu_height=bottom_menu.height();
    var cancel_btn=$(".Xht_bottom_menu li.cancel");
    //点击按钮时,尾部追加遮罩层,底部菜单滑出
    $("#display_bottom_menu").click(function(e){
        bottom_menu.each(function(){
            $(this).animate({'bottom':0},100);
            $(document.body).append(mask);
            e.stopPropagation();
        });

    });

    //点击取消按钮，底部菜单滑出
    cancel_btn.click(function(){
        bottom_menu.each(function(){
            var bottom_menu_height=$(this).height();
            $(this).animate({'bottom':-bottom_menu_height},100);
        });
    });

    //点击任意位置，底部菜单滑出、删除遮罩层
    $(document.body).click(function(){
        bottom_menu.each(function(){
            var bottom_menu_height=$(this).height();
            $(this).animate({'bottom':-bottom_menu_height},100);
        });
        $(".mask").remove();

    });

    //侧滑菜单
    //菜单高度等于屏幕高度
        var clientW = $(window).width();                            //浏览器可视窗口宽度
        var clientH = $(window).height();                           //浏览器可视窗口高度
        var side_menu=$(".Xht_side_menu");                          //侧边菜单
        var side_menu_main=$(".Xht_side_menu_wrapper .main");       //主要页面内容
        var open_icon=side_menu_main.find("i.open_icon");           //展开图标
        side_menu.width(clientW*0.8);                               //侧边菜单等于屏幕宽度的80%
        side_menu.height(clientH);                                  //侧边菜单高度等于屏幕高度
        side_menu_main.width(clientW);                              //主要内容页面宽度等于屏幕宽度

        //点击展开按钮，侧边菜单滑出
        open_icon.click(function(e){
            side_menu_main.parent(".Xht_side_menu_wrapper").animate({'margin-left':0},150);
            e.stopPropagation();                                    //阻止事件冒泡
        });
        //点击主页面任意位置，侧边栏回到原始位置
        side_menu_main.click(function(){
            side_menu_main.parent(".Xht_side_menu_wrapper").animate({'margin-left':'-80%'},150);
        });







    //验证
    //注册验证
    var username = $("input#name");                           //真实姓名
    var email = $("input#email");                             //邮箱
    var pwd1 = $("input#pwd1");                               //初次密码
    var pwd2 = $("input#pwd2");                               //确认密码
    var msg = $("div.msg");                                   //提示框
    var msgTxt = $(".msg .msgTxt");                           //提示文字
    var msgIcon = $(".msg .msg-icon");                        //错误提示图标
    var correctIcon = $(".input-filed .correct-icon");        //正确提示图标

    //提示信息
    function prompt() {
        msg.slideDown(500);
        msgIcon.attr("src", "../img/validate_prompt_icon.png");
    }
    //错误信息
    function error(obj) {
        msg.slideDown(500);
        msgIcon.attr("src", "../img/validate_error_icon.png");
        obj.css("border", "1px red solid");

    }
    //正确信息
    function correct(obj) {
        msg.slideUp(500);
        obj.css("border", "1px silver solid");

    }


    //用户名验证
    //得到焦点
    username.focus(function () {
        prompt();
        msgTxt.html("真实姓名必须为2-4个中文字符");
    });

    //失去焦点
    username.blur(function () {
        //真实姓名为空
        if (username.val() == "") {
            error(username);
            msgTxt.html("真实姓名不能为空");
            correctIcon.css("display","none");

        }
        //真实姓名不是中文
        else if (nameReg.test(username.val())) {
            error(username);
            msgTxt.html("含有非法字符");
            correctIcon.css("display","none");

        }
        //姓名长度超过4位或小于2位
        else if (getLength(username.val()) > 8 || getLength(username.val()) < 4) {
            error(username);
            msgTxt.html("真实姓名长度应为2-4个字符");
            correctIcon.css("display","none");

        }
        //输入合法
        else {
            correct(username);
            correctIcon.eq(0).attr("src", "../img/validate_correct_icon.png");
            correctIcon.css("display","block");

        }

    });


    //邮箱验证
    //纯数字，纯字母，带下划线_，带点.，带连接线-,邮箱域至少一个.和两个单词，不得特殊字符开头
    //失去焦点
    email.blur(function () {
        var emailOk = emailReg.test($(this).val());
        //邮箱为空
        if (email.val() == "") {
            error(email);
            msgTxt.html("邮箱不能为空");
            correctIcon.css("display","none");

        }
        //邮箱格式错误
        else if (!emailOk) {
            error(email);
            msgTxt.html("请输入有效的邮箱");
            correctIcon.css("display","none");

        }
        //邮箱正确
        else {
            correct(email);
            correctIcon.eq(1).attr("src", "../img/validate_correct_icon.png");
            correctIcon.css("display","block");

        }
    });


    //密码验证
    //离开键盘
    pwd1.keyup(function () {
        prompt();
        msgTxt.html("6至16个字符,大小写字母和数字组成");
    });

    //失去焦点
    pwd1.blur(function () {
        //密码为空
        if (pwd1.val() == "") {
            error(pwd1);
            msgTxt.html("密码不能为空");
            correctIcon.css("display","none");

        }
        //密码不符合大小写加数字
        else if (pwdReg.test(pwd1.val())) {
            error(pwd1);
            msgTxt.html("密码应由大写、小写字母和数字组成");
            correctIcon.css("display","none");

        }
        //密码不能全为数字
        else if (regN.test(pwd1.val())) {
            error(pwd1);
            msgTxt.html("密码不能全为数字");
            correctIcon.css("display","none");

        }
        //密码不能全为字母
        else if (regL.test(pwd1.val())) {
            error(pwd1);
            msgTxt.html("密码不能全为字母");
            correctIcon.css("display","none");

        }
        //密码不能包含中文
        else if (chineseReg.test(pwd1.val())) {
            error(pwd1);
            msgTxt.html("密码不能使用中文字符");
        }
        //密码长度少于6位或超过16位
        else if (getLength(pwd1.val()) > 16 || getLength(pwd1.val()) < 6) {
            error(pwd1);
            msgTxt.html("密码长度应在6-16位之间");
            correctIcon.css("display","none");

        }
        //密码正确
        else {
            correct(pwd1);
            correctIcon.eq(2).attr("src", "../img/validate_correct_icon.png");
            correctIcon.css("display","block");

        }

    });


    //再次确认密码
    //失去焦点
    pwd2.blur(function () {
        //两次密码不一致
        if (pwd2.val() != pwd1.val()) {
            error(pwd2);
            msgTxt.html("两次密码不一致");
            correctIcon.css("display","none");

        }
        //密码长度少于6位或超过16位/密码为空
        else if (getLength(pwd2.val()) > 16 || getLength(pwd2.val()) < 6||pwd2.val()=="") {
            error(pwd2);
            msgTxt.html("密码长度应在6-16位之间");
            correctIcon.css("display","none");
        }
        else if(regN.test(pwd2.val())||regL.test(pwd2.val())||chineseReg.test(pwd2.val())){
            error(pwd2);
            msgTxt.html("密码不能相同");
            correctIcon.css("display","none");
        }

        //输入正确
        else {
            correct(pwd2);
            correctIcon.eq(3).attr("src", "../img/validate_correct_icon.png");
            correctIcon.css("display","block");

        }
    });

});

//获取双字节的字符长度
function getLength(str) {
    return str.replace(/[^\x00-\xff]/g, "xx").length;                                         // \x00-xff代表单字节字符。
}

var nameReg = /[^\u4e00-\u9fa5]/g;                                                            //用户名为非中文的正则表达式
var emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;     //正确邮箱正则表达式
var chineseReg = /[\u4e00-\u9fa5]/g;                       //密码为中文的正则表达式;
var pwdReg = /[^A-Za-z0-9]/g;                              //密码不是大小写字母加数字的正则表达式
var regL = /^[a-zA-Z]+$/g;                                 //密码为纯字母的正则表达式
var regN = /^[0-9]+$/g;

//提交表单时检查
function checkForm(){
    var username = $("input#name");                           //真实姓名
    var email = $("input#email");                             //邮箱
    var pwd1 = $("input#pwd1");                               //初次密码
    var pwd2 = $("input#pwd2");                               //确认密码
    var msg = $("div.msg");                                   //提示框
    var emailOk = emailReg.test(email.val());
    if(username.val()==""||nameReg.test(username.val())||getLength(username.val()) > 8 || getLength(username.val()) < 4){
        username.css("border", "1px red solid");
        return false;
    }
    if(email.val()==""||!emailOk){
        email.css("border", "1px red solid");
        return false;
    }
    if(pwd1.val()==""||getLength(pwd1.val()) > 16 || getLength(pwd1.val()) < 6||pwdReg.test(pwd1.val())||regN.test(pwd1.val())||regL.test(pwd1.val())||chineseReg.test(pwd1.val())){
        pwd1.css("border", "1px red solid");
        return false;
    }
    if(pwd2.val()==""||pwd2.val() != pwd1.val()||getLength(pwd2.val()) > 16 || getLength(pwd2.val()) < 6||pwdReg.test(pwd2.val())||regN.test(pwd2.val())||regL.test(pwd2.val())||chineseReg.test(pwd2.val())){
        pwd2.css("border", "1px red solid");
        return false;
    }
}
