jQuery.sap.declare("soch.otc274Monitor.components.Zzroute");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Zzroute = {
	// ========= Functions to Route - Dialog :: Begin	

	onGetValue: function (that, oEvent) {

		if (oEvent.getSource().getValue().length <= 100) {
			oEvent.getSource().setValueState("Success");
			that._availableFields[0].Zzroute = oEvent.getSource().getValue();
		} else {
			that._availableFields[0].Zzroute = "";
			oEvent.getSource().setValueStateText("Size limit 100");
			oEvent.getSource().setValueState("Error");
		}
		if (oEvent.getSource().getValue() == ""){
			oEvent.getSource().setValueState("None");
		}
	}

	// ========= Functions to Route - Dialog :: End	
};