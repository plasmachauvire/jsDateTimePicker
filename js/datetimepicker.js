/**
 * Define the format of date and time for display and for edition, not the format send by form (still unchanged)
 */
var format = {
	date : {
		edit    : 'DD-MM-YYYY',
		display :'MMM DD YYYY'
	},
	time : {
		edit    : 'HH:mm:ss',
		display : 'HH:mm'
	}
};
var original_format = 'DD/MM/YYYY hh:mm';

/**
 * Used to check if date / time user in being writing are correct
 */
var regex = {
	MM    : {
		1 : '([0-1])',
		2 : '([0-1][0-9])'
	},
	M     : '(([1-9])|(1[0-2]))',
	DD    : {
		1 : '([0-3])',
		2 : '([0-3][0-9])'
	},
	D     : '(([1-3][0-9])|([1-9]))',
	Y     : {
		1 : '([0-9]{1,})',
		2 : '([0-9]{1,})'
	},
	YYYY  : {
		1 : '([0-9]{1,})',
		2 : '([0-9]{1,})'
	},
	YY    : {
		1 : '([0-9])',
		2 : '([0-9]{2})'
	},
	o     :	{
		1 : '([a-Z])',
		2 : '([a-Z]{2})'
	},
	a     :	{
		1 : '([a-Z])',
		2 : '([a-Z]{2})'
	},
	HH    : {
		1 : '[0-2]',
		2 : '([0-2][0-9])'
	},
	h     : '(([1-2][0-9])|([0-9]))',
	mm    : {
		1 : '([0-5])',
		2 : '([0-5][0-9])'
	},
	ss    : {
		1 : '([0-5])',
		2 : '([0-5][0-9])'
	}
};

var dates         = document.querySelectorAll('.date_time');
dates.forEach(hideAndSetNew);
var dates_inputs  = document.querySelectorAll('.date');
var times_inputs  = document.querySelectorAll('.time');
dates_inputs.forEach(setListenersDate);
times_inputs.forEach(setListenersTime);
var popups_date   = document.querySelectorAll('.popup-date-picker');
var popups_time   = document.querySelectorAll('.popup-time-picker');

popups_date.forEach(function(element){initialiseDatePopup(element);});
popups_time.forEach(initialiseTimePopup);
dates_inputs.forEach(setOutputFormat);
times_inputs.forEach(setOutputFormat);
popups_time.forEach(addListenerPopup);
popups_date.forEach(addListenerPopup);

/**
 * Add listener on selection popups
 * @param element the popup
 */
function addListenerPopup(element){
	element.addEventListener("blur", function(event){focusOutPopup(element, event);});
}

/**
 * Get the index of the given value in the given array
 * @param array the array
 * @param value the value to search the index
 * @returns {number} the index or -1 if not found
 */
function arrayIndexOf(array, value){
	for(var i = 0; i < array.length; i++){
		if(array[i] === value){
			return i;
		}
	}
	return -1;
}

/**
 * Check if the given element value can be valid (we suppose that user is currently typing) or not
 */
function canBeValid(element){
	var canBeValid = true;

	var valid_format;
	if(isDate(element)){
		if(!dateFormatIsOnlyDigit()){
			return true;
		}
		valid_format = format.date.edit;
	}
	else{
		valid_format = format.time.edit;
	}

	var date          = element.value;
	var format_split  = valid_format.split('');
	var date_split    = date.split('');
	var key_format;
	var new_i         = 0;
	var full_regex    = '^(';

	for(var i = 0; i < date_split.length; i++){

		key_format = format_split[i];

		if(i < format_split.length-1 && format_split[i] === format_split[i+1]){
			key_format += format_split[i+1];
			if(i < format_split.length-2 && format_split[i+2] === format_split[i]){
				key_format += format_split[i+2];
				if(i < format_split.length-3 && format_split[i+3] === format_split[i]){
					key_format += format_split[i+3];
				}
			}
		}
		new_i = i;
		if(!regex.hasOwnProperty(key_format)){
			if(key_format !== undefined){
				full_regex += key_format;
			}
		}
		else{
			var checking_regex = regex[key_format];
			if(key_format.length > 1){
				var done = false;
				for(var j = 1; j < key_format.length; j++){
					if(j < date_split.length){
						new_i++;
					}
					else{
						checking_regex = checking_regex[1];
						done = true;
					}
				}
				if(!done){
					checking_regex = checking_regex[2];
				}
			}
			if(checking_regex !== undefined){
				full_regex += checking_regex;
			}
		}
		i = new_i;

	}

	full_regex += ')$';
	canBeValid = date.match(full_regex) ? true : false;

	return canBeValid;
}

/**
 * Go to the next of previous month
 * @param element clicked button
 */
function changeMonth(element){
	var popup           = getPopupParent(element);
	var input           = getInputOfPopup(popup)
	var current_date    = moment(getInputFormat(input), format.date.edit);
	var year            = (popup.querySelector('.year-popup').innerHTML).trim();
	var month           = (popup.querySelector('.month-popup').innerHTML).trim();

	current_date.year(parseInt(year));
	current_date.month(month);

	if(element.id == 'prev'){
		current_date.add(-1, 'months');
	}
	else{
		current_date.add(1, 'months');
	}
	console.log("before display " + current_date.format('DD-MM-YYYY'));
	displayPopup(popup, current_date);
}

/**
 * Change from Am to Pm or from Pm to Am in hour selector
 * @param element the clicked button (Am or Pm)
 */
function changePartOfDay(element){
	var table   = element.parentNode.parentNode;
	var pm      = table.querySelectorAll('.pm-hour-td');
	var am      = table.querySelectorAll('.am-hour-td');
	var other_td;

	if(element.className === 'td-hour-am-picker'){
		other_td = element.parentNode.querySelector('.td-hour-pm-picker');
		pm.forEach(function(element){
			element.style.display = 'none';
		});
		am.forEach(function(element){
			element.style.display = '';
		});
	}
	else{
		other_td = element.parentNode.querySelector('.td-hour-am-picker');
		am.forEach(function(element){
			element.style.display = 'none';
		});
		pm.forEach(function(element){
			element.style.display = '';
		});
	}

	other_td.style.background   = '';
	other_td.style.borderRadius = '';
	other_td.id                 = '';

	element.style.background    = 'lightgreen';
	element.style.borderRadius  = '10000px';
	element.id                  = 'clicked';
}

