
/**
* @name: Assignement1
* @Course Code: SODV1201
* @class: Software Development Diploma program.
* @author: Laurainda Fan
**/


$(document).ready(function(){

// Part 2
// ************* Make name of image appear after 10 sec *************

	if ($("#img_label").length) {

		setTimeout(function () {
			$("#img_label").html("Fruitcake");
			}, 5000);
	}



// Part 3
// ************* Mark to Grade conversion *************
// on click: clear old grade / error msg
// check for valid input when button is clicked (catch error)
// Then convert mark to grade and display

	if ($("#conv_grade").length) {

		let button_grade = document.getElementById("conv_grade");
		let div_mark_error = document.getElementById("div_mark_error");
		let div_grade = document.getElementById("div_grade");
		let mark = document.getElementById("mark");


	button_grade.addEventListener("click", function(){
	
		div_mark_error.innerText = "";
		div_grade.innerText = "";
		mark.style.borderColor = "black";
	
		// check if mark is valid
	
		try {
			if ( isNaN(mark.value) ) throw "Input is not a number";
			else if (mark.value === "" ) throw "Input is empty";
			else if (mark.value <0) throw "Input should be non-negative";
			else if (mark.value >=101) throw "Input should be less than 101"; 
			else {
				let grade = "";
				switch (true) {
					case (mark.value >= 90):
						grade = "A";
						break;
					case (mark.value >= 80):
						grade = "B";
						break;
					case (mark.value >= 70):
						grade = "C";
						break;
					case (mark.value >= 50):
						grade = "D";
						break;
					case (mark.value < 50):
						grade = "F";
						break;				
					default:
						throw "Unknown error";
				}
				div_grade.innerText = "The grade is " + grade;
			}
		}
		catch ( err){
			div_mark_error.innerHTML += err +"<br>";
			mark.style.border = "solid";
			mark.style.borderColor = "red";
		}
	});

	}

// Part 4
// ************* Staff page *************
// display list of staff information with sorting capability by name and salary
	var sortedData="";
	var dataSet = [   
		[ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
		[ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
		[ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
		[ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
		[ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
		[ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
		[ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
		[ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
		[ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
		[ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
		[ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
		[ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
		[ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
		[ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
		[ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
		[ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
		[ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
		[ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
		[ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
		[ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
		[ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
		[ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
		[ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
		[ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
		[ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
		[ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
		[ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
		[ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
		[ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
		[ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
		[ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
		[ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
		[ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
		[ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
		[ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
		[ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
	];


	if ($("#table_staff").length) {
		// in staff.html

		// display the table
		// add sort select & button
		// set onclick to sort array and re-display table
	
		if (dataSet.length !=0) {
			// reset table
			$("#table_staff").empty();
			$("#table_staff").append("<thead><tr>" +
				"<th>Name</th><th>Title</th><th>Location</th>" +
				"<th>Staff ID</th><th>Date joining</th><th>Salary</th>" +
				"</tr></thead><tbody></tbody>");
		
			dataSet.forEach(display_table);
		}
	
		// add sort select & button
		$("#table_staff").before("<form><label for='sortBy'>Sort by </label>" + 
			"<select name='sortBy' id='sortBy'><option value='name'>Name</option>" + 
			"<option value='salary'>Salary</option></select>" + 
			"<select name='sortOrder' id='sortOrder'><option value='asc'>Ascending</option>" + 
			"<option value='des'>Descending</option></select>" + 
			"<input type='button' id='button_sort' value='Sort'></form><br>");
	
		$("#button_sort").click(sort_data);
	}


	function display_table (item, index) {
		// function to display arr in table_staff
		
		$("#table_staff > tbody").append("<tr><td>" + item[0] + "</td><td>" + item[1] + 
				"</td><td>" + item[2] + "</td><td>" + item[3] + 
				"</td><td>" + item[4] + "</td><td>" + item[5] + "</td></tr>");	
	}
	
	function sort_data() {
		// Sort data according to selected options and display table
		// window.alert( $("#sortBy").val() + ", " + $("#sortOrder").val());

		// clone dataSet
		sortedData = structuredClone(dataSet);
		
		if (  $("#sortBy").val() == "name" ) {
			// sort by name (in column 0)
			if ( $("#sortOrder").val() == "asc" ) {
				sortedData.sort((a,b) => (a[0] > b[0]) ?1 : ((b[0] > a[0]) ? -1 : 0));
			}
			else {
				sortedData.sort((a,b) => (b[0] > a[0]) ?1 : ((a[0] > b[0]) ? -1 : 0));
			}
		}
		else {
			// sort by salary (in column 5)
			// parse salary string to number for sort compare
				
			if ( $("#sortOrder").val() == "asc" ) {
				sortedData.sort((a,b) => ( Number(a[5].replace(/[^0-9\.]+/g,"")) > Number(b[5].replace(/[^0-9\.]+/g,"")) ) ?1 :
					(( Number(b[5].replace(/[^0-9\.]+/g,"")) > Number(a[5].replace(/[^0-9\.]+/g,"")) ) ? -1 : 0));
			}
			else {
				sortedData.sort((a,b) => ( Number(b[5].replace(/[^0-9\.]+/g,"")) > Number(a[5].replace(/[^0-9\.]+/g,"")) ) ?1 :
					(( Number(a[5].replace(/[^0-9\.]+/g,"")) > Number(b[5].replace(/[^0-9\.]+/g,"")) ) ? -1 : 0));
			}
		}
		
		// clear table
		$("#table_staff").empty();
		$("#table_staff").append("<thead><tr>" +
			"<th>Name</th><th>Title</th><th>Location</th>" +
			"<th>Staff ID</th><th>Date joining</th><th>Salary</th>" +
			"</tr></thead><tbody></tbody>");
		
		// display sorted data
		sortedData.forEach(display_table);
	}



// Part 5
// ************* Weather: temperature conversion *************
// accept a temp input in degree Fahrenheit and convert it into degree Celsius 
// and from Celsius to Kelvin based on a button click event
// °C = (°F - 32) × 5/9
// T(K) = T(°C) + 273.15
// absolute zero = lowest temp = 0 K

	if ($("#conv_temp").length) {

		//var button_temp = document.getElementById("conv_temp");
		//var div_temp_error = document.getElementById("div_temp_error");
		//var div_temp = document.getElementById("div_temp");
		//var temp = document.getElementById("tempF");

		$("#conv_temp").click (function (){
	
			$("#div_temp_error").html("");
			$("#div_temp").html("");
			$("#tempF").css("border", "black solid 1px")
	
		var temp_F = $("#tempF").val();
		var temp_C = 0;
		var temp_K = 0;
	
		// check if temp is valid
	
		try {
			if ( isNaN(temp_F) ) throw "Input is not a number";
			else if (temp_F === "" ) throw "Input is empty";
		
			else {
				temp_C = (temp_F -32 ) *5 / 9;
				temp_K = temp_C + 273.15
			
				if (temp_K < 0) throw "Temperature is below absolute zero";
				else
				{
					$("#div_temp").html("The temperature converted to Celsius is " + 
						parseFloat(temp_C).toFixed(2) + "°C <br>" + 
						"The temperature converted to Kelvin is " + 
						parseFloat(temp_K).toFixed(2) + " Kelvin");
				}

			}
		}
		catch (err){
			$("#div_temp_error").html(err + "<br>");
			$("#tempF").css("border", "red solid 1px")
		}
		});

	}

});