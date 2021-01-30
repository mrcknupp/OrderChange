jQuery.sap.declare("soch.otc274Monitor.components.Kunwe");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Kunwe = {
	// ========= Functions to Ship-To - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogKunwe) {
				
				that._oValueHelpDialogKunwe = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogKunwe", that);
				that._oValueHelpDialogKunwe.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogKunwe.getBinding("items")
					.filter([new sap.ui.model.Filter("Name1", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogKunwe.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogKunwe.getBinding("items")
					.filter([new sap.ui.model.Filter("Name1", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogKunwe.open(sInputValue);
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
		if (oEvent.getParameters("Kunwe").selectedRow !== undefined) {
			that._availableFields[0].Kunwe = oEvent.getParameters("Kunwe").selectedRow.getCells()[0].getProperty("text");
		} else {

			if (oEvent.getParameters("Kunwe").value.length <= 10) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].Kunwe = oEvent.getParameters("Kunwe").value;
			} else {
				that._availableFields[0].Kunwe = "";
				oEvent.getSource().setValueStateText("Size limit 10");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getParameters("Kunwe").value == ""){
				oEvent.getSource().setValueState("None");
			}
		}
	}

	// ========= Functions to Ship-To - Dialog :: End	
};