/**
 * When a label in popup ins clicked
 * @param element the clicked label
 */
function clickOnLabel(element){
	var parentDiv   = element.parentNode.parentNode.parentNode.parentNode.parentNode;
	updateLabels(parentDiv);
	var selector    = parentDiv.querySelector('.selector');
	var name        = element.className.split('-')[0];
	var to_display  = selector.querySelector('.' + name + '-selector');
	displaySelector(to_display);
}

/**
 * Check if given array contains given value
 * @param array the array
 * @param value the value
 * @returns {boolean} true if the array contains the value
 */
function contains(array, value){
	for(var i = 0; i < array.length; i++){
		if(array[i] === value){
			return true;
		}
	}
	return false;
}

/**
 * When a day in clicked in date selector
 * @param element the clicked day (<td>)
 */
function dateSelectorClicked(element, displayed_date){
	var table         = element.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.td-date-selector');
	td_selectable.forEach(function(element){
		element.style.background    = '';
		element.style.borderRadius  = '';
		element.id                  = '';
	});
	element.style.background      = 'lightgreen';
	element.style.borderRadius    = '10000px';
	element.id                    = 'clicked';

	var popup                     = getPopupParent(table);
	popup.style.display           = "none";
	updateDate(popup.parentNode, element.innerHTML, displayed_date);
}

/**
 * Check if the date contains only digit basing on his format
 * @return true if the date format only contains digits
 */
function dateFormatIsOnlyDigit(){
	var valid_format  = format.date.edit;
	var ret           = true;
	var split         = valid_format.split('M');
	if(split.length > 3){
		ret = false;
	}
	split             = valid_format.split('D');
	if(split.length > 3){
		ret = false;
	}
	return ret;
}

/**
 * Display given selector
 * @param element the selector
 */
function displaySelector(element){
	var popup           = getPopupParent(element);
	var selector        = popup.querySelector('.selector');
	var display_part    = popup.querySelector('.selector-display');
	var all_selectors   = selector.querySelectorAll('table');
	all_selectors.forEach(function(element){
		element.style.display = "none";
	});

	var all_labels      = display_part.querySelectorAll('td');
	all_labels.forEach(function (label){
		var name_to_keep = element.className.split('-')[0];
		if(label.className.split('-')[0] === name_to_keep){
			label.style.borderRadius  = '10000px';
			label.style.background    = 'FloralWhite';
			label.style.opacity       = '0.5';
		}
		else{
			label.style.borderRadius  = '';
			label.style.background    = '';
			label.style.opacity       = '';
		}
	});
	element.style.display = "";
	var change_month = popup.querySelectorAll('.change-month');
	if(element.className === 'day-selector'){
		change_month.forEach(function(change){
			change.style.display = "";
		});
	}
	else {
		change_month.forEach(function(change){
			change.style.display = "none";
		});
	}
}

/**
 * Display the popup and set right content
 * @param popup the popup ton display
 */
function displayPopup(popup, display_date){
	popup.innerHTML     = '';
	popup.style.display = '';
	if(popup.className === 'popup-date-picker'){
		initialiseDatePopup(popup, display_date);
		setInputFormat(popup.parentNode.querySelector('.date'));
	}
	else{
		initialiseTimePopup(popup);
		setInputFormat(popup.parentNode.querySelector('.time'));
	}
}

/**
 * When focus is put on a date input
 */
function eventFocusOnDate(element){
	setInputFormat(element);
	var popup = element.parentNode.querySelector('.popup-date-picker');
	displayPopup(popup, null);
}

/**
 * When focus is put on a time input
 */
function eventFocusOnTime(element){
	setInputFormat(element);
	var popup = element.parentNode.querySelector('.popup-time-picker');
	displayPopup(popup, null);
}

/**
 * When user take out is finger of a key (key pushed is already written at this moment)
 */
function eventKeyUp(element){
	if(canBeValid(element)){
		element.style.borderColor = '';
		element.style.borderWidth = '';
		element.style.borderStyle = '';
		if(isDate(element)){
			var regex = getFullRegexForFormat(format.date.edit);
			if(element.value.match(regex)){
				var popup           = element.parentNode.querySelector('.popup-date-picker');
				popup.style.display = 'none';
				displayPopup(popup, null);
			}
		}
		else{
			var regex = getFullRegexForFormat(format.time.edit);
			if(element.value.match(regex)){
				var popup           = element.parentNode.querySelector('.popup-time-picker');
				popup.style.display = 'none';
				displayPopup(popup, null);
			}
		}
		setInputFormat(element);
	}
	else{
		element.style.borderColor = 'red';
		element.style.borderWidth = '2px';
		element.style.borderStyle = 'solid';
	}
}

/**
 * When focus is lost by a date input
 */
function eventLostFocusOnDate(element, event){
	var popup = element.parentNode.querySelector('.popup-date-picker');

	if(!event || !event.relatedTarget || (!(event.relatedTarget === popup) && !popup.contains(event.relatedTarget))){
		updateDateRealInput(element);
		setOutputFormat(element);
		popup.style.display       = 'none';
		element.style.borderColor = '';
		element.style.borderWidth = '';
		element.style.borderStyle = '';
	}
}

/**
 * When focus is lost by a time input
 */
function eventLostFocusOnTime(element, event){
	var popup = element.parentNode.querySelector('.popup-time-picker');
	if(!event || !event.relatedTarget || (!(event.relatedTarget === popup) && !popup.contains(event.relatedTarget))){
		updateDateRealInput(element);
		setOutputFormat(element);
		popup.style.display       = "none";
		element.style.borderColor = '';
		element.style.borderWidth = '';
		element.style.borderStyle = '';
	}
}

/**
 * When focus is lost by a popup
 * @param element the popup
 */
function focusOutPopup(element, event){
	if(!element.contains(event.relatedTarget)){
		element.style.display = 'none';
		if(element.className === 'popup-date-picker'){
			var date_input = element.parentNode.querySelector('.date');
			setOutputFormat(date_input);
		}
		else{
			var time_input = element.parentNode.querySelector('.time');
			setOutputFormat(time_input);
		}
	}
}

/**
 * Get the full regex to check if the input fully matches the format
 * @param format for which format the regex must be created
 * @returns {string} the regex
 */
