jQuery.sap.declare("soch.otc274Monitor.components.Zzpwt");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Zzpwt = {
	// ========= Functions to Precise Weight - Dialog :: Begin	

	onGetValue: function (that, oEvent) {
		
		if (oEvent.getSource().getValue() === "Yes" || oEvent.getSource().getValue() === "No") {
			oEvent.getSource().setValueState("Success");
			that._availableFields[0].Zzpwt = oEvent.getSource().getSelectedKey();
		} else {
			that._availableFields[0].Zzpwt = "";
			oEvent.getSource().setValueStateText("Invalid option");
			oEvent.getSource().setValueState("Error");
		}
		if (oEvent.getSource().getValue() == ""){
			oEvent.getSource().setValueState("None");
		}
	}

	// ========= Functions to Precise Weight - Dialog :: End	
};