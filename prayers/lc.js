//-----------------------------------------------
// Copyright © 2003-2011 Ing. Matúš BRILLA
//                         matus.brilla@gmail.com
//-----------------------------------------------

/****** cookies.js ******/

function getCookie(c_name) {
	c_start = document.cookie.indexOf(c_name + "=");
	if (c_start != -1) {
		c_start = c_start + c_name.length + 1 ;
		c_end = document.cookie.indexOf(";", c_start);
		if (c_end == -1) c_end = document.cookie.length;
		return unescape(document.cookie.substring(c_start, c_end));
	}
	return null;
}

function setCookie(name, value, expires, path, domain, secure) {
	var today = new Date();
	today.setTime(today.getTime());
	if (expires) {expires = expires * 1000 * 60 * 60 * 24;}
	var expires_date = new Date(today.getTime() + (expires));
	document.cookie =
		name + "=" + escape(value)
		+ ((expires) ? ";expires=" + expires_date.toGMTString() : "")
		+ ((path) ? ";path=" + path : "")
		+ ((domain) ? ";domain=" + domain : "")
		+ ((secure) ? ";secure" : "");
}



/****** styles.js ******/

function testClass(src, cname) {
	var test = new RegExp("\\b" + cname + "\\b");
	return src.className.search(test);
}
function setClass(src, cname) {
	if (src.constructor == Array)
		for (src1 in src) setClass(src1, cname);
	else {
		if (testClass(src, cname) < 0) {
			src.className = src.className + " " + cname;
		}
	}
}
function resetClass(src, cname) {
	if (src.constructor == Array)
		for (src1 in src) resetClass(src1, cname);
	else {
		var what = new RegExp("\\b" + cname + "\\b", "g");
		src.className = src.className.replace(what, '').replace(/  +/g, " ");
	}
}



/****** lc.js ******/

function go(ref) { window.location=ref; }

function cSwitch(src, eNameSwitch, clNameOff, value) {
	dest = window.document.getElementById(eNameSwitch);
	if (typeof(value) == "undefined")
  	value = (typeof(x = src.checked) == "undefined") ? (src.value == 1) : x;
	if (value)
		resetClass(dest, clNameOff);
	else
		setClass(dest, clNameOff);
}

function findParentByClass(obj, fclass) {
  while (obj && testClass(obj, fclass) < 0) obj = obj.parentNode;

  return obj;
}
function findItemInArray(arr, item) {
	for (i = 0; arr[i] && arr[i] != item; i++) { ; }
	return i;
}

/* MODY hlavičky */

var gheadModes = new Array("onlyName", "inline", "tabular");
function headMode(obj) {
	var baseNode = window.document.getElementById('lc_body_cell');
	var n = obj.options[obj.selectedIndex].value;

	for (var i = 0; i < 3; i++) {
		if (i == n)
			setClass(baseNode, gheadModes[i]);
		else
			resetClass(baseNode, gheadModes[i]);
	}
	setCookie("lc_view_mode", n, 365);
}


/* Čítania */

function checkInpGrp(obj) {
	var nValue = obj.checked;
	var inpgrp = findParentByClass(obj, "input_group");

	if (inpgrp) {
    var tmp = "cSwitch(input, id.replace(\"i\", \"c\"), \"nodisp\"";
    if (nValue) {
      resetClass(inpgrp, "close");
			resetClass(inpgrp, "noPrint");
      inpGroupCommand(obj, tmp + ");");
    }
    else {
      setClass(inpgrp, "close");
      setClass(inpgrp, "noprint");
      inpGroupCommand(obj, tmp + ", false);");
    }
  }
}
function inpGroupCommand(obj, command) {
	var inputs = document.getElementsByTagName("INPUT");
	var count = inputs.length;
	var ident;

	for (i = findItemInArray(inputs, obj) + 1; i < count; i++) {
		input = inputs[i];
		id = input.id;
		if (id.substr(0,1) != 'i') break;
		eval(command);
	}
}


/* MESIAC */

function checkInpGrpMonth(obj) {
	var nValue = obj.checked;
	var inputs = document.getElementsByTagName("INPUT");
	var stopIdent = obj.name.substr(0,3);
	var stop = inputs.length;
	var input, ident;

	for (i = findItemInArray(inputs, obj) + 1; i < stop; i++) {
		input = inputs[i];
		ident = input.name.substr(0,3);
		if (ident == stopIdent) break;
		if (ident == "den")
			input.checked = nValue;
		else if (!nValue)
			input.checked = nValue;
	}
}

function check1(obj) {
	if (!obj.checked) {
		var inputs = document.getElementsByTagName("INPUT");
		var tmp;

		inp_levels = "mes tyz";
		for (i = findItemInArray(inputs, obj); i >= 0; i--) {
			for ( ; (tmp = inputs[i].name.substr(0,3)) && (testChecker(tmp) < 0); i--) { ; }
			if (tmp) inputs[i].checked = false;
			if (inp_levels == " ") break; 
		}
	}
}
var inp_levels;
function testChecker(what) {
	var result;

	if (!what) return -1;
	var test = new RegExp("\\b" + what + "\\b");
	if (result = inp_levels.search(test))
		inp_levels = inp_levels.replace(test, "");
	return result; 
}


/*****************************************/
function setFontsize(size) {
	document.body.style.fontSize = size + "%";
//	alert(document.body.style.fontSize);
}