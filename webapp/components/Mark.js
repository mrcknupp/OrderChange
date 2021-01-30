jQuery.sap.declare("soch.otc274Monitor.components.Mark");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

soch.otc274Monitor.components.Mark = {
	// ========= Functions to Mark Instructions - Dialog :: Begin	

	onValueHelp: function (that, oEvent) {

		var sInputValue = oEvent.getSource().getValue();
		    that._osource = oEvent.getSource();
			if (!that._oValueHelpDialogMark) {
				
				that._oValueHelpDialogMark = sap.ui.xmlfragment("soch.otc274Monitor.fragment.ValueHelpDialogMark", that);
				that._oValueHelpDialogMark.setModel(that.getView().getModel());
				// Create a filter for the binding
				that._oValueHelpDialogMark.getBinding("items")
					.filter([new sap.ui.model.Filter("Zztext", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				that._oValueHelpDialogMark.getBinding("items")
					.filter([new sap.ui.model.Filter("Zzlevel", sap.ui.model.FilterOperator.Contains, that._level)]);	
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogMark.open(sInputValue);
				
			} else {
				
				// Create a filter for the binding
				that._oValueHelpDialogMark.getBinding("items")
					.filter([new sap.ui.model.Filter("Zztext", sap.ui.model.FilterOperator.Contains, sInputValue)]);
				that._oValueHelpDialogMark.getBinding("items")
					.filter([new sap.ui.model.Filter("Zzlevel", sap.ui.model.FilterOperator.Contains, that._level)]);		
				// Open ValueHelpDialog filtered by the input's value
				that._oValueHelpDialogMark.open(sInputValue);
			}
	},
		
	onValueHelpSearch: function (oEvent) {
		var field = "";
		var sValue = oEvent.getParameter("value");
		if (oEvent.getParameters().itemsBinding.aKeys[0] !== undefined) {
			field = oEvent.getParameters().itemsBinding.aKeys[0].split("'");
		}
		var aFilters = [];
			aFilters.push(new sap.ui.model.Filter("Zztext", sap.ui.model.FilterOperator.StartsWith, sValue));
			aFilters.push(new sap.ui.model.Filter("Zzlevel", sap.ui.model.FilterOperator.EQ, field[3]));
		oEvent.getSource().getBinding("items").filter(aFilters);
	},

	onValueHelpClose: function (oEvent) {
		oEvent.getSource().getBinding("items").filter([]);
	},

	onGetValue: function (that, oEvent) {
		// that._insFields[0].Zzcode = oEvent.getParameters("Zzcode").selectedRow.getCells()[0].getProperty("text");
	}

	// ========= Functions to Mark Instruction - Dialog :: End	
};