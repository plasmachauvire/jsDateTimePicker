/*
 * Define the format of date and time for display and for edition, not the format send by form (still unchanged)
 *
 * possible formats :
 *
 * M            month number
 * MM           month number
 * MMM          3 letters of month name
 * MMMM         full month name
 * d            number of day in week : monday --> 0, tuesday --> 1, ...
 * dd           two letters of day name
 * ddd          3 letters of day name
 * dddd         full day name
 * D            day number in month : 1, 2, .., 30, 31
 * DD           day number in month : 01, 02, .., 30, 31
 * DDD          day number in year : 1, 2, ..., 364, 365
 * DDDD         day number in year : 001, 002, ..., 364, 365
 * Y            full year
 * YY           last 2 numbers of year
 * YYYY         full year
 * [yourText]   will be displayed as text
 * H            hour
 * HH           hour
 * h            hour
 * hh           hour
 * m            minute
 * mm           minute
 * s            second
 * ss           second
 * a            am / pm
 * A            AM / PM
 * o            st / nd / rd / th --> Do : 1st / 2nd / 3rd / 4th / ...
 * w            week number in year : 1, 2, .., 51, 52, 53
 * ww           week number in year : 01, 02, .., 51, 52, 53
 * W            week number in year : 1, 2, .., 51, 52, 53
 * WW           week number in year : 01, 02, .., 51, 52, 53
 * separators   for example separators like '/' , ',', ':', '-', ...
 *
 * advice : some format should'nt be used in edit format such as d / dd / ddd / dddd
 * or only with at least D for this example
 */
var format = {
	date : {
		edit    : 'DD-MM-YYYY',
		display :'Do MMM YYYY'
	},
	time : {
		edit    : 'HH:mm:ss a',
		display : 'HH:mm a'
	}
};

var locale_lang = window.navigator.language;

/*

#######################
# EXAMPLES OF FORMATS #
#######################

## basic
var format = {
	date : {
		edit    : 'DD-M-YYYY',
		display :'MMM Do YYYY'
	},
	time : {
		edit    : 'HH:mm:ss a',
		display : 'HH:mm a'
	}
};

## weeks of year
var format = {
	date : {
		edit    : 'w [of] Y',
		display : '[week] w [of] Y'
	}
};

## only and hour + minute
var format = {
	time : {
		edit    : 'HH:mm',
		display : 'HH:mm a'
	}
};

## day number in year + time only hour
var format = {
	date : {
		edit    : 'DDD-YYYY',
		display :'DDDo [day of] Y'
	},
	time : {
		edit    : 'HH',
		display : 'HH a'
	}
};

*/

/**
 * Original format of original input send with form
 * @type {string}
 */
var original_format = 'DD/MM/YYYY hh:mm';

/*
 * #################
 * # CONFIGURATION #
 * #################
 */

// ## Comportment ##

var auto_close_when_more_precise_date_selected  = 0;  /*
																											 * day is the most precise, then month
																											 * and finaly year
																											 */

var auto_close_when_more_precise_time_selected  = 0;  /*
                                                       * second is the most precise, then minute
																											 * and finaly hour
																											 */

var auto_redirect_to_next_when_select_date      = 0;  /* redirection order : year -> month -> day */

var auto_redirect_to_next_when_select_time      = 0;  /* redirection order : hour -> minute -> second */

var live_check_input_date                       = 1;  /*
																											 * in all cases, only check when date is in
																											 * digit format (except for the st / nd / rd / ..
                                                       * after day number)
                                                       */

var live_check_input_time                       = 1;

var disabled_buttons_can_be_overred_and_clicked = 0;  /*
                                                       * Disabled buttons like in date selector can't by
																											 * default be selected (no action when click on it)
																											 * and has'nt specific display when overred
																											 */

// ## Displaying ##
var number_of_letters_for_days_name_in_selector = 3; // ! may have to adapt width of popup !



/**
 * Used to check if date / time user in being writing are correct
 */
