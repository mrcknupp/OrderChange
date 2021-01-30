jQuery.sap.declare("soch.otc274Monitor.components.Lifsp");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Lifsp = {
	// ========= Functions to Delivery Block - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogLifsp) {
				
				that._oValueHelpDialogLifsp = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogLifsp", that);
				that._oValueHelpDialogLifsp.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogLifsp.getBinding("items")
					.filter([new sap.ui.model.Filter("Vtext", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogLifsp.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogLifsp.getBinding("items")
					.filter([new sap.ui.model.Filter("Vtext", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogLifsp.open(sInputValue);
			}
	},
		
	onValueHelpSearch: function (oEvent) {

		var sValue = oEvent.getParameter("value");
		var oFilter = new sap.ui.model.Filter("Vtext", sap.ui.model.FilterOperator.StartsWith, sValue);

		oEvent.getSource().getBinding("items").filter([oFilter]);
	},

	onValueHelpClose: function (oEvent) {
		oEvent.getSource().getBinding("items").filter([]);
	},

	onGetValue: function (that, oEvent) {
		if (oEvent.getParameters("Lifsp").selectedRow !== undefined) {
			that._availableFields[0].Lifsp = oEvent.getParameters("Lifsp").selectedRow.getCells()[0].getProperty("text");
		} else {

			if (oEvent.getParameters("Lifsp").value.length <= 2) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].Lifsp = oEvent.getParameters("Lifsp").value;
			} else {
				that._availableFields[0].Lifsp = "";
				oEvent.getSource().setValueStateText("Size limit 2");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getParameters("Lifsp").value == ""){
				oEvent.getSource().setValueState("None");
			}
		}
	}

	// ========= Functions to Delivery Block - Dialog :: End	
};