function getFullRegexForFormat(format){
	var full_regex    = '^(';
	var key_format;
	var format_split  = format.split('');
	var new_i         = 0;

	for(var i = 0; i < format_split.length; i++){
		new_i       = i;
		key_format  = format_split[i];

		if(i < format_split.length-1 && format_split[i] === format_split[i+1]){
			key_format += format_split[i+1];
			new_i++;
			if(i < format_split.length-2 && format_split[i+2] === format_split[i]){
				key_format += format_split[i+2];
				new_i++;
				if(i < format_split.length-3 && format_split[i+3] === format_split[i]){
					key_format += format_split[i+3];
					new_i++;
				}
			}
		}
		if(!regex.hasOwnProperty(key_format)){
			if(key_format !== undefined){
				full_regex += key_format;
			}
		}
		else{
			if(regex[key_format][2]){
				full_regex += regex[key_format][2];
			}
			else{
				full_regex += regex[key_format];
			}
		}
		i = new_i;
	}

	full_regex += ')$';
	return full_regex;
}

/**
 * Generate HTML for dateSelection at a given date
 * @param date the date
 * @returns {string} the html
 */
function getHtmlForDateSelector(date, display_selection){

	var monday    = moment.unix(345600).format('dddd');
	var tuesday   = moment.unix(432000).format('dddd');
	var wednesday = moment.unix(518400).format('dddd');
	var thursday  = moment.unix(0).format('dddd');
	var friday    = moment.unix(86400).format('dddd');
	var saturday  = moment.unix(172800).format('dddd');
	var sunday    = moment.unix(259200).format('dddd');

	var days      = [];
	days[0]       = monday;
	days[1]       = tuesday;
	days[2]       = wednesday;
	days[3]       = thursday;
	days[4]       = friday;
	days[5]       = saturday;
	days[6]       = sunday;

	var display_date = moment(date);
	display_date = display_date.format('X');

	var first_day_of_month  = moment(date);
	first_day_of_month.startOf('month');
	var name_first_day      = first_day_of_month.format('dddd');

	var last_day            = moment(date);
	last_day.endOf('month');
	var number_of_days      = last_day.format('D');
	var last_day_name       = last_day.format('dddd');

	var date_day_number     = date.format('D');

	var lines = [];
	for(var i = 0; i < 6; i++){
		lines[i] = [];
		for(var j = 0; j < 7; j++){
			lines[i][j] = [];
		}
	}

	var html  = '<table class="day-selector" style="width:100%; text-align:center">'
						+   '<tr>'
						+     '<th>'+days[0].split('')[0]+'</th>'
						+     '<th>'+days[1].split('')[0]+'</th>'
						+     '<th>'+days[2].split('')[0]+'</th>'
						+     '<th>'+days[3].split('')[0]+'</th>'
						+     '<th>'+days[4].split('')[0]+'</th>'
						+     '<th>'+days[5].split('')[0]+'</th>'
						+     '<th>'+days[6].split('')[0]+'</th>'
						+   '</tr>';


	var line              = 0;
	var index_start_month = arrayIndexOf(days, name_first_day);
	if(index_start_month !== -1){
		lines[0][index_start_month][0] = 1;
		lines[0][index_start_month][1] = 0;
		if(index_start_month !== 0){
			var prev_day = moment(first_day_of_month);
			prev_day.subtract(1, 'days');
			var number_of_prev_day = prev_day.format('D');
			var j = 0;
			for(var i = index_start_month-1; i >= 0; i--){
				lines[line][i][0] = number_of_prev_day-j;
				lines[line][i][1] = 1;
				j++;
			}
		}
	}

	var number_per_line = index_start_month+1;
	for(var i = 2; i <= number_of_days; i++){
		if(number_per_line > 6){
			number_per_line = 0;
			line++;
		}
		if(lines[line] && lines[line][number_per_line]){
			lines[line][number_per_line][0] = i;
			lines[line][number_per_line][1] = 0;
		}
		number_per_line++;
	}

	var index_end_month = arrayIndexOf(days, last_day_name);
	if(index_end_month !== 6){
		for(var i = 0; i < 6-index_end_month; i++){
			lines[line][index_end_month+i+1][0] = i+1;
			lines[line][index_end_month+i+1][1] = 1;
		}
	}


	for(var i = 0; i < lines.length; i++){
		if(lines[i] && lines[i][0] && lines[i][0][0]){
		html += '<tr>';
		for(var j = 0; j < lines[i].length; j++){
			if(lines[i][j][1] === 0){
				if(lines[i][j][0] == date_day_number && display_selection){
					html += '<td class="td-date-selector" id="clicked" onmouseover="mouseIsOverTd(this)" '
								+ 'onmouseout="mouseLeftTd(this)" style="background:bisque; border-radius:10000px;" '
								+ 'onclick="dateSelectorClicked(this, '+display_date+')">' + lines[i][j][0] + '</td>';
				}
				else{
					html += '<td class="td-date-selector" id="" onmouseover="mouseIsOverTd(this)" '
								+ 'onmouseout="mouseLeftTd(this)" '
								+ 'onclick="dateSelectorClicked(this, '+display_date+')">' + lines[i][j][0] + '</td>';
				}
			}
			else{
				html += '<td class="disabled-td-date-selector" '
							+ 'style="color:#D3D1D4">' + lines[i][j][0] + '</td>';
			}
		}
		html += '</tr>';
		}
	}

	html += '</table>';

	return html;
}

/**
 * Generate HTML for hourSelection at a given hour (the current hour)
 * @param hour the current selected hour
 * @returns {string} the full html
 */
