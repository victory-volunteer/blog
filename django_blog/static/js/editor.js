
	var simplemde = new SimpleMDE({
		element: document.getElementById("comment-form"),
		autoDownloadFontAwesome:false,
		insertTexts: {
		horizontalRule: ["", "\n\n-----\n\n"],
		image: ["![图片Alt](https://", ")"],
		link: ["[链接描述](https://", ")"],
		table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
	    },
		toolbar: [{
			name: "bold",
			action: SimpleMDE.toggleBold,
			className: "fa fa-bold",
			title: "粗体",
			"default": !0
		}, {
			name: "italic",
			action: SimpleMDE.toggleItalic,
			className: "fa fa-italic",
			title: "斜体",
			"default": !0
		}, {
			name: "quote",
			action: SimpleMDE.toggleBlockquote,
			className: "fa fa-quote-left",
			title: "引用",
			"default": !0
		}, {
			name: "code",
			action: SimpleMDE.toggleCodeBlock,
			className: "fa fa-code",
			title: "代码"
		}, {
			name: "link",
			action: SimpleMDE.drawLink,
			className: "fa fa-link",
			title: "插入链接",
			"default": !0
		}, {
			name: "image",
			action: SimpleMDE.drawImage,
			className: "fa fa-picture-o",
			title: "插入图片",
			"default": !0
		}, {
			name: "table",
			action: SimpleMDE.drawTable,
			className: "fa fa-table",
			title: "插入表格"
		}, {
			name: "preview",
			action: SimpleMDE.togglePreview,
			className: "fa fa-eye no-disable",
			title: "预览",
			"default": !0
		}]
	});
	$(".editor-statusbar").append("<span class='float-left text-info ml-0 hidden' id='rep-to'></span>");
	$("#editor-footer").append("<button type='button' class='btn btn-danger btn-sm float-right mr-4 f-16 hidden' id='no-rep'>取消回复</button>");

	var emoji_tag = $("#comment-smilies img");
	emoji_tag.click(function() {
		var e = ':' + $(this).data('simle') + ':';
		simplemde.value(simplemde.value()+e);
	});

//    点击回复
	$(".rep-btn").click(function(){
	    simplemde.value('');
	    var u = $(this).data('repuser');
	    var i = $(this).data('repid');
	    sessionStorage.setItem('rep_id',i);
	    $("#rep-to").text("回复 @"+u).removeClass('hidden');
		$("#no-rep").removeClass('hidden');
		$(".rep-btn").css("color", "#868e96");
		$(this).css("color", "red");
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 55
		}, 500);
	});

//    点击取消回复
	$("#no-rep").click(function(){
	    simplemde.value('');
	    sessionStorage.removeItem('rep_id');
	    $("#rep-to").text('').addClass('hidden');
		$("#no-rep").addClass('hidden');
		$(".rep-btn").css("color", "#868e96");
	});

//    点击提交评论
    $("#push-com").click(function() {
        var content = simplemde.value();
        var username = $("#username01").val()
		var email = $("#email01").val()
		var article_id = $(this).data('article-id');
		if (username.length==0 || email.length==0){
			alert("请完善信息！");
            return;
		}
		if(username.length<1 || username.length>5) {
			alert("用户昵称请保持在1~5个字符！");
			return;
		}
		var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if( reg.test(email)){
			console.log();
		}else{
			alert("邮箱格式不正确");
			return
		}
        if (content.length == 0) {
            alert("评论内容不能为空！");
            return;
        }

        // var start = sessionStorage.getItem('start');
        // var current = Date.parse(new Date());
        // if (start) {
        //     var tt = current - start;
        //     if (tt < 4000) {
        //         alert('两次评论时间间隔必须大于40秒，还需等待' + (40 - parseInt(tt / 1000)) + '秒');
        //         return;
        //     } else {
        //         sessionStorage.setItem('start', current);
        //     }
        // } else {
        //     sessionStorage.setItem('start', current)
        // };

        // var csrf = $(this).data('csrf');
        // var URL = $(this).data('ajax-url');
        // var rep_id = sessionStorage.getItem('rep_id');
        // $.ajaxSetup({
        //     data: {
        //         'csrfmiddlewaretoken': csrf
        //     }
        // });

		// alert("初步成功");
        $.ajax({
            type: 'post',
            url: "/blog/comment/",
            data:
                {
				'username':username,
				'email':email,
                // 'rep_id': rep_id,
                'content': content,
                'article_id': article_id,
                 },
            dataType: 'json',
			beforeSend: function(xhr, settings) {
                          xhr.setRequestHeader("X-CSRFToken", "{{ csrf_token }}");
                        },
            success: function(ret) {
            	alert(ret.msg);
            	// alert("提交成功");
                simplemde.value('');
                var username = $("#username01").val('');
				var email = $("#email01").val('');
                // sessionStorage.removeItem('rep_id');
                // sessionStorage.setItem('new_point', ret.new_point);
                window.location.reload();
            },
            error: function(ret) {
                alert("评论提交失败");
            }
        });
    });

//    提交评论后定位到新评论处
    if(sessionStorage.getItem('new_point')){
        var top = $(sessionStorage.getItem('new_point')).offset().top-100;
        $('body,html').animate({scrollTop:top}, 200);
        current=window.location.href;
        if (current.indexOf('#')==-1){
        	current=current.slice(0,current.length-1)
		}
        else {
        	current=current.replace(new RegExp("/#.*",'g'),'')+sessionStorage.getItem('new_point');
		}
        window.location.href=current;
        // window.location.hash = sessionStorage.getItem('new_point');
        sessionStorage.removeItem('new_point');
    };
    sessionStorage.removeItem('rep_id');

    $(".comment-body a").attr("target","_blank");