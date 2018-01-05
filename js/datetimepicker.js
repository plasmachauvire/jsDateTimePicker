/*
 * ################
 * # REQUIREMENTS #
 * ################
 *
 * ### Input
 *
 * And input with class = "datetime" to register the date-time-picker on it
 *
 * ## EXAMPLES :
 *
 * #1 :
 * <input autocomplete="off"
 * data-original-format = "DD/MM/YYYY HH:mm"
 * data-format-date-edit="MM-YYYY"
 * data-format-date-display="MM-YYYY"
 * data-format-time-edit="HH"
 * data-format-time-display="HH a"
 * class="datetime" name="stop_date" value="23/12/2017 17:50">
 *
 * #2 :
 *
 * <input autocomplete="off"
 * data-original-format = "DD/MM/YYYY HH:mm"
 * data-format-date-edit="MM-YYYY"
 * data-format-date-display="MM-YYYY"
 * data-format-time-edit="HH"
 * data-format-time-display="HH a"
 * data-auto-close-date="0"
 * data-auto-close-time="0"
 * data-auto-redirect-date="0"
 * data-auto-redirect-time="0"
 * data-live-check-date="0"
 * data-live-check-time="0"
 * data-active-disabled-buttons="1"
 * data-default-date="now"
 * data-number-letters-day-name="2"
 * class="datetime" name="stop_date" value="">
 *
 * #3 :
 *
 * <input autocomplete="off"
 * data-original-format = "DD/MM/YYYY HH:mm"
 * data-format-date-edit="MM-YYYY"
 * data-format-date-display="MM-YYYY"
 * data-format-time-edit="HH"
 * data-format-time-display="HH a"
 * data-default-date="23/12/2017 17:50"
 * data-number-letters-day-name="1"
 * class="datetime" name="stop_date" value="">
 *
 *
 * ### Display
 *
 * To get right display, you need a container with class = "date_time" and the text directly inside of it
 *
 * ## EXAMPLES :
 *
 * #1 : <div
 *      data-format-date-display="Do MMM YYYY"
 *			data-format-time-display="HH:mm a"
 *			class="date_time">23/12/2017 17:50"</div>
 *
 * #2 : <td
 *      data-format-date-display="Do MMM YYYY"
 *			data-format-time-display="HH:mm a"
 *			class="date_time">23/12/2017 17:50"</td>
 *
 * #3 : <label
 *      data-format-date-display="Do MMM YYYY"
 *	    data-format-time-display="HH:mm a"
 *      class="date_time">23/12/2017 17:50"</label>
 *
 *
 * #####################
 * # AVAILABLE FORMATS #
 * #####################
 *
 * a            am / pm
 * A            AM / PM
 * d            day     : number of day in week : monday --> 0, tuesday --> 1, ...
 * dd           day     : two letters of day name
 * ddd          day     : 3 letters of day name
 * dddd         day     : full day name
 * D            day     : number in month : 1, 2, .., 30, 31
 * DD           day     : number in month : 01, 02, .., 30, 31
 * DDD          day     : number in year : 1, 2, ..., 364, 365
 * DDDD         day     : number in year : 001, 002, ..., 364, 365
 * H            hour    : 0, 1, 2, ..., 22, 23
 * HH           hour    : 00, 01, 02, ..., 22, 23
 * h            hour    : 1, 2, .., 11, 12 (add 'a' to format to tell the difference between am and pm)
 * hh           hour    : 01, 02, .., 11, 12 (add 'a' to format to tell the difference between am and pm)
 * M            month   : month number
 * MM           month   : month number
 * MMM          month   : 3 letters of month name
 * MMMM         month   : full month name
 * m            minute  : 0, 1, 2, .., 58, 59
 * mm           minute  : 00, 01, 02, ..., 58, 59
 * o            st / nd / rd / th --> Do : 1st / 2nd / 3rd / 4th / ...
 * s            second  : 0, 1, 2, .., 58, 59
 * ss           second  : 00, 01, 02, ..., 58, 59
 * separators   for example separators like '/' , ',', ':', '-', ...
 * w            week    : 1, 2, .., 51, 52, 53 (number in year)
 * ww           week    : 01, 02, .., 51, 52, 53 (number in year)
 * W            week    : 1, 2, .., 51, 52, 53 (number in year)
 * WW           week    : 01, 02, .., 51, 52, 53 (number in year)
 * Y            year    : full year
 * YY           year    : last 2 numbers of year
 * YYYY         year    : full year
 * [yourText]   text    : will be displayed as text
 *
 * advice : some format should'nt be used in edit format such as d / dd / ddd / dddd
 * or only with at least D for this example
 *
 *
 * #######################
 * # EXAMPLES OF FORMATS #
 * #######################
 *
 * ## basic
 * data-format-date-edit="DD-M-YYYY"
 * data-format-date-display="MMM Do YYY"
 * data-format-time-edit="HH:mm:ss a"
 * data-format-time-display="HH:mm a"
 *
 * ## weeks of year
 * data-format-date-edit="w [of] Y"
 * data-format-date-display="[week] w [of] Y"
 *
 * ## only an hour + minute
 * data-format-time-edit="HH:mm"
 * data-format-time-display="HH:mm a"
 *
 * ## day number in year + time only hour
 * data-format-date-edit="DDD-YYYY"
 * data-format-date-display="DDDo [day of] Y"
 * data-format-time-edit="HH"
 * data-format-time-display="HH a"

 * #################
 * # CONFIGURATION #
 * #################
 *
 * ## Comportment ##
 * data-auto-close-date = 1         : day is the most precise, then month and finaly year
 * possible values : 0 for disabled, 1 for enabled
 *
 * data-auto-close-time = 1         : second is the most precise, then minute and finaly hour
 * possible values : 0 for disabled, 1 for enabled
 *
 * data-auto-redirect-date = 1      : redirection order : year -> month -> day
 * possible values : 0 for disabled, 1 for enabled
 *
 * data-auto-redirect-time = 1      : redirection order : hour -> minute -> second
 * possible values : 0 for disabled, 1 for enabled
 *
 * data-live-check-date = 1         :  in all cases, only check when date is in digit format
 *                                   (except for the st / nd / rd / .. after day number)
 * possible values : 0 for disabled, 1 for enabled
 *
 * data-live-check-time = 1
 * possible values : 0 for disabled, 1 for enabled
 *
 * data-active-disabled-buttons = 0 : Disabled buttons like in date selector can't by default be selected
 *                                    (no action when click on it) and has'nt specific display when overred
 * possible values : 0 for disabled, 1 for enabled them
 *
 * data-default-date = ''           : Default date to set when input is empty at loading,
 * possible values : 'now', '' (no date) or a date in original format
 *
 *
 * ## Appearance ##
 * data-number-letters-day-name = 3 : ! May have to adapt width of popup depending of this !
 * possible values : any number (also 0 but should'nt be used)
 *
 */

