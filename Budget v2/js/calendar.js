// Budget.js

/*-- GLOBAL VARIABLES ------------------------------------------------------------------------*/

var calDays;
var currentYear;
var currentMonth;
var selectedDate;
var linkObj; 

var shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
var shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var longDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];




/*-- ON PAGE LOAD ---------------------------------------------------------------------------*/

$(document).ready(function() {
	

});





/*-- FUNCTIONS -----------------------------------------------------------------------------*/

function showCal(link) {
	linkObj = link;
	
	if (formatDate(link.val(), "/")) {
		currentYear = strToDate(link.val()).getFullYear();
		currentMonth = strToDate(link.val()).getMonth();
		selectedDate = strToDate(link.val());
	}
	else {
		currentYear = new Date().getFullYear();
		currentMonth = new Date().getMonth();
		selectedDate = new Date();
		selectedDate.setHours(0,0,0,0);
	}
	
	initCal();
	setDaysInMonth(currentMonth, currentYear);
	
	var msg = '<div id="cal-cont" style="top: ' + ((linkObj.offset().top + linkObj.outerHeight())) + 'px; left: ' + (linkObj.offset().left - 1) + 'px;">';
	
	msg += '<div style="line-height: 33px">';
	msg += '<table class="cal-head-table"><tr>';
	msg += '<td style="text-align: left;"><div id="cal-prev-month" class="cal-arrow" onclick="showPrevMonth()"><</div></td>';
	//msg += '<td><select id="cal-current-month"></select>';
	//msg += '<td><select id="cal-current-year"></select>';
	msg += '<td><span id="cal-current-month" style="font-weight: bold;">' + monthNames[new Date(currentYear, currentMonth, 1).getMonth()] + '</span></td>';
	msg += '<td><span id="cal-current-year" style="font-weight: bold;">' + currentYear + '</span></td>';
	msg += '<td style="text-align: right;"><div id="cal-next-month" class="cal-arrow" onclick="showNextMonth()">></div></td>';
	msg += '</tr></table>';
	msg += '</div>';
	
	msg += '<table class="cal-table"><thead style="background: #525252; color: white;"><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>TH</th><th>F</th><th>S</td></tr></thead>';
	msg += '<tbody></tbody>';
	msg += '</table>';
	
	msg += '<div id="cal-selected-date" style="text-align: center; margin-bottom:10px; font-weight: bold;">' + shortFormatDate(selectedDate) + '</div>';
	msg += '<table style="width: 100%; text-align: center;"><tr>';
	msg += '<td><input type="button" class="button" value="Go To Today" id="cal-todays-date" onclick="setTodaysDate()"></td>';
	msg += '</tr></table>';
	msg += '</div>';

	msg += '<div id="cal-overlay"></div>';
	
	$("body").append(msg);
	
	setTimeout(function() {
		$("#cal-cont").css("height", "285px");
	},10);

	/*
	setTimeout(function() {
		var today = new Date();
		for (i=0; i<12; i++) {
			$("#cal-current-month").append('<option value="' + i + '">' + monthNames[i] + '</option>');
		}
		
		for (i=0; i<10; i++) {
			$("#cal-current-year").append('<option value="' + (today.getFullYear() - i) + '">' + (today.getFullYear() - i) + '</option>');
		}
	}, 1);
	*/
	
	
	$("#cal-cont").hover(function() { calHover = true; }, function() { calHover = false; });
	initCalClickEvents();
	setSelectedDate();
	displayCal();
}

function initCalClickEvents() {
	$(".cal-date").unbind('click').click(function() {
		var thisDate = new Date($(this).attr("date"));
		var thisMonth = thisDate.getMonth();
		var thisYear = thisDate.getFullYear();
		
		if ((thisMonth < currentMonth && thisYear == currentYear) || thisYear < currentYear) {
			showPrevMonth(thisDate);
		}
		else if ((thisMonth > currentMonth && thisYear == currentYear) || thisYear > currentYear) {
			showNextMonth(thisDate);
		}
		
		setSelectedDate(thisDate);
		
		calSubmit();
	});

	$("#cal-overlay").unbind('click').click(function() {
		calCancel();
	});

}