function getHtmlForHourSelector(hour){
	var html = '<table class="hour-selector" style="width:100%; text-align:center">';


	var display_am = '';
	var display_pm = 'none';
	if(parseInt(hour) > 11){
		display_pm = '';
		display_am = 'none';

		html += '<tr>'
					+ '<td class="td-hour-am-picker" onmouseover="mouseIsOverTd(this)" '
					+ 'onmouseout="mouseLeftTd(this)" onclick="changePartOfDay(this)">Am</td>'
					+ '<td></td>'
					+ '<td class="td-hour-pm-picker" id="clicked" '
					+ 'style="background:bisque; border-radius:10000px;" '
					+ 'onmouseover="mouseIsOverTd(this)" onmouseout="mouseLeftTd(this)" '
					+ 'onclick="changePartOfDay(this)">Pm</td>'
					+ '</tr>';
	}
	else{
		html += '<tr>'
					+ '<td class="td-hour-am-picker" id="clicked" '
					+ 'style="background:bisque; border-radius:10000px;" onmouseover="mouseIsOverTd(this)" '
					+ 'onmouseout="mouseLeftTd(this)" onclick="changePartOfDay(this)">Am</td>'
					+ '<td></td>'
					+ '<td class="td-hour-pm-picker" onmouseover="mouseIsOverTd(this)" '
					+ 'onmouseout="mouseLeftTd(this)" onclick="changePartOfDay(this)">Pm</td>'
					+ '</tr>';

	}

	var number_per_line = 0;
	html += '<tr class="am-hour-td" style="display:'+display_am+'">';
	for(var i = 0; i < 12; i++){
		if(number_per_line >= 3){
			html += '</tr><tr class="am-hour-td" style="display:'+display_am+'">';
			number_per_line = 0;
		}
		if(i === parseInt(hour)){
			html += '<td class="td-hour-selector" id="clicked" onmouseover="mouseIsOverTd(this)" '
						+ 'onmouseout="mouseLeftTd(this)" style="background:bisque; border-radius:10000px;" '
						+ 'onclick="hourSelectorClicked(this)">' + i + '</td>';
		}
		else{
			html += '<td class="td-hour-selector" id="" onmouseover="mouseIsOverTd(this)" '
						+ 'onmouseout="mouseLeftTd(this)" onclick="hourSelectorClicked(this)">' + i + '</td>';
		}
		number_per_line++;
	}

	html            += '<tr class="pm-hour-td" style="display:'+display_pm+'">';
	number_per_line = 0;
	for(var i = 12; i < 24; i++){
		if(number_per_line >= 3){
			html += '</tr><tr class="pm-hour-td" style="display:'+display_pm+'">';
			number_per_line = 0;
		}
		if(i === parseInt(hour)){
			html += '<td class="td-hour-selector" id="clicked" onmouseover="mouseIsOverTd(this)" '
						+ 'onmouseout="mouseLeftTd(this)" style="background:bisque; border-radius:10000px;" '
						+ 'onclick="hourSelectorClicked(this)">' + i + '</td>';
		}
		else{
			html += '<td class="td-hour-selector" id="" onmouseover="mouseIsOverTd(this)" '
						+ 'onmouseout="mouseLeftTd(this)" onclick="hourSelectorClicked(this)">' + i + '</td>';
		}
		number_per_line++;
	}


	html += '</table>';
	return html;
}

/**
 * Generate HTML for minuteSelection at a given minute (current minute)
 * @param minute the current selected minute
 * @returns {string} the full html
 */
function getHtmlForMinuteSelector(minute){
	var html = '<table class="minute-selector" style="width:100%; text-align:center">';

	var on_gap;
	var difference = minute%5;
	if(difference >= 3){
		on_gap = parseInt(minute) + 5 - difference;
	}
	else{
		on_gap = parseInt(minute) - difference;
	}
	if(on_gap >= 60){
		on_gap = 55;
	}

	var number_per_line = 0;
	html += '<tr>';
	for(var i = 0; i < 12; i++){
		if(number_per_line >= 3){
			html += '</tr><tr>';
			number_per_line = 0;
		}
		if((5 * i) === on_gap){
			html += '<td class="td-minute-selector" id="clicked" onmouseover="mouseIsOverTd(this)" '
						+ 'onmouseout="mouseLeftTd(this)" style="background:bisque; border-radius:10000px;" '
						+ 'onclick="minuteSelectorClicked(this)">' + (i * 5) + '</td>';
		}
		else{
			html += '<td class="td-minute-selector" id="" onmouseover="mouseIsOverTd(this)" '
						+ 'onmouseout="mouseLeftTd(this)" '
						+ 'onclick="minuteSelectorClicked(this)">' + (i * 5) + '</td>';
		}
		number_per_line++;
	}
	html += '</tr>';
	html += '</table>';
	return html;
}

/**
 * Get the html for the month selector for the given date
 * @param date the current date
 * @returns {string} the html
 */
function getHtmlForMonthSelector(date){
	var html                = '<table class="month-selector" style="width:100%; text-align:center">';
	var months              =  getMonths();
	var current_month_name  = date.format('MMMM');
	var lines               = [];

	for(var i = 0; i < 4; i++){
		lines[i] = [];
		for(var j = 0; j < 3; j++){
			lines[i][j] = [];
		}
	}

	var line = 0;
	var number_per_line = 0;
	for(var i = 0; i < 12; i++){
		if(number_per_line > 2){
			line++;
			number_per_line = 0;
		}
		lines[line][number_per_line][0] = months[i];
		if(months[i] === current_month_name){
			lines[line][number_per_line][1] = 1;
		}
		else{
			lines[line][number_per_line][1] = 0;
		}
		number_per_line++;
	}

	for(var i = 0; i < lines.length; i++){
		html += '<tr>';
		for(var j = 0; j < lines[i].length; j++){
			if(lines[i][j][1] === 1){
				html += '<td class="td-month-selector" id="clicked" onmouseover="mouseIsOverTd(this)" '
							+ 'onmouseout="mouseLeftTd(this)" style="background:bisque; border-radius:10000px;" '
							+ 'onclick="monthSelectorClicked(this)">' + lines[i][j][0] + '</td>';
			}
			else{
				html += '<td class="td-month-selector" id="" onmouseover="mouseIsOverTd(this)" '
							+ 'onmouseout="mouseLeftTd(this)" '
							+ 'onclick="monthSelectorClicked(this)">' + lines[i][j][0] + '</td>';
			}
		}
		html += '</tr>';
	}

	html += '</table>';
	return html;
}

/**
 * Generate HTML for secondSelection at a given second (current second)
 * @param second the current selected second
 * @returns {string} the full html
 */
function getHtmlForSecondSelector(second){
	var html        = '<table class="second-selector" style="width:100%; text-align:center">';
	var on_gap;
	var difference  = second%5;
	if(difference >= 3){
		on_gap = parseInt(second) + 5 - difference;
	}
	else{
		on_gap = parseInt(second) - difference;
	}
	if(on_gap >= 60){
		on_gap = 55;
	}

	var number_per_line = 0;
	html                += '<tr>';
	for(var i = 0; i < 12; i++){
		if(number_per_line >= 3){
			html            += '</tr><tr>';
			number_per_line = 0;
		}
		if((5 * i) === on_gap){
			html += '<td class="td-second-selector" id="clicked" onmouseover="mouseIsOverTd(this)" '
						+ 'onmouseout="mouseLeftTd(this)" style="background:bisque; border-radius:10000px;" '
						+ 'onclick="secondSelectorClicked(this)">' + (i * 5) + '</td>';
		}
		else{
			html += '<td class="td-second-selector" id="" onmouseover="mouseIsOverTd(this)" '
						+ 'onmouseout="mouseLeftTd(this)" '
						+ 'onclick="secondSelectorClicked(this)">' + (i * 5) + '</td>';
		}
		number_per_line++;
	}

	html += '</tr>';
	html += '</table>';
	return html;
}

