jQuery.sap.declare("soch.otc274Monitor.components.Reason");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Reason = {
	// ========= Functions to Reason - Dialog :: Begin	

	onGetValue: function (that, oEvent) {
		
		if (oEvent.getSource().getValue().length <= 120) {
			oEvent.getSource().setValueState("Success");
			that._availableFields[0].Reason = oEvent.getSource().getValue();
		} else {
			that._availableFields[0].Reason = "";
			oEvent.getSource().setValueStateText("Size limit 120");
			oEvent.getSource().setValueState("Error");
		}
		if (oEvent.getSource().getValue() == ""){
			oEvent.getSource().setValueState("None");
		}
	}

	// ========= Functions to Reason - Dialog :: End	
};