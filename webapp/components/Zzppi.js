jQuery.sap.declare("soch.otc274Monitor.components.Zzppi");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Zzppi = {
	// ========= Functions to Agreement - Dialog :: Begin	

	onGetValue: function (that, oEvent) {

		if (oEvent.getSource().getValue().length <= 20) {
			oEvent.getSource().setValueState("Success");
			that._availableFields[0].Zzppi = oEvent.getSource().getValue();
		} else {
			that._availableFields[0].Zzppi = "";
			oEvent.getSource().setValueStateText("Size limit 20");
			oEvent.getSource().setValueState("Error");
		}
		if (oEvent.getSource().getValue() == ""){
			oEvent.getSource().setValueState("None");
		}
	}

	// ========= Functions to Agreement - Dialog :: End	
};