function showPrevMonth(activeDate = false) {
	if (currentMonth == 0) {
		currentYear --;
		currentMonth = 11;
	}
	else {
		currentMonth --;
	}
	
	setDaysInMonth(currentMonth, currentYear);
	displayCal();
	
	if (activeDate) {
		setSelectedDate(activeDate);
	}
}

function showNextMonth(activeDate = false) {                                                                                         
	if (currentMonth == 11) {
		currentYear ++;
		currentMonth = 0;
	}
	else {
		currentMonth ++;
	}
	
	setDaysInMonth(currentMonth, currentYear);
	displayCal();

	if (activeDate) {
		setSelectedDate(activeDate);
	}
}

function setDaysInMonth(month, year) {
	var day = - new Date(year, month, 1).getDay() + 1;
	
	for (var i=0; i<6; i++) {
		for (var j=0; j<7; j++) {
			calDays[i][j] = new Date(year, month, day);			
			day ++;	
		}
	}
}

function initCal() {
	calDays = new Array(6);
	
	for (var i = 0; i < 6; i++) {
  		calDays[i] = new Array(7);
  		
  		for (var j = 0; j < 7; j++) {
  			calDays[i][j] = "-1";
  		}
	};
}

function displayCal() {
	var todaysDate = new Date();
	todaysDate.setHours(0,0,0,0);
	var msg = '';

	for (var i=0; i<6; i++) {
		msg += '<tr>';
		
		for (var j=0; j<7; j++) {
			var gray = '';
			var today = '';
			
			if (calDays[i][j].getMonth() != currentMonth) {
				gray = 'gray';
			}
			
			if (calDays[i][j].getMonth() == todaysDate.getMonth() && calDays[i][j].getFullYear() == todaysDate.getFullYear() && calDays[i][j].getDate() == todaysDate.getDate()) {
				today = 'cal-today';
			}
			msg += '<td class="cal-date ' + gray + ' ' + today + '" date="' + calDays[i][j] + '">' + calDays[i][j].getDate() + '</td>';
		}
		
		msg += '</tr>';
	}
	
	$(".cal-table tbody").empty();
	$(".cal-table tbody").append(msg);
	$("#cal-current-month").html(monthNames[new Date(currentYear, currentMonth, 1).getMonth()]);
	$("#cal-current-year").html(currentYear);
	initCalClickEvents();
	setSelectedDate();
}

function shortFormatDate(date = selectedDate) {
	return shortDayNames[date.getDay()] + ', ' + shortMonthNames[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
}

function setSelectedDate(date = selectedDate) {
	selectedDate = date;
	$("#cal-selected-date").html(shortFormatDate());
	
	$(".cal-date").each(function() {
		
		var thisDate = new Date($(this).attr("date"));
		var thisMonth = thisDate.getMonth();
		var thisYear = thisDate.getFullYear();
		var thisDay = thisDate.getDate();
		
		if (thisDay == date.getDate() && thisMonth == date.getMonth() && thisYear == date.getFullYear()) {
			$(".cal-date-active").removeClass("cal-date-active");
			$(this).addClass("cal-date-active");
		}
	});
}

function setTodaysDate() {
	var date = new Date();
	date.setHours(0,0,0,0);

	currentMonth = date.getMonth();
	currentYear = date.getFullYear();
	//setSelectedDate(date);
	
	setDaysInMonth(date.getMonth(), date.getFullYear());
	displayCal();
}

function calCancel() {
	linkObj.focus();
	$("#cal-cont").css("height", "0px");
	setTimeout(function() {
		$("#cal-cont").remove();
		$("#cal-overlay").remove();
	}, 400);
}

function calSubmit() {
	var date = (selectedDate.getMonth() + 1) + '/' + selectedDate.getDate() + '/' + selectedDate.getFullYear();
	linkObj.val(formatDate(date, "/"));
	checkFormErrors();
	calCancel();
}

function strToDate(dateStr) {
	var split, day, month, year;
	
	
	if (dateStr.includes('/')) {
		split = dateStr.split('/');
		
		if (split.length == 3) {
			year = split[2];
			month = split[0];
			day = split[1];	
			
			return new Date(year, month - 1, day);
		}
	}
}










