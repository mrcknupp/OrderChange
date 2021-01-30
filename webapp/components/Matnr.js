jQuery.sap.declare("soch.otc274Monitor.components.Matnr");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Matnr = {
	// ========= Functions to Material - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogMatnr) {
				
				that._oValueHelpDialogMatnr = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogMatnr", that);
				that._oValueHelpDialogMatnr.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogMatnr.getBinding("items")
					.filter([new sap.ui.model.Filter("Maktg", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogMatnr.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogMatnr.getBinding("items")
					.filter([new sap.ui.model.Filter("Maktg", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogMatnr.open(sInputValue);
			}
	},
		
	onValueHelpSearch: function (oEvent) {

		var sValue = oEvent.getParameter("value");
		var oFilter = new sap.ui.model.Filter("Maktg", sap.ui.model.FilterOperator.StartsWith, sValue);

		oEvent.getSource().getBinding("items").filter([oFilter]);
	},

	onValueHelpClose: function (oEvent) {
		oEvent.getSource().getBinding("items").filter([]);
	},

	onGetValue: function (that, oEvent) {
		if (oEvent.getParameters("Matnr").selectedRow !== undefined) {
			that._availableFields[0].Matnr = oEvent.getParameters("Matnr").selectedRow.getCells()[0].getProperty("text");
		} else {

			if (oEvent.getParameters("Matnr").value.length <= 10) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].Matnr = oEvent.getParameters("Matnr").value;
			} else {
				that._availableFields[0].Matnr = "";
				oEvent.getSource().setValueStateText("Size limit 10");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getParameters("Matnr").value == ""){
				oEvent.getSource().setValueState("None");
			}
		}
	}

	// ========= Functions to Material - Dialog :: End	
};