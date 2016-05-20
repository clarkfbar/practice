jQuery.extend(jQuery.validator.messages, {  
    required: "��ѡ�ֶ�",  
    remote: "���������ֶ�",  
    email: "��������ȷ��ʽ�ĵ����ʼ�",  
    url: "������Ϸ�����ַ",  
    date: "������Ϸ�������",  
    dateISO: "������Ϸ������� (ISO).",  
    number: "������Ϸ�������",  
    digits: "ֻ����������",  
    creditcard: "������Ϸ������ÿ���",  
    equalTo: "���ٴ�������ͬ��ֵ",  
    accept: "������ӵ�кϷ���׺�����ַ���",  
    maxlength: jQuery.validator.format("������һ����������� {0} ���ַ���"),  
    minlength: jQuery.validator.format("������һ������������ {0} ���ַ���"),  
    rangelength: jQuery.validator.format("������һ�����Ƚ��� {0} �� {1} ֮����ַ���"),  
    range: jQuery.validator.format("������һ������ {0} �� {1} ֮���ֵ"),  
    max: jQuery.validator.format("������һ�����Ϊ {0} ��ֵ"),  
    min: jQuery.validator.format("������һ����СΪ {0} ��ֵ")  
});  

$.validator.addMethod("usernameCheck", function(value, element){
  return /^[0-9a-z_A-Z]+$/.test(value);
}, "�û�����ʽ����");

$("form").validate({
    rules:{
        username:{                
            required:true,        //����������
            rangelength:[3,10],    //���������ֵ��3��10λ֮��,
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
        error.appendTo($(element).parent()); // �ŵ����һ��
      } else {
        $(element).after(error); // ���ڴ�����ĺ���
      }
    },
    submitHandler: function(form) {
      alert("��ϲ�㣬��֤ͨ���������Ҳ����ύ");
      return false;
    }
});