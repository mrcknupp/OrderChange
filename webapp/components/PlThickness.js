jQuery.sap.declare("soch.otc274Monitor.components.PlThickness");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.PlThickness = {
	// ========= Functions to Thickness - Dialog :: Begin	

	onGetValue: function (that, oEvent) {

		if (oEvent.getSource().getValue().length <= 30) {
			oEvent.getSource().setValueState("Success");
			that._availableFields[0].PlThickness = oEvent.getSource().getValue();
		} else {
			that._availableFields[0].PlThickness = "";
			oEvent.getSource().setValueStateText("Size limit 30");
			oEvent.getSource().setValueState("Error");
		}
		if (oEvent.getSource().getValue() == ""){
			oEvent.getSource().setValueState("None");
		}
	}

	// ========= Functions to Thickness - Dialog :: End	
};