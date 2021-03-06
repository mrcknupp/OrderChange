jQuery.sap.declare("soch.otc274Monitor.components.Zzshp");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Zzshp = {
	// ========= Functions to Shipping Restriction - Dialog :: Begin	

	onGetValue: function (that, oEvent) {

		if (oEvent.getSource().getValue().length <= 80) {
			oEvent.getSource().setValueState("Success");
			that._availableFields[0].Zzshp = oEvent.getSource().getValue();
		} else {
			that._availableFields[0].Zzshp = "";
			oEvent.getSource().setValueStateText("Size limit 80");
			oEvent.getSource().setValueState("Error");
		}
		if (oEvent.getSource().getValue() == ""){
			oEvent.getSource().setValueState("None");
		}
	}

	// ========= Functions to Shipping Restriction - Dialog :: End	
};