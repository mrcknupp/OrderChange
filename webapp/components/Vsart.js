jQuery.sap.declare("soch.otc274Monitor.components.Vsart");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Vsart = {
	// ========= Functions to SH-Shiptype - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogVsart) {
				
				that._oValueHelpDialogVsart = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogVsart", that);
				that._oValueHelpDialogVsart.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogVsart.getBinding("items")
					.filter([new sap.ui.model.Filter("Bezei", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				// jQuery.sap.syncStyleClass("sapUiSizeCompact", that.getView(), this._oValueHelpDialogVsart);
				that._oValueHelpDialogVsart.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogVsart.getBinding("items")
					.filter([new sap.ui.model.Filter("Bezei", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogVsart.open(sInputValue);
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
		if (oEvent.getParameters("Vsart").selectedRow !== undefined) {
			that._availableFields[0].Vsart = oEvent.getParameters("Vsart").selectedRow.getCells()[0].getProperty("text");
		} else {
			
			if (oEvent.getParameters("Vsart").value.length <= 2) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].Vsart = oEvent.getParameters("Vsart").value;
			} else {
				that._availableFields[0].Vsart = "";
				oEvent.getSource().setValueStateText("Size limit 2");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getParameters("Vsart").value == ""){
				oEvent.getSource().setValueState("None");
			}
		}	
		
	}

	// ========= Functions to SH-Shiptype - Dialog :: End	
};