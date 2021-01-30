sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, formatter, MessageBox, Fragment, Filter,
	FilterOperator) {
	"use strict";

	return BaseController.extend("soch.otc274Monitor.controller.Instructions", {

		formatter: formatter,
		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the Instructions button is pressed.
		 * @public
		 */
		onInit: function () {
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});

			this._table11 = [];
			this._table21 = [];
			this._table31 = [];
			this._table41 = [];
			this._insMark = [];
			this.setModel(oViewModel, "InstructionsView");
			this.getRouter().getRoute("instructions").attachPatternMatched(this._onInstructionsMatched, this);
		},

		onAfterRendering: function (oEvent) { 
			this.getRouter().getRoute("instructions").attachPatternMatched(this._onInstructionsMatched, this);
		},
		
		_onInstructionsMatched: function (oEvent) {
			this._mainBusy = this.getView().byId("page");
			this._mainBusy.setBusy(true);
			
			// this.getModel("InstructionsView").setProperty("/busy", true);
			this._sInstructions = JSON.parse(oEvent.getParameter("arguments").objects);
			this._sObject = JSON.stringify(oEvent.getParameter("arguments").objects);
			var sObject = JSON.stringify(oEvent.getParameter("arguments").objects);

			this._aFilters = [];
			this._aFilters.push(new sap.ui.model.Filter("Object", sap.ui.model.FilterOperator.EQ, sObject));
			
			this._instSOSelect = this.getView().byId("gmitsuTable");
			var that = this;
			this.getView().getModel().read("/gmitsuOrdersSet", {
				filters: this._aFilters,
				success: function (oData) {
					if (typeof oData.results[0] !== "undefined") {
						var oTB00 = {
							gmitsuOrdersSet: oData.results
						};
						var oTB00Model = new sap.ui.model.json.JSONModel(oTB00);
						that._instSOSelect.setModel(oTB00Model);
					}
				},
				error: function (oError) {
					console.log(oError);
				}
			});			
			
			var tb01 = this.getView().byId("table11");
			this.getView().getModel().read("/instMillSet", {
				filters: this._aFilters,
				success: function (oData) {
					var fields01 = { Zzcode: "",
									Zzdescr: "",
									Zzgroup: "",
									Zzkeyword: "",
									Zzusrprm: "",
									Allowedlen: "",
									Sequence: ""};
									
					if (typeof oData.results[0] !== "undefined") {

						var oTB01 = { instMillSet: [] };
						for ( var a = 0; a < oData.results.length; a++ ){
							fields01 = {};
							fields01.Zzcode     = oData.results[a].Zzcode; 
							fields01.Zzdescr    = oData.results[a].Zzdescr;
							fields01.Zzgroup    = oData.results[a].Zzgroup;
							fields01.Zzkeyword  = oData.results[a].Zzkeyword; 
							fields01.Zzusrprm   = oData.results[a].Zzusrprm;
							fields01.Allowedlen = oData.results[a].Allowedlen;
							fields01.Sequence   = oData.results[a].Sequence;
							oTB01.instMillSet.push(fields01);
						}						
						var oTB01Model = new sap.ui.model.json.JSONModel(oTB01);
						tb01.setModel(oTB01Model);

						for (var y = 0; y < tb01.getBinding().getModel().getData().instMillSet.length; y++) {
							if (tb01.getBinding().getModel().getData().instMillSet[y].Allowedlen === "E") { //|| y >= rows) {
								for (var x = 0; x < tb01.getRows()[y].getCells().length; x++) {
									if (x !== 1) {
										tb01.getRows()[y].getCells()[x].setEditable(true);
									}
								}
							}
						}
					}else{	

						that._table11 = [fields01];
						var oEmp01 = {
							instMillSet: that._table11
						};
						var oEmp01Model = new sap.ui.model.json.JSONModel(oEmp01);
						tb01.setModel(oEmp01Model);
						for (var w = 0; w < tb01.getBinding().getModel().getData().instMillSet.length; w++) {
							for (var z = 0; z < tb01.getRows()[w].getCells().length; z++) {
								if (z !== 1) {
									tb01.getRows()[w].getCells()[z].setEditable(true);
								}
							}
						}
					}
				},
				error: function (oError) {
					console.log(oError);
				}
			});

			var tb02 = this.getView().byId("table21");
			this.getView().getModel().read("/instSuppSet", {
				filters: this._aFilters,
				success: function (oData) {
					var fields02 = { Zzcode: "",
									Zzdescr: "",
									Zzgroup: "",
									Zzkeyword: "",
									Zzusrprm: "",
									Allowedlen: "",
									Sequence: ""};					
					
					if (typeof oData.results[0] !== "undefined") {

						var oTB02 = { instSuppSet: [] };
						for ( var a = 0; a < oData.results.length; a++ ){
							fields02 = {};
							fields02.Zzcode     = oData.results[a].Zzcode; 
							fields02.Zzdescr    = oData.results[a].Zzdescr;
							fields02.Zzgroup    = oData.results[a].Zzgroup;
							fields02.Zzkeyword  = oData.results[a].Zzkeyword; 
							fields02.Zzusrprm   = oData.results[a].Zzusrprm;
							fields02.Allowedlen = oData.results[a].Allowedlen;
							fields02.Sequence   = oData.results[a].Sequence;
							oTB02.instSuppSet.push(fields02);
						}						
						var oTB02Model = new sap.ui.model.json.JSONModel(oTB02);
						tb02.setModel(oTB02Model);

						for (var y = 0; y < tb02.getBinding().getModel().getData().instSuppSet.length; y++) {
							if (tb02.getBinding().getModel().getData().instSuppSet[y].Allowedlen === "E") { //|| y >= rows) {
								for (var x = 0; x < tb02.getRows()[y].getCells().length; x++) {
									if (x !== 1) {
										tb02.getRows()[y].getCells()[x].setEditable(true);
									}
								}
							}
						}
					}else{	

						that._table21 = [fields02];
						var oEmp02 = {
							instSuppSet: that._table21
						};
						var oEmp02Model = new sap.ui.model.json.JSONModel(oEmp02);
						tb02.setModel(oEmp02Model);
						for (var w = 0; w < tb02.getBinding().getModel().getData().instSuppSet.length; w++) {
							for (var z = 0; z < tb02.getRows()[w].getCells().length; z++) {
								if (z !== 1) {
									tb02.getRows()[w].getCells()[z].setEditable(true);
								}
							}
						}
					}
				},
				error: function (oError) {
					console.log(oError);
				}
			});

			var tb03 = this.getView().byId("table31");
			this.getView().getModel().read("/instToleSet", {
				filters: this._aFilters,
				success: function (oData) {

					var fields03 = { Zzcode: "",
									Zzdescr: "",
									Zzgroup: "",
									Zzkeyword: "",
									Zzusrprm: "",
									Allowedlen: "",
									Sequence: ""};
									
					if (typeof oData.results[0] !== "undefined") {

						var oTB03 = { instToleSet: [] };
						for ( var a = 0; a < oData.results.length; a++ ){
							fields03 = {};
							fields03.Zzcode     = oData.results[a].Zzcode; 
							fields03.Zzdescr    = oData.results[a].Zzdescr;
							fields03.Zzgroup    = oData.results[a].Zzgroup;
							fields03.Zzkeyword  = oData.results[a].Zzkeyword; 
							fields03.Zzusrprm   = oData.results[a].Zzusrprm;
							fields03.Allowedlen = oData.results[a].Allowedlen;
							fields03.Sequence   = oData.results[a].Sequence;
							oTB03.instToleSet.push(fields03);
						}
						var oTB03Model = new sap.ui.model.json.JSONModel(oTB03);
						tb03.setModel(oTB03Model);

						for (var y = 0; y < tb03.getBinding().getModel().getData().instToleSet.length; y++) {
							if (tb03.getBinding().getModel().getData().instToleSet[y].Allowedlen === "E") { //|| y >= rows) {
								for (var x = 0; x < tb03.getRows()[y].getCells().length; x++) {
									if (x !== 1) {
										tb03.getRows()[y].getCells()[x].setEditable(true);
									}
								}
							}
						}
					}else{	

						that._table31 = [fields03];
						var oEmp03 = {
							instToleSet: that._table31
						};
						var oEmp03Model = new sap.ui.model.json.JSONModel(oEmp03);
						tb03.setModel(oEmp03Model);
						for (var w = 0; w < tb03.getBinding().getModel().getData().instToleSet.length; w++) {
							for (var z = 0; z < tb03.getRows()[w].getCells().length; z++) {
								if (z !== 1) {
									tb03.getRows()[w].getCells()[z].setEditable(true);
								}
							}
						}
					}
				},
				error: function (oError) {
					console.log(oError);
				}
			});

			var tb04 = this.getView().byId("table41");
			this.getView().getModel().read("/instPNLSet", {
				filters: this._aFilters,
				success: function (oData) {
											
					var fields04 = { Zzcode: "",
									Zzdescr: "",
									Zzgroup: "",
									Zzkeyword: "",
									Zzusrprm: "",
									Allowedlen: "",
									Sequence: ""};
											
					if (typeof oData.results[0] !== "undefined") {

						var oTB04 = { instPNLSet: [] };
						for ( var a = 0; a < oData.results.length; a++ ){
							fields04 = {};
							fields04.Zzcode     = oData.results[a].Zzcode; 
							fields04.Zzdescr    = oData.results[a].Zzdescr;
							fields04.Zzgroup    = oData.results[a].Zzgroup;
							fields04.Zzkeyword  = oData.results[a].Zzkeyword; 
							fields04.Zzusrprm   = oData.results[a].Zzusrprm;
							fields04.Allowedlen = oData.results[a].Allowedlen;
							fields04.Sequence   = oData.results[a].Sequence;
							oTB04.instPNLSet.push(fields04);
						}
						
						var oTB04Model = new sap.ui.model.json.JSONModel(oTB04);
						tb04.setModel(oTB04Model);

						for (var y = 0; y < tb04.getBinding().getModel().getData().instPNLSet.length; y++) {
							if (tb04.getBinding().getModel().getData().instPNLSet[y].Allowedlen === "E") { //|| y >= rows) {
								for (var x = 0; x < tb04.getRows()[y].getCells().length; x++) {
									if (x !== 1 && x !== 2) {
										tb04.getRows()[y].getCells()[x].setEditable(true);
									}
								}
							}
						}
					}else{	

						that._table41 = [fields04];
						var oEmp04 = {
							instPNLSet: that._table41
						};
						var oEmp04Model = new sap.ui.model.json.JSONModel(oEmp04);
						tb04.setModel(oEmp04Model);
						for (var w = 0; w < tb04.getBinding().getModel().getData().instPNLSet.length; w++) {
							for (var z = 0; z < tb04.getRows()[w].getCells().length; z++) {
								if (z !== 1) {
									tb04.getRows()[w].getCells()[z].setEditable(true);
								}
							}
						}
					}
				},
				error: function (oError) {
					console.log(oError);
				}
			});

			var tb05 = this.getView().byId("table51");
			this.getView().getModel().read("/instMarkSet", {
				filters: this._aFilters,
				success: function (oData) {
					var fields05 = { Zzcode: "",
									Zzcode0: "",
									Zzcode1: "",
									Zzcode2: "",
									Zzcode3: "",
									Zzcode4: "",
									Sequence: "",
									Zzlevel0: "",
									Zzlevel1: "",
									Zzlevel2: "",
									Zzlevel3: "",
									Zzlevel4: "",
									Zzmark: "",
									Zztype: "",
									Zzparam1: "",
									Zzposition: "",
									Zzparam2: "",
									Zzcolour: "",
									Zzinstruction: "",
									Zzparam4: ""  };

					if (typeof oData.results[0] !== "undefined") {
						var oTB05 = {
							instMarkSet: oData.results
						};
						
						var oTB05 = { instMarkSet: [] };
						for ( var a = 0; a < oData.results.length; a++ ){
							fields05 = {};
							fields05.Zzcode = oData.results[a].Zzcode;
							fields05.Zzcode0 = oData.results[a].Zzcode0;
							fields05.Zzcode1 = oData.results[a].Zzcode1;
							fields05.Zzcode2 = oData.results[a].Zzcode2;
							fields05.Zzcode3 = oData.results[a].Zzcode3;
							fields05.Zzcode4 = oData.results[a].Zzcode4;
							fields05.Sequence = oData.results[a].Sequence;
							fields05.Zzlevel0 = oData.results[a].Zzlevel0;
							fields05.Zzlevel1 = oData.results[a].Zzlevel1;
							fields05.Zzlevel2 = oData.results[a].Zzlevel2;
							fields05.Zzlevel3 = oData.results[a].Zzlevel3;
							fields05.Zzlevel4 = oData.results[a].Zzlevel4;
							fields05.Zzmark = oData.results[a].Zzmark;
							fields05.Zztype = oData.results[a].Zztype;
							fields05.Zzparam1 = oData.results[a].Zzparam1;
							fields05.Zzposition = oData.results[a].Zzposition;
							fields05.Zzparam2 = oData.results[a].Zzparam2;
							fields05.Zzcolour = oData.results[a].Zzcolour;
							fields05.Zzinstruction = oData.results[a].Zzinstruction;
							fields05.Zzparam4   = oData.results[a].Zzparam4;
							oTB05.instMarkSet.push(fields05);
						}						
						
						var oTB05Model = new sap.ui.model.json.JSONModel(oTB05);
						tb05.setModel(oTB05Model);

					}else{	

						that._insMark = [fields05];
						var oEmp05 = {
							instMarkSet: that._insMark
						};
						var oEmp05Model = new sap.ui.model.json.JSONModel(oEmp05);
						tb05.setModel(oEmp05Model);
						for (var w = 0; w < tb05.getBinding().getModel().getData().instMarkSet.length; w++) {
							for (var z = 0; z < tb05.getRows()[w].getCells().length; z++) {
								tb05.getRows()[w].getCells()[z].setEditable(true);
							}
						}
					}
				},
				error: function (oError) {
					console.log(oError);
				}
			});
			
			// this.getModel("InstructionsView").setProperty("/busy", false);
			jQuery.sap.delayedCall(1000, this, function () { 
				this._mainBusy.setBusy(false); 
			});
		},

		addRows: function (oEvent) {
			var action = oEvent.getSource().getId().split("-");
			var size = action.length - 1;
			switch (action[size]) {
			case "ttb01A":
				this.addEntry(oEvent, "table11", "/instMillSet", this.getView().byId("table11").getBinding().getModel().getData().instMillSet);
				break;
			case "ttb02A":
				this.addEntry(oEvent, "table21", "/instSuppSet", this.getView().byId("table21").getBinding().getModel().getData().instSuppSet);
				break;
			case "ttb03A":
				this.addEntry(oEvent, "table31", "/instToleSet", this.getView().byId("table31").getBinding().getModel().getData().instToleSet);
				break;
			case "ttb04A":
				this.addEntry(oEvent, "table41", "/instPNLSet", this.getView().byId("table41").getBinding().getModel().getData().instPNLSet);
				break;
			case "ttb05A":
				this.addEntry(oEvent, "table51", "/instMarkSet", this.getView().byId("table51").getBinding().getModel().getData().instMarkSet);
				break;	
			default:
			}
		},
		addEntry: function (oEvent, table, entity, model) {
			var tb = this.getView().byId(table);
			var rows = model.length;
			var aData = tb.getModel().getProperty(entity);

			if (table === "table51") {
				this._insMark = [];
				this._insMark.Zzcode = "";
				this._insMark.Zzcode0 = "";
				this._insMark.Zzcode1 = "";
				this._insMark.Zzcode2 = "";
				this._insMark.Zzcode3 = "";
				this._insMark.Zzcode4 = "";
				this._insMark.Sequence = "";
				this._insMark.Zzlevel0 = "";
				this._insMark.Zzlevel1 = "";
				this._insMark.Zzlevel2 = "";
				this._insMark.Zzlevel3 = "";
				this._insMark.Zzlevel4 = "";
				this._insMark.Zzmark = "";
				this._insMark.Zztype = "";
				this._insMark.Zzparam1 = "";
				this._insMark.Zzposition = "";
				this._insMark.Zzparam2 = "";
				this._insMark.Zzcolour = "";
				this._insMark.Zzinstruction = "";
				this._insMark.Zzparam4 = "";
				aData.push(this._insMark);
				
				tb.getModel().setProperty(entity, aData);
	
				for (var m = 0; m < model.length; m++) {
					if (model[m].Allowedlen === "E" || m >= rows) {
						for (var k = 0; k < tb.getRows()[m].getCells().length; k++) {
							tb.getRows()[m].getCells()[k].setEditable(true);
						}
					}
				}
				
			} else {
				if (table === "table11") {
					this._table11 = [];
					this._table11.Zzcode = "";
					this._table11.Zzdescr = "";
					this._table11.Zzgroup = "";
					this._table11.Zzkeyword = "";
					this._table11.Zzusrprm = "";
					this._table11.Allowedlen = "";
					this._table11.Sequence = "";
					aData.push(this._table11);					
				}
				if (table === "table21") {
					this._table21 = [];
					this._table21.Zzcode = "";
					this._table21.Zzdescr = "";
					this._table21.Zzgroup = "";
					this._table21.Zzkeyword = "";
					this._table21.Zzusrprm = "";
					this._table21.Allowedlen = "";
					this._table21.Sequence = "";
					aData.push(this._table21);					
				}
				if (table === "table31") {
					this._table31 = [];
					this._table31.Zzcode = "";
					this._table31.Zzdescr = "";
					this._table31.Zzgroup = "";
					this._table31.Zzkeyword = "";
					this._table31.Zzusrprm = "";
					this._table31.Allowedlen = "";
					this._table31.Sequence = "";
					aData.push(this._table31);					
				}
				if (table === "table41") {
					this._table41 = [];
					this._table41.Zzcode = "";
					this._table41.Zzdescr = "";
					this._table41.Zzgroup = "";
					this._table41.Zzkeyword = "";
					this._table41.Zzusrprm = "";
					this._table41.Allowedlen = "";	
					this._table41.Sequence = "";					
					aData.push(this._table41);					
				}
				tb.getModel().setProperty(entity, aData);
	
				for (var y = 0; y < model.length; y++) {
					if (model[y].Allowedlen === "E" || y >= rows) {
						for (var x = 0; x < tb.getRows()[y].getCells().length; x++) {
							if (x !== 1) {
								tb.getRows()[y].getCells()[x].setEditable(true);
							}
						}
					}
				}
			}				
		},
		
		lessRows: function (oEvent) {
			var action = oEvent.getSource().getId().split("-");
			var size = action.length - 1;
			switch (action[size]) {
			case "ttb01L":
				this.lessEntry(oEvent, "table11", "/instMillSet", this.getView().byId("table11").getBinding().getModel().getData().instMillSet);
				break;
			case "ttb02L":
				this.lessEntry(oEvent, "table21", "/instSuppSet", this.getView().byId("table21").getBinding().getModel().getData().instSuppSet);
				break;
			case "ttb03L":
				this.lessEntry(oEvent, "table31", "/instToleSet", this.getView().byId("table31").getBinding().getModel().getData().instToleSet);
				break;
			case "ttb04L":
				this.lessEntry(oEvent, "table41", "/instPNLSet", this.getView().byId("table41").getBinding().getModel().getData().instPNLSet);
				break;
			case "ttb05L":
				this.lessEntry(oEvent, "table51", "/instMarkSet", this.getView().byId("table51").getBinding().getModel().getData().instMarkSet);
				break;					
			default:
			}
		},
		lessEntry: function (oEvent, table, entity, model) {
			if (this.getView().byId(table).getSelectedIndices().length === 0) {
				MessageBox.information("Select at least one line");
			} else {
				const aData = this.getView().byId(table).getModel().getProperty(entity);
				var oModel = [];
				var selected = this.getView().byId(table).getSelectedIndices().length;
				var records = this.getView().byId(table).getBinding().oList.length;
				var find = "";
				var line = {};
				for (var i = 0; i < records; i++) {
					for (var j = 0; j < selected; j++) {
						if (this.getView().byId(table).getSelectedIndices()[j] === i) {
							find = "X";
						}
					}	
					if (find === "") {
						line = {};
						line = aData[i];
						oModel.push(line);
					}
					find = "";
				}
				this.getView().byId(table).getModel().setProperty(entity, oModel);
				this.getView().byId(table).clearSelection();
				
				var tb = this.getView().byId(table);
				var rows = this.getView().byId(table).getModel().getProperty(entity).length;
				model = this.getView().byId(table).getModel().getProperty(entity);

				if (table === "table51") {
					for (var m = 0; m < model.length; m++) {
						if (model[m].Allowedlen === "E" || m >= rows) {
							for (var k = 0; k < tb.getRows()[m].getCells().length; k++) {
								tb.getRows()[m].getCells()[k].setEditable(true);
							}
						}
					}
				} else {
					for (var y = 0; y < model.length; y++) {
						if (model[y].Allowedlen === "E" || y >= rows) {
							for (var x = 0; x < tb.getRows()[y].getCells().length; x++) {
								if (x !== 1) {
									tb.getRows()[y].getCells()[x].setEditable(true);
								}
							}
						}
					}
				}
			}	
		},
		
		onValueHelp: function (oEvent) {
			var fieldTable = oEvent.getSource().getId().split("-");
			var size = fieldTable.length - 2;
			switch (fieldTable[size]) {
			case "te01":
				this._typeCode = "M"; //Mill
				jQuery.sap.require("soch.otc274Monitor.components.Zzcode");
				soch.otc274Monitor.components.Zzcode.onValueHelp(this, oEvent);
				break;
			case "te11":
				this._typeCode = "S"; //Supplemental
				jQuery.sap.require("soch.otc274Monitor.components.Zzcode");
				soch.otc274Monitor.components.Zzcode.onValueHelp(this, oEvent);
				break;
			case "te21":
				this._typeCode = "T"; //Tolerance
				jQuery.sap.require("soch.otc274Monitor.components.Zzcode");
				soch.otc274Monitor.components.Zzcode.onValueHelp(this, oEvent);
				break;
			case "te31":
				this._typeCode = "I"; //Pack and load
				jQuery.sap.require("soch.otc274Monitor.components.Zzcode");
				soch.otc274Monitor.components.Zzcode.onValueHelp(this, oEvent);
				break;
			case "te51":
				this._level = "0"; //Mark - Level 0
				jQuery.sap.require("soch.otc274Monitor.components.Mark");
				soch.otc274Monitor.components.Mark.onValueHelp(this, oEvent);
				break;	
			case "te52":
				this._level = "1"; //Mark - Level 1
				jQuery.sap.require("soch.otc274Monitor.components.Mark");
				soch.otc274Monitor.components.Mark.onValueHelp(this, oEvent);
				break;	
			case "te54":
				this._level = "2"; //Mark - Level 2
				jQuery.sap.require("soch.otc274Monitor.components.Mark");
				soch.otc274Monitor.components.Mark.onValueHelp(this, oEvent);
				break;	
			case "te56":
				this._level = "3"; //Mark - Level 3
				jQuery.sap.require("soch.otc274Monitor.components.Mark");
				soch.otc274Monitor.components.Mark.onValueHelp(this, oEvent);
				break;	
			case "te57":
				this._level = "4"; //Mark - Level 4
				jQuery.sap.require("soch.otc274Monitor.components.Mark");
				soch.otc274Monitor.components.Mark.onValueHelp(this, oEvent);
				break;					
			default: 
			}
		},
		onValueHelpSearch: function (oEvent) {
			switch (oEvent.getSource().getTitle()) {
			case "Instructions Codes":
				jQuery.sap.require("soch.otc274Monitor.components.Zzcode");
				soch.otc274Monitor.components.Zzcode.onValueHelpSearch(this, oEvent);
				break;
			case "Mark Instructions":
				jQuery.sap.require("soch.otc274Monitor.components.Mark");
				soch.otc274Monitor.components.Mark.onValueHelpSearch(oEvent);
				break;
			default:
			}
		},
		onValueHelpClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			var data = this._osource.getBindingContext().getModel().getData();
			var row = this._osource.getBindingContext().getPath().split("/");
			var point = parseInt(row[2]);
			var i;
			switch (oEvent.getSource().getTitle()) {
			case "Instructions Codes":
				jQuery.sap.require("soch.otc274Monitor.components.Zzcode");
				soch.otc274Monitor.components.Zzcode.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));

					if (data.hasOwnProperty("instMillSet") === true) {
						for (i = 0; i < this._osource.getBindingContext().getModel().getData().instMillSet.length; i++) {
							if (i === point) {
								this._osource.getBindingContext().getModel().getData().instMillSet[i].Zzdescr = oSelectedItem.getCells()[1].getProperty("text");
								this._osource.getBindingContext().getModel().getData().instMillSet[i].Zzgroup = oSelectedItem.getCells()[3].getProperty("text");
							}
						}
					}
					if (data.hasOwnProperty("instSuppSet") === true) {
						for (i = 0; i < this._osource.getBindingContext().getModel().getData().instSuppSet.length; i++) {
							if (i === point) {
								this._osource.getBindingContext().getModel().getData().instSuppSet[i].Zzdescr = oSelectedItem.getCells()[1].getProperty("text");
								this._osource.getBindingContext().getModel().getData().instSuppSet[i].Zzgroup = oSelectedItem.getCells()[3].getProperty("text");
							}
						}
					}
					if (data.hasOwnProperty("instToleSet") === true) {
						for (i = 0; i < this._osource.getBindingContext().getModel().getData().instToleSet.length; i++) {
							if (i === point) {
								this._osource.getBindingContext().getModel().getData().instToleSet[i].Zzdescr = oSelectedItem.getCells()[1].getProperty("text");
								this._osource.getBindingContext().getModel().getData().instToleSet[i].Zzgroup = oSelectedItem.getCells()[3].getProperty("text");
							}
						}
					}
					if (data.hasOwnProperty("instPNLSet") === true) {
						for (i = 0; i < this._osource.getBindingContext().getModel().getData().instPNLSet.length; i++) {
							if (i === point) {
								this._osource.getBindingContext().getModel().getData().instPNLSet[i].Zzdescr = oSelectedItem.getCells()[1].getProperty("text");
								this._osource.getBindingContext().getModel().getData().instPNLSet[i].Zzkeyword = oSelectedItem.getCells()[2].getProperty("text");
								this._osource.getBindingContext().getModel().getData().instPNLSet[i].Zzgroup = oSelectedItem.getCells()[3].getProperty("text");
							}
						}
					}
				}
				break;
			case "Mark Instructions":
				jQuery.sap.require("soch.otc274Monitor.components.Mark");
				soch.otc274Monitor.components.Mark.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[1].getProperty("text"));
					
					if (data.hasOwnProperty("instMarkSet") === true) {
						for (i = 0; i < this._osource.getBindingContext().getModel().getData().instMarkSet.length; i++) {
							if (i === point) {
								switch (this._level) {
									case "0":
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzmark = oSelectedItem.getCells()[1].getProperty("text");
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzcode0 = oSelectedItem.getCells()[0].getProperty("text");
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzlevel0 = oSelectedItem.getCells()[2].getProperty("text");
										break;
									case "1":
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zztype = oSelectedItem.getCells()[1].getProperty("text");
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzcode1 = oSelectedItem.getCells()[0].getProperty("text");
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzlevel1 = oSelectedItem.getCells()[2].getProperty("text");
										break;
									case "2":
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzposition = oSelectedItem.getCells()[1].getProperty("text");
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzcode2 = oSelectedItem.getCells()[0].getProperty("text");
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzlevel2 = oSelectedItem.getCells()[2].getProperty("text");
										break;
									case "3":
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzcolour = oSelectedItem.getCells()[1].getProperty("text");
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzcode3 = oSelectedItem.getCells()[0].getProperty("text");
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzlevel3 = oSelectedItem.getCells()[2].getProperty("text");
										break;
									case "4":
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzinstruction = oSelectedItem.getCells()[1].getProperty("text");
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzcode4 = oSelectedItem.getCells()[0].getProperty("text");
										this._osource.getBindingContext().getModel().getData().instMarkSet[i].Zzlevel4 = oSelectedItem.getCells()[2].getProperty("text");
										break;	
									default:
								}
							}
						}
					}
				}
				break;	
			default:
			}
		},
		onGetValue: function (oEvent) {
			// var fieldTable = oEvent.getSource().getId().split("-");
			// switch (fieldTable[5]) {
			// case "te03":
			// 	this._typeCode = "M"; //Mill
			// 	jQuery.sap.require("soch.otc274Monitor.components.Zzcode");
			// 	soch.otc274Monitor.components.Zzcode.onGetValue(this, oEvent);
			// 	break;
			// case "te13":
			// 	this._typeCode = "S"; //Supplemental
			// 	jQuery.sap.require("soch.otc274Monitor.components.Zzcode");
			// 	soch.otc274Monitor.components.Zzcode.onGetValue(this, oEvent);
			// 	break;
			// case "te23":
			// 	this._typeCode = "T"; //Tolerance
			// 	jQuery.sap.require("soch.otc274Monitor.components.Zzcode");
			// 	soch.otc274Monitor.components.Zzcode.onGetValue(this, oEvent);
			// 	break;
			// case "te34":
			// 	this._typeCode = "I"; //Pack and load
			// 	jQuery.sap.require("soch.otc274Monitor.components.Zzcode");
			// 	soch.otc274Monitor.components.Zzcode.onGetValue(this, oEvent);
			// 	break;
			// default:
			// }
		},
		
		onPrepareFields: function(oEvent){
			var	fields = {
					Zzcode: "",
					Zzgroup: "",
					Sequence: "",
					Zzdescr: "",
					Zzusrprm: "",
					Zzkeyword: ""
				};
			var mark = {
				Zzcode0: "",
				Zzcode1: "",
				Zzcode2: "",
				Zzcode3: "",
				Zzcode4: "",
				Sequence: "",
				Zzlevel0: "",
				Zzlevel1: "",
				Zzlevel2: "",
				Zzlevel3: "",
				Zzlevel4: "",
				Zzmark: "",
				Zztype: "",
				Zzparam1: "",
				Zzposition: "",
				Zzparam2: "",
				Zzcolour: "",
				Zzinstruction: "",
				Zzparam4: ""
			};
			this._table11 = [];
			this._insMark = [];
			var sUrl = "/sap/opu/odata/sap/ZOTC_SOCH_MONITOR_SRV/";
			this._oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			
			for (var i=0; i<this.getView().byId("table11").getModel().getData().instMillSet.length; i++) {
				fields = {	
					Zzcode: this.getView().byId("table11").getModel().getData().instMillSet[i].Zzcode,
					Zzgroup: this.getView().byId("table11").getModel().getData().instMillSet[i].Zzgroup,
					Sequence: this.getView().byId("table11").getModel().getData().instMillSet[i].Sequence,
					Zzdescr: this.getView().byId("table11").getModel().getData().instMillSet[i].Zzdescr,
					Zzusrprm: this.getView().byId("table11").getModel().getData().instMillSet[i].Zzusrprm,
					Zzkeyword: this.getView().byId("table11").getModel().getData().instMillSet[i].Zzkeyword };
				this._table11.push(fields);
			}
			var sInstMillSet = JSON.stringify(this._table11);
			
			this._table21 = [];
			for (var j=0; j<this.getView().byId("table21").getModel().getData().instSuppSet.length; j++) {
				fields = {
					Zzcode: this.getView().byId("table21").getModel().getData().instSuppSet[j].Zzcode,
					Zzgroup: this.getView().byId("table21").getModel().getData().instSuppSet[j].Zzgroup,
					Sequence: this.getView().byId("table21").getModel().getData().instSuppSet[j].Sequence,
					Zzdescr: this.getView().byId("table21").getModel().getData().instSuppSet[j].Zzdescr,
					Zzusrprm: this.getView().byId("table21").getModel().getData().instSuppSet[j].Zzusrprm,
					Zzkeyword: this.getView().byId("table21").getModel().getData().instSuppSet[j].Zzkeyword };
				this._table21.push(fields);
			}
			var sInstSuppSet = JSON.stringify(this._table21);
			
			this._table31 = [];
			for (var l=0; l<this.getView().byId("table31").getModel().getData().instToleSet.length; l++) {
				fields = {
					Zzcode: this.getView().byId("table31").getModel().getData().instToleSet[l].Zzcode,
					Zzgroup: this.getView().byId("table31").getModel().getData().instToleSet[l].Zzgroup,
					Sequence: this.getView().byId("table31").getModel().getData().instToleSet[l].Sequence,
					Zzdescr: this.getView().byId("table31").getModel().getData().instToleSet[l].Zzdescr,
					Zzusrprm: this.getView().byId("table31").getModel().getData().instToleSet[l].Zzusrprm,
					Zzkeyword: this.getView().byId("table31").getModel().getData().instToleSet[l].Zzkeyword };
				this._table31.push(fields);
			}
			var sInstToleSet = JSON.stringify(this._table31);
			
			this._table41 = [];
			for (var h=0; h<this.getView().byId("table41").getModel().getData().instPNLSet.length; h++) {
				fields = {
					Zzcode: this.getView().byId("table41").getModel().getData().instPNLSet[h].Zzcode,
					Zzgroup: this.getView().byId("table41").getModel().getData().instPNLSet[h].Zzgroup,
					Sequence: this.getView().byId("table41").getModel().getData().instPNLSet[h].Sequence,
					Zzdescr: this.getView().byId("table41").getModel().getData().instPNLSet[h].Zzdescr,
					Zzusrprm: this.getView().byId("table41").getModel().getData().instPNLSet[h].Zzusrprm,
					Zzkeyword: this.getView().byId("table41").getModel().getData().instPNLSet[h].Zzkeyword };	
				this._table41.push(fields);
			}
			var sInstPNLSet = JSON.stringify(this._table41);
			
			// var sInstMarkSet = JSON.stringify(this.getView().byId("table51").getModel().getData().instMarkSet);
			for (var g=0; g<this.getView().byId("table51").getModel().getData().instMarkSet.length; g++) {
				mark = {
					Zzcode0: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzcode0,
					Zzcode1: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzcode1,
					Zzcode2: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzcode2,
					Zzcode3: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzcode3,
					Zzcode4: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzcode4,
					Sequence: this.getView().byId("table51").getModel().getData().instMarkSet[g].Sequence,
					Zzlevel0: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzlevel0,
					Zzlevel1: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzlevel1,
					Zzlevel2: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzlevel2,
					Zzlevel3: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzlevel3,
					Zzlevel4: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzlevel4,
					Zzmark: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzmark,
					Zztype: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zztype,
					Zzparam1: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzparam1,
					Zzposition: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzposition,
					Zzparam2: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzparam2,
					Zzcolour: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzcolour,
					Zzinstruction: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzinstruction,
					Zzparam4: this.getView().byId("table51").getModel().getData().instMarkSet[g].Zzparam4 };
				this._insMark.push(mark);
			}	
			var sInstMarkSet = JSON.stringify(this._insMark);
			
			var objs = {Object: this._sObject,
						  Omill: JSON.stringify(sInstMillSet),
						  Osupp: JSON.stringify(sInstSuppSet),
						  Otol:  JSON.stringify(sInstToleSet),
						  Opnl:  JSON.stringify(sInstPNLSet),
						  Omark: JSON.stringify(sInstMarkSet),
						  Msg: ""};
			return objs;
		},
		
		onCreateUpdate: function(oEvent){
			this._mainBusy.setBusy(true);
			this._instSOSelect = this.getView().byId("gmitsuTable");
			
			var objs = this.onPrepareFields(oEvent);
			var that = this;
			this._oModel.create("/gmitsuFieldsSet", objs, null, function (data, result) {
					jQuery.sap.delayedCall(1000, this, function () { 
						that.getView().getModel().read("/gmitsuOrdersSet", {
							filters: that._aFilters,
							success: function (oData) {
								if (typeof oData.results[0] !== "undefined") {
									var oTB00 = {
										gmitsuOrdersSet: oData.results
									};
									var oTB00Model = new sap.ui.model.json.JSONModel(oTB00);
									that._instSOSelect.setModel(oTB00Model);
									that._mainBusy.setBusy(false); 
									sap.m.MessageBox.success("GMITSU Instructions successfully updated!");
								}
							},
							error: function (oError) { }
						});
					});
				}, function (err) {
					jQuery.sap.delayedCall(1000, this, function () { 
						// that._instSOSelect.getTable().getModel().refresh(true);
						that._mainBusy.setBusy(false);
						sap.m.MessageBox.alert("GMITSU Instructions with errors, please verify!");
					});	
				});			  
		},
		
		onDelete: function(oEvent){
			this._mainBusy.setBusy(true);
			this._instSOSelect = this.getView().byId("gmitsuTable");
			
			var objs = this.onPrepareFields(oEvent);
			var that = this;
			this._oModel.create("/gmitsuCancelSet", objs, null, function (data, result) {
					jQuery.sap.delayedCall(1000, this, function () { 
						that.getView().getModel().read("/gmitsuOrdersSet", {
							filters: that._aFilters,
							success: function (oData) {
								if (typeof oData.results[0] !== "undefined") {
									var oTB00 = {
										gmitsuOrdersSet: oData.results
									};
									var oTB00Model = new sap.ui.model.json.JSONModel(oTB00);
									that._instSOSelect.setModel(oTB00Model);
									that._mainBusy.setBusy(false); 
									sap.m.MessageBox.success("GMITSU Instructions successfully Canceled!");
								}
							},
							error: function (oError) { }
						});
					});	
				}, function (err) {
					jQuery.sap.delayedCall(1000, this, function () { 
						// that._instSOSelect.getTable().getModel().refresh(true);
						that._mainBusy.setBusy(false);
						sap.m.MessageBox.alert("GMITSU Instructions with errors, please verify!");
					});
				});	
		},
		
		onNavBack: function (oEvent) {
			// this._smartTableDisplay.getTable().getModel().refresh(true);
			// this.getRouter().navTo("worklist", {}, true);
			sap.ui.core.UIComponent.getRouterFor(this)._oTargets._oViews._oViews["soch.otc274Monitor.view.Worklist"].oController._smartTableDisplay.getTable().getModel().refresh(true);
			sap.ui.core.UIComponent.getRouterFor(this).navTo("worklist", {});	
		}

	});

});