var locale_lang = window.navigator.language;


/*
 * ########################
 * # GLOBAL CONFIGURATION #
 * ########################
 *
 * Set those values if you want the same format for all your date-time-pickers when not defined in data
 * of input
 *
 */

var original_format;
var format_date_edit="DD-MM-YYYY";
var format_date_display="Do MMM YYYY";
var format_time_edit="HH:mm";
var format_time_display="HH:mm a";


/*var original_format = "DD/MM/YYYY HH:mm";
var format_date_edit="DD-MM-YYYY";
var format_date_display="Do MMM YYYY";
var format_time_edit="HH:mm";
var format_time_display="HH:mm a";*/

/*
var original_format;
var format_date_edit;
var format_date_display;
var format_time_edit;
var format_time_display;*/


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

var input_number = 0;

var dates_input   = document.querySelectorAll('.datetime');
dates_input.forEach(hideAndSetNew);
var dates         = document.querySelectorAll('.date_time');
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
 * @param element the input to check content
 * @return true if can be valid, false else
 */
function canBeValid(element){
	var format = getFormat(element);

	var canBeValid = true;
	var valid_format;
	if(isDate(element)){
		if(!dateFormatIsOnlyDigit(element)){
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
	var format = getFormat(element);
	var popup           = getPopupParent(element);
	var input           = getInputOfPopup(popup)
	var current_date    = moment(getInputFormat(input), format.date.edit, locale_lang, true);
	var year            = (popup.querySelector('.year-popup').innerHTML).trim();
	var month           = (popup.querySelector('.month-popup').innerHTML).trim();

	current_date.year(parseInt(year));
	current_date.month(month);

	if(element.id === 'prev'){
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
	var parentDiv   = getPopupParent(element);
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
	var configuration = getConfiguration(element);

	var table         = element.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.label-date-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	if(configuration.active_disabled_buttons){
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

	updateDate(popup, element.innerHTML, displayed_date);
	if(configuration.auto_close_date){
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
function dateFormatIsOnlyDigit(element){
	var format = getFormat(element);
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
 * @param element the input where the user where typing
 */
function eventKeyUp(element){
	var configuration = getConfiguration(element);
	var format = getFormat(element);

	if((isDate(element) && configuration.live_check_date)
		|| (!isDate(element) && configuration.live_check_time)){
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
 * Get specific configuration of given element
 * @param element any "child" of initial input himself included
 * @returns {*} special configurations
 */
function getConfiguration(element){
	var input = element;
	if(!(element.className.indexOf('datetime') !== -1 || element.className.indexOf('date_time') !== -1)){
		if(element.className === 'popup-time-picker' || element.className === 'popup-date-picker'){
			input = getParentInput(getInputOfPopup(element));
		}
		else if(element.className.split(' ')[0] === 'time' || element.className.split(' ')[0] === 'date'){
			input = getParentInput(element);
		}
		else{
			var popup = getPopupParent(element);
			if(popup){
				input = getParentInput(getInputOfPopup(popup));
			}
			else{
				return false;
			}
		}
	}

	var configuration = {
		auto_close_date         : 1,
		auto_close_time         : 1,
		auto_redirect_date      : 1,
		auto_redirect_time      : 1,
		live_check_date         : 1,
		live_check_time         : 1,
		active_disabled_buttons : 0,
		default_date            : '',
		number_letters_day_name : 3
	};

	if(input.dataset.autoCloseDate && !(input.dataset.autoCloseDate == '1')){
		configuration.auto_close_date = 0;
	}
	if(input.dataset.autoCloseTime && !(input.dataset.autoCloseTime == '1')){
		configuration.auto_close_time = 0;
	}
	if(input.dataset.autoRedirectDate && !(input.dataset.autoRedirectDate == '1')){
		configuration.auto_redirect_date = 0;
	}
	if(input.dataset.autoRedirectTime && !(input.dataset.autoRedirectTime == '1')){
		configuration.auto_redirect_time = 0;
	}
	if(input.dataset.liveCheckDate && !(input.dataset.liveCheckDate == '1')){
		configuration.live_check_date = 0;
	}
	if(input.dataset.liveCheckTime && !(input.dataset.liveCheckTime == '1')){
		configuration.live_check_time = 0;
	}
	if(input.dataset.activeDisabledButtons && !(input.dataset.activeDisabledButtons == '0')){
		configuration.active_disabled_buttons = 1;
	}
	if(input.dataset.defaultDate && !(input.dataset.defaultDate == '')){
		configuration.default_date = input.dataset.defaultDate;
	}
	if(input.dataset.numberLettersDayName && !(input.dataset.numberLettersDayName == '3')){
		configuration.number_letters_day_name = parseInt(input.dataset.numberLettersDayName);
	}

	return configuration;
}

/**
 * Get date to use when original input is empty
 * @param last_input original input
 * @returns {*}
 */
function getDateWhenLastIsEmpty(last_input){
	var format = getFormat(last_input);
	if("date" in format){
		var id = last_input.className.split('date-picker-')[1];
		var date_input = document.querySelector('.date-'+id);
		var value_date;
		if(date_input.value !== ''){
			value_date = date_input.value;
		}
		else{
			value_date = date_input.id.split('$$')[1];
		}

		if(date_input.id.split('$$')[0] == 1){
			var date = moment(value_date, format.date.display, locale_lang, true);
			date = date.format(format.original_format).toString();
			return date;
		}
		else{
			var date = moment(value_date, format.date.edit, locale_lang, true);
			date = date.format(format.original_format).toString();
			return date;
		}
	}
	else{
		var date = moment().locale(locale_lang);
		date.hour(0);
		date.minute(0);
		date.second(0);
		date = date.format(format.original_format).toString();
		return date;
	}
}

/**
 * Get format for parent input of given element
 * @param element any element "under" original input
 * @returns {*} the format
 */
function getFormat(element){
	var input = element;
	if(!(element.className.indexOf('datetime') !== -1 || element.className.indexOf('date_time') !== -1)){
		if(element.className === 'popup-time-picker' || element.className === 'popup-date-picker'){
			input = getParentInput(getInputOfPopup(element));
		}
		else if(element.className.split(' ')[0] === 'time' || element.className.split(' ')[0] === 'date'){
				input = getParentInput(element);
			}
		else{
			var popup = getPopupParent(element);
			if(popup){
				input = getParentInput(getInputOfPopup(popup));
			}
			else{
				return false;
			}
		}
	}
	var format = {original_format : false};
	if((input.dataset.formatDateEdit && input.dataset.formatDateEdit !== '') || (input.dataset.formatDateDisplay && input.dataset.formatDateDisplay !== '')){
		format.date = {};
		format.date.edit    = input.dataset.formatDateEdit ? input.dataset.formatDateEdit : (format_date_edit ? format_date_edit : input.dataset.formatDateDisplay);
		format.date.display = input.dataset.formatDateDisplay ? input.dataset.formatDateDisplay : (format_date_display ? format_date_display : input.dataset.formatDateEdit);
	}
	else if((format_date_edit && input.dataset.formatDateEdit !== '') || (format_date_display && input.dataset.formatDateDisplay !== '')){
	console.log(":"+input.dataset.formatDateDisplay + ": :" + input.dataset.formatDateEdit+":");
		format.date = {};
		format.date.edit = format_date_edit ? format_date_edit : format_date_display;
		format.date.display = format_date_display ? format_date_display : format_date_edit;
	}

	if((input.dataset.formatTimeEdit && input.dataset.formatTimeEdit !== '') || (input.dataset.formatTimeDisplay && input.dataset.formatTimeDisplay !== '')){
		format.time = {};
		format.time.edit    = input.dataset.formatTimeEdit ? input.dataset.formatTimeEdit : (format_time_edit ? format_time_edit : input.dataset.formatTimeDisplay);
		format.time.display = input.dataset.formatTimeDisplay ? input.dataset.formatTimeDisplay : (format_time_display ? format_time_display : input.dataset.formatTimeEdit);
	}
	else if((format_time_display && input.dataset.formatTimeDisplay !== '') || (format_time_edit && input.dataset.formatTimeEdit !== '')){
		format.time = {};
		format.time.edit = format_time_edit ? format_time_edit : format_time_display;
		format.time.display = format_time_display ? format_time_display : format_time_edit;
	}
	if(input.dataset.originalFormat){
		format.original_format = input.dataset.originalFormat;
	}
	else if(original_format){
		format.original_format = original_format;
	}
	return format;
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
function getHtmlForDateSelector(element, date, display_selection){

	var configuration = getConfiguration(element);

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

	var number_of_letters_for_days_name_in_selector = configuration.number_letters_day_name;

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
	if(configuration.active_disabled_buttons){
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
	var format = getFormat(element);
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
		if(element.value === ''){
			var value = getDateWhenLastIsEmpty(getParentInput(element));
			var date = moment(value, format.original_format, locale_lang, false);
			date = date.format(format.date.edit).toString();
			return date;
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
		if(element.value === ''){
			var value = getDateWhenLastIsEmpty(getParentInput(element));
			var date = moment(value, format.original_format, locale_lang, false);
			date = date.format(format.time.edit).toString();
			return date;
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

/**
 * Get months names in order of year and in locale name
 * @returns {Array} months of year
 */
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

/**
 * Get order of display in dateEdit and so permit to know what has to be displayed
 * @param element object being used with format to analyse, can be any child of popup
 * @returns {Array}
 */
function getOrderDateEdit(element){
	var format = getFormat(element);
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
	var format = getFormat(element);

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
		if(element.value === ''){
			var value = getDateWhenLastIsEmpty(getParentInput(element));
			var date = moment(value, format.original_format, locale_lang, false);
			date = date.format(format.date.display).toString();
			return date;
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
		if(element.value === ''){
			var value = getDateWhenLastIsEmpty(getParentInput(element));
			var date = moment(value, format.original_format, locale_lang, false);
			date = date.format(format.time.display).toString();
			return date;
		}
		return element.value;
	}
}


/**
 * Get dateTime input who will be send with the form and has been visually replaced
 * @param element and input .date or .time
 */
function getParentInput(element){
	var id;
	if(isDate(element)){
		id = element.className.split('date-')[1];
	}
	else{
		id = element.className.split('time-')[1];
	}
	return document.querySelector('.date-picker-'+id);
}

/**
 * Get parent popup of this element
 * @param element the element
 * @returns {(() => Node) | ActiveX.IXMLDOMNode | Node | SVGElementInstance} the popup
 */
function getPopupParent(element){
	if(element.className === 'popup-date-picker' || element.className === 'popup-time-picker'){
		return element;
	}
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
	if(!found){
		node = false;
	}
	return node;
}

/**
 * Hide precedent dateTime input and set the new one(s)
 */
function hideAndSetNew(element){
	var configuration = getConfiguration(element);
	var format = getFormat(element);
	if(format.original_format){

		element.style.display = 'none';
		element.className  += ' date-picker-' + input_number.toString();
		var name_last_input   = element.getAttribute('name');
		var date_input        = name_last_input + '_date';
		var time_input        = name_last_input + '_time';
		var last_input_value  = element.getAttribute('value');
		var isEmpty           = false;
		var default_date = configuration.default_date;

		if(last_input_value === ''){
			isEmpty = true;
			if(default_date === 'now' || default_date === ''){
				last_input_value = moment().locale(locale_lang);
				last_input_value.format(format.original_format);
			}
			else{
				last_input_value = default_date;
			}
		}

		var display_date      = moment(last_input_value, format.original_format, locale_lang, false);

		var html   =  '<div class="date-time-picker">';

		if("date" in format){
			var date              = display_date.format(format.date.display).toString();
			if(isEmpty && default_date === ''){
				html  += '<input autocomplete="off" class="date date-'+input_number+'" id="1$$'+date+'" '
							 + 'name="'+date_input+'" value="">';
			}
			else{
				html   += '<input autocomplete="off" class="date date-'+input_number+'" id="1$$'+date+'" '
								+ 'name="'+date_input+'" value="'+date+'">';
			}
		}
		if("time" in format){
			var time              = display_date.format(format.time.display).toString();
			if(isEmpty && default_date === ''){
				html   += '<input autocomplete="off" class="time time-'+input_number+'" id="1$$'+time+'" '
								+ 'name="'+time_input+'" value="">';
			}
			else{
				html  += '<input autocomplete="off" class="time time-'+input_number+'" id="1$$'+time+'" '
							 + 'name="'+time_input+'" value="'+time+'">';
			}
		}

		if("date" in format){
			html   += '<div class="popup-date-picker" tabindex="-1" style="display:none">'
							+  '</div>';
		}
		if("time" in format){
			html   += '<div class="popup-time-picker" tabindex="-1" style="display:none">'
							+  '</div>';
		}

		html += '</div>';
		element.insertAdjacentHTML('afterend', html);

		input_number++;

	}
}

/**
 * When an hour (a td) is clicked in the hour selector
 * @param element the clicked hour (td)
 */
function hourSelectorClicked(element){
	var format = getFormat(element);
	var configuration = getConfiguration(element);

	var table         = element.parentNode.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.label-hour-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	updateHour(popup, element.innerHTML);

	if(!contains(format.time.edit.split(''), 'm') && !contains(format.time.edit.split(''), 's')){
		if(configuration.auto_close_time){
			popup.style.display = "none";
			popup.blur();
		}
	}
	else{
		displayPopup(popup, null);
		if(configuration.auto_redirect_time){
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

	var format = getFormat(element);


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
	var order         = getOrderDateEdit(element);

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
		var date_selector_html = getHtmlForDateSelector(element, display_date, display_selection);
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
	var format = getFormat(element);
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
	return element.getAttribute('class').split(' ')[0] === 'date';
}

/**
 * When a minute (a td) is clicked in the minute selector
 * @param element the clicked minute (td)
 */
function minuteSelectorClicked(element){
	var configuration = getConfiguration(element);
	var format = getFormat(element);

	var table         = element.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.label-minute-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	updateMinute(popup, element.innerHTML);

	if(!contains(format.time.edit.split(''), 's')){
		if(configuration.auto_close_time){
			popup.style.display = "none";
			popup.blur();
		}
	}
	else{
		displayPopup(popup, null);
		if(configuration.auto_redirect_time){
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
	var configuration = getConfiguration(element);

	var table         = element.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.label-month-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	element.id                  = 'clicked';

	var popup                   = getPopupParent(table);
	var order = getOrderDateEdit(element);

	updateMonth(popup, element.innerHTML);
	if(!contains(order, 'D')){
		if(configuration.auto_close_date){
			popup.style.display = "none";
			popup.blur();
		}
	}
	else{
		displayPopup(popup, null);
		if(configuration.auto_redirect_date){
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
	var configuration = getConfiguration(element);

	var table         = element.parentNode.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.label-second-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	updateSecond(popup, element.innerHTML);

	if(configuration.auto_close_time){
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
	var format = getFormat(element);
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
		if(value_element !== ''){
			element.value = new_value;
		}
		element.id    = 0 + '$$' + new_value;
	}
}

/**
 * Set display format for a date which is not in an input but is only displayed in the page in a
 * div with className = .date_time
 * @param element the div with the date inside
 */
function setDisplayFormat(element){
	var format = getFormat(element);
	var input = element.querySelector('.datetime');
	if(!input){
		var value = element.innerHTML;
		value = moment(value, format.original_format, locale_lang, false);
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
			element.insertAdjacentHTML('afterend', '<div class="'+element.className+'_display">' + to_display + '</div>');
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
	var configuration = getConfiguration(element);
	var format = getFormat(element);

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
		if(value_element === '' && configuration.default_date === ''){

		}
		else{
			element.value = new_value;
		}
		element.id    = 1 + '$$' + new_value;
	}

}

/**
 * Update the date (day) with the new value
 * @param element the popup
 * @param value the new value to set for days
 */
function updateDate(element, value, displayed_date){
	var format = getFormat(element);
	var displayed_date  = moment.unix(displayed_date).locale(locale_lang);
	var date_input      = getInputOfPopup(element);
	var date            = moment(getInputFormat(date_input), format.date.edit, locale_lang, true);
	date.date(value);
	date.month(displayed_date.month());
	date.year(displayed_date.year());
	date_input.value  = date.format(format.date.edit);

	date_input.id     = 0 + '$$' + date.format(format.date.edit);
	updateDateRealInput(date_input);
	displayPopup(element, null);
}

/**
 * Update value of real (not displayed) input used for form
 * @param element the input (.date or .time)
 */
function updateDateRealInput(element){
	var configuration = getConfiguration(element);
	var format = getFormat(element);

	if(element.value === '' && configuration.default_date === ''){

	}
	else{
		var last_input    = getParentInput(element);
		var last_value    = last_input.getAttribute('value');
		var last_has_date;

		if(last_value === ''){
			last_value = getDateWhenLastIsEmpty(last_input);
		}
		last_has_date = moment(last_value, format.original_format, locale_lang, false);
		if(isDate(element)){
			var new_value       = getInputFormat(element);
			var new_date        = moment(new_value, format.date.edit, locale_lang, true);

			last_has_date.year(new_date.year());
			last_has_date.month(new_date.month());
			last_has_date.date(new_date.date());

			last_input.setAttribute('value', last_has_date.format(format.original_format));
		}
		else{
			var new_time  = getInputFormat(element);
			new_time      = moment(new_time, format.time.edit, locale_lang, true);

			last_has_date.format('X');

			last_has_date.hour(new_time.format('HH'));
			last_has_date.minute(new_time.minute());
			last_has_date.second(new_time.second());
			last_has_date.millisecond(new_time.millisecond());

			last_input.setAttribute('value', last_has_date.format(format.original_format));
		}
	}
}

/**
 * Update hour
 * @param element the popup
 * @param value new value for hours
 */
function updateHour(element, value){
	var format = getFormat(element);
	var time_input  = getInputOfPopup(element);
	var time        = moment(getInputFormat(time_input), format.time.edit, locale_lang, true);
	time.hour(parseInt(value));
	time_input.value  = time.format(format.time.edit);
	time_input.id     = 0 + '$$' + time.format(format.time.edit);
	updateDateRealInput(time_input);
	displayPopup(element, null);
}

/**
 * Re-set value of label from input
 * @param element popup
 */
function updateLabels(element){
	var format = getFormat(element);
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
 * @param element the popup
 * @param value new value for minutes
 */
function updateMinute(element, value){
	var format = getFormat(element);
	var time_input  = getInputOfPopup(element);
	var time        = moment(getInputFormat(time_input), format.time.edit, locale_lang, true);
	time.minute(parseInt(value));
	time_input.value  = time.format(format.time.edit);
	time_input.id     = 0 + '$$' + time.format(format.time.edit);
	updateDateRealInput(time_input);
	displayPopup(element, null);
}

/**
 * Update month
 * @param element the popup
 * @param value new value for months
 */
function updateMonth(element, value){
	var format = getFormat(element);
	var date_input  = getInputOfPopup(element);
	var date        = moment(getInputFormat(date_input), format.date.edit, locale_lang, true);
	date.month(value);
	date_input.value  = date.format(format.date.edit);
	date_input.id     = 0 + '$$' + date.format(format.date.edit);
	updateDateRealInput(date_input);
	displayPopup(element, null);
}

/**
 * Update second
 * @param element the popup
 * @param value new value for seconds
 */
function updateSecond(element, value){
	var format = getFormat(element);
	var time_input  = getInputOfPopup(element);
	var time        = moment(getInputFormat(time_input), format.time.edit, locale_lang, true);
	time.second(parseInt(value));
	time_input.value  = time.format(format.time.edit);
	time_input.id     = 0 + '$$' + time.format(format.time.edit);
	updateDateRealInput(time_input);
	displayPopup(element, null);
}

/**
 * Update year
 * @param element the popup
 * @param value new value for years
 */
function updateYear(element, value){
	var format = getFormat(element);
	var date_input  = getInputOfPopup(element);
	var date        = moment(getInputFormat(date_input), format.date.edit, locale_lang, true);
	date.year(value);
	date_input.value  = date.format(format.date.edit);
	date_input.id     = 0 + '$$' + date.format(format.date.edit);
	updateDateRealInput(date_input);
	displayPopup(element, null);
}

/**
 * When a year (a td) is clicked in the year selector
 * @param element the clicked year (td)
 */
function yearSelectorClicked(element){
	var configuration = getConfiguration(element);

	var table         = element.parentNode.parentNode.parentNode.parentNode;
	var td_selectable = table.querySelectorAll('.label-year-selector');
	td_selectable.forEach(function(element){
		element.id                  = 'basic';
	});
	element.id                  = 'clicked';
	var popup                   = getPopupParent(table);

	var order = getOrderDateEdit(element);

	updateYear(popup, element.innerHTML);
	if(!contains(order, 'D') && !contains(order, 'M')){
		if(configuration.auto_close_date){
			popup.style.display = "none";
			popup.blur();
		}
	}
	else{
		displayPopup(popup, null);
		if(configuration.auto_redirect_date){
			if(contains(order, 'M')){
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
