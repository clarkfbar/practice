jQuery.extend(jQuery.validator.messages, {  
    required: "必选字段",  
    remote: "请修正该字段",  
    email: "请输入正确格式的电子邮件",  
    url: "请输入合法的网址",  
    date: "请输入合法的日期",  
    dateISO: "请输入合法的日期 (ISO).",  
    number: "请输入合法的数字",  
    digits: "只能输入整数",  
    creditcard: "请输入合法的信用卡号",  
    equalTo: "请再次输入相同的值",  
    accept: "请输入拥有合法后缀名的字符串",  
    maxlength: jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),  
    minlength: jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),  
    rangelength: jQuery.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),  
    range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),  
    max: jQuery.validator.format("请输入一个最大为 {0} 的值"),  
    min: jQuery.validator.format("请输入一个最小为 {0} 的值")  
});  

$.validator.addMethod("usernameCheck", function(value, element){
  return /^[0-9a-z_A-Z]+$/.test(value);
}, "用户名格式错误");

$("form").validate({
    rules:{
        username:{                
            required:true,        //开启必填项
            rangelength:[3,10],    //请输入的数值在3至10位之间,
            usernameCheck: true
        },
        password:{                
            required:true
        },
        repassword:{                
            required:true,
            equalTo: ".password"
        },
        checkbox: {
            required: true
        }
    },
    errorPlacement: function(error, element) {
      if($(element).is("input[type='checkbox']")) {
        error.appendTo($(element).parent()); // 放到最后一个
      } else {
        $(element).after(error); // 放在错误域的后面
      }
    },
    submitHandler: function(form) {
      alert("恭喜你，验证通过，不过我不想提交");
      return false;
    }
});