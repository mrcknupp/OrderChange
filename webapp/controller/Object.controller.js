sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter"
], function (BaseController, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("soch.otc274Monitor.controller.Object", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});

			this.setModel(oViewModel, "objectView");
			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
		},

		onAfterRendering: function (oEvent) {
			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {
			// this.getModel("objectView").setProperty("/busy", true);
			sap.ui.core.BusyIndicator.show(0);
			var sObjectId = oEvent.getParameter("arguments").objectId;
			var array = sObjectId.split("#");
			var aFilters = [];

			aFilters.push(new sap.ui.model.Filter("Vbeln", sap.ui.model.FilterOperator.EQ, array[0]));
			aFilters.push(new sap.ui.model.Filter("Posnr", sap.ui.model.FilterOperator.EQ, array[1]));

			// this.getView().byId("table01").getBinding("rows").filter(aFilters);
			// // this.getView().byId("versDisplay").rebindTable();                         

			var that = this;
			var tb01 = this.getView().byId("tabHistory");
			this.getView().getModel().read("/versionFullSet", {
				filters: aFilters,
				success: function (oData) {
					var oTB01 = {
						versionFullSet: []
					};
					if (typeof oData.results[0] !== "undefined") {
						oTB01 = {
							versionFullSet: oData.results
						};
						var oTB01Model = new sap.ui.model.json.JSONModel(oTB01);
					}
					tb01.setModel(oTB01Model);
					sap.ui.core.BusyIndicator.hide();
				},
				error: function (oError) {
					console.log(oError);
				}
			});

		},

		onSort: function (oEvent) {
			var oCurrentColumn = oEvent.getParameter("column");
			// var selectedColumn = this.getView().byId("Version");
			oEvent.preventDefault();
			var sOrder = oEvent.getParameter("sortOrder");
			this._resetSortingState();
			oCurrentColumn.setSorted(true);
			oCurrentColumn.setSortOrder(sOrder);
			var oSorter = new sap.ui.model.Sorter(oCurrentColumn.getSortProperty(), sOrder === "Descending");
			// this.getView().byId("tabHistory").getBinding("rows").sort(oCurrentColumn, sOrder, true);
			this.getView().byId("tabHistory").getBinding("rows").sort(oSorter);

			
		},

		_resetSortingState: function () {
			var oTable = this.getView().byId("tabHistory");
			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				aColumns[i].setSorted(false);
			}
		},

		onClearSortings: function(oEvent) {
			var oTable = this.getView().byId("tabHistory");
			oTable.getBinding("rows").sort(null);
			this._resetSortingState();
		},
		
		_resetFilterState: function (oTable) {
			// var oTable = this.getView().byId("tabHistory");
			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				oTable.filter(aColumns[i], null);
			}
		},

		onClearFilter: function(oEvent) {
			var oTable = this.getView().byId("tabHistory");
			// oTable.getBinding("rows").sort(null);
			this._resetFilterState(oTable);
		},
		
		onNavBack: function (oEvent) {
			this.getRouter().navTo("worklist", {}, true);
		}

	});

});