/**
 * Get the html for the year selector for the current date or the given decenie
 * @param date the current year
 * @param year an other decenie
 * @returns {string} the html
 */
function getHtmlForYearSelector(date, year){
	var html          = '<table class="year-selector" style="width:100%; text-align:center">';
	var current_year  = date.format('YYYY');

	if(!year){
		year = current_year;
	}

	html  += '<tr>'
				  + '<th class="th-prev-ten" onclick="changeDecenie(this)">Prev 10</th>'
				  + '<th></th>'
					+ '<th></th>'
					+ '<th class="th-next-ten" onclick="changeDecenie(this)">Next 10</th>'
			   + '</tr>';

	var first_displayed = year;
	first_displayed     = ((Math.floor(first_displayed / 10)) * 10)-1;
	var number_per_line = 0;
	html                += '<tr>';
	for(var i = 0; i < 12; i++){
		if(number_per_line >= 4){
			html += '</tr><tr>';
			number_per_line = 0;
		}
		if(first_displayed == current_year){
			html += '<td class="td-year-selector" id="clicked" onmouseover="mouseIsOverTd(this)" '
						+ 'onmouseout="mouseLeftTd(this)" style="background:bisque; border-radius:10000px;" '
						+ 'onclick="yearSelectorClicked(this)">' + first_displayed + '</td>';
		}
		else{
			html += '<td class="td-year-selector" id="" onmouseover="mouseIsOverTd(this)" '
						+ 'onmouseout="mouseLeftTd(this)" '
						+ 'onclick="yearSelectorClicked(this)">' + first_displayed + '</td>';
		}
		number_per_line++;
		first_displayed++;
	}

	html += '</tr>';
	html += '</table>';

	return html;
}

/**
 * Get the value of the element has input format
 * @param element the element (an input)
 * @returns {*}
 */
function getInputFormat(element){
	if(isDate(element)){
		if(element.id.split('$$')[0] == 1){
			var to_display  = moment(element.value, format.date.display);
			var new_value   = to_display.format(format.date.edit);
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.date.display);
				new_value = new_value.format(format.date.edit);
			}
			return new_value;
		}
		return element.value;
	}
	else{
		if(element.id.split('$$')[0] == 1){
			var to_display  = moment(element.value, format.time.display);
			var new_value   = to_display.format(format.time.edit);
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.time.display);
				new_value = new_value.format(format.time.edit);
			}
			return new_value;
		}
		return element.value;
	}
}

/**
 * Get rigth input for given element (popup)
 * @param element the popup
 */
function getInputOfPopup(element){
	if(element.className === 'popup-date-picker'){
		return element.parentNode.querySelector('.date');
	}
	else{
		return element.parentNode.querySelector('.time');
	}
}

function getMonths(){
	var january     = moment.unix(0).format('MMMM');
	var february    = moment.unix(2678400).format('MMMM');
	var march       = moment.unix(5097600).format('MMMM');
	var april       = moment.unix(7776000).format('MMMM');
	var may         = moment.unix(10368000).format('MMMM');
	var june        = moment.unix(13046400).format('MMMM');
	var july        = moment.unix(15638400).format('MMMM');
	var august      = moment.unix(18316800).format('MMMM');
	var september   = moment.unix(20995200).format('MMMM');
	var october     = moment.unix(23587200).format('MMMM');
	var november    = moment.unix(26265600).format('MMMM');
	var december    = moment.unix(28857600).format('MMMM');

	var months      = [];
	months[0]       = january;
	months[1]       = february;
	months[2]       = march;
	months[3]       = april;
	months[4]       = may;
	months[5]       = june;
	months[6]       = july;
	months[7]       = august;
	months[8]       = september;
	months[9]       = october;
	months[10]      = november;
	months[11]      = december;
	return months;
}

/**
 * Get output format of an input without changing the current displayed format
 * @param element the input
 * @returns {*} the value as output format
 */
function getOutputFormat(element){
	if(isDate(element)){
		if(element.id.split('$$')[0] == 0){
			var to_display  = moment(element.value, format.date.edit);
			var new_value   = to_display.format(format.date.display).toString();
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.date.edit);
				new_value = new_value.format(format.date.display).toString();
			}
			return new_value;
		}
		return element.value;
	}
	else{
		if(element.id.split('$$')[0] == 0){
			var to_display  = moment(element.value, format.time.edit);
			var new_value   = to_display.format(format.time.display).toString();
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.time.edit);
				new_value = new_value.format(format.time.display).toString();
			}
			return new_value;
		}
		return element.value;
	}
}


/**
 * Get dateTime input who will be send with the form and has been visually replaced
 */
function getParentInput(element){
	var parent_div  = element.parentNode.parentNode;
	var last_div    = parent_div.querySelector('.date_time');
	return last_div.querySelector('.datetime');
}

/**
 * Get parent popup of this element
 * @param element the element
 * @returns {(() => Node) | ActiveX.IXMLDOMNode | Node | SVGElementInstance} the popup
 */
function getPopupParent(element){
	var found = false;
	var node  = element.parentNode;
	var i     = 0;

	while(!found && i < 100 && node){
		if(node.className === 'popup-date-picker' || node.className === 'popup-time-picker'){
			found = true;
		}
		else{
			node  = node.parentNode;
		}
		i++;
	}
	return node;
}

/**
 * Hide precedent dateTime input and set the new one(s)
 */
