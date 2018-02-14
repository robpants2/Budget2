// BudgetNEW.js

/*-- GLOBAL VARIABLES ------------------------------------------------------------------------*/

var mediaCheck = 600;





/*-- ON PAGE LOAD ---------------------------------------------------------------------------*/

$(document).ready(function() {

	initClickEvents();
	$("#overlay-back").hide();
	$("#overlay-back-sub").hide();

	//$("#nav-control-add-expense").trigger('click');
});




/*-- FUNCTIONS -----------------------------------------------------------------------------*/


/*----------------- INIT FUNCTIONS -----------------*/

function initClickEvents() {
	$(".nav-expander").unbind('click').click(function() {
		var navWidth = $("#nav-cont").outerWidth();
		var infoWidth = $("#info-cont").outerWidth();

		if ($(window).width() <= mediaCheck) {
			navWidth = 0;
		}
		
		if ($("#info-cont").position().left > -infoWidth) {
			//$("#info-cont").css("left", navWidth);
			closeInfo();
		}
		else {
			//$("#info-cont").css("left", -infoWidth);
			$("#info-cont").css("left", navWidth);

			if ($(window).width() <= mediaCheck) {
				$("#overlay-back-sub").show();
				$("#overlay-back-sub").css("opacity", "0.6");
			}
		}
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
	});

	$(".account-edit").unbind('click').click(function() {
		var $account = $(this).closest($(".account"));
		showForm("account-edit", $account);
	});

	$(".control-add-account").unbind('click').click(function() {
		showForm("account-add");
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
	});

	$(".category-edit").unbind('click').click(function() {
		var $category = $(this).closest($(".category"));
		showForm("category-edit", $category);
	});

	$(".control-add-category").unbind('click').click(function() {
		showForm("category-add");
	});




	/*-- Expenses --*/
	$(".expense").unbind('click').click(function() {
		if (!$(this).find($(".exp-col-delete")).is(":hover")){
			showForm("expense-edit", $(this));
		}
	});

	$(".control-add-expense").unbind('click').click(function() {
		showForm("expense-add");
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



	/*-- Controls --*/
	$(".control-transfer").unbind('click').click(function() {
		showForm("transfer");
	});


	/*-- FORMS --*/
	$(".form-button-cancel").unbind('click').click(function() {
		closeForms();
	});

	$(".form-button-new-cat").unbind('click').click(function() {
		var $box = $(this).parent().find($(".form-new-cat-box"));

		if ($box.height() <= 0) {
			$box.css("height","200px");
			$box.css("margin-top","-42px");
			$(this).val("Use Existing Category");
			$box.find("input:first").select();
		}
		else {
			$box.css("height", "0px");
			$box.css("margin-top", "0px");
			$(this).val("Create New Category");
			$box.closest($(".form")).find($(".form-category")).focus();
		}
	});

	$("#overlay-back").unbind('click').click(function() {
		closeForms();
	});

	$("#overlay-back-sub").unbind('click').click(function() {
		closeInfo();
	});




	$("html").unbind('click').click(function() {
		if (!$("#info-cont").is(":hover")) {
			var infoWidth = $("#info-cont").outerWidth();

			if ($(window).width() <= mediaCheck) {
				if ($("#info-cont").position().left > -infoWidth) {
					$("#info-cont").css("left", -infoWidth);
				}
			}
		}
	});
}


/*----------------- AJAX FUNCTIONS -----------------*/

function ajax(file, type, data) {
	/*
	var userid = getUserId();
	data.userid = userid;
	
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
}

function insertExpense() {
	var file = "insert_expense.php";
	var type = "POST";
	var data = {date: "2/8/18", description: "Description", category: 1, amount: 150.40};
	var errors = '';
	
	//check for errors
	
	if (errors) {
	
	}
	else {
		var submit = ajax(file, type, data);
		
		if (submit) {
			console.log("Success");
			//refresh page, or re-load expenses
		}
	}
}




/*----------------- MISC. FUNCTIONS -----------------*/

function showForm(type, $link = false, ) {
	var formWidth = $("#form-cont").outerWidth();
	var $form = false;

	if (parseInt($("#form-cont").css("right")) < 0) {
		$(".form").hide()
		$("#form-cont").css("right", 0);
		$("#overlay-back").show();
		$("#overlay-back").css("opacity", "0.6");

		if ($(window).width() <= mediaCheck) {
			closeInfo();
		}

		switch (type) {
			case "expense-add":
				$form = $("#form-expense");
				$form.find("input:first").focus(); //.select();
				$form.find($(".form-title")).html("Add Expense");
				$form.find($(".form-date")).val(currentDate());
				$form.find($(".form-description")).val("Misc");
				$form.find($(".form-amount")).val(0);
				$form.find($(".form-category")).val($form.find($(".form-category option:first")).val());
				break;

			case "expense-edit":
				$form = $("#form-expense");
				$form.find("input:first").focus(); //.select();
				$form.find($(".form-title")).html("Edit Expense");
				$form.find($(".form-date")).val($link.find($(".exp-col-date")).html());
				$form.find($(".form-description")).val($link.find($(".exp-col-desc")).html());
				$form.find($(".form-amount")).val($link.find($(".exp-col-amount")).html());
				$form.find($(".form-category")).val($link.find($(".exp-col-cat")).attr("categoryid"));
				break;

			case "account-add":
				$form = $("#form-account");
				$form.find("input:first").focus(); //.select();
				$form.find($(".form-title")).html("Add Account");
				$form.find($(".form-name")).val("New Account");
				$form.find($(".form-button-delete")).hide();
				break;

			case "account-edit":
				$form = $("#form-account");
				$form.find("input:first").focus(); //.select();
				$form.find($(".form-title")).html("Edit Account");
				$form.find($(".form-name")).val($link.find($(".account-name")).html());
				$form.find($(".form-button-delete")).show();
				break;

			case "category-add":
				$form = $("#form-category");
				$form.find("input:first").focus(); //.select();
				$form.find($(".form-title")).html("Add Category");
				$form.find($(".form-name")).val("New Category");
				$form.find($(".form-budget")).val("");
				$form.find($(".form-cat-type")).val(0);
				$form.find($(".form-button-delete")).hide();
				break;

			case "category-edit":
				$form = $("#form-category");
				$form.find("input:first").focus(); //.select();
				$form.find($(".form-title")).html("Edit Category");
				$form.find($(".form-name")).val($link.find($(".category-name")).html());
				$form.find($(".form-budget")).val($link.find($(".category-budget-value")).html());
				$form.find($(".form-cat-type")).val($link.attr("type"));
				$form.find($(".form-button-delete")).show();
				break;

			case "transfer":
				$form = $("#form-transfer");
				$form.find("select:first").focus(); //.select();
				$form.find($(".form-title")).html("Transfer Funds");
				break;

			default:
				break;
		}

		if ($form) $form.show();
	}
}

function closeForms() {
	var duration = 0.5;

	$("#form-cont").css("right", -300);
	$("#overlay-back").css("opacity", "0");

	setTimeout(function() {
		$("#form-cont").find("input[type=text]").val("");
		$("#form-cont").find("input[type=select]").val(1);
		$("#form-cont").find($(".form-cat-type")).val(0);
		$(".form-new-cat-box").css("height", "0px");
		$(".form-new-cat-box").css("margin-top", "0px");
		$(".form-button-new-cat").val("Create New Category");

		$("#overlay-back").hide();
		$(".form").hide();
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
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	return mm + '/' + dd + '/' + yyyy;
}

