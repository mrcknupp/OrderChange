jQuery.sap.declare("soch.otc274Monitor.components.Zzsdc");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Zzsdc = {
	// ========= Functions to Shorty-Dest - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogZzsdc) {
				
				that._oValueHelpDialogZzsdc = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogZzsdc", that);
				that._oValueHelpDialogZzsdc.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogZzsdc.getBinding("items")
					.filter([new sap.ui.model.Filter("Name1", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogZzsdc.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogZzsdc.getBinding("items")
					.filter([new sap.ui.model.Filter("Name1", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogZzsdc.open(sInputValue);
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
		if (oEvent.getParameters("Zzsdc").selectedRow !== undefined) {
			that._availableFields[0].Zzsdc = oEvent.getParameters("Zzsdc").selectedRow.getCells()[0].getProperty("text");
		} else {

			if (oEvent.getParameters("Zzsdc").value.length <= 10) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].Zzsdc = oEvent.getParameters("Zzsdc").value;
			} else {
				that._availableFields[0].Zzsdc = "";
				oEvent.getSource().setValueStateText("Size limit 10");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getParameters("Zzsdc").value == ""){
				oEvent.getSource().setValueState("None");
			}
		}
	}

	// ========= Functions to Shorty-Dest - Dialog :: End	
};