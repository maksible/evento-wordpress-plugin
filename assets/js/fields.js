/**
	NAME       : fields.js
	PURPOSE    : CLEANING WHITESPACES AND FRONTEND SECURITY CHECK
	ARGUMENT   : String;
	RETURNS    : CLEAN SECURE String;
	CREATED BY : MUHAMMAD
*/
jQuery(document).ready(function(){ 

	//var chkall = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9].{6,12}$/;
	//var chkall = /^.*(?=.{6,})(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
	var chkall = /^(?=.*\d+)(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z!@#$%]{6,15}$/;
	var test_username = /^[A-Za-z0-9_]{3,20}$/;
	var test_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	var test_password =  /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;
	
	/*var check = {
		name:{valid:test_username,msg:'Name must be 3 to 20 characters,no Space, no special characters allowed.'},
		email:{valid:test_email,msg:'Email must be 3 to 20 characters,no Space, no special characters allowed.'}
	};*/
	//alert(check.email.msg);
	//var name = {valid:ck_username,msg:'Name must be 3 to 20 characters,no Space, no special characters allowed.'};
	/*$('#firstname').keyup(function(){
		var username=$(this).val();
		if (!ck_username.test(username)) 
		{
			$(this).next().show().html("3 to 20 characters,no Space, no special characters");
			$("#submitr").attr('disabled','disabled');
		}
		else
		{
			$(this).next().hide();
			$("#submitr").attr('disabled',false);
		}
	});*/
	
	$.fn.checkIt = function(field,fieldtype,errmsg,errfield,disable){

		var val = $(this).val();
		var checkwith;
		var message;

		if( fieldtype == 'EMAIL' )
		{
			checkwith =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			message   = errmsg || 'Please enter valid email address';
		}
		if( fieldtype == 'PASS' )
		{
			checkwith =  checkwith = /^(?=.*\d+)(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z!@#$%]{6,15}$/; // 1Digit, 1A 1a required
			message   = errmsg || 'Must be 6 to 15 long atleast 1 digit, 1 lowercase and 1 uppercase latter.';
		}
		if ( fieldtype == 'NAME' ){
			checkwith = /^[A-Za-z0-9_]{3,20}$/;
			message   = errmsg || 'Please enter name, should be 3 to 20 characters long no space';
		}
		if ( fieldtype == 'C' ){
			checkwith = /^[A-Za-z_]{3,20}$/;
			message   = errmsg || 'Only 3 to 20 characters, no space';
		}
		/*if ( fieldtype == 'REQUIRED' ){
			checkwith = /^[\w ]{3,20}$/;
			
			message   = errmsg || 'Only 3 to 20 characters';
		}*/
		
		/*else{
			alert($(this).val());
			$(this).val(clean(val));
		}*/
		
		if(!checkwith.test(val)) 
		{
			//$('#'+errfield).slideDown().html(message);
			$('#InputErrorMsg').remove();
			$("<span id='InputErrorMsg' class='color-red'>"+message+"</span>").insertAfter($(this));

			$('form#' + disable).each(function() {
				$(this).find(':input, select, textarea').attr('disabled','disabled');
			});
			$(this).attr('disabled',false);
			$(this).focus();
		}
		else
		{
			//$('#'+errfield).slideUp().html(message);
			$('#InputErrorMsg').remove();
			$('form#' + disable).each(function(){
				$(this).find(':input, select, textarea').attr('disabled',false);
			});
		}
	
	};
	function clean(str){
		//alert('c');
        var str=str.replace(/^\s+|\s+$/,'').replace(/<script>.*<\/script>/g, "").replace(/</g, "&lt;").replace(/>/g, "&gt;") .replace(/\s{2,}/g, ' ').trim();
        return str;
    }
});