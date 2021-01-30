jQuery.sap.declare("soch.otc274Monitor.components.Abgru");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Abgru = {
	// ========= Functions to Rejection - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogAbgru) {
				
				that._oValueHelpDialogAbgru = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogAbgru", that);
				that._oValueHelpDialogAbgru.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogAbgru.getBinding("items")
					.filter([new sap.ui.model.Filter("Bezei", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogAbgru.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogAbgru.getBinding("items")
					.filter([new sap.ui.model.Filter("Bezei", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogAbgru.open(sInputValue);
			}
	},
		
	onValueHelpSearch: function (oEvent) {

		var sValue = oEvent.getParameter("value");
		var oFilter = new sap.ui.model.Filter("Bezei", sap.ui.model.FilterOperator.StartsWith, sValue);

		oEvent.getSource().getBinding("items").filter([oFilter]);
	},

	onValueHelpClose: function (oEvent) {
		oEvent.getSource().getBinding("items").filter([]);
	},

	onGetValue: function (that, oEvent) {
		if (oEvent.getParameters("Abgru").selectedRow !== undefined){
			that._availableFields[0].Abgru = oEvent.getParameters("Abgru").selectedRow.getCells()[0].getProperty("text");
		} else {

			if (oEvent.getParameters("Abgru").value.length <= 2) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].Abgru = oEvent.getParameters("Abgru").value;
			} else {
				that._availableFields[0].Abgru = "";
				oEvent.getSource().setValueStateText("Size limit 2");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getParameters("Abgru").value == ""){
				oEvent.getSource().setValueState("None");
			}
		}
	}

	// ========= Functions to Rejection - Dialog :: End	
};