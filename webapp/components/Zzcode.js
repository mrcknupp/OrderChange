jQuery.sap.declare("soch.otc274Monitor.components.Zzcode");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Zzcode = {
	// ========= Functions to Instruction Codes - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogZzcode) {
				
				that._oValueHelpDialogZzcode = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogCode", that);
				that._oValueHelpDialogZzcode.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogZzcode.getBinding("items")
					.filter([new sap.ui.model.Filter("Zzdescr", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				that._oValueHelpDialogZzcode.getBinding("items")
					.filter([new sap.ui.model.Filter("Zzgroup", sap.ui.model.FilterOperator.Contains, that._typeCode)]);	
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogZzcode.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogZzcode.getBinding("items")
					.filter([new sap.ui.model.Filter("Zzdescr", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				that._oValueHelpDialogZzcode.getBinding("items")
					.filter([new sap.ui.model.Filter("Zzgroup", sap.ui.model.FilterOperator.Contains, that._typeCode)]);		
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogZzcode.open(sInputValue);
			}
	},
		
	onValueHelpSearch: function (that, oEvent) {
		// var field = "";
		var sValue = oEvent.getParameter("value");
		// if (oEvent.getParameters().itemsBinding.aKeys[0] !== undefined) {
		// 	field = oEvent.getParameters().itemsBinding.aKeys[0].split("'");
		// }
		var aFilters = [];
			aFilters.push(new sap.ui.model.Filter("Zzdescr", sap.ui.model.FilterOperator.StartsWith, sValue));
			aFilters.push(new sap.ui.model.Filter("Zzgroup", sap.ui.model.FilterOperator.EQ, that._typeCode));
		oEvent.getSource().getBinding("items").filter(aFilters);
	},

	onValueHelpClose: function (oEvent) {
		oEvent.getSource().getBinding("items").filter([]);
	},

	onGetValue: function (that, oEvent) {
		// that._insFields[0].Zzcode = oEvent.getParameters("Zzcode").selectedRow.getCells()[0].getProperty("text");
	}

	// ========= Functions to Instruction Codes - Dialog :: End	
};