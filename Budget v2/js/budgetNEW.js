// BudgetNEW.js

/*-- GLOBAL VARIABLES ------------------------------------------------------------------------*/

var formErrors = false;
var numKeyCodes = {96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9"};
var numKeyExclude = [13, 9, 32];
var userid = "1234567890";
var formCalHover = false;
var calHover = false;
var shiftDown = false;

var homepage = "/indexNEW.php";




/*-- ON PAGE LOAD ---------------------------------------------------------------------------*/

$(document).ready(function() {

	initData();
	initClickEvents();
	initKeyPressEvents();

	$("#overlay-back").hide();
	$("#overlay-back-sub").hide();
	$(".form-new-cat-cont").find("input").addClass("disabled");

	//Will need to update based on query string
	$(".account").first().trigger('click');

});




/*-- FUNCTIONS -----------------------------------------------------------------------------*/


/*----------------- INIT FUNCTIONS -----------------*/

function initClickEvents() {
	$(".nav-expander").unbind('click').click(function() {
		var navWidth = $("#nav-cont").outerWidth();
		var infoWidth = $("#info-cont").outerWidth();

		if (mobileCheck()) { navWidth = 0; }
		
		if ($("#info-cont").position().left > -infoWidth) {
			closeInfo();
		}
		else {
			$("#info-cont").css("left", navWidth);

			if (mobileCheck()) {
				$("#overlay-back-sub").show();
				$("#overlay-back-sub").css("opacity", "0.6");
			}
		}
	});

	$(".info-close").unbind('click').click(function() {
		closeInfo();
	});	
	


	/*-- Controls --*/
	$(".control-add-account").unbind('click').click(function() {
		showForm("account-add");
	});

	$(".control-add-category").unbind('click').click(function() {
		showForm("category-add");
	});

	$(".control-add-expense").unbind('click').click(function() {
		showForm("expense-add");
	});

	$(".control-transfer").unbind('click').click(function() {
		showForm("transfer");
	});



	/*-- Accounts --*/
	$(".account").unbind('click').click(function() {
		$(".account").removeClass("account-active");
		$(this).addClass("account-active");
		$(".account-balance").css("right", "-27px");
		$(this).find($(".account-balance")).css("right", "0px");

		$(".category").removeClass("category-active");
		$(".category-budget").css("right", "-27px");
		$(".category").css("height", "25px");

		loadAccountExpenses($(this).attr("accountid"));
	});

	$(".account-edit").unbind('click').click(function() {
		var $account = $(this).closest($(".account"));
		showForm("account-edit", $account);
	});

	

	/*-- Categories --*/
	$(".category").unbind('click').click(function() {
		$(".category").removeClass("category-active");
		$(this).addClass("category-active");
		$(".category-budget").css("right", "-27px");
		$(this).find($(".category-budget")).css("right", "0px");
		$(".category").css("height", "25px");
		$(this).css("height", "70px");

		$(".account").removeClass("account-active");
		$(".account-balance").css("right", "-27px");

		loadCategoryExpenses($(this).attr("categoryid"));
	});

	$(".category-edit").unbind('click').click(function() {
		var $category = $(this).closest($(".category"));
		showForm("category-edit", $category);
	});




	/*-- Expenses --*/
	$(".expense").unbind('click').click(function() {
		if (!$(this).find($(".exp-col-delete")).is(":hover")){
			showForm("expense-edit", $(this));
		}
	});

	$(".exp-delete-checkbox-all").unbind('click').click(function() {
		if ($(this).is(":checked")) {
			$(".expense").each(function() {
				$(this).addClass("expense-selected");
				$(this).find($(".exp-delete-checkbox")).prop("checked", true);
			});
		}
		else {
			$(".expense").removeClass("expense-selected");
			$(".exp-delete-checkbox").prop("checked", false);
		}
	});

	$(".exp-delete-checkbox").unbind('click').click(function() {
		var $expense = $(this).closest($(".expense"));

		if ($(this).prop("checked")) {
			$expense.addClass("expense-selected");
		}
		else {
			$expense.removeClass("expense-selected");
		}
	});

	$(".exp-col-delete").unbind('click').click(function() {
		$checkbox = $(this).find("input[type=checkbox]");

		if (!$checkbox.is(":hover")) $checkbox.trigger('click');
	});




	/*-- FORMS --*/
	$(".form-button-cancel").unbind('click').click(function() {
		closeForms();
	});

	$(".form-button-submit").unbind('click').click(function() {
		submitForm();
	});

	$(".form-button-new-cat").unbind('click').click(function() {
		var $box = $(this).parent().find($(".form-new-cat-box"));

		if ($box.height() <= 0) { //-> Open
			$box.css("height","220px");
			$box.css("margin-top","-47px");
			$(this).val("Use Existing Category");
			$box.find("input:first").select();
			$box.find("input").removeClass("disabled");
			$box.find(".form-input").prop("tabindex", "0");
			$box.closest($(".form")).find($(".form-category")).prop("tabindex", "-1");
			$box.closest($(".form")).find($(".form-category")).addClass("disabled");
			$box.find($(".form-new-cat-create")).val("true");
		}
		else { //-> Close
			$box.css("height", "0px");
			$box.css("margin-top", "0px");
			$(this).val("Create New Category");
			$box.closest($(".form")).find($(".form-category")).focus();
			$box.find("input").addClass("disabled");
			$box.find(".form-input").prop("tabindex", "-1");
			$box.closest($(".form")).find($(".form-category")).prop("tabindex", 0);
			$box.closest($(".form")).find($(".form-category")).removeClass("disabled");
			$box.find($(".form-new-cat-create")).val("false");
		}
	});

	$(".form input").change(function() {
		checkFormErrors();
	});

	$(".form-input-reset").unbind('click').click(function() {
		var $input = $(this).parent().find($(".form-input"));

		if ($input.hasClass("form-number")) {
			$input.val("0.00");
			$input.attr("value", "");
		}
		else if ($input.hasClass("form-date")) {
			$input.val("__/__/__");
			$input.attr("value", "");
			//$input.val("");
		}
		else {
			$input.val("");
		}
		
		$input.focus();
		checkFormErrors();
	});

	$(".form-close").unbind('click').click(function() {
		closeForms();
	});

	


	$(".form-cal").unbind('click').click(function() {
		if ($("#cal-cont").length == 0) {
			showCal($(this).prev());
		}
		else {
			calCancel();
		}
	});
	
	$(".form-cal").hover(function() { formCalHover = true; }, function() { formCalHover = false; });
	$("#cal-cont").hover(function() { calHover = true; }, function() { calHover = false; });


	$("#overlay-back").unbind('click').click(function() {
		closeForms();
	});

	$("#overlay-back-sub").unbind('click').click(function() {
		closeInfo();
	});
	
	$("html").unbind('click').click(function(e) {
		if (!$("#info-cont").is(":hover")) {
			var infoWidth = $("#info-cont").outerWidth();

			if (mobileCheck()) {
				if ($("#info-cont").position().left > -infoWidth) {
					$("#info-cont").css("left", -infoWidth);
				}
			}
		}

		if (!calHover && !formCalHover && $("#cal-cont").length > 0) {
			calCancel();
		}
	});

}






function initKeyPressEvents() {
	$(".form-number").keydown(function(e) {
		e.preventDefault();
		var $input = $(this);
		var char = String.fromCharCode(e.keyCode);
		var value = $input.attr("value");
		var valString;


		if (e.keyCode == 9 && !shiftDown) { //Tab
			$input.closest(".form-item").next(".form-item").find(".form-input").focus().select();
		}
		else if (e.keyCode == 9 && shiftDown) { //Shift + Tab
			$input.closest(".form-item").prev(".form-item").find(".form-input").focus().select();
		}


		if (e.keyCode >= 96 && e.keyCode <= 105) { //Numpad
			char = numKeyCodes[e.keyCode];
		}

		if (e.keyCode == 8) { //Backspace
			if (value.length > 0) {
				value = value.substring(0, value.length - 1); 
			}	
		}
		else if (!isNaN(char) && !numKeyExclude.includes(e.keyCode)) {
			value += "" + char;
		}

		//Formatting
		if (value.length == 0) {
			valString = "0.00";
		}
		else if (value.length == 1) {
			valString = "0.0" + value;
		}
		else if (value.length == 2) {
			valString = "0." + value;
		}
		else {
			valString = value.substr(0, value.length - 2) + "." + value.substr(value.length - 2);
			var count = 1;

			if (value.length > 5) {
				for (i=value.length - 3; i>0; i--) {
					if (count%3 == 0) {
						valString = valString.substr(0, i) + ',' + valString.substr(i, valString.length);
					}

					count ++;
				}
			}
		}

		$input.val(valString);
		$input.attr("value", value);
	});

	$(".form-date").keydown(function(e) {
		e.preventDefault();
		var $input = $(this);
		var char = String.fromCharCode(e.keyCode);
		var value = $input.attr("value");
		var valString;

		if (e.keyCode == 9 && !shiftDown) { //Tab
			$input.closest(".form-item").next(".form-item").find(".form-input").focus().select();
		}
		else if (e.keyCode == 9 && shiftDown) { //Shift + Tab
			$input.closest(".form-item").prev(".form-item").find(".form-input").focus().select();
		}


		if (e.keyCode >= 96 && e.keyCode <= 105) { //Numpad
			char = numKeyCodes[e.keyCode];
		}

		if (e.keyCode == 8) { //Backspace
			if (value.length > 0) {
				value = value.substring(0, value.length - 1); 
			}	
		}
		else if (!isNaN(char) && !numKeyExclude.includes(e.keyCode) && value.length < 6) {
			value += "" + char;
		}

		//Formatting
		switch (value.length) {
			case 0:
				valString = "__/__/__";
				break;

			case 1:
				valString = value + "_/__/__";
				break;

			case 2:
				valString = value + "/__/__";
				break;

			case 3:
				valString = value.substring(0, 2) + "/" + value.substring(2, 3) + "_/__";
				break;

			case 4:
				valString = value.substring(0, 2) + "/" + value.substring(2, 4) + "/__";
				break;

			case 5:
				valString = value.substring(0, 2) + "/" + value.substring(2, 4) + "/" + value.substring(4, 5) + "_";
				break;

			default:
				valString = value.substring(0, 2) + "/" + value.substring(2, 4) + "/" + value.substring(4, 6) + "";
				break;
		}

		$input.val(valString);
		$input.attr("value", value);
		checkFormErrors();
	});

	$("html").keydown(function(e) {
		if (e.keyCode == 40) {
			showNotification("green", "Test Notification");
		} 

		if (e.keyCode == 16) {
			shiftDown = true;
		}
	});

	$("html").keyup(function(e) {
		if (e.keyCode == 16) {
			shiftDown = false;
		}
	});
}




function initData() {
	loadAccounts();
	loadCategories();
}



function loadAccounts() {
	var file = "load_accounts.php";
	var type = "GET";
	var data = {userid: userid};

	var submit = ajax(file, type, data);
	if (submit) {
		//Empty, then append accounts to account container
	}
}

function loadCategories() {
	var file = "load_categories.php";
	var type = "GET";
	var data = {userid: userid};

	var submit = ajax(file, type, data);
	if (submit) {
		//Empty, then append categories to account container
	}

}

function loadAccountExpenses(accountid) {
	var file = "load_account_expenses.php";
	var type = "GET";
	var data = {userid: userid, accountid: accountid};

	var submit = ajax(file, type, data);
	if (submit) {
		//Empty, then append expenses to expenses container
	}
}

function loadCategoryExpenses(categoryid) {
	var file = "load_category_expenses.php";
	var type = "GET";
	var data = {userid: userid, categoryid: categoryid};

	var submit = ajax(file, type, data);
	if (submit) {
		//Empty, then append expenses to expenses container
	}
}



/*----------------- MISC. FUNCTIONS -----------------*/

function ajax(file, type, data) {
	/*
	$.ajax({
		url: "/php/" + file,
		type: type,
		async: false,
		data: data,
    	failure: function(data){
    		alert("Operation failed: " + file + ", " + type);
    		return false;
    	},
    	success: function(data){
			return data;
    	}
	});
	*/

	return true;
}

function showForm(type, $link = false, ) {
	var formWidth = $("#form-cont").outerWidth();
	var $form = false;

	if (parseInt($("#form-cont").css("right")) < 0) {
		$(".form").hide()
		$(".form").removeClass("form-active");
		$("#form-cont").css("right", 0);
		$("#overlay-back").show();
		$("#overlay-back").css("opacity", "0.6");

		if (mobileCheck()) { closeInfo(); }

		switch (type) {
			case "expense-add":
				$form = $("#form-expense");
				$form.find($(".form-title")).html("Add Expense");
				$form.find($(".form-date")).val(currentDate());
				$form.find($(".form-date")).attr("value", currentDate().split("/").join(""));
				$form.find($(".form-description")).val("Misc");
				$form.find($(".form-number")).val("0.00");
				$form.find($(".form-category")).val($form.find($(".form-category option:first")).val());
				break;

			case "expense-edit":
				$form = $("#form-expense");
				$form.find($(".form-title")).html("Edit Expense");
				$form.find($(".form-date")).val($link.find($(".exp-col-date")).html());
				$form.find($(".form-date")).attr("value", ($link.find($(".exp-col-date")).html()).split("/").join(""));
				$form.find($(".form-description")).val($link.find($(".exp-col-desc")).html());
				$form.find($(".form-amount")).val($link.find($(".exp-col-amount")).html().replace('$',''));
				$form.find($(".form-amount")).attr("value", $link.find($(".exp-col-amount")).html().replace('.', '').replace('$', ''));
				$form.find($(".form-cat-budget")).val("0.00");
				$form.find($(".form-category")).val($link.find($(".exp-col-cat")).attr("categoryid"));
				break;

			case "account-add":
				$form = $("#form-account");
				$form.find($(".form-title")).html("Add Account");
				$form.find($(".form-name")).val("New Account");
				$form.find($(".form-button-delete")).hide();
				break;

			case "account-edit":
				$form = $("#form-account");
				$form.find($(".form-title")).html("Edit Account");
				$form.find($(".form-name")).val($link.find($(".account-name")).html());
				$form.find($(".form-button-delete")).show();
				break;

			case "category-add":
				$form = $("#form-category");
				$form.find($(".form-title")).html("Add Category");
				$form.find($(".form-name")).val("New Category");
				$form.find($(".form-budget")).val("0.00");
				$form.find($(".form-cat-type")).val(0);
				$form.find($(".form-button-delete")).hide();
				break;

			case "category-edit":
				$form = $("#form-category");
				$form.find($(".form-title")).html("Edit Category");
				$form.find($(".form-name")).val($link.find($(".category-name")).html());
				$form.find($(".form-budget")).val($link.find($(".category-budget-value")).html());
				$form.find($(".form-cat-type")).val($link.attr("type"));
				$form.find($(".form-button-delete")).show();
				break;

			case "transfer":
				$form = $("#form-transfer");
				$form.find($(".form-title")).html("Transfer Funds");
				$form.find($(".form-number")).val("0.00");
				break;

			default:
				break;
		}

		if ($form) {
			$form.show();
			$form.find(".form-item:first .form-input:first").focus(); //.select();
			$form.attr("type", type);
			$form.addClass("form-active");
		} 
	}
}

function submitForm() {
	if (checkFormErrors() == false) {
		var $form = $(".form-active");
		var formType = $form.attr("type");
		var complete = function(){};
		var submit = false;
		var file, type;

		$form.find($(".form-userid")).val(userid);

		if ($form.find($(".form-date")).length > 0 ) {
			$form.find($(".form-date")).each(function() {
				$(this).val(formatDate($(this).val(), "-"));
			});
		}

		if ($form.find($(".form-number")).length > 0) {
			$form.find($(".form-number")).each(function() {
				$(this).val($(this).val().split(",").join(""));
			});
		}

		var data = $form.serialize();
		console.log(data);

		switch (formType) {
			case "expense-add":
				file = "insert_expense.php";
				type = "POST";
				//data = $form.serialize();
				complete = function() {
					console.log("Success Adding Expense");
					showNotification("green", "Expense added successfully");
				};
				break;

			case "expense-edit":
				file = "";
				type = "POST";
				//data = $form.serialize();
				complete = function() {
					console.log("Success Editing Expense");
					showNotification("green", "Expense updated successfully");
				};
				break;

			case "account-add":
				file = "";
				type = "POST";
				//data = $form.serialize();
				complete = function() {
					console.log("Success Adding Account");
					showNotification("green", "Account added successfully");
				};
				break;

			case "account-edit":
				file = "";
				type = "POST";
				//data = $form.serialize();
				complete = function() {
					console.log("Success Editing Account");
					showNotification("green", "Account updated successfully");
				};
				break;

			case "category-add":
				file = "";
				type = "POST";
				//data = $form.serialize();
				complete = function() {
					console.log("Success Adding Category");
					showNotification("green", "Category added successfully");
				};
				break;

			case "category-edit":
				file = "";
				type = "POST";
				//data = $form.serialize();
				complete = function() {
					console.log("Success Editing Category");
					showNotification("green", "Category updated successfully");
				};
				break;

			case "transfer":
				file = "";
				type = "POST";
				//data = $form.serialize();
				complete = function() {
					console.log("Success Transferring Funds");
					showNotification("green", "Transfer completed successfully");
				};
				break;

			default: 
				break;
		}

		submit = ajax(file, type, data);
		if (submit) { 
			closeForms();
			complete(); 
		}
		else {
			showNotification("red", "Something went wrong and this process could not complete.");
		}

	}
	else {
		showNotification("red", "Please correct the errors below before proceeding");
	}
}

function checkFormErrors() {
	var $form = $(".form-active");
	formErrors = false;

	$form.find($(".form-input")).each(function() {
		var error = $(this).parent().find($(".form-error"));

		if (!$(this).hasClass("disabled")) {

			if ($(this).hasClass("form-date")) {
				if ($(this).val().length == 0  || !formatDate($(this).val()) ) {
					error.css("height","20px");
					$(this).addClass("form-error-outline");
					formErrors = true;
				}
				else {
					error.css("height", "0px");
					$(this).removeClass("form-error-outline");
				}
			}
			else if ($(this).hasClass("form-text")) {
				if ($(this).val().length == 0) {
					error.css("height","20px");
					$(this).addClass("form-error-outline");
					formErrors = true;
				}
				else {
					error.css("height", "0px");
					$(this).removeClass("form-error-outline");
				}
			}
			else if ($(this).hasClass("form-number")) {
				if ( parseFloat($(this).val()) < 0 || $(this).val().length == 0 ) {
					error.css("height","20px");
					$(this).addClass("form-error-outline");
					formErrors = true;
				}
				else {
					error.css("height", "0px");
					$(this).removeClass("form-error-outline");
				}
			}
		}

	});

	if (formErrors) { console.log("Form Error(s)"); }
	return formErrors;
}

function closeForms() {
	var duration = 0.5;

	$("#form-cont").css("right", -300);
	$("#overlay-back").css("opacity", "0");

	setTimeout(function() {
		$("#form-cont").find("input[type=text]").val("");
		$("#form-cont").find("input[type=select]").val(1);
		$("#form-cont").find($(".form-cat-type")).val(0);
		$(".form-number").attr("value", "");
		$(".form-date").attr("value", "");
		$(".form-new-cat-box").css("height", "0px");
		$(".form-new-cat-box").css("margin-top", "0px");
		$(".form-button-new-cat").val("Create New Category");

		$("#overlay-back").hide();
		$(".form").hide();
		$(".form").removeClass("form-active");
		$(".form-error").css("height", "0px");
		$(".form-input").removeClass("form-error-outline");
		$(".form-new-cat-cont").find("input").addClass("disabled");
	}, duration * 1000);
}

function closeInfo() {
	var infoWidth = $("#info-cont").outerWidth();
	var duration = 0.5;

	$("#info-cont").css("left", -infoWidth);
	$("#overlay-back-sub").css("opacity", "0");

	setTimeout(function() {
		$("#overlay-back-sub").hide();
	}, duration * 1000);
}


function currentDate() {
	var today = new Date();
	var dd = (today.getDate()).toString();
	var mm = (today.getMonth()+1).toString();
	var yy = (today.getFullYear()).toString();

	if (dd.length == 1) { dd = '0' + dd; } 
	if (mm.length == 1) { mm = '0' + mm; } 
	if (yy.length == 4) { yy = yy.substring(2,4); }

	return mm + '/' + dd + '/' + yy;
}

function mobileCheck() {
	return ($(window).width() <= 600);
}

function showNotification(type, message) {
	var num = randomNum(5);
	var delay = 4000;

	$("#notification-cont").append('<div num="' + num + '" class="notification ' + type + '">' + message + '</div>');
	$notification = $(".notification[num=" + num + "]");
	$notification.css("top", ($notification.outerHeight() + 10));

	$notification.unbind('click').click(function() {
		closeNotification($(this));
	});

	setTimeout(function() {
		$notification.css("top", 15 + (($(".notification").length - 1) * 30) + "px");
	}, 1);

	if (type == "red") { delay = 3000; }
	closeNotificationDelay($notification, delay);
}

function closeNotificationDelay($notification, delay) {
	setTimeout(function() {
		closeNotification($notification);
	}, delay);
}

function closeNotification($notification = false) {
	if ($notification) {
		var height = $notification.outerHeight() + 10;
		$notification.css("top", -height);

		$notification.nextAll($(".notification")).each(function() {
			$(this).css("top", $(this).position().top - 30);
		});

		setTimeout(function() {
			$notification.remove();
		}, 500);
	}
	else {
		$(".notification").css("top", "-50px");

		setTimeout(function() {
			$(".notification").remove();
		}, 500);
	}
}

function formatDate(date, format = false) {
	var day, month, year, split, currentChar;
	var newDate = false;

	if (date.includes("-")) { 
		currentChar = "-"; 
	}
	else if (date.includes("/")) { 
		currentChar = "/"; 
	}
	else {
		return false;
	}

	if (!format) { format = currentChar; }

	split = date.split(currentChar);
	
	if (split.length == 3) {
		if (currentChar == "/") {
			year = split[2];
			month = split[0];
			day = split[1];
		}
		else if (currentChar == "-") {
			year = split[0];
			month = split[1];
			day = split[2];
		}
		
		if (year.length == 2 && format == "-") { year = '20' + year };
		if (day.length < 2) { day = '0' + day };
		if (month.length < 2) { month = '0' + month };
		
		if (month <= 12 && month >= 1 && day <= new Date(year, month, 0).getDate() && day > 0 && year.length >= 2) {	
			if (format == "-") { 
				newDate = [year, month, day].join('-'); 
			}
			else if (format == "/") {
				newDate = [month, day, year].join('/');
			}
		}
	}

	return newDate;
}

function randomNum(length) {
	var num = '';

	for (i=0; i<length; i++) {
		num += Math.floor(Math.random() * 10);
	}

	return num;
}












function checkLogin() {
	var query = getQueryString();
	var user = query.user;
	var result = false;
	
	$.ajax({
		url: "/php/login_check.php",
		type: "GET",
		async: false,
		data: {userId: user},
	    	failure: function(data){
	    		alert("Operation failed: loginCheck");
	    	},
	    	success: function(data){
	    		if (data == 1) {
	    			console.log("User verified: " + user);
	    			result = true;
			}
			else {
				window.location.replace("login.php")
			}
	    	},
	    	error: function(jqXHR, textStatus, errorThrown){
                	alert("Error type" + textStatus + "occured, with value " + errorThrown);
            	}

	});
	
	return result;
}

function getUserId() {
	var query = getQueryString();
	return query.user;
}

function setQueryString(eventCode = false) {
	var selected;
	var query;
	var user_id = getQueryString().user;
	if (eventCode) { var event = getQueryString().event;};
	
	if ($(".account-focus").length > 0) {
		selected = $(".account-focus").attr("accountid");
		if (event) query = { user: user_id, account: selected, event: event };
		else query = { user: user_id, account: selected};
	}
	else if ($(".category-focus").length > 0) {
		selected = $(".category-focus").attr("categoryid");
		if (event) query = { user: user_id, category: selected, event: event };
		else query = { user: user_id, category: selected};
	}
	else {
		if (event) query = { user: user_id, account: 1, event: event };
		else query = { user: user_id, account: 1};
	}
	
	query = createQueryString(query);	
	return query;
}

function getQueryString()
{
    var vars = [];
    var hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    
    return vars;
}

function createQueryString(data) {
  	var query = [];
  	
  	for(var attr in data) {
    		if (data.hasOwnProperty(attr)) {
      			query.push(encodeURIComponent(attr) + "=" + encodeURIComponent(data[attr]));
    		}
	}
	return '?' + query.join("&");
}

function getEventQuery(eventCode) {
	return "&event=" + eventCode;
}

function dataFormat(data) {
	var newData = encodeURIComponent(data.trim());
	return newData;
}

function showLoading() {
	var message = ''

	message += '<div class="loading">Loading</div>';

	$(".loading").remove();
	$("html").append(message);
	//$(".overlay-back").show();
}

function hideLoading() {
	$(".loading").remove();
	//$(".overlay-back").hide();
}