jQuery.sap.declare("soch.otc274Monitor.components.Zzapp");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Zzapp = {
	// ========= Functions to End Use - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogZzapp) {
				
				that._oValueHelpDialogZzapp = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogZzapp", that);
				that._oValueHelpDialogZzapp.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogZzapp.getBinding("items")
					.filter([new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogZzapp.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogZzapp.getBinding("items")
					.filter([new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogZzapp.open(sInputValue);
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
		if (oEvent.getParameters("Zzapp").selectedRow !== undefined) {
			that._availableFields[0].Zzapp = oEvent.getParameters("Zzapp").selectedRow.getCells()[0].getProperty("text");
		} else {

			if (oEvent.getParameters("Zzapp").value.length <= 150) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].Zzapp = oEvent.getParameters("Zzapp").value;
			} else {
				that._availableFields[0].Zzapp = "";
				oEvent.getSource().setValueStateText("Size limit 150");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getParameters("Zzapp").value == ""){
				oEvent.getSource().setValueState("None");
			}
		}
	}

	// ========= Functions to End Use - Dialog :: End	
};