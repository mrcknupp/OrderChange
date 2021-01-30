jQuery.sap.declare("soch.otc274Monitor.components.Kunnr");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Kunnr = {
	// ========= Functions to Sold-To - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogKunnr) {
				
				that._oValueHelpDialogKunnr = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogKunnr", that);
				that._oValueHelpDialogKunnr.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogKunnr.getBinding("items")
					.filter([new sap.ui.model.Filter("Name1", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				// jQuery.sap.syncStyleClass("sapUiSizeCompact", that.getView(), this._oValueHelpDialogKunnr);
				that._oValueHelpDialogKunnr.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogKunnr.getBinding("items")
					.filter([new sap.ui.model.Filter("Name1", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogKunnr.open(sInputValue);
			}
	},
		
	onValueHelpSearch: function (oEvent) {

		var sValue = oEvent.getParameter("value");
		var oFilter = new sap.ui.model.Filter("Name1", sap.ui.model.FilterOperator.StartsWith, sValue);

		oEvent.getSource().getBinding("items").filter([oFilter]);
	},

	onValueHelpClose: function (oEvent) {
		oEvent.getSource().getBinding("items").filter([]);
	},

	onGetValue: function (that, oEvent) {
		if (oEvent.getParameters("Kunnr").selectedRow !== undefined) {
			that._availableFields[0].Kunnr = oEvent.getParameters("Kunnr").selectedRow.getCells()[0].getProperty("text");
		} else {
			if (oEvent.getParameters("Kunnr").value.length <= 10) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].Kunnr = oEvent.getParameters("Kunnr").value;
			} else {
				that._availableFields[0].Kunnr = "";
				oEvent.getSource().setValueStateText("Size limit 10");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getParameters("Kunnr").value == ""){
				oEvent.getSource().setValueState("None");
			}
		}
	}

	// ========= Functions to Sold-To - Dialog :: End	
};