var regex = {
	MM    : {
		1 : '([0-1])',
		2 : '([0-1][0-9])'
	},
	M     : '(([1-9])|(1[0-2]))',
	DDD   : '([0-9]{1,3})',
	DDDD   : '([0-9]{1,3})',
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
		1 : '([a-z])',
		2 : '([a-z]{2})'
	},
	A     :	{
		1 : '([A-Z])',
		2 : '([A-Z]{2})'
	},
	H     : {
		1 : '[0-2]',
		2 : '([0-2][0-9])'
	},
	HH    : {
		1 : '[0-2]',
		2 : '([0-2][0-9])'
	},
	h     : '(([1-2][0-9])|([0-9]))',
	hh    : {
		1 : '[0-2]',
		2 : '([0-2][0-9])'
	},
	m     : {
		1 : '([0-5])',
		2 : '([0-5][0-9])'
	},
	mm    : {
		1 : '([0-5])',
		2 : '([0-5][0-9])'
	},
	s     : {
		1 : '([0-5])',
		2 : '([0-5][0-9])'
	},
	ss    : {
		1 : '([0-5])',
		2 : '([0-5][0-9])'
	},
	w     :{
		1 : '([0-5])',
		2 : '([0-5][0-9])'
	},
	W     :{
		1 : '([0-5])',
		2 : '([0-5][0-9])'
	},
	ww     :{
		1 : '([0-5])',
		2 : '([0-5][0-9])'
	},
	WW     :{
		1 : '([0-5])',
		2 : '([0-5][0-9])'
	}
};

