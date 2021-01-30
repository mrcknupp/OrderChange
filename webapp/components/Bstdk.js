jQuery.sap.declare("soch.otc274Monitor.components.Bstdk");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Bstdk = {
	// ========= Functions to Cust.Ref.Date - Dialog :: Begin	

	onGetValue: function (that, oEvent) {

		if (oEvent.getSource().getValue() !== "") {
			var array = oEvent.getSource().getValue().split("/");
			if (oEvent.getSource().getValue().length === 10) {
				oEvent.getSource().setValueState("Success");
				that._availableFields[0].Bstdk = array[2] + array[1] + array[0];
			} else {
				that._availableFields[0].Bstdk = "";
				oEvent.getSource().setValueStateText("Invalid date");
				oEvent.getSource().setValueState("Error");
			}
			if (oEvent.getSource().getValue() == ""){
				oEvent.getSource().setValueState("None");
			}
		} else {
			that._availableFields[0].Bstdk = "";
		}
	}

	// ========= Functions to Cust.Ref.Date - Dialog :: End	
};