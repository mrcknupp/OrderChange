jQuery.sap.declare("soch.otc274Monitor.components.ZzshipCode");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.ZzshipCode = {
	// ========= Functions to Ship Code - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogZzshipCode) {
				
				that._oValueHelpDialogZzshipCode = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogZzshipCode", that);
				that._oValueHelpDialogZzshipCode.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogZzshipCode.getBinding("items")
					.filter([new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogZzshipCode.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogZzshipCode.getBinding("items")
					.filter([new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogZzshipCode.open(sInputValue);
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
		if (oEvent.getParameters("ZzshipCode").selectedRow !== undefined) {
			that._availableFields[0].ZzshipCode = oEvent.getParameters("ZzshipCode").selectedRow.getCells()[0].getProperty("text");
		} else {

			if (oEvent.getParameters("ZzshipCode").value.length <= 3) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].ZzshipCode = oEvent.getParameters("ZzshipCode").value;
			} else {
				that._availableFields[0].ZzshipCode = "";
				oEvent.getSource().setValueStateText("Size limit 3");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getParameters("ZzshipCode").value == ""){
				oEvent.getSource().setValueState("None");
			}
		}
	}

	// ========= Functions to Ship Code - Dialog :: End	
};