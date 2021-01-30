jQuery.sap.declare("soch.otc274Monitor.components.Posex");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Posex = {
	// ========= Functions to PO Item Customer Reference - Dialog :: Begin	

	onGetValue: function (that, oEvent) {
		
		if (oEvent.getSource().getValue().length <= 6) {
			oEvent.getSource().setValueState("Success");
			that._availableFields[0].Posex = oEvent.getSource().getValue();
		} else {
			that._availableFields[0].Posex = "";
			oEvent.getSource().setValueStateText("Size limit 6");
			oEvent.getSource().setValueState("Error");
		}
		if (oEvent.getSource().getValue() == ""){
			oEvent.getSource().setValueState("None");
		}
		
	}

	// ========= Functions to PO Item Customer Reference - Dialog :: End	
};