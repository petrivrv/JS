function sbFind() {

	var bCanSearch = true;
	var ArrayOfBranches;

	var oPS = SiebelApp.S_App.NewPropertySet();

	var oSrvc = SiebelApp.S_App.GetService("Invoke Search");
	//var outPS = oSrvc.InvokeMethod("sbGetBranch", oPS);

	//var sArrayOfBranches = outPS.GetChild(0).GetValue();
	
	///////////////////////////////

	//var service = SiebelApp.S_App.GetService("business_service_name");
	var sArrayOfBranches = "";
	if (oSrvc) {
		//var inPropSet = CCFMiscUtil_CreatePropSet();
		var ai = {};
		ai.async = true;
		ai.selfbusy = true;
		ai.scope = this;
		//ai.mask = true;
		ai.opdecode = true;

		ai.cb = function () {
			 sArrayOfBranches = arguments[2].GetChild(0).GetValue();
			 ArrayOfBranches = sArrayOfBranches.split("^");
			 $("[name ='SB Position Organization Name' ]").autocomplete({
		minLength : 1,
		source : ArrayOfBranches
	});
			 var w =3;
			//Code occurs here for the method that Siebel Open UI runs if the AJAX call is successful
		};
		oSrvc.InvokeMethod("sbGetBranch", oPS, ai);
		
	}
	
	/////////////////////////////

	//var ArrayOfBranches = sArrayOfBranches.split("^");

	var ArrayOfSegment = ["Массовый", "Состоятельный", "Особо состоятельный"];
	var arrFields;
	
	if (SiebelApp.S_App.GetAppName() == "Siebel Universal Agent" ) 
	{
	arrFields = [
		["SB Card Number For Find", "Номер платежной карточки"],
		["Birth Date", "Дата рождения"],
		["Last Name", "Фамилия"],
		["First Name", "Имя"],
		["Middle Name", "Отчество"],
		["SB Contact Phone", "Телефон"],
		["SB Contact Email", "E-mail"],
		["SB Doc Seria", "Серия документа"],
		["SB Doc Number", "Номер документа"],
		["Customer Number", "ИНН"],
		["B2 Id", "Код в Б2"],
		["SB FINCORP Account Num", "Номер счета"],
		["SB Client Segment", "Сегмент"],
		["SB Position Organization Name", "Отделение(для поиска начните ввод)"]
	];
	
	}
	
	if ( SiebelApp.S_App.GetAppName() == "Siebel Financial Services") 
	{
	arrFields = [
		
		["Last Name", "Фамилия"],
		["First Name", "Имя"],
		["Middle Name", "Отчество"],
		["Birth Date", "Дата рождения"],
		["SB Doc Seria", "Серия документа"],
		["SB Doc Number", "Номер документа"],
		["Customer Number", "ИНН"],
		["B2 Id", "Код в Б2"],
		["SB FINCORP Account Num", "Номер счета"],
		["SB Card Number For Find", "Номер платежной карточки"],
		["SB Contact Phone", "Телефон"],
		["SB Contact Email", "E-mail"],
		["SB Client Segment", "Сегмент"],
		["SB Position Organization Name", "Отделение(для поиска начните ввод)"]
	];
	
	}

	var sbTop = "<div id='sb-find-form' scrolling='Yes'><div class='sb-find-top'><div id='sb-find-caption'>ПОИСК</div><div id='sb-find-close' role='button' title='Закрыть'></div></div><div id='sb-find-fields'>";

	var sbBottom = "</div><div id='sb-find-bottom'><button id='sb-find-btn' class='appletButton'>Поиск</button><button id='sb-find-reset' class='appletButton'>Сброс</button></div></div>";
	$("#sb-find-container").append(sbTop + sbBottom);

	for (var i = 0; i < arrFields.length; i++) {
		$("#sb-find-fields").append("<span class = 'sb-find-label' name='" + arrFields[i][0] + "_lbl'></span>"
			 + "<input name='" + arrFields[i][0] + "' placeholder='" + arrFields[i][1] + "'>"
			 + "<span name='" + arrFields[i][0] + "_msg'></span>");

	}

	/*$.datepicker.setDefaults($.datepicker.regional['ru']);
	$("[name ='Birth Date']").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd.mm.yy",
		showAnim : "clip",
		defaultDate : new Date('01/01/1990'),
		firstDay : 1,
		yearRange : '1910:2010'
	});*/

	$("#sb-find-fields  input").focus(function () {

		//if ($(this).attr("name") != 'Birth Date') {
			$("span.sb-find-label[name ='" + $(this).attr("name") + "_lbl']").text($(this).attr("placeholder"));
			$("span.sb-find-label[name ='" + $(this).attr("name") + "_lbl']").css("padding", "0 0 0 4px");
		//}

	});
	$("#sb-find-fields  input").blur(function () {
		$("span.sb-find-label[name ='" + $(this).attr("name") + "_lbl']").text("");
		$("span.sb-find-label[name ='" + $(this).attr("name") + "_lbl']").css("padding", "0 0 0 0");

	});

	$("#sb-find-container").hide();

	$("#srch_icon").click(function () {
		$("#sb-find-container").show("fold", {}, 1000);
	});

	$("#sb-find-close").click(function () {
		$("#sb-find-container").hide("fold", {}, 1000);

		$("div.ui-jqgrid").width("100%");
		$("div.ui-jqgrid  div.ui-jqgrid-view").width("100%");
		$("div.ui-jqgrid  div.ui-jqgrid-pager").width("100%");
		$("div.ui-jqgrid  div.ui-jqgrid-hdiv").width("100%");
		$("div.ui-jqgrid  div.ui-jqgrid-bdiv").width("100%");
	});

	$("#sb-find-reset").mousedown(function () {
		$("#sb-find-fields  input").each(function (i, elem) {
			$(this).val("");
		});

		$("[name ='SB Contact Email_msg' ]").text("");
		$("[name ='SB Contact Email' ]").css("background-color", "");
		$("[name ='SB Position Organization Name_msg']").text("");
		bCanSearch = true;
	});

	$("#sb-find-fields  input").mousedown(function () {
		$("[name ='SB Position Organization Name_msg']").text("");
	});

	$("#sb-find-btn").mousedown(function () {
		if (bCanSearch) {
			var bIsBadField = false;
			var bIsGoodField = false;

			var sArrayOfFields = "";
			var sArrayOfValues = "";
			$("#sb-find-fields  input").each(function (i, elem) {
				if ($(this).attr("name") == "SB Position Organization Name" ||
					$(this).attr("name") == "SB Client Segment" ||
					$(this).attr("name") == "SB Doc Seria") {
					if ($(this).val() != "")
						bIsBadField = true;

				} else {
					if ($(this).val() != "")
						bIsGoodField = true;
				}

				if ($(this).attr("name") == "Birth Date") {
					sArrayOfFields += "^" + $(this).attr("name");
					var arrDt = $(this).val().split(".");
					if (arrDt.length == 3)
						sArrayOfValues += "^" + arrDt[1] + "/" + arrDt[0] + "/" + arrDt[2];
					else
						sArrayOfValues += "^" + $(this).val();
				} else {
					sArrayOfFields += "^" + $(this).attr("name");
					sArrayOfValues += "^" + $(this).val();
				}
			});

			if (bIsBadField && !bIsGoodField) {
				$("[name ='SB Position Organization Name_msg']").text("Поиск не выполнен. Определите дополнительные критерии поиска.");

			} else {
				var oPS = SiebelApp.S_App.NewPropertySet();
				oPS.SetProperty("sArrayOfFields", sArrayOfFields.slice(1));
				oPS.SetProperty("sArrayOfValues", sArrayOfValues.slice(1));

				var oSrvc = SiebelApp.S_App.GetService("Invoke Search");

				var oRes = oSrvc.InvokeMethod("sbFind", oPS);

				if (oRes.GetProperty("Status") != "Error")
					SiebelApp.S_App.uiStatus.ShowOnLoadIndicator();

			}
		}

	});

	SiebelApp.EventManager.addListner("postload",
		function () {
		var oView = SiebelApp.S_App.GetActiveView();
		var sViewName = oView.GetName();

		if (sViewName == "SB Found Contact View") {
			$("#maskoverlay").styleHide();
			$("html").removeClass("siebui-busy");
		}
	},
		this)

	/*$("[name ='SB Position Organization Name' ]").autocomplete({
		minLength : 1,
		source : ArrayOfBranches
	});*/

	$("[name ='SB Position Organization Name' ]").blur(
		function () {
		if ($.inArray($("[name ='SB Position Organization Name' ]").val(), ArrayOfBranches) === -1)
			$("[name ='SB Position Organization Name' ]").val("");

	});

	$("[name ='SB Client Segment' ]").focus(function () {

		$("[name ='SB Client Segment' ]").autocomplete({
			minLength : 0,
			source : ArrayOfSegment
		});

		$("[name ='SB Client Segment' ]").autocomplete("search", "");
	})

	$("[name ='SB Client Segment' ]").blur(
		function () {
		if ($.inArray($("[name ='SB Client Segment' ]").val(), ArrayOfSegment) === -1)
			$("[name ='SB Client Segment' ]").val("");

	});

	$("#sb-find-form").keydown(function (event) {
		if (event.keyCode == 13) {
			$("#sb-find-btn").mousedown();
		}

	});

	$("[name ='SB Contact Email' ]").keyup(function (event) {
		//$(this).val()
		if (/^\*|^\?/.test($(this).val())) {
			$("[name ='SB Contact Email_msg' ]").text("Первый символ e-mail адреса не должен быть  '*' или '?'.");
			$("[name ='SB Contact Email' ]").css("background-color", "pink");
			bCanSearch = false;
		} else {
			$("[name ='SB Contact Email_msg' ]").text("");
			$("[name ='SB Contact Email' ]").css("background-color", "white");
			bCanSearch = true;
		}

		///

	});

	/*<script> SiebelApp.S_App.GetAppName() = "Siebel Financial Services"
	var a =[ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" , "php", "coldfusion", "javascript", "asp", "ruby"]
	$( "#autocomplete" ).autocomplete({
	minLength: 0,
	source: a
	});


	$( "#autocomplete" ).click(function(){
	$( "#autocomplete" ).autocomplete( "search", $("#autocomplete" ).val());
	}
	)

	$("#autocomplete" ).blur(
	function(){
	if( $.inArray( $("#autocomplete" ).val(), a) ===-1  )
	$.inArray( $("#autocomplete" ).val(""));

	})

	</script>*/
}
