jQuery.sap.declare("soch.otc274Monitor.components.Bstkd");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Bstkd = {
	// ========= Functions to PO Customer Reference - Dialog :: Begin	

	onGetValue: function (that, oEvent) {
		
		if (oEvent.getSource().getValue().length <= 35) {
			oEvent.getSource().setValueState("Success");
			that._availableFields[0].Bstkd = oEvent.getSource().getValue();
		} else {
			that._availableFields[0].Bstkd = "";
			oEvent.getSource().setValueStateText("Size limit 35");
			oEvent.getSource().setValueState("Error");
		}
		if (oEvent.getSource().getValue() == ""){
			oEvent.getSource().setValueState("None");
		}
	}

	// ========= Functions to PO Customer Reference - Dialog :: End	
};