function hideAndSetNew(element, index, array){
	element.style.display = 'none';
	var parentDiv         = element.parentNode;
	var last_input        = element.querySelector('.datetime');
	var name_last_input   = last_input.getAttribute('name');
	var date_input        = name_last_input + '_date';
	var time_input        = name_last_input + '_time';
	var last_input_value  = last_input.getAttribute('value');
	var last_input_date   = last_input_value.split(' ')[0];
	var last_input_time   = last_input_value.split(' ')[1];

	var display_date      = moment(last_input_date, 'DD/MM/YYYY');
	var display_time      = moment(last_input_time, 'hh:mm');


	parentDiv.innerHTML   +=  '<div class="date-time-picker"></div>';
	parentDiv = parentDiv.querySelector('.date-time-picker');

	if("date" in format){
		var date_has_input    = display_date.format(format.date.input).toString();
		var date              = display_date.format(format.date.display).toString();
		parentDiv.innerHTML   += '<input autocomplete="off" class="date" id="1$$'+date+'" '
													+ 'name="'+date_input+'" value="'+date+'">';
	}
	if("time" in format){
		var time_has_input    = display_time.format(format.time.input).toString();
		var time              = display_time.format(format.time.display).toString();
		parentDiv.innerHTML   += '<input autocomplete="off" class="time" id="1$$'+time+'" '
													+ 'name="'+time_input+'" value="'+time+'">';
	}

	if("date" in format){
		parentDiv.innerHTML   += '<div class="popup-date-picker" tabindex="-1" style="display:none">'
													+  '</div>';
	}
	if("time" in format){
		parentDiv.innerHTML   += '<div class="popup-time-picker" tabindex="-1" style="display:none">'
													+  '</div>';
	}

}

/**
 * When an hour (a td) is clicked in the hour selector
 * @param element the clicked hour (td)
 */
function hourSelectorClicked(element){
	var table         = element.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.td-hour-selector');
	td_selectable.forEach(function(element){
		element.style.background    = '';
		element.style.borderRadius  = '';
		element.id                  = '';
	});
	element.style.background    = 'lightgreen';
	element.style.borderRadius  = '10000px';
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	updateHour(popup.parentNode, element.innerHTML);

	if(!contains(format.time.edit.split(''), 'm') && !contains(format.time.edit.split(''), 's')){
		popup.style.display = "none";
		popup.blur();
	}
	else{
		displayPopup(popup, null);
		if(contains(format.time.edit.split(''), 'm')){
			var minute_selector = popup.querySelector('.selector').querySelector('.minute-selector');
			displaySelector(minute_selector);
		}
		else{
			var second_selector = popup.querySelector('.selector').querySelector('.second-selector');
			displaySelector(second_selector);
		}
	}
}

/**
 * initialize content of date popup
 * @param element the date popup
 */
function initialiseDatePopup(element, display_date){
	var output_date       = getOutputFormat(element.parentNode.querySelector('.date'));
	var date              = moment(output_date, format.date.display);
	var display_selection = false;

	if(date.isSame(display_date)){
		display_selection = true;
	}

	if(!display_date){
		display_date      = date;
		display_selection = true;
	}
	var j             = 0;
	var order         = [];

	var split_format  = format.date.edit.split('');
	for(var i = 0; i < split_format.length; i++){
		if(split_format[i] === 'M' && !contains(order, 'M')){
			order[j] = 'M';
			j++;
		}
		else if(split_format[i] === 'D' && !contains(order, 'D')){
			order[j] = 'D';
			j++;
		}
		else if(split_format[i] === 'Y' && !contains(order, 'Y')){
			order[j] = 'Y';
			j++;
		}
	}

	var day_number    = display_date.format('D');
	var day_name      = display_date.format('dddd');
	var month_name    = display_date.format('MMMM');
	var year          = display_date.format('Y');

	element.innerHTML += '<div class="date-in-popup"></div>';
	var div_date      = element.querySelector('.date-in-popup');

	var to_add_html   = '<table class="selector-display" style="width:100%; text-align:center"><tr>'
	for(i = 0; i < order.length; i++){
		if(order[i] === 'Y'){
			to_add_html += '<td class="year-popup" onclick="clickOnLabel(this)"> '+year+'</td>';
		}
		if(order[i] === 'M'){
			to_add_html += '<td class="change-month" style="display:none" id="prev" onclick="changeMonth(this)">\<</td>';
			to_add_html += '<td class="month-popup" onclick="clickOnLabel(this)"> '+month_name+'</td>';
			to_add_html += '<td class="change-month" style="display:none" id="next" onclick="changeMonth(this)">\></td>';
		}
		if(order[i] === 'D'){
			to_add_html += '<td class="day-popup" onclick="clickOnLabel(this)"> '+day_name+' '+day_number+'</td>';
		}
	}

	to_add_html         += '</tr></table><br />';
	div_date.innerHTML  += to_add_html;

	element.innerHTML   += '<div class="selector"></div>';
	var div_selector    = element.querySelector('.selector');

	if(contains(order, 'D')){
		var date_selector_html = getHtmlForDateSelector(display_date, display_selection);
		div_selector.innerHTML += date_selector_html;
	}
	if(contains(order, 'M')){
		var month_selector_html = getHtmlForMonthSelector(date);
		div_selector.innerHTML += month_selector_html;
	}
	if(contains(order, 'Y')){
		var year_selector_html = getHtmlForYearSelector(date);
		div_selector.innerHTML += year_selector_html;
	}

	if(contains(order, 'D')){
		var day_selector    = div_selector.querySelector('.day-selector');
		displaySelector(day_selector);
	}
	else if(contains(order, 'M')){
		var month_selector  = div_selector.querySelector('.month-selector');
		displaySelector(month_selector);
	}
	else if(contains(order, 'Y')){
		var year_selector   = div_selector.querySelector('.year-selector');
		displaySelector(year_selector);
	}
}

/**
 * initialise time popup with right selectors
 * @param element the time popup
 */
