jQuery.sap.declare("soch.otc274Monitor.components.Zzssf");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Zzssf = {
	// ========= Functions to Secure From - Dialog :: Begin	

	onGetValue: function (that, oEvent) {
		
		if (oEvent.getSource().getValue() === "Yes" || oEvent.getSource().getValue() === "No") {
			oEvent.getSource().setValueState("Success");
			that._availableFields[0].Zzssf = oEvent.getSource().getSelectedKey();
		} else {
			that._availableFields[0].Zzssf = "";
			oEvent.getSource().setValueStateText("Invalid option");
			oEvent.getSource().setValueState("Error");
		}
		if (oEvent.getSource().getValue() == ""){
			oEvent.getSource().setValueState("None");
		}
	}

	// ========= Functions to Secure From - Dialog :: End	
};