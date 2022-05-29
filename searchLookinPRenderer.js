/*<ORACLECOPYRIGHT>
 * Copyright (C) 1994-2014
 * Oracle and Java are registered trademarks of Oracle and/or its affiliates.
 * Other names may be trademarks of their respective owners.
 * UNIX is a registered trademark of The Open Group.
 *
 * This software and related documentation are provided under a license agreement
 * containing restrictions on use and disclosure and are protected by intellectual property laws.
 * Except as expressly permitted in your license agreement or allowed by law, you may not use, copy,
 * reproduce, translate, broadcast, modify, license, transmit, distribute, exhibit, perform, publish,
 * or display any part, in any form, or by any means. Reverse engineering, disassembly,
 * or decompilation of this software, unless required by law for interoperability, is prohibited.
 *
 * The information contained herein is subject to change without notice and is not warranted to be error-free.
 * If you find any errors, please report them to us in writing.
 *
 * U.S. GOVERNMENT RIGHTS Programs, software, databases, and related documentation and technical data delivered to U.S.
 * Government customers are "commercial computer software" or "commercial technical data" pursuant to the applicable
 * Federal Acquisition Regulation and agency-specific supplemental regulations.
 * As such, the use, duplication, disclosure, modification, and adaptation shall be subject to the restrictions and
 * license terms set forth in the applicable Government contract, and, to the extent applicable by the terms of the
 * Government contract, the additional rights set forth in FAR 52.227-19, Commercial Computer Software License
 * (December 2007). Oracle America, Inc., 500 Oracle Parkway, Redwood City, CA 94065.
 *
 * This software or hardware is developed for general use in a variety of information management applications.
 * It is not developed or intended for use in any inherently dangerous applications, including applications that
 * may create a risk of personal injury. If you use this software or hardware in dangerous applications,
 * then you shall be responsible to take all appropriate fail-safe, backup, redundancy,
 * and other measures to ensure its safe use. Oracle Corporation and its affiliates disclaim any liability for any
 * damages caused by use of this software or hardware in dangerous applications.
 *
 * This software or hardware and documentation may provide access to or information on content,
 * products, and services from third parties. Oracle Corporation and its affiliates are not responsible for and
 * expressly disclaim all warranties of any kind with respect to third-party content, products, and services.
 * Oracle Corporation and its affiliates will not be responsible for any loss, costs,
 * or damages incurred due to your access to or use of third-party content, products, or services.
</ORACLECOPYRIGHT>*/
/* 8.1.1.14SIA[23044]PATCHSET18 */
if (typeof(SiebelAppFacade.SearchLookinPhyRenderer) === "undefined") {
	SiebelJS.Namespace("SiebelAppFacade.SearchLookinPhyRenderer");
	define("siebel/searchLookinPRenderer", ["siebel/basephyrenderer"], function () {
		SiebelAppFacade.SearchLookinPhyRenderer = (function () {
			var E = SiebelJS.Dependency("SiebelApp.Utils");
			var r = SiebelJS.Dependency("SiebelApp.Constants");
			var A = SiebelApp.S_App.LocaleObject;
			var B = 0;
			var s = 0;
			var f = 0;
			var k = [];
			var w = [];
			var d = "";
			var g = 0;
			var x = 0;
			var a = "";
			var i = 0;
			var j = false;
			var h = "";
			var G = [];
			var p = [];
			var F = [];
			var c = [];
			var o = false;
			var l = "";
			var i = 0;
			var b = [];
			function v(H) {
				SiebelAppFacade.SearchLookinPhyRenderer.superclass.constructor.call(this, H)
			}
			SiebelJS.Extend(v, SiebelAppFacade.BasePR);
			v.prototype.Init = function () {
				SiebelAppFacade.SearchLookinPhyRenderer.superclass.Init.call(this);
				this.AttachPMBinding("OpenSearchPanel", function () {
					if (this.GetPM().Get("OpenSearchPanel")) {
						C.call(this, 1);
						n.call(this);
						this.GetPM().SetProperty("OpenSearchPanel", false)
					}
				});
				this.AttachPMBinding("fillLookin", function () {
					var H = this.GetPM();
					if (H.Get("fillLookin")) {
						c = H.Get("SetLookinInputBarcodeField");
						e.call(this, H.Get("SetLookinInput"), H.Get("SetLookinInputFind"), H.Get("SetLookinInputCategory"), H.Get("SetLookinInputOther"), H.Get("SetLookinParentCategory"), H.Get("SetLookupDS"), H.Get("SetLookinInputBarcode"), H.Get("DefaultFindCategory"), H.Get("isBarcodeEnabled"))
					}
				});
				this.AttachPMBinding("ShowSearchResultsDialog", function () {
					if (this.GetPM().Get("ShowSearchResultsDialog")) {
						u.call(this, this.GetPM().Get("GetSearchOutput"), this.GetPM().Get("GetSearchError"))
					}
				});
				this.AttachPMBinding("ShowSearchResultsDialogFromAdvSearch", function () {
					if (this.GetPM().Get("ShowSearchResultsDialogFromAdvSearch")) {
						D.call(this, this.GetPM().Get("GetSearchOutputFromAdvSearch"), this.GetPM().Get("GetSearchError"))
					}
				});
				this.AttachPMBinding("showAdvancedSearchPopup", function () {
					var H = this.GetPM();
					if (H.Get("showAdvancedSearchPopup")) {
						y.call(this, H.Get("GetAdvSearchOutputForCategory"), H.Get("GetAdvSearchOutputForDataSource"), H.Get("GetAdvSearchOutputForFileFormat"))
					}
				});
				this.AttachPMBinding("showAdvancedFindPopup", function () {
					var H = this.GetPM();
					if (H.Get("showAdvancedFindPopup")) {
						z.call(this, H.Get("GetAdvFindOutputForFindFields"), H.Get("GetAdvFindOutputForFindDisplayFields"), H.Get("GetActiveFindFields"), H.Get("findSelectedCategory"), false, 1)
					}
				});
				this.AttachPMBinding("showSearchPreferencePopup", function () {
					var H = this.GetPM();
					if (H.Get("showSearchPreferencePopup")) {
						q.call(this, H.Get("GetSearchPrefOutputForPage"), H.Get("GetSearchPrefOutputForSort"), H.Get("GetSearchPrefOutputForQueryLang"), H.Get("GetSearchPrefOutputForDocLang"))
					}
				});
				this.AttachPMBinding("getlookupDS", function () {
					if (this.GetPM().Get("getlookupDS")) {
						q.call(this, this.GetPM().Get("GetSearchPrefOutputForPage"), this.GetPM().Get("GetSearchPrefOutputForSort"))
					}
				})
			};
			function C(K) {
				o = true;
				var J = this.GetPM().Get("InProp").GetProperty("bcDisplayName");
				l = J;
				$("#Adv_Find_Dialog").remove();
				$("#srchDivCont").remove();
				var I = $("#s_srch").find("button");
				if ((I.length === 0) || ($("#srchDivCont").is(":hidden"))) {
					if (I.length === 0) {
						var H = '<div id="srchDivCont"></div>';
						$("#s_srch").append(H).trigger("create");
						this.GetPM().OnControlEvent("OnLoadSearch");
						$("#lookinCombo").attr("tabindex", "0");
						$("#lookinCombo").focus();
						$("#srchDivCont").addClass("siebui-search-bg");
						$("#srchDivCont").show()
					} else {
						$("#lookinCombo").attr("tabindex", "0");
						$("#lookinCombo").focus();
						$("#srchDivCont").addClass("siebui-search-bg");
						$("#srchDivCont").show()
					}
					this.BindEvents("eSearch")
				} else {
					if ($("#srchDivCont").is(":hidden") === false) {
						$("#Adv_Find_Dialog").remove();
						$("#srchDivCont").remove()
					}
				}
			}
			function n() {
				this.GetPM().OnControlEvent("OnLoadAdvancedFind", l, "false")
			}
			function m(I) {
				if (I.type === "keypress" && I.which === $.ui.keyCode.ESCAPE) {
					$("#srchDivCont").hide()
				} else {
					if (((I.type === "keypress" || I.type === "keyup") && (I.keyCode === $.ui.keyCode.ENTER || I.keyCode === $.ui.keyCode.ESCAPE)) || I.type === "click") {
						var J = $("#s_srch").find("select");
						if (J.length === 0 && (I.keyCode === $.ui.keyCode.ENTER || I.type === "click")) {
							if (o) {
								$("#srchDivCont").hide();
								o = false;
								l = ""
							} else {
								var H = I.data.ctx;
								var L = H.GetPM();
								$("#srchDivCont").remove();
								var O = '<div id="srchDivCont"></div>';
								$("#s_srch").append(O).trigger("create");
								L.OnControlEvent("OnLoadSearch");
								if (SiebelApp.S_App.GetOfflineMode && SiebelApp.S_App.GetOfflineMode()) {
									$.callback(this, function (Q) {
										H.BindEvents("eSearch");
										$("#srchDivCont").addClass("siebui-search-bg");
										$("#srchDivCont").show()
									})
								} else {
									var M = '<input type = "text" id= "text-box" class="siebui-search-textbox-srch" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + " " + A.GetLocalString("IDS_SEARCH_OUI_SRCH_TEXTBOX") + '"/>';
									$("#srchDivCont").append(M).trigger("create");
									var N = '<button type = "button" id= "srch-button" class="siebui-search-button" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '"><img src="images/esearch_submitsearch.png" class="siebui-search-image" alt="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '"/></button>';
									$("#srchDivCont").append(N).trigger("create");
									var K = '<button type = "button" id= "adv-srch-button" class="siebui-search-button" title="' + A.GetLocalString("IDS_SWE_CKEDITOR_ADVANCED_TAB") + " " + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '"><img src="images/esearch_advsearch.png" class="siebui-search-image" alt="' + A.GetLocalString("IDS_SWE_CKEDITOR_ADVANCED_TAB") + " " + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '"/></button>';
									$("#srchDivCont").append(K).trigger("create");
									var P = '<button type = "button" id= "srch-pref-button" class="siebui-search-button" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + " " + A.GetLocalString("IDS_BHC_COL_SETTINGS") + '"><img src="images/esearch_settings.png" class="siebui-search-image" alt="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + " " + A.GetLocalString("IDS_BHC_COL_SETTINGS") + '"/></button>';
									$("#srchDivCont").append(P).trigger("create");
									$("#lookinCombo").attr("tabindex", "0");
									$("#lookinCombo select:first-child").attr("aria-labelledby", "Report_Name_Label");
									$("#text-box").attr("role", "text");
									$("#srch-button").attr("role", "button");
									$("#adv-srch-button").attr("role", "button");
									$("#srch-pref-button").attr("role", "button");
									$("#text-box").hide();
									$("#srch-button").hide();
									$("#adv-srch-button").hide();
									$("#srch-pref-button").hide();
									H.BindEvents("eSearch");
									$("#srchDivCont").addClass("siebui-search-bg");
									$("#srchDivCont").show()
								}
							}
						} else {
							if (($("#srchDivCont").is(":hidden")) && (I.keyCode === $.ui.keyCode.ENTER || I.type === "click")) {
								$("#srchDivCont").addClass("siebui-search-bg");
								$("#srchDivCont").show()
							} else {
								if (($("#srchDivCont").is(":hidden") === false) && (I.keyCode === $.ui.keyCode.ESCAPE || I.type === "click")) {
									$("#Adv_Find_Dialog").remove();
									$("#srchDivCont").hide();
									$("#Adv_Barcode_Dialog").remove();
									o = false;
									l = ""
								}
							}
						}
					}
				}
			}
			v.prototype.ShowUI = function () {
				SiebelAppFacade.SearchLookinPhyRenderer.superclass.ShowUI.call(this);
				var K = this.GetPM();
				var I = K.Get("GetSelectedLookin");
				var L = K.Get("GetTitle");
				if (SiebelApp.S_App.GetDirection()) {
					$("#s_srch").attr("class", "siebui-search-esearch siebui-search-esearch-rtl bannerDiv ToolbarButton")
				} else {
					$("#s_srch").attr("class", "siebui-search-esearch bannerDiv ToolbarButton")
				}
				var H = '<span class ="ui-menubar ui-widget-header ui-menubar-link siebui-search-srchheading">' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + "</span>";
				var J = '<div id="srch_icon" class="ui-menubar siebui-search-tb-btn siebui-icon-search" tabindex="" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '"><span></span></div>';
				$("#s_srch").append(J).trigger("create");
				$("#srch_icon").attr("tabindex", "0");
				$("#srch_icon").attr("role", "text");

				if (SiebelApp.S_App.GetAppName() == "Siebel Universal Agent" || SiebelApp.S_App.GetAppName() == "Siebel Financial Services") {
					
					sbFind.call(this);
					
				} 
else if (SiebelApp.S_App.GetAppName() == "Siebel Mobile") {
	$("#srch_icon").click(function () {
		SiebelApp.S_App.GotoView('SBM Main Page View');
	});

}


else {
					$("#srch_icon").bind("click keypress keyup", {
						ctx : this
					}, m)
					
				}

				/*
				$("#srch_icon").bind("click keypress keyup", {
				ctx : this
				}, m)*/
			};

			v.prototype.BindEvents = function (J) {
				SiebelAppFacade.SearchLookinPhyRenderer.superclass.BindEvents.call(this);
				var H = this.GetPM();
				var I = 0;
				switch (J) {
				case "eSearch":
					$("#lookinCombo").bind("change keydown", {
						ctx : this
					}, function (N) {
						if (N.type === "change" || (N.type === "keydown" && (N.which === $.ui.keyCode.TAB || N.keyCode === $.ui.keyCode.ENTER))) {
							if (N.type === "keydown") {
								N.preventDefault()
							}
							var K = false;
							var O = navigator.userAgent.toString().toLowerCase();
							var M = $("#lookinCombo").val();
							var Q = "Smart";
							var L = "";
							if (d === M) {
								K = true
							}
							d = M;
							if ((M.indexOf("f") === 0 && M.indexOf("i") === 1 && M.indexOf("d") === 3) || (M.indexOf("k") === 0 && M.indexOf("n") === 1 && M.indexOf("w") === 3)) {
								$("#Adv_Find_Dialog").remove();
								$("#Adv_Barcode_Dialog").remove();
								M = E.Trim(M.substring(4));
								L = M.substring(0, 5);
								if (L === Q) {
									$("#text-box").show();
									$("#srch-button").show()
								} else {
									$("#text-box").hide();
									$("#srch-button").hide()
								}
								$("#adv-srch-button").hide();
								$("#srch-pref-button").hide();
								if (L !== Q) {
									H.OnControlEvent("OnLoadAdvancedFind", M)
								}
								if (K) {
									if (L === Q) {
										SiebelApp.S_App.GotoView("Smart Answer All Results View")
									}
								} else {
									$("#text-box").val("")
								}
							} else {
								if (M.indexOf("b") === 0 && M.indexOf("r") === 1 && M.indexOf("c") === 2) {
									$("#Adv_Find_Dialog").remove();
									$("#Adv_Barcode_Dialog").remove();
									$("#text-box").hide();
									$("#srch-button").hide();
									$("#adv-srch-button").hide();
									$("#srch-pref-button").hide();
									var P = M.charAt(3);
									t.call(this, P, N)
								} else {
									if ((M.indexOf("Q") === 0 && M.indexOf("u") === 1 && M.indexOf("i") === 2) || (M.indexOf("F") === 0 && M.indexOf("i") === 1 && M.indexOf("n") === 2 && M.indexOf("d") === 3)) {
										$("#Adv_Find_Dialog").remove();
										$("#Adv_Barcode_Dialog").remove();
										$("#text-box").hide();
										$("#srch-button").hide();
										$("#adv-srch-button").hide();
										$("#srch-pref-button").hide()
									} else {
										$("#Adv_Find_Dialog").remove();
										$("#Adv_Barcode_Dialog").remove();
										$("#text-box").show();
										$("#srch-button").show();
										$("#adv-srch-button").show();
										$("#srch-pref-button").show()
									}
								}
							}
						} else {
							if (N.type === "keydown" && N.keyCode === $.ui.keyCode.ESCAPE) {
								$("#Adv_Find_Dialog").remove();
								$("#lookinCombo").prop("selectedIndex", 0);
								$("#srchDivCont").hide()
							}
						}
					});
					$("#text-box").bind("click keypress keyup", {
						ctx : this
					}, function (K) {
						if (K.type === "keyup" && K.keyCode === $.ui.keyCode.ESCAPE) {
							$("#Adv_Find_Dialog").remove();
							$("#lookinCombo").prop("selectedIndex", 0);
							$("#srchDivCont").hide()
						}
					});
					$("#srch-button").unbind("click");
					$("#srch-button").bind("click", {
						ctx : this
					}, function (M) {
						$("#Srch_Dialog").dialog("close");
						var K = $("#lookinCombo").val();
						if ((K.indexOf("d") === 0 && K.indexOf("e") === 1 && K.indexOf("l") === 2 && K.indexOf("i") === 3 && K.indexOf("m") === 4) || (K.indexOf("F") === 0 && K.indexOf("i") === 1 && K.indexOf("n") === 2 && K.indexOf("d") === 3)) {}
						else {
							if ((K.indexOf("f") === 0 && K.indexOf("i") === 1 && K.indexOf("d") === 3) || (K.indexOf("k") === 0 && K.indexOf("n") === 1 && K.indexOf("w") === 3)) {
								K = E.Trim(K.substring(4));
								H.SetProperty("SearchType", "FIND");
								H.SetProperty("BCType", "Smart Answer");
								if (K.indexOf("S") === 0 && K.indexOf("m") === 1 && K.indexOf("t") === 4) {
									var N = "4#" + "SA CallCenter".length + "#SA CallCenter" + $("#text-box").val().length + "#" + $("#text-box").val() + "0#0#";
									H.SetProperty("SearchText", N);
									var O = "4#" + "Smart Answer Profile".length + "#Smart Answer Profile" + "Abstract".length + "#Abstract" + "SA_Field_Description".length + "#SA_Field_Description" + "SA_Field_Type".length + "#SA_Field_Type";
									H.SetProperty("findFieldString", O)
								}
							} else {
								H.SetProperty("SearchType", "BASIC");
								if ((K.indexOf("P") === 0 && K.indexOf("a") === 1 && K.indexOf("n") === 4 && K.indexOf("t") === 5)) {
									K = E.Trim(K.substring(6));
									var L = "2#6#Parent" + K.length + "#" + K;
									H.SetProperty("BCType", L)
								} else {
									var L = "1#" + K.length + "#" + K;
									H.SetProperty("BCType", L)
								}
								H.SetProperty("Freetext", $("#text-box").val())
							}
							H.OnControlEvent("OnExecuteSearch", K)
						}
					});
					$("#adv-srch-button").unbind("click");
					$("#adv-srch-button").bind("click", {
						ctx : this
					}, function (L) {
						$("#Adv_Srch_Dialog").dialog("close");
						$("#Srch_Dialog").dialog("close");
						var K = $("#lookinCombo").val();
						if (K.indexOf("f") === 0 && K.indexOf("i") === 1 && K.indexOf("d") === 3) {}
						else {
							if ((K.indexOf("d") === 0 && K.indexOf("e") === 1 && K.indexOf("l") === 2 && K.indexOf("i") === 3 && K.indexOf("m") === 4) || (K.indexOf("F") === 0 && K.indexOf("i") === 1 && K.indexOf("n") === 2 && K.indexOf("d") === 3)) {}
							else {
								$("#lookinCombo").prop("selectedIndex", 0);
								H.OnControlEvent("OnLoadAdvancedSearch", K)
							}
						}
					});
					$("#srch-pref-button").unbind("click");
					$("#srch-pref-button").bind("click", {
						ctx : this
					}, function (K) {
						$("#Search_Pref_Dialog").dialog("close");
						H.OnControlEvent("OnLoadSearchPreference")
					});
				case "AdvSrch":
					$(document).undelegate("#inner-adv-srch-button", "click");
					$(document).delegate("#inner-adv-srch-button", "click", {
						ctx : this
					}, function (L) {
						var N = [];
						var W = [];
						var U = 0;
						var S = 0;
						var R = 0;
						var Q = 0;
						var P = false;
						for (U = 0; U < B; U++) {
							var T = "ChkBox" + U;
							if ($("#" + T + "").is(":checked")) {
								var Y = $("#" + T + "").val();
								P = true;
								N[S] = Y;
								S++
							}
						}
						if (P) {
							W[Q] = "buscomp";
							H.SetProperty("DataSource" + Q, "buscomp");
							Q += 1
						}
						var V = "";
						if (N.length > 0) {
							V = E.SearchUtil_ArrayToString(N)
						} else {
							if (P) {
								V = "1#3#All"
							}
						}
						var aa = [];
						for (U = 0; U < s; U++) {
							var T = "FFChkBox" + U;
							if ($("#" + T + "").is(":checked")) {
								var M = $("#" + T + "").val();
								aa[R] = M;
								R++
							}
						}
						var O = "";
						if (aa.length > 0) {
							O = E.SearchUtil_ArrayToString(aa)
						}
						var K = [];
						var U = 0;
						var S = 0;
						var R = 0;
						var Z = false;
						for (U = 0; U < f; U++) {
							var T = "DSChkBox" + U;
							if ($("#" + T + "").is(":checked")) {
								var X = $("#" + T + "").val();
								Z = true;
								H.SetProperty("DataSource" + Q, X);
								S++;
								Q++
							}
						}
						H.SetProperty("NumDataSource", Q);
						H.SetProperty("Contains AND", $("#all-text-box").val());
						H.SetProperty("Contains NOT", $("#none-text-box").val());
						H.SetProperty("Contains EXACT", $("#exact-text-box").val());
						H.SetProperty("Contains OR", $("#any-text-box").val());
						H.SetProperty("BCType", V);
						H.SetProperty("SearchType", "ADVANCED");
						H.SetProperty("Fileformat", O);
						$("#Adv_Srch_Dialog").dialog("close");
						H.OnControlEvent("OnExecuteSearch")
					});
					break;
				case "AdvFind":
					$(".siebui-search-div-find-field").bind("keypress", {
						ctx : this
					}, function (K) {
						if (K.type === "keypress" && K.which === $.ui.keyCode.ENTER) {
							H.SetProperty("SearchType", "ADVANCEDFIND");
							var L = false;
							var R = false;
							var P = 0;
							var S = 0;
							var M;
							var O = activenumFindFields + "#";
							for (P = 0; P < activenumFindFields; P++) {
								if (F.indexOf(b[P]) == -1) {
									M = "0";
									L = false
								} else {
									var Q = $("#findFieldTextBox" + S + "");
									var M = Q.val().trim();
									G[S] = M;
									if (M === "") {
										M = "0";
										L = false
									} else {
										var N = M.length;
										M = N + "#" + M;
										L = true
									}
									S++
								}
								if (L) {
									O = O + M
								} else {
									O = O + M + "#"
								}
							}
							H.SetProperty("SearchText", O);
							$("#Adv_Find_Dialog").remove();
							$("#lookinCombo").prop("selectedIndex", 0);
							H.OnControlEvent("OnExecuteSearch")
						}
					});
					$(document).undelegate("#inner-adv-find-button", "click");
					$(document).delegate("#inner-adv-find-button", "click", {
						ctx : this
					}, function (K) {
						H.SetProperty("SearchType", "ADVANCEDFIND");
						var L = false;
						var R = false;
						var P = 0;
						var S = 0;
						var M;
						var O = activenumFindFields + "#";
						for (P = 0; P < activenumFindFields; P++) {
							if (F.indexOf(b[P]) == -1) {
								M = "0";
								L = false
							} else {
								var Q = $("#findFieldTextBox" + S + "");
								var M = Q.val().trim();
								G[S] = M;
								if (M === "") {
									M = "0";
									L = false
								} else {
									var N = M.length;
									M = N + "#" + M;
									L = true
								}
								S++
							}
							if (L) {
								O = O + M
							} else {
								O = O + M + "#"
							}
						}
						H.SetProperty("SearchText", O);
						$("#Adv_Find_Dialog").remove();
						$("#lookinCombo").prop("selectedIndex", 0);
						H.OnControlEvent("OnExecuteSearch")
					});
					$(document).undelegate("#adv-find-reset-button", "click");
					$(document).delegate("#adv-find-reset-button", "click", {
						ctx : this
					}, function (K) {
						$("#Adv_Find_Dialog").remove();
						h = "";
						o = false;
						var L = $("#lookinCombo").val();
						z.call(this, F, p, b, E.Trim(L.substring(4)), true, K)
					});
					break;
				case "AdvBarcode":
					$(document).undelegate("#barcodeTextBox0", "keypress");
					$(document).delegate("#barcodeTextBox0", "keypress", {
						ctx : this
					}, function (K) {
						if ((K.which === $.ui.keyCode.ENTER) || ((K.which === 28 || K.which === 92) && K.ctrlKey === true)) {
							if ($("#barcodeTextBox0").val() !== "") {
								H.SetProperty("SearchType", "BARCODE");
								H.SetProperty("SearchText", $("#barcodeTextBox0").val());
								H.SetProperty("BCType", E.Trim(($("#lookinCombo").val()).substring(4)));
								$("#barcodeTextBox0").val("");
								H.OnControlEvent("OnExecuteSearch")
							}
						}
					});
					break;
				case "SrchFromAdvSrch":
					$(document).delegate("#srch-showall-button", "click", {
						ctx : this
					}, function (K) {
						$("#Srch_Dialog").dialog("close");
						H.OnControlEvent("OnExecuteShowAllSearchResults")
					});
					$(document).undelegate("#Srch_AltWordsAdv", "click");
					$(document).delegate("#Srch_AltWordsAdv", "click", {
						ctx : this
					}, function (K) {
						H.SetProperty("Contains AND", $("#Srch_AltWordsAdv").text());
						H.SetProperty("Contains NOT", "");
						H.SetProperty("Contains EXACT", "");
						H.SetProperty("Contains OR", "");
						H.OnControlEvent("OnExecuteSearch");
						$("#Srch_Dialog").dialog("close")
					});
					break;
				case "SrchShowAll":
					$(document).undelegate("#srch-showall-button", "click");
					$(document).delegate("#srch-showall-button", "click", {
						ctx : this
					}, function (K) {
						H.OnControlEvent("OnExecuteShowAllSearchResults");
						$("#Srch_Dialog").dialog("close")
					});
					$(document).undelegate("#Srch_AltWords", "click");
					$(document).delegate("#Srch_AltWords", "click", {
						ctx : this
					}, function (N) {
						var K = $("#lookinCombo").val();
						var M = K.length;
						var L = "1#" + M + "#" + K;
						$("#text-box").val($("#Srch_AltWords").text());
						H.SetProperty("Freetext", $("#Srch_AltWords").text());
						H.SetProperty("BCType", L);
						H.SetProperty("SearchType", "BASIC");
						H.OnControlEvent("OnExecuteSearch");
						$("#Srch_Dialog").dialog("close")
					});
					break;
				case "SrchPref":
					$(document).undelegate("#save-pref-button", "click");
					$(document).delegate("#save-pref-button", "click", {
						ctx : this
					}, function (K) {
						H.SetProperty("SEARCH_PER_PAGE", $("#numPagesCombo").val());
						H.SetProperty("SEARCH_SORT", $("#sortCombo").val());
						H.SetProperty("SEARCH_LANGUAGE", $("#queryLangCombo").val());
						if ($("#docLangChkBox").is(":checked")) {
							H.SetProperty("DOC_LANGUAGE", "true")
						} else {
							H.SetProperty("DOC_LANGUAGE", "false")
						}
						$("#Search_Pref_Dialog").dialog("close");
						H.OnControlEvent("OnExecuteSavePreference")
					});
					break;
				default:
					break
				}
			};
			v.prototype.BindData = function () {
				SiebelAppFacade.SearchLookinPhyRenderer.superclass.BindData.call(this);
				var I = this.GetPM();
				var H = $("[name=" + I.Get("GetContainer") + "]")
			};
			function u(M, K) {
				var W = "";
				var V = '<span class="siebui-popup-action-bar"><button type = "button" id= "srch-showall-button" class="appletButton" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + " " + A.GetLocalString("IDS_SWE_CKEDITOR_SCALE_ALL") + '">' + A.GetLocalString("IDS_SWE_CKEDITOR_SCALE_ALL") + "</button></span>";
				var O = '<span class="siebui-search-newline-dialog"> </span>';
				var J = CCFMiscUtil_CreatePropSet();
				var U = '<span class="siebui-search-bigheadingtext-dialog">' + A.GetLocalString("IDS_SEARCH_OUI_SRCH_TITLE_TEXT") + "</span>";
				var P = '<span class="siebui-search-bigheadingtext-dialog">' + A.GetLocalString("IDS_SWE_CKEDITOR_SOURCE") + "</span>";
				var X = '<span class="siebui-search-bigheadingtext-dialog">' + A.GetLocalString("IDS_CALENDAR_DATE_COMBOBOX_TITLE") + "</span>";
				var L = '<span class="siebui-search-bigheadingtext-dialog"></span>';
				var ag = '<span class="siebui-search-bigheadingtext-dialog"></span>';
				var H = '<span class="siebui-search-bigheadingtext-dialog"></span>';
				var S = '<table class="siebui-search-row-heading">';
				var I = '<tr class="siebui-search-row-heading">';
				var T = '<td class="siebui-search-row-heading">';
				var Q = "<table title=" + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + A.GetLocalString("IDS_SEARCH_OUI_SRCH_RESULTS_TEXT") + "><tbody><tr><th class=siebui-search-table-h1>" + U + "</th><th class=siebui-search-table-h2>" + P + "</th><th class=siebui-search-table-h3>" + X + "</th></tr>";
				var Z = 5;
				var Y = 0;
				var af = M.GetProperty("AltWords");
				if (typeof(af) !== "undefined") {
					if (af.length !== 0) {
						Q += O + '<span class="siebui-search-bigtext-dialog" title="' + A.GetLocalString("IDS_SEARCH_OUI_DID_YOU_MEAN_TEXT") + '">' + A.GetLocalString("IDS_SEARCH_OUI_DID_YOU_MEAN_TEXT") + ': </span><a href="javascript:void(0)"id="Srch_AltWords"value ="' + af + '">' + af + "</a>"
					}
				}
				if (M.GetChildCount() < Z) {
					Z = M.GetChildCount()
				}
				if (M.GetChildCount() > 0) {
					for (Y = 0; Y < Z; Y++) {
						J = M.GetChild(Y);
						var R = "<tr class=siebui-row-first siebui-row-odd>";
						var ac = "<tr class=siebui-row-odd>";
						var aa = "<tr class=siebui-row-even>";
						var N = "<td class=siebui-search-col1><p><span class=siebui-search-highlight>" + J.GetProperty("Title") + "</span></p><span class=siebui-search-subtext>" + J.GetProperty("Summary") + "</span></td><td class=siebui-search-col2>" + J.GetProperty("DataSource") + "</td><td class=siebui-search-col3>" + J.GetProperty("Date") + "</td></tr>";
						if (Y === 0) {
							Q += R + N
						} else {
							if (Y % 2 === 0) {
								Q += aa + N
							} else {
								Q += ac + N
							}
						}
					}
					Q += "</tbody></table>" + V
				} else {
					Q += "</table>" + O;
					if ($(K).text() !== "") {
						E.Alert(K)
					}
				}
				var ae = navigator.userAgent.toString().toLowerCase();
				var ab = (ae.indexOf("msie") != -1);
				W = A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK");
				var ah = '<span class="siebui-search-titletext-dialog" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '">' + W + "</span>";
				$("#Srch_Dialog").attr("tabindex", "0");
				if (ab) {
					var ad = $('<div id="Srch_Dialog" class="siebui-search-dialog" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '"></div>').html(Q).dialog({
							autoOpen : false,
							title : W,
							position : {
								my : "center",
								at : "center",
								off : "center"
							},
							height : 600,
							width : 500,
							modal : false,
							cleanOnClose : true,
							resizable : true,
							open : function (ai, aj) {},
							beforeClose : function (ai, aj) {
								if ($("#Srch_Dialog").length > 0) {
									$("#Srch_Dialog").remove()
								}
							}
						})
				} else {
					var ad = $('<div id="Srch_Dialog" class="siebui-search-dialog" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '"></div>').html(Q).dialog({
							autoOpen : false,
							title : W,
							position : {
								my : "center",
								at : "center",
								off : "center"
							},
							height : 600,
							width : 500,
							modal : false,
							cleanOnClose : true,
							resizable : true,
							show : {
								effect : "drop",
								direction : "up",
								duration : 1000
							},
							hide : {
								effect : "drop",
								direction : "up",
								duration : 1000
							},
							open : function (ai, aj) {},
							beforeClose : function (ai, aj) {
								if ($("#Srch_Dialog").length > 0) {
									$("#Srch_Dialog").remove()
								}
							}
						})
				}
				ad.dialog("open");
				this.BindEvents("SrchShowAll");
				this.GetPM().SetProperty("ShowSearchResultsDialog", false)
			}
			function D(L, J) {
				var T = "";
				var S = '<span class="siebui-popup-action-bar"><button type="button" id="srch-showall-button" class="appletButton" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + " " + A.GetLocalString("IDS_SWE_CKEDITOR_SCALE_ALL") + '">' + A.GetLocalString("IDS_SWE_CKEDITOR_SCALE_ALL") + "</button></span>";
				var N = '<span class="siebui-search-newline-dialog"></span>';
				var I = CCFMiscUtil_CreatePropSet();
				var R = '<span class="siebui-search-bigheadingtext-dialog">' + A.GetLocalString("IDS_SEARCH_OUI_SRCH_TITLE_TEXT") + "</span>";
				var O = '<span class="siebui-search-bigheadingtext-dialog">' + A.GetLocalString("IDS_SWE_CKEDITOR_SOURCE") + "</span>";
				var U = '<span class="siebui-search-bigheadingtext-dialog">' + A.GetLocalString("IDS_CALENDAR_DATE_COMBOBOX_TITLE") + "</span>";
				var K = '<span class="siebui-search-bigheadingtext-dialog"></span>';
				var ac = '<span class="siebui-search-bigheadingtext-dialog"></span>';
				var H = '<span class="siebui-search-bigheadingtext-dialog"></span>';
				var P = "<table title=" + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + A.GetLocalString("IDS_SEARCH_OUI_SRCH_RESULTS_TEXT") + "><tbody><tr><th class=siebui-search-table-h1>" + R + "</th><th class=siebui-search-table-h2>" + O + "</th><th class=siebui-search-table-h3>" + U + "</th></tr>";
				var V = 5;
				var W = 0;
				var ad = L.GetProperty("AltWords");
				if (typeof(ad) !== "undefined") {
					if (ad.length !== 0) {
						P += N + '<span class="siebui-search-bigtext-dialog" title="' + A.GetLocalString("IDS_SEARCH_OUI_DID_YOU_MEAN_TEXT") + '">' + A.GetLocalString("IDS_SEARCH_OUI_DID_YOU_MEAN_TEXT") + ': </span><a href="javascript:void(0)"id="Srch_AltWordsAdv"value ="' + ad.replace(/<\/B>/g, "").replace(/(<B>)/g, "").replace(/"/g, "") + '">' + ad + "</a>"
					}
				}
				if (L.GetChildCount() < V) {
					V = L.GetChildCount()
				}
				if (L.GetChildCount() > 0) {
					for (W = 0; W < V; W++) {
						I = L.GetChild(W);
						var Q = "<tr class=siebui-row-first siebui-row-odd>";
						var Z = "<tr class=siebui-row-odd>";
						var X = "<tr class=siebui-row-even>";
						var M = "<td class=siebui-search-col1><p><span class=siebui-search-highlight>" + I.GetProperty("Title") + "</span></p><span class=siebui-search-subtext>" + I.GetProperty("Summary") + "</span></td><td class=siebui-search-col2>" + I.GetProperty("DataSource") + "</td><td class=siebui-search-col3>" + I.GetProperty("Date") + "</td></tr>";
						if (W === 0) {
							P += Q + M
						} else {
							if (W % 2 === 0) {
								P += X + M
							} else {
								P += Z + M
							}
						}
					}
					P += "</tbody></table>" + S
				} else {
					P += "</table>" + N;
					if ($(J).text() !== "") {
						E.Alert(J)
					}
				}
				var ab = navigator.userAgent.toString().toLowerCase();
				var Y = (ab.indexOf("msie") != -1);
				T = A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK");
				var ae = '<span class="siebui-search-titletext-dialog" id="searchdialogtitle" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '">' + T + "</span>";
				$("#Srch_Dialog").attr("tabindex", "0");
				if (Y) {
					var aa = $('<div id="Srch_Dialog" class="siebui-search-dialog" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '"></div>').html(P).dialog({
							autoOpen : false,
							title : T,
							position : {
								my : "center",
								at : "center",
								off : "center"
							},
							height : 600,
							width : 500,
							modal : false,
							cleanOnClose : true,
							resizable : true,
							open : function (af, ag) {},
							beforeClose : function (af, ag) {
								if ($("#Srch_Dialog").length > 0) {
									$("#Srch_Dialog").remove()
								}
							}
						})
				} else {
					var aa = $('<div id="Srch_Dialog" class="siebui-search-dialog" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '"></div>').html(P).dialog({
							autoOpen : false,
							title : T,
							position : {
								my : "center",
								at : "center",
								off : "center"
							},
							height : 600,
							width : 500,
							modal : false,
							cleanOnClose : true,
							resizable : true,
							show : {
								effect : "drop",
								direction : "up",
								duration : 1000
							},
							hide : {
								effect : "drop",
								direction : "up",
								duration : 1000
							},
							open : function (af, ag) {},
							beforeClose : function (af, ag) {
								if ($("#Srch_Dialog").length > 0) {
									$("#Srch_Dialog").remove()
								}
							}
						})
				}
				aa.dialog("open");
				this.BindEvents("SrchFromAdvSrch");
				this.GetPM().SetProperty("ShowSearchResultsDialogFromAdvSearch", false)
			}
			function y(ah, K, M) {
				var Z = "";
				var N = '<span class="siebui-popup-action-bar"><button type = "button" id= "inner-adv-srch-button" class="appletButton" title="' + A.GetLocalString("IDS_SWE_CKEDITOR_ADVANCED_TAB") + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '">' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + "</button>";
				var L = '<input type = "text" id= "all-text-box" title="' + A.GetLocalString("IDS_SEARCH_OUI_ADV_SRCH_ALL_TEXT") + '"/>' + A.GetLocalString("IDS_SEARCH_OUI_ADV_SRCH_ALL_TEXT");
				var P = '<input type = "text" id= "none-text-box" title="' + A.GetLocalString("IDS_SEARCH_OUI_ADV_SRCH_NONE_TEXT") + '"/>' + A.GetLocalString("IDS_SEARCH_OUI_ADV_SRCH_NONE_TEXT");
				var O = '<input type = "text" id= "exact-text-box" title="' + A.GetLocalString("IDS_SEARCH_OUI_ADV_SRCH_EXACT_TEXT") + '"/>' + A.GetLocalString("IDS_SEARCH_OUI_ADV_SRCH_EXACT_TEXT");
				var X = '<input type = "text" id= "any-text-box" title="' + A.GetLocalString("IDS_SEARCH_OUI_ADV_SRCH_ANY_TEXT") + '"/>' + A.GetLocalString("IDS_SEARCH_OUI_ADV_SRCH_ANY_TEXT");
				var J = '<span class="siebui-search-headingtext-dialog">' + A.GetLocalString("IDS_SEARCH_OUI_ADV_SRCH_LOOKIN") + "</span>";
				var W = '<div class="siebui-popup-form-section siebui-search-source">';
				var H = '<div class="siebui-popup-form-section">';
				var I = "</div>";
				var aa = 0;
				var ae = [];
				while (ah[aa]) {
					var ac = "ChkBox" + aa;
					if (SiebelApp.S_App.GetDirection()) {
						ae[aa] = '<span class="siebui-popup-form-action"><input type = "checkbox" id=' + ac + ' value ="' + ah[aa] + '" title ="' + ah[aa] + '"/><label for=' + ac + ' class="siebui-search-advsearch-rtl-padding">' + ah[aa] + "</label></span>"
					} else {
						ae[aa] = '<span class="siebui-popup-form-action"><input type = "checkbox" id=' + ac + ' value ="' + ah[aa] + '" title ="' + ah[aa] + '"/><label for=' + ac + ">" + ah[aa] + "</label></span>"
					}
					aa++
				}
				B = aa;
				var aa = 0;
				var Q = [];
				while (M[aa]) {
					var ac = "FFChkBox" + aa;
					if (SiebelApp.S_App.GetDirection()) {
						Q[aa] = '<span class="siebui-popup-form-action"><input type = "checkbox" id=' + ac + ' value ="' + M[aa] + '" title ="' + M[aa] + '"/><label for=' + ac + ' class="siebui-search-advsearch-rtl-padding">' + M[aa] + "</label></span>"
					} else {
						Q[aa] = '<span class="siebui-popup-form-action"><input type = "checkbox" id=' + ac + ' value ="' + M[aa] + '" title ="' + M[aa] + '"/><label for=' + ac + ">" + M[aa] + "</label></span>"
					}
					aa++
				}
				s = aa;
				var aa = 0;
				var S = [];
				while (K[aa]) {
					var ac = "DSChkBox" + aa;
					if (SiebelApp.S_App.GetDirection()) {
						S[aa] = '<span class="siebui-popup-form-action"><input type = "checkbox" id=' + ac + ' value ="' + K[aa] + '" title ="' + K[aa] + '"/><label for=' + ac + ' class="siebui-search-advsearch-rtl-padding">' + K[aa] + "</label></span>"
					} else {
						S[aa] = '<span class="siebui-popup-form-action"><input type = "checkbox" id=' + ac + ' value ="' + K[aa] + '" title ="' + K[aa] + '"/><label for=' + ac + ">" + K[aa] + "</label></span>"
					}
					aa++
				}
				f = aa;
				var R = '<span class="siebui-search-newline-dialog"></span>';
				var Y = 0;
				var T = R + L + R + X + R + O + R + P + R + J + W;
				for (Y = 0; Y < B; Y++) {
					T = T + ae[Y]
				}
				T += I;
				var ad = '<span class="siebui-search-headingtext-dialog">' + A.GetLocalString("IDS_SEARCH_OUI_ADV_SRCH_FILE_FORMAT") + "</span>";
				T = T + R + ad + H;
				for (Y = 0; Y < s; Y++) {
					T = T + Q[Y]
				}
				T += I;
				var V = '<span class="siebui-search-headingtext-dialog">' + A.GetLocalString("IDS_SWE_CKEDITOR_DATA") + A.GetLocalString("IDS_SWE_CKEDITOR_SOURCE") + "</span>";
				T += R + V + H;
				for (Y = 0; Y < f; Y++) {
					T = T + S[Y]
				}
				T += I;
				T += R + N;
				var ag = navigator.userAgent.toString().toLowerCase();
				var ab = (ag.indexOf("msie") != -1);
				Z = A.GetLocalString("IDS_SWE_CKEDITOR_ADVANCED_TAB") + " " + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK");
				var U = '<span class="siebui-search-titletext-dialog" id="advsrchdialogtitle" title="' + A.GetLocalString("IDS_SWE_CKEDITOR_ADVANCED_TAB") + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '">' + Z + "</span>";
				$("#Adv_Srch_Dialog").attr("tabindex", "0");
				if (ab) {
					var af = $('<div id="Adv_Srch_Dialog" class="siebui-search-dialog" title="' + A.GetLocalString("IDS_SWE_CKEDITOR_ADVANCED_TAB") + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '"></div>').html(T).dialog({
							autoOpen : false,
							title : Z,
							position : {
								my : "center",
								at : "center",
								off : "center"
							},
							height : 500,
							width : 500,
							modal : false,
							cleanOnClose : true,
							resizable : true,
							open : function (ai, aj) {
								$(this).parent().find("div.ui-dialog-titlebar")
							},
							beforeClose : function (ai, aj) {
								if ($("#Adv_Srch_Dialog").length > 0) {
									$("#Adv_Srch_Dialog").remove()
								}
							}
						})
				} else {
					var af = $('<div id="Adv_Srch_Dialog" class="siebui-search-dialog" title="' + A.GetLocalString("IDS_SWE_CKEDITOR_ADVANCED_TAB") + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + '"></div>').html(T).dialog({
							autoOpen : false,
							title : Z,
							position : {
								my : "center",
								at : "center",
								off : "center"
							},
							height : 500,
							width : 500,
							modal : false,
							cleanOnClose : true,
							resizable : true,
							show : {
								effect : "drop",
								direction : "up",
								duration : 1000
							},
							hide : {
								effect : "drop",
								direction : "up",
								duration : 1000
							},
							open : function (ai, aj) {
								$(this).parent().find("div.ui-dialog-titlebar")
							},
							beforeClose : function (ai, aj) {
								if ($("#Adv_Srch_Dialog").length > 0) {
									$("#Adv_Srch_Dialog").remove()
								}
							}
						})
				}
				af.dialog("open");
				this.BindEvents("AdvSrch");
				this.GetPM().SetProperty("showAdvancedSearchPopup", false)
			}
			function z(Y, L, ab, V, H, R) {
				var P;
				var I = "";
				var aa = "";
				var J = '<div id="Adv_Find_Dialog"></div>';
				$("#srchDivCont").append(J).trigger("create");
				var Z = navigator.userAgent.toString().toLowerCase();
				var U = (Z.indexOf("msie") != -1);
				var M = (Z.indexOf("chrome") != -1);
				F = Y;
				p = L;
				activenumFindFields = ab.length;
				b = ab;
				if (typeof(V) !== "undefined") {
					if (H) {
						if (V === "Contacts" || V === "Personen") {
							V = "Corporate Contact"
						}
					}
					if (h !== V.toString()) {
						h = V.toString();
						j = false
					} else {
						j = true
					}
				}
				var O = '<button type = "button" id= "inner-adv-find-button" class="siebui-search-button" title="' + A.GetLocalString("RTCFindTxt") + '"><img src="images/esearch_submitsearch.png" class="siebui-search-image"/></button>';
				var S = '<button type = "button" id= "adv-find-reset-button" class="siebui-search-button" title="' + A.GetLocalString("IDS_SWE_JQGRID_SEARCH_RESET") + '"><img src="images/esearch_find_reset.png" class="siebui-search-image"/></button>';
				var T = 0;
				var Q = 0;
				var W = [];
				var N = "";
				while (L[T]) {
					var X = "findFieldTextBox" + T;
					if (j) {
						if (typeof(G[T]) === "undefined") {
							G[T] = aa
						}
						if (o) {
							N = this.GetPM().Get("InProp").GetChild(0).GetProperty(Y[T])
						}
						if ((typeof(N) !== "undefined") && o) {
							G[T] = N
						} else {
							G[T] = aa
						}
						W[T] = '<div class="siebui-search-div-find-field"><span class="siebui-search-div-find-field-cell1"><label for=' + X + ' + title="' + L[T] + '" + class="siebui-search-find-field-text" + >' + L[T] + '</label></span><span class="siebui-search-div-find-field-cell2"><input type = "text" class="siebui-search-textbox-srch siebui-search-textbox-find" id= "' + X + '" + value="' + G[T] + '" + title="' + L[T] + '"/></span></div>'
					} else {
						if (o) {
							N = this.GetPM().Get("InProp").GetChild(0).GetProperty(Y[T])
						}
						if (typeof(N) === "undefined") {
							N = aa
						}
						W[T] = '<div class="siebui-search-div-find-field"><span class="siebui-search-div-find-field-cell1"><label for=' + X + ' + title="' + L[T] + '" + class="siebui-search-find-field-text" + >' + L[T] + '</label></span><span class="siebui-search-div-find-field-cell2"><input type = "text" class="siebui-search-textbox-srch siebui-search-textbox-find" id= "' + X + '" + value="' + N + '" + title="' + L[T] + '"/></span></div>'
					}
					T++
				}
				i = T;
				var K;
				for (Q = 0; Q < i; Q++) {
					if (Q === 0) {
						K = W[Q]
					} else {
						K = K + W[Q]
					}
				}
				K += '<div class="siebui-search-div-find-field siebui-search-div-find-buttons"><span class="siebui-search-div-find-field-cell1">&nbsp;</span><span class="siebui-search-div-find-field-cell2">' + S + O + "</span></div>";
				$("#Adv_Find_Dialog").append(K).trigger("create");
				$("#Adv_Find_Dialog").show();
				if (H) {
					P = R.data.ctx
				} else {
					P = this
				}
				P.BindEvents("AdvFind");
				P.GetPM().SetProperty("showAdvancedFindPopup", false)
			}
			function t(M, J) {
				var H = J.data.ctx;
				var I = '<div id="Adv_Barcode_Dialog"></div>';
				$("#srchDivCont").append(I).trigger("create");
				var R = navigator.userAgent.toString().toLowerCase();
				var Q = (R.indexOf("msie") != -1);
				var L = (R.indexOf("chrome") != -1);
				var K = "barcodeTextBox0";
				if (SiebelApp.S_App.GetOfflineMode && SiebelApp.S_App.GetOfflineMode()) {
					var N = '<div class="siebui-search-div-find-field"><span class="siebui-search-div-find-field-cell2"><input type = "text" class="siebui-search-textbox-srch siebui-search-textbox-find" id= "' + K + '"/></span></div>'
				} else {
					var P = c[M];
					var N = '<div class="siebui-search-div-find-field"><span class="siebui-search-div-find-field-cell2"><input type = "text" class="siebui-search-textbox-srch siebui-search-textbox-find" id= "' + K + '" + title="' + P + '"/></span></div>'
				}
				var O = N;
				$("#Adv_Barcode_Dialog").append(O).trigger("create");
				$("#barcodeTextBox0").attr("tabindex", "0");
				$("#barcodeTextBox0").focus();
				$("#Adv_Barcode_Dialog").show();
				H.BindEvents("AdvBarcode")
			}
			function q(V, L, Z, af) {
				var I = "";
				var S = '<span class="siebui-popup-action-bar"><button type = "button" id= "save-pref-button" class="appletButton" title="' + A.GetLocalString("IDS_CLIENT_SAVE") + A.GetLocalString("IDS_BHC_COL_SETTINGS") + '">' + A.GetLocalString("IDS_CLIENT_SAVE") + "</button>";
				var J = '<span class="siebui-search-headingtext-dialog">' + A.GetLocalString("IDS_SEARCH_OUI_SRCH_PREF_RECORDS") + "</span>";
				var N = '<span class="siebui-search-newline-dialog"></span>';
				var R = "<select id='numPagesCombo' title='" + A.GetLocalString("IDS_SEARCH_OUI_SRCH_PREF_RECORDS") + "'>";
				var X = 0;
				var U = V.length;
				for (X = 0; X < U; X++) {
					R = R + "<option value='" + V[X] + "'>" + V[X] + "</option>"
				}
				R = R + "</select>";
				var W = '<span class="siebui-search-headingtext-dialog">' + A.GetLocalString("IDS_SEARCH_OUI_SRCH_PREF_SORT") + "</span>";
				var M = "<select id='sortCombo' title='" + A.GetLocalString("IDS_SEARCH_OUI_SRCH_PREF_SORT") + "'>";
				var K = L.length;
				for (X = 0; X < K; X++) {
					M = M + "<option value='" + L[X] + "'>" + L[X] + "</option>"
				}
				M = M + "</select>";
				var ab = '<span class="siebui-search-headingtext-dialog">' + A.GetLocalString("IDS_SEARCH_OUI_SRCH_PREF_QUERY_LANG") + "</span>";
				var H = "<select id='queryLangCombo' title='" + A.GetLocalString("IDS_SEARCH_OUI_SRCH_PREF_QUERY_LANG") + "'>";
				var X = 0;
				var Q = Z.length;
				for (X = 0; X < Q; X++) {
					H = H + "<option value='" + Z[X] + "'>" + Z[X] + "</option>"
				}
				H = H + "</select>";
				var ac = A.GetLocalString("IDS_SEARCH_OUI_SRCH_PREF_DOC_LANG");
				var Y = '<span class="siebui-search-headingtext-dialog">' + ac + "</span>";
				var P = '<span class="siebui-popup-form-action"><input type = "checkbox" id= "docLangChkBox" name = "docLangBox" value ="' + af + '" title ="' + ac + '"';
				if (af === "true") {
					P += ' checked = "true"'
				}
				P += "/></span>";
				var O = N + J + R + N + W + M + N + ab + H + N + Y + P + N + S;
				var ae = navigator.userAgent.toString().toLowerCase();
				var aa = (ae.indexOf("msie") != -1);
				I = A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + " " + A.GetLocalString("IDS_BHC_COL_SETTINGS");
				var T = '<span class="siebui-search-titletext-dialog" id="searchpref" title="' + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + A.GetLocalString("IDS_BHC_COL_SETTINGS") + '">' + I + "</span>";
				if (aa) {
					var ad = $('<div id="Search_Pref_Dialog" class="siebui-search-dialog" title="' + A.GetLocalString("IDS_BHC_COL_SETTINGS") + '"></div>').html(O).dialog({
							autoOpen : false,
							closeOnEscape : true,
							title : I,
							position : {
								my : "center",
								at : "center",
								off : "center"
							},
							height : 300,
							width : 350,
							modal : false,
							resizable : true,
						})
				} else {
					var ad = $('<div id="Search_Pref_Dialog" class="siebui-search-dialog" title="' + A.GetLocalString("IDS_BHC_COL_SETTINGS") + '"></div>').html(O).dialog({
							autoOpen : false,
							closeOnEscape : true,
							title : I,
							position : {
								my : "center",
								at : "center",
								off : "center"
							},
							height : 300,
							width : 350,
							modal : false,
							resizable : true,
							show : {
								effect : "drop",
								direction : "up",
								duration : 1000
							},
							hide : {
								effect : "drop",
								direction : "up",
								duration : 1000
							},
							beforeClose : function (ag, ah) {
								if ($("#Search_Pref_Dialog").length > 0) {
									$("#Search_Pref_Dialog").remove()
								}
							}
						})
				}
				ad.dialog("open");
				this.BindEvents("SrchPref");
				this.GetPM().SetProperty("showSearchPreferencePopup", false)
			}
			function e(K, I, Q, T, U, O, H, J, N) {
				var L = 0;
				var S;
				var M = "-------------";
				var V = "<select id='lookinCombo' class='siebui-search-combobox-searchLookin' title='" + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + "'>";
				if (SiebelApp.S_App.GetOfflineMode && SiebelApp.S_App.GetOfflineMode()) {
					if (H.length > 0) {
						V = V + "<option class=siebui-search-dropdown-delimeter value='QuickSearchDelimeter'>" + A.GetLocalString("IDS_SEARCH_OUI_BARCODE_QUICKSEARCH_TEXT") + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + "</option>"
					}
					for (L = 0; L < H.length; L++) {
						S = H[L];
						S = S.split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;").split("'").join("&#39;");
						V = V + "<option value='brc" + L + S + "'>&nbsp;&nbsp;" + S + "</option>"
					}
				} else {
					var P = K.length;
					var R = [];
					if (o && (typeof(l) !== "undefined")) {
						V = V + "<option value='find" + l + "'>" + l + "</option>"
					}
					for (L = 0; L < P; L++) {
						S = K[L];
						V = V + "<option id='ALL'value='" + S + "'>&nbsp;&nbsp;" + S + "</option>"
					}
					if (I.length > 0) {
						V = V + "<option class=siebui-search-dropdown-delimeter value='FindDelimeter'>" + A.GetLocalString("RTCFindTxt") + "</option>"
					}
					for (L = 0; L < I.length; L++) {
						S = I[L];
						S = S.split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;").split("'").join("&#39;");
						if (S.substring(0, J.length) === J) {
							R.push(S)
						} else {
							V = V + "<option value='find" + S + "'>&nbsp;&nbsp;" + S + "</option>"
						}
					}
					for (L = 0; L < R.length; L++) {
						V = V + "<option value='know" + R[L] + "'>&nbsp;&nbsp;" + R[L] + "</option>"
					}
					if (Q.length > 0) {
						V = V + "<option class=siebui-search-dropdown-delimeter value='delimeter'>" + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + "</option>"
					}
					for (L = 0; L < Q.length; L++) {
						S = Q[L];
						V = V + "<option value='" + S + "'>&nbsp;&nbsp;" + S + "</option>"
					}
					if ((T.length > 0) || (U.length > 0)) {
						V = V + "<option class=siebui-search-dropdown-delimeter value='delimeter'>" + A.GetLocalString("IDS_SWE_CKEDITOR_DATA") + A.GetLocalString("IDS_SWE_CKEDITOR_SOURCE") + "</option>"
					}
					for (L = 0; L < U.length; L++) {
						S = U[L];
						w[L] = S;
						V = V + "<option value='Parent" + S + "'>&nbsp;&nbsp;" + S + "</option>"
					}
					for (L = 0; L < T.length; L++) {
						S = T[L];
						w[L] = S;
						k[L] = O[L];
						V = V + "<option value='" + S + "'>&nbsp;&nbsp;" + S + "</option>"
					}
					if (N === "true") {
						if (H.length > 0) {
							V = V + "<option class=siebui-search-dropdown-delimeter value='QuickSearchDelimeter'>" + A.GetLocalString("IDS_SEARCH_OUI_BARCODE_QUICKSEARCH_TEXT") + A.GetLocalString("IDS_SWE_SEARCH_WATER_MARK") + "</option>"
						}
						for (L = 0; L < H.length; L++) {
							S = H[L];
							S = S.split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;").split("'").join("&#39;");
							V = V + "<option value='brc" + L + S + "'>&nbsp;&nbsp;" + S + "</option>"
						}
					}
				}
				V = V + "</select>";
				$("#srchDivCont").append(V).trigger("create");
				this.GetPM().SetProperty("fillLookin", false)
			}

			

			return v
		}
			());
		return "SiebelAppFacade.SearchLookinPhyRenderer"
	})
};
