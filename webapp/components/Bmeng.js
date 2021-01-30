jQuery.sap.declare("soch.otc274Monitor.components.Bmeng");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Bmeng = {
	// ========= Functions to Quantity - Dialog :: Begin	

	onGetValue: function (that, oEvent) {
		if (oEvent.getSource().getValue().length <= 13) {
			oEvent.getSource().setValueState("Success");
			that._availableFields[0].Bmeng = oEvent.getSource().getValue();
		} else {
			that._availableFields[0].Bmeng = "";
			oEvent.getSource().setValueStateText("Size limit 13");
			oEvent.getSource().setValueState("Error");
		}
		if (oEvent.getSource().getValue() == ""){
			oEvent.getSource().setValueState("None");
		}
	}

	// ========= Functions to Quantity - Dialog :: End	
};