function initialiseTimePopup(element){
	var input_time      = getInputFormat(element.parentNode.querySelector('.time'));
	var time            = moment(input_time, format.time.edit);
	var hour            = null;
	var minute          = null;
	var second          = null;

	element.innerHTML   += '<div class="time-in-popup"></div>';
	var div_time        = element.querySelector('.time-in-popup');
	var to_add_html     = '<table style="width:100%; text-align:center" class="selector-display"><tr>';

	if(contains(format.time.edit.split(''), 'H')){
		hour        = time.format('HH');
		to_add_html += '<td class="hour-popup" onclick="clickOnLabel(this)">' + hour + '</td>';
		if(contains(format.time.edit.split(''), 'm') || contains(format.time.edit.split(''), 's')){
			to_add_html += '<td> : </td>';
		}
	}
	if(contains(format.time.edit.split(''), 'm')){
		minute      = time.format('mm');
		to_add_html += '<td class="minute-popup" onclick="clickOnLabel(this)">' + minute + '</td>';
		if(contains(format.time.edit.split(''), 's')){
			to_add_html += '<td> : </td>';
		}
	}
	if(contains(format.time.edit.split(''), 's')){
		second      = time.format('ss');
		to_add_html += '<td class="second-popup" onclick="clickOnLabel(this)">' + second + '</td>';
	}

	to_add_html         += '</tr></table><br />';
	div_time.innerHTML  += to_add_html;
	element.innerHTML   += '<div class="selector"></div>';
	var div_selector    = element.querySelector('.selector');
	if(contains(format.time.edit.split(''), 'H')){
		var hour_html           = getHtmlForHourSelector(hour);
		div_selector.innerHTML += hour_html;
	}
	if(contains(format.time.edit.split(''), 'm')){
		var minute_html         = getHtmlForMinuteSelector(minute);
		div_selector.innerHTML += minute_html;
	}
	if(contains(format.time.edit.split(''), 's')){
		var second_html         = getHtmlForSecondSelector(second);
		div_selector.innerHTML += second_html;
	}

	if(contains(format.time.edit.split(''), 'H')){
		var hour_selector   = div_selector.querySelector('.hour-selector');
		displaySelector(hour_selector);
	}
	else if(contains(format.time.edit.split(''), 'm')){
		var minute_selector = div_selector.querySelector('.minute-selector');
		displaySelector(minute_selector);
	}
	else if(contains(format.time.edit.split(''), 's')){
		var second_selector = div_selector.querySelector('.second-selector');
		displaySelector(second_selector);
	}
}

/**
 * Check if the given element is date input or not
 * @param element the input to check if is a date or a time input
 */
function isDate(element){
	return element.getAttribute('class') === 'date';
}

/**
 * When a minute (a td) is clicked in the minute selector
 * @param element the clicked minute (td)
 */
function minuteSelectorClicked(element){
	var table         = element.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.td-minute-selector');
	td_selectable.forEach(function(element){
		element.style.background    = '';
		element.style.borderRadius  = '';
		element.id                  = '';
	});
	element.style.background    = 'lightgreen';
	element.style.borderRadius  ='10000px';
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	updateMinute(popup.parentNode, element.innerHTML);

	if(!contains(format.time.edit.split(''), 's')){
		popup.style.display = "none";
		popup.blur();
	}
	else{
		displayPopup(popup, null);
		var second_selector = popup.querySelector('.selector').querySelector('.second-selector');
		displaySelector(second_selector);
	}
}

/**
 * When a td in month selector is clicked
 * @param element the clicked td
 */
function monthSelectorClicked(element){
	var table         = element.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.td-month-selector');
	td_selectable.forEach(function(element){
		element.style.background    = '';
		element.style.borderRadius  = '';
		element.id                  = '';
	});
	element.style.background    = 'lightgreen';
	element.style.borderRadius  = '10000px';
	element.id                  = 'clicked';

	var popup                   = getPopupParent(table);
	updateMonth(popup.parentNode, element.innerHTML);
	if(!contains(format.date.edit.split(''), 'D')){
		popup.style.display = "none";
		popup.blur();
	}
	else{
		displayPopup(popup, null);
		var day_selector = popup.querySelector('.day-selector');
		displaySelector(day_selector);
	}
}

/**
 * When mouse is over the td
 * @param element the td
 */
function mouseIsOverTd(element){
	element.style.background    = 'lightgreen';
	element.style.borderRadius  = '10000px';
}

/**
 * When mouse leave td
 * @param element the td
 */
function mouseLeftTd(element){
	if(element.getAttribute('id') === 'clicked'){
		element.style.background    = 'bisque';
		element.style.borderRadius  = '10000px';
	}
	else{
		element.style.background    = '';
		element.style.borderRadius  = '';
	}
}

/**
 * Change decenie on year-selector view (add or sub 10 years)
 * @param element the clicked button "prev 10" or "next 10"
 */
function changeDecenie(element){
	var decenie;
	if(element.className === 'th-prev-ten'){
		decenie = -10;
	}
	else{
		decenie = 10;
	}

	var table   = element.parentNode.parentNode;
	var all_td  = table.querySelectorAll('td');
	all_td.forEach(function (element) {
		var year          = parseInt(element.innerHTML);
		year              += decenie;
		element.innerHTML = year;
	});
}

/**
 * When a second (a td) is clicked in the second selector
 * @param element the clicked second (td)
 */
function secondSelectorClicked(element){
	var table         = element.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.td-second-selector');
	td_selectable.forEach(function(element){
		element.style.background    = '';
		element.style.borderRadius  = '';
		element.id                  = '';
	});
	element.style.background    = 'lightgreen';
	element.style.borderRadius  = '10000px';
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	updateSecond(popup.parentNode, element.innerHTML);

	popup.style.display         = "none";
	popup.blur();
}

/**
 * Set the input format for the given element
 * @param element the input to set on edit format
 */
function setInputFormat(element){
	if(element.id.split('$$')[0] == 1){
		var value_element = element.value;
		if(isDate(element)){
				var to_edit   = moment(value_element, format.date.display);
				var new_value = to_edit.format(format.date.edit).toString();
				if(!to_edit.isValid(new_value)){
					new_value = element.id.split('$$')[1];
					new_value = moment(new_value, format.date.display);
					new_value = new_value.format(format.date.edit).toString();
				}
		}
		else{
				var to_edit   = moment(value_element, format.time.display);
				var new_value = to_edit.format(format.time.edit).toString();
				if(!to_edit.isValid(new_value)){
					new_value = element.id.split('$$')[1];
					new_value = moment(new_value, format.time.display);
					new_value = new_value.format(format.time.edit).toString();
				}
		}
		element.value = new_value;
		element.id    = 0 + '$$' + new_value;
	}
}

/**
 * Set listeners on given date input
 * @param element the date input where set the listeners
 */
function setListenersDate(element){
	element.addEventListener("focus", function(){eventFocusOnDate(element);});
	element.addEventListener("blur",  function(event){eventLostFocusOnDate(element, event);});
	element.addEventListener("keyup", function(){eventKeyUp(element);});
}

/**
 * Set listeners on given time input
 * @param element the time input where set the listeners
 */
function setListenersTime(element){
	element.addEventListener("focus", function(){eventFocusOnTime(element);});
	element.addEventListener("blur",  function(event){eventLostFocusOnTime(element, event);});
	element.addEventListener("keyup", function(){eventKeyUp(element);});
}

