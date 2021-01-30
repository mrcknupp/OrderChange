jQuery.sap.declare("soch.otc274Monitor.components.ZzfreightTerms");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.ZzfreightTerms = {
	// ========= Functions to Freight Terms - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogZzfreightTerms) {
				
				that._oValueHelpDialogZzfreightTerms = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogZzfreightTerms", that);
				that._oValueHelpDialogZzfreightTerms.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogZzfreightTerms.getBinding("items")
					.filter([new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogZzfreightTerms.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogZzfreightTerms.getBinding("items")
					.filter([new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogZzfreightTerms.open(sInputValue);
			}
	},
		
	onValueHelpSearch: function (oEvent) {
		var sValue = oEvent.getParameter("value");
		var oFilter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.StartsWith, sValue);

		oEvent.getSource().getBinding("items").filter([oFilter]);
	},

	onValueHelpClose: function (oEvent) {
		oEvent.getSource().getBinding("items").filter([]);
	},

	onGetValue: function (that, oEvent) {
		
		if (oEvent.getParameters("ZzfreightTerms").selectedRow !== undefined) {
			that._availableFields[0].ZzfreightTerms = oEvent.getParameters("ZzfreightTerms").selectedRow.getCells()[0].getProperty("text");	
		} else {

			if (oEvent.getParameters("ZzfreightTerms").value.length <= 1) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].ZzfreightTerms = oEvent.getParameters("ZzfreightTerms").value;
			} else {
				that._availableFields[0].ZzfreightTerms = "";
				oEvent.getSource().setValueStateText("Size limit 1");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getParameters("ZzfreightTerms").value == ""){
				oEvent.getSource().setValueState("None");
			}
		}
	}

	// ========= Functions to Freight Terms - Dialog :: End	
};