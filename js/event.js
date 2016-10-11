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
    showElement($("#display_dialog_btn"), Xht_dialog);
    showElement($("#display_dialog_btn"), $(".mask"));
    hideElement($(".Xht_dialog_content .Xht_btn"), Xht_dialog);
    hideElement($(".Xht_dialog_content .Xht_btn"), $(".mask"));

    /*点击关闭小图标隐藏对话框*/
    hideElement($(".Xht_dialog .close_icon"), Xht_dialog);
    hideElement($(".Xht_dialog .close_icon"), $(".mask"));

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


});