/**
 * Set de output( = display) format for the given element
 * @param element the input to set to output format
 */
function setOutputFormat(element){
	var value_element = element.value;
	if(element.id.split('$$')[0] == 0){
		if(isDate(element)){
			var to_display  = moment(value_element, format.date.edit);
			var new_value   = to_display.format(format.date.display).toString();
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.date.edit);
				new_value = new_value.format(format.date.display).toString();
			}
		}
		else{
			var to_display  = moment(value_element, format.time.edit);
			var new_value   = to_display.format(format.time.display).toString();
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.time.edit);
				new_value = new_value.format(format.time.display).toString();
			}
		}
		element.value = new_value;
		element.id    = 1 + '$$' + new_value;
	}

}

/**
 * Update the date (day) with the new value
 * @param element the div containing inputs
 * @param value the new value to set for days
 */
function updateDate(element, value, displayed_date){
	var displayed_date  = moment.unix(displayed_date);
	var date_input      = element.querySelector('.date');
	var date            = moment(getInputFormat(date_input), format.date.edit);
	console.log(displayed_date);
	console.log(date_input)
	date.date(value);
	date.month(displayed_date.month());
	date.year(displayed_date.year());
	date_input.value  = date.format(format.date.edit);
	eventLostFocusOnDate(date_input, null);
	element.querySelector('.popup-date-picker').blur();
}

/**
 * Update value of real (not displayed) input used for form
 * @param element the input
 */
function updateDateRealInput(element){
	var last_input    = getParentInput(element);
	var last_value    = last_input.getAttribute('value');
	var last_has_date = moment(last_value, original_format);
	if(isDate(element)){

		var new_date    = getInputFormat(element);
		new_date        = moment(new_date, format.date.edit);

		last_has_date.year(new_date.year());
		last_has_date.month(new_date.month());
		last_has_date.date(new_date.date());

		last_input.setAttribute('value', last_has_date.format(original_format));
	}
	else{
		var new_time  = getInputFormat(element);
		new_time      = moment(new_time, format.time.edit);

		last_has_date.hour(new_time.hour());
		last_has_date.minute(new_time.minute());
		last_has_date.second(new_time.second());
		last_has_date.millisecond(new_time.millisecond());

		last_input.setAttribute('value', last_has_date.format(original_format));
	}
}

/**
 * Update hour
 * @param element div containing date / time inputs
 * @param value new value for hours
 */
function updateHour(element, value){
	var time_input  = element.querySelector('.time');
	var time        = moment(getInputFormat(time_input), format.time.edit);
	time.hour(parseInt(value));
	time_input.value  = time.format(format.time.edit);
	time_input.id     = 0 + '$$' + time.format(format.time.edit);
	updateDateRealInput(time_input);
	var popup         = element.querySelector('.popup-time-picker');
	displayPopup(popup, null);
}

/**
 * Re-set value of label from input
 * @param element popup
 */
function updateLabels(element){
	var div_labels = element.querySelector('.date-in-popup');
	if(div_labels){
		var input = getInputOfPopup(element);
		var value = getOutputFormat(input);
		var date  = moment(value, format.date.display);
		var month = div_labels.querySelector('.month-popup');
		var year  = div_labels.querySelector('.year-popup');
		console.log(date);

		if(month){
			month.innerHTML = ' ' + date.format('MMMM');
		}
		if(year){
			year.innerHTML = ' ' + date.format('YYYY');
		}
	}
}

/**
 * Update minute
 * @param element div containing date / time inputs
 * @param value new value for minutes
 */
function updateMinute(element, value){
	var time_input  = element.querySelector('.time');
	var time        = moment(getInputFormat(time_input), format.time.edit);
	time.minute(parseInt(value));
	time_input.value  = time.format(format.time.edit);
	time_input.id     = 0 + '$$' + time.format(format.time.edit);
	updateDateRealInput(time_input);
	var popup         = element.querySelector('.popup-time-picker');
	displayPopup(popup, null);
}

/**
 * Update month
 * @param element div containing date / time inputs
 * @param value new value for months
 */
function updateMonth(element, value){
	var date_input  = element.querySelector('.date');
	var date        = moment(getInputFormat(date_input), format.date.edit);
	date.month(value);
	date_input.value  = date.format(format.date.edit);
	date_input.id     = 0 + '$$' + date.format(format.date.edit);
	updateDateRealInput(date_input);
	var popup         = element.querySelector('.popup-date-picker');
	displayPopup(popup, null);
}

/**
 * Update second
 * @param element div containing date / time inputs
 * @param value new value for seconds
 */
function updateSecond(element, value){
	var time_input  = element.querySelector('.time');
	var time        = moment(getInputFormat(time_input), format.time.edit);
	time.second(parseInt(value));
	time_input.value  = time.format(format.time.edit);
	time_input.id     = 0 + '$$' + time.format(format.time.edit);
	updateDateRealInput(time_input);
	var popup         = element.querySelector('.popup-time-picker');
	displayPopup(popup, null);
}

/**
 * Update year
 * @param element div containing date / time inputs
 * @param value new value for years
 */
function updateYear(element, value){
	var date_input  = element.querySelector('.date');
	var date        = moment(getInputFormat(date_input), format.date.edit);
	date.year(value);
	date_input.value  = date.format(format.date.edit);
	date_input.id     = 0 + '$$' + date.format(format.date.edit);
	updateDateRealInput(date_input);
	var popup         = element.querySelector('.popup-date-picker');
	displayPopup(popup, null);
}

/**
 * When a year (a td) is clicked in the year selector
 * @param element the clicked year (td)
 */
function yearSelectorClicked(element){
	var table         = element.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.td-year-selector');
	td_selectable.forEach(function(element){
		element.style.background    = '';
		element.style.borderRadius  = '';
		element.id                  = '';
	});
	element.style.background    = 'lightgreen';
	element.style.borderRadius  = '10000px';
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	updateYear(popup.parentNode, element.innerHTML);
	if(!contains(format.date.edit.split(''), 'D') && !contains(format.date.edit.split(''), 'M')){
		popup.style.display = "none";
		popup.blur();
	}
	else{
		displayPopup(popup, null);
		if(contains(format.date.edit.split(''), 'M')){
			var month_selector = popup.querySelector('.month-selector');
			displaySelector(month_selector);
		}
		else{
			var day_selector = popup.querySelector('.day-selector');
			displaySelector(day_selector);
		}
	}
}