var dates         = document.querySelectorAll('.date_time');
dates.forEach(hideAndSetNew);
dates.forEach(setDisplayFormat);

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
			if(!(typeof checking_regex === 'string')){

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
 * Change decenie on year-selector view (add or sub 10 years)
 * @param element the clicked button "prev 10" or "next 10"
 */
function changeDecenie(element){
	var decenie;
	if(element.className === 'label-prev-ten'){
		decenie = -10;
	}
	else{
		decenie = 10;
	}

	var table   = element.parentNode.parentNode.parentNode.parentNode;
	var all_td  = table.querySelectorAll('.label-year-selector');
	all_td.forEach(function (element) {
		var year          = parseInt(element.innerHTML);
		year              += decenie;
		element.innerHTML = year;
	});
}

/**
 * Go to the next of previous month
 * @param element clicked button
 */
function changeMonth(element){
	var popup           = getPopupParent(element);
	var input           = getInputOfPopup(popup)
	var current_date    = moment(getInputFormat(input), format.date.edit, locale_lang, true);
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
	displayPopup(popup, current_date);
}

/**
 * Change from Am to Pm or from Pm to Am in hour selector
 * @param element the clicked button (Am or Pm)
 */
function changePartOfDay(element){
	var table   = element.parentNode.parentNode.parentNode;
	var pm      = table.querySelectorAll('.pm-hour-tr');
	var am      = table.querySelectorAll('.am-hour-tr');
	var other_td;

	if(element.className === 'td-hour-am-picker'){
		other_td = element.parentNode.parentNode.querySelector('.td-hour-pm-picker');
		pm.forEach(function(element){
			element.style.display = 'none';
		});
		am.forEach(function(element){
			element.style.display = '';
		});
	}
	else{
		other_td = element.parentNode.parentNode.querySelector('.td-hour-am-picker');
		am.forEach(function(element){
			element.style.display = 'none';
		});
		pm.forEach(function(element){
			element.style.display = '';
		});
	}

	other_td.id               = 'basic';
	element.id                = 'clicked';
}

/**
 * When a label in popup is clicked
 * @param element the clicked label
 */
function clickOnLabel(element){
	var parentDiv   = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
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
 * @param element the clicked day (<label>)
 */
function dateSelectorClicked(element, displayed_date){
	var table         = element.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.label-date-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	if(disabled_buttons_can_be_overred_and_clicked){
		var disabled_td = table.querySelectorAll('.disabled-label');
		disabled_td.forEach(function(element){
			element.id                = 'basic';
		});
	}
	element.id                    = 'clicked';

	var popup                     = getPopupParent(table);

	if(element.className === 'disabled-label'){
		displayed_date  = moment.unix(displayed_date).locale(locale_lang);
		if(parseInt(element.innerHTML) > 15){
			displayed_date.add(-1, 'months');
		}
		else if(parseInt(element.innerHTML) < 15){
			displayed_date.add(1, 'months');
		}
		displayed_date = displayed_date.format('X');
	}

	updateDate(popup.parentNode, element.innerHTML, displayed_date);
	if(auto_close_when_more_precise_date_selected){
		popup.style.display           = "none";
		popup.blur();
	}
	else{
		displayPopup(popup, null);
		var day_selector = popup.querySelector('.day-selector');
		displaySelector(day_selector);
	}
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

	var all_labels      = display_part.querySelectorAll('label');
	all_labels.forEach(function (label){
		var name_to_keep = element.className.split('-')[0];
		if(label.className.split('-')[0] === name_to_keep){
			label.id = 'display-selected';
		}
		else{
			if(label.id !== 'prev' && label.id !== 'next'){
				label.id = 'display-basic';
			}
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
	if((isDate(element) && live_check_input_date) || (!isDate(element) && live_check_input_time)){
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
	else{
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

	var monday    = moment.unix(345600).locale(locale_lang).format('dddd');
	var tuesday   = moment.unix(432000).locale(locale_lang).format('dddd');
	var wednesday = moment.unix(518400).locale(locale_lang).format('dddd');
	var thursday  = moment.unix(0).locale(locale_lang).format('dddd');
	var friday    = moment.unix(86400).locale(locale_lang).format('dddd');
	var saturday  = moment.unix(172800).locale(locale_lang).format('dddd');
	var sunday    = moment.unix(259200).locale(locale_lang).format('dddd');

	var days      = [];
	days[0]       = monday;
	days[1]       = tuesday;
	days[2]       = wednesday;
	days[3]       = thursday;
	days[4]       = friday;
	days[5]       = saturday;
	days[6]       = sunday;

	var display_date = moment(date).locale(locale_lang);
	display_date = display_date.format('X');

	var first_day_of_month  = moment(date).locale(locale_lang);
	first_day_of_month.startOf('month');
	var name_first_day      = first_day_of_month.format('dddd');

	var last_day            = moment(date).locale(locale_lang);
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

	var html  = '<table class="day-selector" id="table-selector">'
						+   '<tr id="tr-day-columns-names">'
						+     '<th id="td-day-column-name">'+days[0].substr(0, number_of_letters_for_days_name_in_selector)+'</th>'
						+     '<th id="td-day-column-name">'+days[1].substr(0, number_of_letters_for_days_name_in_selector)+'</th>'
						+     '<th id="td-day-column-name">'+days[2].substr(0, number_of_letters_for_days_name_in_selector)+'</th>'
						+     '<th id="td-day-column-name">'+days[3].substr(0, number_of_letters_for_days_name_in_selector)+'</th>'
						+     '<th id="td-day-column-name">'+days[4].substr(0, number_of_letters_for_days_name_in_selector)+'</th>'
						+     '<th id="td-day-column-name">'+days[5].substr(0, number_of_letters_for_days_name_in_selector)+'</th>'
						+     '<th id="td-day-column-name">'+days[6].substr(0, number_of_letters_for_days_name_in_selector)+'</th>'
						+   '</tr>';


	var line              = 0;
	var index_start_month = arrayIndexOf(days, name_first_day);
	if(index_start_month !== -1){
		lines[0][index_start_month][0] = 1;
		lines[0][index_start_month][1] = 0;
		if(index_start_month !== 0){
			var prev_day = moment(first_day_of_month).locale(locale_lang);
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

	var id_disabled = '';
	var onclick_disable = '';
	if(disabled_buttons_can_be_overred_and_clicked){
		id_disabled = 'basic';
		onclick_disable = 'dateSelectorClicked(this, '+display_date+')';
	}


	for(var i = 0; i < lines.length; i++){
		if(lines[i] && lines[i][0] && lines[i][0][0]){
		html += '<tr>';
		for(var j = 0; j < lines[i].length; j++){
			if(lines[i][j][1] === 0){
				if(lines[i][j][0] == date_day_number && display_selection){
					html += '<td class="td-date-selector"><label class="label-date-selector" id="clicked" '
								+ 'onclick="dateSelectorClicked(this, '+display_date+')">' + lines[i][j][0] + '</label></td>';
				}
				else{
					html += '<td class="td-date-selector"><label class="label-date-selector" id="basic" '
								+ 'onclick="dateSelectorClicked(this, '+display_date+')">' + lines[i][j][0] + '</label></td>';
				}
			}
			else{
				html += '<td class="td-date-selector-disabled"><label class="disabled-label" id="'+id_disabled+'" onclick="'+onclick_disable+'">' + lines[i][j][0] + '</label></td>';
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
	var html = '<table class="hour-selector" id="table-selector">';


	var display_am = '';
	var display_pm = 'none';
	if(parseInt(hour) > 11){
		display_pm = '';
		display_am = 'none';

		html += '<tr id="tr-hour-am-pm-picker">'
					+ '<td><label class="td-hour-am-picker" id="basic" '
					+ 'onclick="changePartOfDay(this)">Am</label></td>'
					+ '<td></td>'
					+ '<td><label class="td-hour-pm-picker" id="clicked" '
					+ 'onclick="changePartOfDay(this)">Pm</label></td>'
					+ '</tr>';
	}
	else{
		html += '<tr id="tr-hour-am-pm-picker">'
					+ '<td><label class="td-hour-am-picker" id="clicked" '
					+ 'onclick="changePartOfDay(this)">Am</label></td>'
					+ '<td></td>'
					+ '<td><label class="td-hour-pm-picker" id="basic"  '
					+ 'onclick="changePartOfDay(this)">Pm</label></td>'
					+ '</tr>';

	}

	var number_per_line = 0;
	html += '<tr class="am-hour-tr" style="display:'+display_am+'">';
	for(var i = 0; i < 12; i++){
		if(number_per_line >= 3){
			html += '</tr><tr class="am-hour-tr" style="display:'+display_am+'">';
			number_per_line = 0;
		}
		if(i === parseInt(hour)){
			html += '<td class="td-hour-selector"><label class="label-hour-selector" id="clicked" '
						+ 'onclick="hourSelectorClicked(this)">' + i + '</label></td>';
		}
		else{
			html += '<td class="td-hour-selector"><label class="label-hour-selector" id="basic" '
						+ 'onclick="hourSelectorClicked(this)">' + i + '</label></td>';
		}
		number_per_line++;
	}

	html            += '<tr class="pm-hour-tr" style="display:'+display_pm+'">';
	number_per_line = 0;
	for(var i = 12; i < 24; i++){
		if(number_per_line >= 3){
			html += '</tr><tr class="pm-hour-tr" style="display:'+display_pm+'">';
			number_per_line = 0;
		}
		if(i === parseInt(hour)){
			html += '<td class="td-hour-selector"><label class="label-hour-selector" id="clicked" '
						+ 'onclick="hourSelectorClicked(this)">' + i + '</label></td>';
		}
		else{
			html += '<td class="td-hour-selector"><label class="label-hour-selector" id="basic" '
						+ 'onclick="hourSelectorClicked(this)">' + i + '</label></td>';
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
	var html = '<table class="minute-selector" id="table-selector">';

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
			html += '<td class="td-minute-selector"><label class="label-minute-selector" id="clicked" '
						+ 'onclick="minuteSelectorClicked(this)">' + (i * 5) + '</label></td>';
		}
		else{
			html += '<td class="td-minute-selector"><label class="label-minute-selector" id="basic" '
						+ 'onclick="minuteSelectorClicked(this)">' + (i * 5) + '</label></td>';
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
	var html                = '<table class="month-selector" id="table-selector">';
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
				html += '<td class="td-month-selector"><label class="label-month-selector" id="clicked" '
							+ 'onclick="monthSelectorClicked(this)">' + lines[i][j][0] + '</label></td>';
			}
			else{
				html += '<td class="td-month-selector"><label class="label-month-selector" id="basic" '
							+ 'onclick="monthSelectorClicked(this)">' + lines[i][j][0] + '</label></td>';
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
	var html        = '<table class="second-selector" id="table-selector">';
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
			html += '<td class="td-second-selector"><label class="label-second-selector" id="clicked" '
						+ 'onclick="secondSelectorClicked(this)">' + (i * 5) + '</label></td>';
		}
		else{
			html += '<td class="td-second-selector"><label class="label-second-selector" id="basic" '
						+ 'onclick="secondSelectorClicked(this)">' + (i * 5) + '</label></td>';
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
	var html          = '<table class="year-selector" id="table-selector">';
	var current_year  = date.format('YYYY');

	if(!year){
		year = current_year;
	}

	html  += '<tr>'
				  + '<th class="th-prev-ten"><label class="label-prev-ten" id="basic" onclick="changeDecenie(this)">Prev 10</label></th>'
				  + '<th></th>'
					+ '<th></th>'
					+ '<th class="th-next-ten"><label class="label-next-ten" id="basic" onclick="changeDecenie(this)">Next 10</label></th>'
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
			html += '<td class="td-year-selector"><label class="label-year-selector" id="clicked" '
						+ 'onclick="yearSelectorClicked(this)">' + first_displayed + '</label></td>';
		}
		else{
			html += '<td class="td-year-selector"><label class="label-year-selector" id="basic" '
						+ 'onclick="yearSelectorClicked(this)">' + first_displayed + '</label></td>';
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
			var to_display  = moment(element.value, format.date.display, locale_lang, true);
			var new_value   = to_display.format(format.date.edit).toString();
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.date.display, locale_lang, true);
				new_value = new_value.format(format.date.edit).toString();
			}
			return new_value;
		}
		return element.value;
	}
	else{
		if(element.id.split('$$')[0] == 1){
			var to_display  = moment(element.value, format.time.display, locale_lang, true);
			var new_value   = to_display.format(format.time.edit).toString();
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.time.display, locale_lang, true);
				new_value = new_value.format(format.time.edit).toString();
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
	var january     = moment.unix(0).locale(locale_lang).format('MMMM');
	var february    = moment.unix(2678400).locale(locale_lang).format('MMMM');
	var march       = moment.unix(5097600).locale(locale_lang).format('MMMM');
	var april       = moment.unix(7776000).locale(locale_lang).format('MMMM');
	var may         = moment.unix(10368000).locale(locale_lang).format('MMMM');
	var june        = moment.unix(13046400).locale(locale_lang).format('MMMM');
	var july        = moment.unix(15638400).locale(locale_lang).format('MMMM');
	var august      = moment.unix(18316800).locale(locale_lang).format('MMMM');
	var september   = moment.unix(20995200).locale(locale_lang).format('MMMM');
	var october     = moment.unix(23587200).locale(locale_lang).format('MMMM');
	var november    = moment.unix(26265600).locale(locale_lang).format('MMMM');
	var december    = moment.unix(28857600).locale(locale_lang).format('MMMM');

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

function getOrderDateEdit(){
	var order = [];
	var j = 0;
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
		else if(split_format[i] === 'W' || split_format[i] === 'w'){
			if(!contains(order, 'D')){
				order[j] = 'D';
				j++;
			}
			if(!contains(order, 'M')){
				order[j] = 'M';
				j++
			}
		}
		else if(format.date.edit.indexOf('DDD') !== -1){
			if(!contains(order, 'D')){
				order[j] = 'D';
				j++;
			}
			if(!contains(order, 'M')){
				order[j] = 'M';
				j++
			}
		}
	}
	return order;
}

/**
 * Get output format of an input without changing the current displayed format
 * @param element the input
 * @returns {*} the value as output format
 */
function getOutputFormat(element){
	if(isDate(element)){
		if(element.id.split('$$')[0] == 0){
			var to_display  = moment(element.value, format.date.edit, locale_lang, true);
			var new_value   = to_display.format(format.date.display).toString();
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.date.edit, locale_lang, true);
				new_value = new_value.format(format.date.display).toString();
			}
			return new_value;
		}
		return element.value;
	}
	else{
		if(element.id.split('$$')[0] == 0){
			var to_display  = moment(element.value, format.time.edit, locale_lang, true);
			var new_value   = to_display.format(format.time.display).toString();
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.time.edit, locale_lang, true);
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
	var last_input        = element.querySelector('.datetime');
	if(last_input){
		element.style.display = 'none';
		var parentDiv         = element.parentNode;
		var name_last_input   = last_input.getAttribute('name');
		var date_input        = name_last_input + '_date';
		var time_input        = name_last_input + '_time';
		var last_input_value  = last_input.getAttribute('value');


		if(last_input_value === ''){
			last_input_value = moment().locale(locale_lang);
			last_input_value.format(original_format);
		}

		var display_date      = moment(last_input_value, original_format, locale_lang, false);

		parentDiv.innerHTML   +=  '<div class="date-time-picker"></div>';
		parentDiv = parentDiv.querySelector('.date-time-picker');

		if("date" in format){
			var date              = display_date.format(format.date.display).toString();
			parentDiv.innerHTML   += '<input autocomplete="off" class="date" id="1$$'+date+'" '
														+ 'name="'+date_input+'" value="'+date+'">';
		}
		if("time" in format){
			var time              = display_date.format(format.time.display).toString();
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

}

/**
 * When an hour (a td) is clicked in the hour selector
 * @param element the clicked hour (td)
 */
function hourSelectorClicked(element){
	var table         = element.parentNode.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.label-hour-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	updateHour(popup.parentNode, element.innerHTML);

	if(!contains(format.time.edit.split(''), 'm') && !contains(format.time.edit.split(''), 's')){
		if(auto_close_when_more_precise_time_selected){
			popup.style.display = "none";
			popup.blur();
		}
	}
	else{
		displayPopup(popup, null);
		if(auto_redirect_to_next_when_select_time){
			if(contains(format.time.edit.split(''), 'm')){
				var minute_selector = popup.querySelector('.selector').querySelector('.minute-selector');
				displaySelector(minute_selector);
			}
			else{
				var second_selector = popup.querySelector('.selector').querySelector('.second-selector');
				displaySelector(second_selector);
			}
		}
		else{
			var hour_selector = popup.querySelector('.selector').querySelector('.hour-selector');
			displaySelector(hour_selector);
		}
	}
}

/**
 * initialize content of date popup
 * @param element the date popup
 */
function initialiseDatePopup(element, display_date){
	var output_date       = getOutputFormat(element.parentNode.querySelector('.date'));
	var date              = moment(output_date, format.date.display, locale_lang, true);
	var display_selection = false;

	if(date.isSame(display_date)){
		display_selection = true;
	}

	if(!display_date){
		display_date      = date;
		display_selection = true;
	}
	var order         = getOrderDateEdit();

	element.innerHTML += '<div class="date-in-popup"></div>';
	var div_date      = element.querySelector('.date-in-popup');

	var to_add_html   = '<table class="selector-display"><tr id="tr-display-date">';
	for(var i = 0; i < order.length; i++){
		if(order[i] === 'Y'){
			var year    = display_date.format('Y');
			to_add_html += '<td id="td-display-year"><label class="year-popup" id="display-basic" onclick="clickOnLabel(this)"> '+year+'</label></td>';
		}
		if(order[i] === 'M'){
			var month_name    = display_date.format('MMMM');
			to_add_html += '<td id="td-display-month-switch"><label class="change-month" style="display:none" id="prev" onclick="changeMonth(this)">\<</label></td>';
			to_add_html += '<td id="td-display-month"><label class="month-popup" id="display-basic" onclick="clickOnLabel(this)"> '+month_name+'</label></td>';
			to_add_html += '<td id="td-display-month-switch"><label class="change-month" style="display:none" id="next" onclick="changeMonth(this)">\></label></td>';
		}
		if(order[i] === 'D'){
			var day_number    = display_date.format('D');
			if(format.date.display.indexOf('Do') !== -1){
				day_number      = display_date.format('Do');
			}
			var day_name      = display_date.format('dddd');

			to_add_html += '<td id="td-display-day"><label class="day-popup" id="display-basic" onclick="clickOnLabel(this)"> '+day_name+' '+day_number+'</label></td>';
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
	var time            = moment(input_time, format.time.edit, locale_lang, true);
	var hour            = null;
	var minute          = null;
	var second          = null;

	element.innerHTML   += '<div class="time-in-popup"></div>';
	var div_time        = element.querySelector('.time-in-popup');
	var to_add_html     = '<table class="selector-display"><tr id="tr-display-time">';

	if(contains(format.time.edit.split(''), 'H')){
		hour        = time.format('HH');
		to_add_html += '<td id="td-display-hour"><label class="hour-popup" id="display-basic" onclick="clickOnLabel(this)">' + hour + '</label></td>';
		if(contains(format.time.edit.split(''), 'm') || contains(format.time.edit.split(''), 's')){
			to_add_html += '<td id="td-display-separator"> : </td>';
		}
	}
	if(contains(format.time.edit.split(''), 'm')){
		minute      = time.format('mm');
		to_add_html += '<td id="td-display-minute"><label class="minute-popup" id="display-basic" onclick="clickOnLabel(this)">' + minute + '</label></td>';
		if(contains(format.time.edit.split(''), 's')){
			to_add_html += '<td id="td-display-separator"> : </td>';
		}
	}
	if(contains(format.time.edit.split(''), 's')){
		second      = time.format('ss');
		to_add_html += '<td id="td-display-second"><label class="second-popup" id="display-basic" onclick="clickOnLabel(this)">' + second + '</label></td>';
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
	var td_selectable = table.querySelectorAll('.label-minute-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	updateMinute(popup.parentNode, element.innerHTML);

	if(!contains(format.time.edit.split(''), 's')){
		if(auto_close_when_more_precise_time_selected){
			popup.style.display = "none";
			popup.blur();
		}
	}
	else{
		displayPopup(popup, null);
		if(auto_redirect_to_next_when_select_time){
			var second_selector = popup.querySelector('.selector').querySelector('.second-selector');
			displaySelector(second_selector);
		}
		else{
			var minute_selector = popup.querySelector('.selector').querySelector('.minute-selector');
			displaySelector(minute_selector);
		}
	}
}

/**
 * When a td in month selector is clicked
 * @param element the clicked td
 */
function monthSelectorClicked(element){
	var table         = element.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.label-month-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	element.id                  = 'clicked';

	var popup                   = getPopupParent(table);
	updateMonth(popup.parentNode, element.innerHTML);
	if(!contains(getOrderDateEdit(), 'D')){
		if(auto_close_when_more_precise_date_selected){
			popup.style.display = "none";
			popup.blur();
		}
	}
	else{
		displayPopup(popup, null);
		if(auto_redirect_to_next_when_select_date){
			var day_selector = popup.querySelector('.day-selector');
			displaySelector(day_selector);
		}
		else{
			var month_selector = popup.querySelector('.month-selector');
			displaySelector(month_selector);
		}
	}
}

/**
 * When a second (a td) is clicked in the second selector
 * @param element the clicked second (td)
 */
function secondSelectorClicked(element){
	var table         = element.parentNode.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.label-second-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	updateSecond(popup.parentNode, element.innerHTML);

	if(auto_close_when_more_precise_time_selected){
		popup.style.display         = "none";
		popup.blur();
	}
	else{
		var second_selector = popup.querySelector('.second-selector');
		displaySelector(second_selector);
	}
}

/**
 * Set the input format for the given element
 * @param element the input to set on edit format
 */
function setInputFormat(element){
	if(element.id.split('$$')[0] == 1){
		var value_element = element.value;
		if(isDate(element)){
				var to_edit   = moment(value_element, format.date.display, locale_lang, true);
				var new_value = to_edit.format(format.date.edit).toString();
				if(!to_edit.isValid(new_value)){
					new_value = element.id.split('$$')[1];
					new_value = moment(new_value, format.date.display, locale_lang, true);
					new_value = new_value.format(format.date.edit).toString();
				}
		}
		else{
				var to_edit   = moment(value_element, format.time.display, locale_lang, true);
				var new_value = to_edit.format(format.time.edit).toString();
				if(!to_edit.isValid(new_value)){
					new_value = element.id.split('$$')[1];
					new_value = moment(new_value, format.time.display, locale_lang, true);
					new_value = new_value.format(format.time.edit).toString();
				}
		}
		element.value = new_value;
		element.id    = 0 + '$$' + new_value;
	}
}

function setDisplayFormat(element){
	var input = element.querySelector('.datetime');
	if(!input){
		var parent = element.parentNode;
		var value = element.innerHTML;
		value = moment(value, original_format, locale_lang, false);
		var to_display = '';
		if("date" in format){
			to_display += value.format(format.date.display).toString();
		}
		if("time" in format){
			if("date" in format){
				to_display += ' ';
			}
			to_display += value.format(format.time.display).toString();
		}

		if(("time" in format) || ("date" in format)){
			parent.innerHTML += '<div class="'+element.className+'_display">' + to_display + '</div>';
			element.style.display = "none";
		}

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
			var to_display  = moment(value_element, format.date.edit, locale_lang, true);
			var new_value   = to_display.format(format.date.display).toString();
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.date.edit, locale_lang, true);
				new_value = new_value.format(format.date.display).toString();
			}
		}
		else{
			var to_display  = moment(value_element, format.time.edit, locale_lang, true);
			var new_value   = to_display.format(format.time.display).toString();
			if(!to_display.isValid(new_value)){
				new_value = element.id.split('$$')[1];
				new_value = moment(new_value, format.time.edit, locale_lang, true);
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
	var displayed_date  = moment.unix(displayed_date).locale(locale_lang);
	var date_input      = element.querySelector('.date');
	var date            = moment(getInputFormat(date_input), format.date.edit, locale_lang, true);
	date.date(value);
	date.month(displayed_date.month());
	date.year(displayed_date.year());
	date_input.value  = date.format(format.date.edit);

	date_input.id     = 0 + '$$' + date.format(format.date.edit);
	updateDateRealInput(date_input);
	var popup         = element.querySelector('.popup-date-picker');
	displayPopup(popup, null);
}

/**
 * Update value of real (not displayed) input used for form
 * @param element the input
 */
function updateDateRealInput(element){
	var last_input    = getParentInput(element);
	var last_value    = last_input.getAttribute('value');
	var last_has_date;

	if(last_value === ''){
		last_has_date = moment().locale(locale_lang);
		last_value = last_has_date.format(original_format).toString();
	}
	last_has_date = moment(last_value, original_format, locale_lang, false);
	if(isDate(element)){
		var new_value    = getInputFormat(element);
		var new_date        = moment(new_value, format.date.edit, locale_lang, true);

		last_has_date.year(new_date.year());
		last_has_date.month(new_date.month());
		last_has_date.date(new_date.date());

		last_input.setAttribute('value', last_has_date.format(original_format));
	}
	else{
		var new_time  = getInputFormat(element);
		new_time      = moment(new_time, format.time.edit, locale_lang, true);

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
	var time        = moment(getInputFormat(time_input), format.time.edit, locale_lang, true);
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
		var date  = moment(value, format.date.display, locale_lang, true);
		var month = div_labels.querySelector('.month-popup');
		var year  = div_labels.querySelector('.year-popup');

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
	var time        = moment(getInputFormat(time_input), format.time.edit, locale_lang, true);
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
	var date        = moment(getInputFormat(date_input), format.date.edit, locale_lang, true);
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
	var time        = moment(getInputFormat(time_input), format.time.edit, locale_lang, true);
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
	var date        = moment(getInputFormat(date_input), format.date.edit, locale_lang, true);
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
	var table         = element.parentNode.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.label-year-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	updateYear(popup.parentNode, element.innerHTML);
	if(!contains(getOrderDateEdit(), 'D') && !contains(getOrderDateEdit(), 'M')){
		if(auto_close_when_more_precise_date_selected){
			popup.style.display = "none";
			popup.blur();
		}
	}
	else{
		displayPopup(popup, null);
		if(auto_redirect_to_next_when_select_date){
			if(contains(getOrderDateEdit(), 'M')){
				var month_selector = popup.querySelector('.month-selector');
				displaySelector(month_selector);
			}
			else{
				var day_selector = popup.querySelector('.day-selector');
				displaySelector(day_selector);
			}
		}
		else{
			var year_selector = popup.querySelector('.year-selector');
			displaySelector(year_selector);
		}
	}
}
