jQuery.sap.declare("soch.otc274Monitor.components.PlLength");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.PlLength = {
	// ========= Functions to Length - Dialog :: Begin	

	onGetValue: function (that, oEvent) {
		
		if (oEvent.getSource().getValue().length <= 30) {
			oEvent.getSource().setValueState("Success");
			that._availableFields[0].PlLength = oEvent.getSource().getValue();
		} else {
			that._availableFields[0].PlLength = "";
			oEvent.getSource().setValueStateText("Size limit 30");
			oEvent.getSource().setValueState("Error");
		}
		if (oEvent.getSource().getValue() == ""){
			oEvent.getSource().setValueState("None");
		}
	}

	// ========= Functions to Length - Dialog :: End	
};