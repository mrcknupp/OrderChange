jQuery.sap.declare("soch.otc274Monitor.components.Vrkme");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Vrkme = {
	// ========= Functions to Sales Unit - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogVrkme) {
				
				that._oValueHelpDialogVrkme = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogVrkme", that);
				that._oValueHelpDialogVrkme.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogVrkme.getBinding("items")
					.filter([new sap.ui.model.Filter("Measurement", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogVrkme.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogVrkme.getBinding("items")
					.filter([new sap.ui.model.Filter("Measurement", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogVrkme.open(sInputValue);
			}
	},
		
	onValueHelpSearch: function (oEvent) {

		var sValue = oEvent.getParameter("value");
		var oFilter = new sap.ui.model.Filter("Measurement", sap.ui.model.FilterOperator.StartsWith, sValue);

		oEvent.getSource().getBinding("items").filter([oFilter]);
	},

	onValueHelpClose: function (oEvent) {
		oEvent.getSource().getBinding("items").filter([]);
	},

	onGetValue: function (that, oEvent) {
		if (oEvent.getParameters("Vrkme").selectedRow !== undefined) {
			that._availableFields[0].Vrkme = oEvent.getParameters("Vrkme").selectedRow.getCells()[0].getProperty("text");
		} else {
			
			if (oEvent.getParameters("Vrkme").value.length <= 3) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].Vrkme = oEvent.getParameters("Vrkme").value;
			} else {
				that._availableFields[0].Vrkme = "";
				oEvent.getSource().setValueStateText("Size limit 3");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getParameters("Vrkme").value == ""){
				oEvent.getSource().setValueState("None");
			}
		}
	}

	// ========= Functions to Sales Unit - Dialog :: End	
};