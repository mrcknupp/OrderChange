sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/ui/table/RowAction",
	"sap/ui/table/RowActionItem",
	"sap/ui/table/RowSettings",
	"sap/m/MessageBox",
	"sap/m/SearchField",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, ODataModel, JSONModel, RowAction, RowActionItem, RowSettings, MessageBox, SearchField, Fragment, Filter,
	FilterOperator) {
	"use strict";

	return Controller.extend("soch.otc274Monitor.controller.Worklist", {

		modes: null,
		_smartTableDisplay: null,
		_availableFields: null,
		_versionKeys: null,
		_checkfields: null,

		onInit: function () {
			this.onAvailableFields();
			this._versionKeys = [];
			var sUrl = "/sap/opu/odata/sap/ZOTC_SOCH_MONITOR_SRV/";
			this._oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

		},
		
		onAvailableFields: function () {
			var fields = {
					Bstkd: "",
					Posex: "",
					Bstdk: "",
					Kunnr: "",
					Edatu: "",
					Lifsp: "",
					Kunwe: "",
					Zzbnd: "",
					Abgru: "",
					Zzjob: "",
					ZzfreightTerms: "",
					Vsart: "",
					ZzshipCode: "",
					Zzsdc: "",
					Zzshp: "",
					Zzroute: "",
					Zzssf: "",
					Zzpwt: "",
					Zzaft: "",
					Zzppi: "",
					Matnr: "",
					Bmeng: "",
					Vrkme: "",
					Kdmat: "",
					Zzapp: "",
					PlThickness: "",
					PlWidth: "",
					PlLength: "",
					Reason: "",
					Comment: ""
				};
			this._availableFields = [fields];

		},
		
		onSelectionChange: function (oEvent) {
			//var values = oEvent.getParameters().rowContext.sPath.split("'");
			// values[1]
			// values[3]
			// values[5]
			// values[7]
		},

		onBeforeRebindTable: function (oEvent) {
			// var binding = oEvent.oSource.getParameter("bindingParams");
			// var binding = oEvent.mParameters.bindingParams;
			//   var oFilter = new sap.ui.model.Filter("vbeln", sap.ui.model.FilterOperator.NE, " ");
			//         binding.filters.push(oFilter);
		},

		onAfterRendering: function (event) {
			this._smartTableDisplay = this.getView().byId("stDisplay");
			var that = this;
			var bt01 = this.getView().byId("btApprove");
			var bt02 = this.getView().byId("btReject");
			var bt03 = this.getView().byId("btCreateUpdate");
			var bt04 = this.getView().byId("btDelete");
			var bt05 = this.getView().byId("btReview");			
			var aFilters = [];
			var userId = sap.ushell.Container.getService("UserInfo").getId();
			aFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, userId));
			this.getView().getModel().read("/authoSet", {
				filters: aFilters,
				success: function (oData) {
					if (typeof oData.results[0] !== "undefined") {
						if (oData.results[0].Approve === "X") {
							bt01.setEnabled(true);
						}else{
							bt01.setEnabled(false);
						}
						if (oData.results[0].Reject === "X") {
							bt02.setEnabled(true);
						}else{
							bt02.setEnabled(false);
						}
						if (oData.results[0].Create === "X") {
							bt03.setEnabled(true);
						}else{
							bt03.setEnabled(false);
						}
						if (oData.results[0].Delete === "X") {
							bt04.setEnabled(true);
						}else{
							bt04.setEnabled(false);
						}
						if (oData.results[0].Review === "X") {
							bt05.setEnabled(true);
						}else{
							bt05.setEnabled(false);
						}	
						// if (oData.results[0].Change === "X") {
						// 	// bt02.setEnabled(true);
						// }else{
						// 	// bt02.setEnabled(false);
						// }						
					}
				},	
				error: function (oError) {
					console.log(oError);
				}
			});
			
			this._smartTableDisplay.attachDataReceived(function (data) {

				var fnPress = that.handleActionPress.bind(that);

				that.modes = [{
					key: "Navigation",
					text: "Navigation",
					handler: function () {
						var oTemplate = new RowAction({
							items: [
								new RowActionItem({
									type: "Navigation",
									press: fnPress,
									visible: "{Available}"
								})
							]
						});
						return [1, oTemplate];
					}
				}];
				that.getView().setModel(new JSONModel({
					items: that.modes
				}), "modes");
				that.switchState("Navigation", that._smartTableDisplay);

			});
			// this._smartTableDisplay.getTable().getModel().refresh(true);
		},

		switchState: function (sKey, sTableDisplay) {
			var iCount = 0;
			var oTemplate = sTableDisplay.getTable().getRowActionTemplate();
			if (oTemplate) {
				oTemplate.destroy();
				oTemplate = null;
			}

			for (var i = 0; i < this.modes.length; i++) {
				if (sKey == this.modes[i].key) {
					var aRes = this.modes[i].handler();
					iCount = aRes[0];
					oTemplate = aRes[1];
					break;
				}
			}

			sTableDisplay.getTable().setAlternateRowColors(true);
			// sTableDisplay.getTable().setFixedColumnCount("4");
			sTableDisplay.getTable().setRowActionTemplate(oTemplate);
			sTableDisplay.getTable().setRowActionCount(iCount);

			for (var x = 0; x < sTableDisplay.getTable().getColumns().length; x++) {
				sTableDisplay.getTable().autoResizeColumn(x);
			}
			sTableDisplay.getTable().autoResizeColumn(0);
		},

		handleActionPress: function (oEvent) {
			var oRow = oEvent.getParameter("row");
			var oItem = oEvent.getParameter("item"); //oItem.getBindingContext().valueOf() - Detalhamento completo relacionado com o linha clicada

			sap.ui.core.UIComponent.getRouterFor(this).navTo("object", {
				objectId: oItem.getBindingContext().getProperty("vbeln") + "#" + oItem.getBindingContext().getProperty("posnr")
			});

		},

		onApprove: function (oEvent) {
			var decision = "Y";
			var type = "APPREJ";
			this.onAction(oEvent, decision, type);
		},

		onReject: function (oEvent) {
			var decision = "N";
			var type = "APPREJ";
			this.onAction(oEvent, decision, type);
		},

		onInstructions: function (oEvent) {
			
			if (this._smartTableDisplay.getTable().getSelectedIndices().length < 1) {
				MessageBox.information("Select at least one line");

			} else {
				var check = this.checkItems(oEvent, "INST");
				this._oSource = oEvent.getSource();
				if (check !== "OK") {
					this.onShowMessage(oEvent);
				
				} else {
					sap.ui.core.UIComponent.getRouterFor(this).navTo("instructions", {
					objects: JSON.stringify(this._versionKeys)
					});	
				}	
			}	
		},

		onDelete: function (oEvent) {
			var decision = "C";
			var type = "CANCEL";
			this.onAction(oEvent, decision, type);
		},

		onReview: function (oEvent) {
			var decision = "R";
			var type = "REVIEW";
			this.onAction(oEvent, decision, type);
		},

		onAction: function (oEvent, decision, type) {
			
			this._mainBusy = this.getView().byId("pag1");
			this._mainBusy.setBusy(true);  
			if (this._smartTableDisplay.getTable().getSelectedIndices().length < 1) {
				MessageBox.information("Select at least one line");
				this._mainBusy.setBusy(false);
				
			} else {
				var check = this.checkItems(oEvent, type);
				this._oSource = oEvent.getSource();
				if (check !== "OK") {
					this.onShowMessage(oEvent);
					
				} else {
					var entity = "";
					switch (type) {
						case "APPREJ": /* Button - Approve / Reject */
							entity = "/actionSet";
							break;
						case "CANCEL": /* Button - Cancel */
							entity = "/versionCancelSet";
							break;
						case "REVIEW": /* Button - Review */
							entity = "/reviewSet";
							break;	
						default:
					}
					if (entity !== "") {
						jQuery.sap.delayedCall(1000, this, function () {
							this._mainBusy.setBusy(false);
							jQuery.sap.require("soch.otc274Monitor.components.Action");
							soch.otc274Monitor.components.Action.onRunAction(this, oEvent, decision, entity);
						});
					}
				}
			}	
		},

		// ========= Functions for Create/update - Approve/Reject - Cancel - Review :: Begin
		checkItems: function (oEvent, type) {
			var flag = "OK",
				index, data,
				object = this._smartTableDisplay._getRowBinding().oModel.oData,
				textMsg,
				keys = {
					vbeln: "",
					posnr: "",
					version: "",
					status: ""
				};
			this._versionKeys = [];
			this._checkfields = null;
			this._Messages = [];
			for (var i = 0; i <= this._smartTableDisplay.getTable().getSelectedIndices()[i]; i++) {
				if (typeof this._smartTableDisplay.getTable().getSelectedIndices()[i] !== "undefined") {
					index = this._smartTableDisplay.getTable().getSelectedIndices()[i];
					data = object[this._smartTableDisplay._getRowBinding().aKeys[index]];
					keys = {
						vbeln: data.vbeln,
						posnr: data.posnr,
						version: data.change_number,
						status: data.change_status
					};
					this._versionKeys.push(keys);
					
					switch (type) {
						case "INST":
							if (data.gbstk !== "A" && data.gbstk !== "B") {
								flag = "nOK";
								textMsg = "Version status different of NEW or Overall Processing Status is completed";
							}
							break;
							
						case "CREUPD":
							if ((data.change_status !== "NEW" || data.change_status !== "") &&
							   (data.gbstk !== "A" && data.gbstk !== "B")) {
								flag = "nOK";
								textMsg = "Version status different of NEW or Overall Processing Status is completed";
							}
							break;
							
						case "APPREJ":
							if ((data.change_status !== "NEW") &&
								(data.gbstk !== "A" && data.gbstk !== "B")) {
								flag = "nOK";
								textMsg = "This action cannot be executed because of Version status different of NEW";
							}	
							break;
							
						case "CANCEL":
							if ((data.change_status !== "NEW")) {
								flag = "nOK";
								textMsg = "This action cannot be executed because of Version status different of NEW";
							}
							break;
							
						case "REVIEW":
							if ((data.change_status !== "PRD REVIEW") && (data.change_status !== "APPLIED SAP")){
								flag = "nOK";
								textMsg = "This action is only allowed if Status equal of PRD REVIEW or APPLIED SAP";
							}
							break;							

						// case value1:
							
						// 	break;
							
						default:
					}
						
					if (flag === "nOK") {
						var oMessageTemplate = new sap.m.MessageItem({
							type: "{type}",
							title: "{title}",
							description: "{description}",
							subtitle: "{subtitle}",
							counter: "{counter}",
							markupDescription: "{markupDescription}",
							link: ""
						});
						
						var message = {
								type: "Error",
								title: "Sales Order: " + data.vbeln,
								description: "Item: " + data.posnr + "\n\n" + "Version: " + data.change_number + "\n\n" + "Status: " + data.change_status + "\n\n" + "Message: " + textMsg,
								subtitle: "Item: " + data.posnr,
								counter: 1
							};
						this._Messages.push(message);
						
					}
				}
			}
			return flag;
		},
	
		onShowMessage: function (oEvent) {
			var oMessageTemplate = new sap.m.MessageItem({
					type: "{type}",
					title: "{title}",
					description: "{description}",
					subtitle: "{subtitle}",
					counter: "{counter}",
					markupDescription: "{markupDescription}",
					link: ""
				});
						
			var oMessages = new sap.ui.model.json.JSONModel();
			oMessages.setData(this._Messages);
			var that = this;
			var oMessageView = new sap.m.MessageView({
					showDetailsPageHeader: false,
					itemSelect: function () {
						oBackButton.setVisible(true);
					},
					items: {
						path: "/",
						template: oMessageTemplate
					}
				}),
				oBackButton = new sap.m.Button({
					icon: sap.ui.core.IconPool.getIconURI("nav-back"),
					visible: false,
					press: function () {
						oMessageView.navigateBack();
						this.setVisible(false);
					}
				});

			oMessageView.setModel(oMessages);
			
			var oCloseButton = new sap.m.Button({
					text: "Close",
					press: function () {
						that._oPopover.close();
					}
				}),
				oPopoverBar = new sap.m.Bar({
					contentLeft: [oBackButton],
					contentMiddle: [
						new sap.ui.core.Icon({
							src: "sap-icon://message-information"
						}),
						new sap.m.Text({
							text: "Messages"
						})
					]
				});

			this._oPopover = new sap.m.ResponsivePopover({
				placement: "Left",
				customHeader: oPopoverBar,
				contentWidth: "400px",
				contentHeight: "400px",
				verticalScrolling: false,
				modal: true,
				content: [oMessageView],
				endButton: oCloseButton
			});
			jQuery.sap.delayedCall(1500, this, function () {
				this._mainBusy.setBusy(false);
			});	
			this._oPopover.openBy(this._oSource);
						
		},

		onCreateUpdate: function (oEvent) {
			this._mainBusy = this.getView().byId("pag1");
			this._mainBusy.setBusy(true); 
			if (this._smartTableDisplay.getTable().getSelectedIndices().length < 1) {
				this._mainBusy.setBusy(false);
				MessageBox.information("Select at least one line");
		
			} else {

				var check = this.checkItems(oEvent, "CREUPD");
				this._oSource = oEvent.getSource();
				if (check !== "OK") {
					this.onShowMessage(oEvent);

				} else {
					this.onAvailableFields();
					this._mainBusy.setBusy(true);
					jQuery.sap.delayedCall(1500, this, function () {
						this._mainBusy.setBusy(false);
					});
					if (!this.oMultiEditDialog) {
		
						this.oMultiEditDialog = sap.ui.xmlfragment("soch.otc274Monitor.fragment.EditDialog", this);
						this.getView().addDependent(this.oMultiEditDialog);
						this.oMultiEditDialog.setEscapeHandler(function () {
							this.onCloseDialog();
						}.bind(this));
						
						jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this.oMultiEditDialog);
						this.oMultiEditDialog.open();
						
					} else {
						this.onClearFormFields();
						jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this.oMultiEditDialog);
						this.oMultiEditDialog.open();
					}
				}
			}
		},
		onClearFormFields: function() {
			for (var i=0; i<this.oMultiEditDialog.getContent()[0]._oForm.getFormContainers()[0].getGroupElements().length; i++) {
				this.oMultiEditDialog.getContent()[0]._oForm.getFormContainers()[0].getGroupElements()[i].getElements()[1].setValue("");
				this.oMultiEditDialog.getContent()[0]._oForm.getFormContainers()[0].getGroupElements()[i].getElements()[1].setValueState("None");
			}

			for (var x=0; x<this.oMultiEditDialog.getContent()[0]._oForm.getFormContainers()[1].getGroupElements().length; x++) {
				this.oMultiEditDialog.getContent()[0]._oForm.getFormContainers()[1].getGroupElements()[x].getElements()[1].setValue("");
				this.oMultiEditDialog.getContent()[0]._oForm.getFormContainers()[1].getGroupElements()[x].getElements()[1].setValueState("None");
			}			

			for (var y=0; y<this.oMultiEditDialog.getContent()[0]._oForm.getFormContainers()[2].getGroupElements().length; y++) {
				this.oMultiEditDialog.getContent()[0]._oForm.getFormContainers()[2].getGroupElements()[y].getElements()[1].setValue("");
				this.oMultiEditDialog.getContent()[0]._oForm.getFormContainers()[2].getGroupElements()[y].getElements()[1].setValueState("None");
			}
			
			this.oMultiEditDialog.getContent()[1].getContent()[0].setValue(""); //Painel Reason
			this.oMultiEditDialog.getContent()[1].getContent()[0].setValueState("None");
			
			this.oMultiEditDialog.getContent()[2].getContent()[0].setValue(""); //Painel Comment
			this.oMultiEditDialog.getContent()[2].getContent()[0].setValueState("None");
		},
		onCloseDialog: function () {
			this.oMultiEditDialog.close();
			// this.oMultiEditDialog.destroy();
			// this.oMultiEditDialog = null;
		},
		onDialogSaveButton: function (oEvent) {
			this.oMultiEditDialog.setBusy(true);
			this.onValidate(oEvent);
			this.oMultiEditDialog.setBusy(false);
			// this.onCloseDialog();
		},
		
		onValidate: function (oEvent) {
			var flag = "";

			if (this._versionKeys.length == 0) {
				flag = "versionKeys";
			}
			if (this._availableFields[0].Abgru === "" && this._availableFields[0].Bmeng === "" &&
				this._availableFields[0].Bstdk === "" && this._availableFields[0].Bstkd === "" &&
				this._availableFields[0].Edatu === "" && this._availableFields[0].Kdmat === "" &&
				this._availableFields[0].Kunnr === "" && this._availableFields[0].Kunwe === "" &&
				this._availableFields[0].Lifsp === "" && this._availableFields[0].Matnr === "" &&
				this._availableFields[0].Posex === "" && this._availableFields[0].Vrkme === "" &&
				this._availableFields[0].Vsart === "" && this._availableFields[0].Zzaft === "" &&
				this._availableFields[0].Zzapp === "" && this._availableFields[0].Zzbnd === "" &&
				this._availableFields[0].Zzjob === "" && this._availableFields[0].Zzppi === "" &&
				this._availableFields[0].Zzpwt === "" && this._availableFields[0].Zzsdc === "" &&
				this._availableFields[0].Zzshp === "" && this._availableFields[0].Zzssf === "" &&
				this._availableFields[0].Zzroute === "" && this._availableFields[0].PlWidth === "" &&
				this._availableFields[0].PlLength === "" && this._availableFields[0].ZzshipCode === "" &&
				this._availableFields[0].PlThickness === "" && this._availableFields[0].ZzfreightTerms === "" &&
				this._availableFields[0].Reason === "" && this._availableFields[0].Comment === "") {
				flag = "empty";
			}

			if (flag === "") {
				jQuery.sap.require("soch.otc274Monitor.components.Version");
				soch.otc274Monitor.components.Version.onSetVersion(this, oEvent);
			} else {
				MessageBox.information("Information imcomplete or empty, please verify values");
			}
		},

		// ========= Abstraction layer of functions - Dialog Change :: Begin
		onValueHelp: function (oEvent) {
			switch (oEvent.getSource().getId()) {
			case "Vsart":
				jQuery.sap.require("soch.otc274Monitor.components.Vsart");
				soch.otc274Monitor.components.Vsart.onValueHelp(this, oEvent);
				break;
				
			case "Kunnr":
				jQuery.sap.require("soch.otc274Monitor.components.Kunnr");
				soch.otc274Monitor.components.Kunnr.onValueHelp(this, oEvent);
				break;	
				
			case "Kunwe":
				jQuery.sap.require("soch.otc274Monitor.components.Kunwe");
				soch.otc274Monitor.components.Kunwe.onValueHelp(this, oEvent);
				break;	
				
			case "ZzfreightTerms":
				jQuery.sap.require("soch.otc274Monitor.components.ZzfreightTerms");
				soch.otc274Monitor.components.ZzfreightTerms.onValueHelp(this, oEvent);
				break;
				
			case "ZzshipCode":
				jQuery.sap.require("soch.otc274Monitor.components.ZzshipCode");
				soch.otc274Monitor.components.ZzshipCode.onValueHelp(this, oEvent);
				break;		

			case "Zzsdc":
				jQuery.sap.require("soch.otc274Monitor.components.Zzsdc");
				soch.otc274Monitor.components.Zzsdc.onValueHelp(this, oEvent);
				break;		

			case "Lifsp":
				jQuery.sap.require("soch.otc274Monitor.components.Lifsp");
				soch.otc274Monitor.components.Lifsp.onValueHelp(this, oEvent);
				break;		

			case "Matnr":
				jQuery.sap.require("soch.otc274Monitor.components.Matnr");
				soch.otc274Monitor.components.Matnr.onValueHelp(this, oEvent);
				break;		

			case "Abgru":
				jQuery.sap.require("soch.otc274Monitor.components.Abgru");
				soch.otc274Monitor.components.Abgru.onValueHelp(this, oEvent);
				break;		
						
			case "Zzapp":
				jQuery.sap.require("soch.otc274Monitor.components.Zzapp");
				soch.otc274Monitor.components.Zzapp.onValueHelp(this, oEvent);
				break;		
			
			case "Vrkme":
				jQuery.sap.require("soch.otc274Monitor.components.Vrkme");
				soch.otc274Monitor.components.Vrkme.onValueHelp(this, oEvent);
				break;	
				
			default:
			}
		},
		onValueHelpSearch: function (oEvent) {
			switch (oEvent.getSource().getTitle()) {
			case "Shipping Type":
				jQuery.sap.require("soch.otc274Monitor.components.Vsart");
				soch.otc274Monitor.components.Vsart.onValueHelpSearch(oEvent);
				break;
				
			case "Sold-To":
				jQuery.sap.require("soch.otc274Monitor.components.Kunnr");
				soch.otc274Monitor.components.Kunnr.onValueHelpSearch(oEvent);
				break;	
				
			case "Ship-To":
				jQuery.sap.require("soch.otc274Monitor.components.Kunwe");
				soch.otc274Monitor.components.Kunwe.onValueHelpSearch(oEvent);
				break;	
				
			case "Freight Terms":
				jQuery.sap.require("soch.otc274Monitor.components.ZzfreightTerms");
				soch.otc274Monitor.components.ZzfreightTerms.onValueHelpSearch(oEvent);
				break;	
				
			case "Ship Code":
				jQuery.sap.require("soch.otc274Monitor.components.ZzshipCode");
				soch.otc274Monitor.components.ZzshipCode.onValueHelpSearch(oEvent);
				break;
				
			case "Shorty-Dest":
				jQuery.sap.require("soch.otc274Monitor.components.Zzsdc");
				soch.otc274Monitor.components.Zzsdc.onValueHelpSearch(oEvent);
				break;	
				
			case "Delivery Block":
				jQuery.sap.require("soch.otc274Monitor.components.Lifsp");
				soch.otc274Monitor.components.Lifsp.onValueHelpSearch(oEvent);
				break;	
				
			case "Material":
				jQuery.sap.require("soch.otc274Monitor.components.Matnr");
				soch.otc274Monitor.components.Matnr.onValueHelpSearch(oEvent);
				break;
				
			case "Rejection":
				jQuery.sap.require("soch.otc274Monitor.components.Abgru");
				soch.otc274Monitor.components.Abgru.onValueHelpSearch(oEvent);
				break;
											
			case "End Use":
				jQuery.sap.require("soch.otc274Monitor.components.Zzapp");
				soch.otc274Monitor.components.Zzapp.onValueHelpSearch(oEvent);
				break;
							
			case "Sales Unit":
				jQuery.sap.require("soch.otc274Monitor.components.Vrkme");
				soch.otc274Monitor.components.Vrkme.onValueHelpSearch(oEvent);
				break;
						
			default:
			}
		},
		onValueHelpClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			
			switch (oEvent.getSource().getTitle()) {
			case "Shipping Type":
				jQuery.sap.require("soch.otc274Monitor.components.Vsart");
				soch.otc274Monitor.components.Vsart.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));
					this._availableFields[0].Vsart = oSelectedItem.getCells()[0].getProperty("text");
				}
				break;
				
			case "Sold-To":
				jQuery.sap.require("soch.otc274Monitor.components.Kunnr");
				soch.otc274Monitor.components.Kunnr.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));
					this._availableFields[0].Kunnr = oSelectedItem.getCells()[0].getProperty("text");
				}
				break;	
				
			case "Ship-To":
				jQuery.sap.require("soch.otc274Monitor.components.Kunwe");
				soch.otc274Monitor.components.Kunwe.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));
					this._availableFields[0].Kunwe = oSelectedItem.getCells()[0].getProperty("text");
				}
				break;	
				
			case "Freight Terms":
				jQuery.sap.require("soch.otc274Monitor.components.ZzfreightTerms");
				soch.otc274Monitor.components.ZzfreightTerms.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));
					this._availableFields[0].ZzfreightTerms = oSelectedItem.getCells()[0].getProperty("text");
				}
				break;
				
			case "Ship Code":
				jQuery.sap.require("soch.otc274Monitor.components.ZzshipCode");
				soch.otc274Monitor.components.ZzshipCode.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));
					this._availableFields[0].ZzshipCode = oSelectedItem.getCells()[0].getProperty("text");
				}
				break;
				
			case "Shorty-Dest":
				jQuery.sap.require("soch.otc274Monitor.components.Zzsdc");
				soch.otc274Monitor.components.Zzsdc.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));
					this._availableFields[0].Zzsdc = oSelectedItem.getCells()[0].getProperty("text");
				}
				break;
				
			case "Delivery Block":
				jQuery.sap.require("soch.otc274Monitor.components.Lifsp");
				soch.otc274Monitor.components.Lifsp.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));
					this._availableFields[0].Lifsp = oSelectedItem.getCells()[0].getProperty("text");
				}
				break;	
				
			case "Material":
				jQuery.sap.require("soch.otc274Monitor.components.Matnr");
				soch.otc274Monitor.components.Matnr.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));
					this._availableFields[0].Matnr = oSelectedItem.getCells()[0].getProperty("text");
				}
				break;		
				
			case "Rejection":
				jQuery.sap.require("soch.otc274Monitor.components.Abgru");
				soch.otc274Monitor.components.Abgru.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));
					this._availableFields[0].Abgru = oSelectedItem.getCells()[0].getProperty("text");
				}
				break;		
								
			case "End Use":
				jQuery.sap.require("soch.otc274Monitor.components.Zzapp");
				soch.otc274Monitor.components.Zzapp.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));
					this._availableFields[0].Zzapp = oSelectedItem.getCells()[0].getProperty("text");
				}
				break;
								
			case "Sales Unit":
				jQuery.sap.require("soch.otc274Monitor.components.Vrkme");
				soch.otc274Monitor.components.Vrkme.onValueHelpClose(oEvent);
				if (oSelectedItem) {
					this._osource.setValue(oSelectedItem.getCells()[0].getProperty("text"));
					this._availableFields[0].Vrkme = oSelectedItem.getCells()[0].getProperty("text");
				}
				break;		
								
			default:
			}
		},
		onGetValue: function (oEvent) {
				switch (oEvent.getSource().getId()) {
				case "Vsart":
					jQuery.sap.require("soch.otc274Monitor.components.Vsart");
					soch.otc274Monitor.components.Vsart.onGetValue(this, oEvent);
					break;
					
				case "Bstkd":
					jQuery.sap.require("soch.otc274Monitor.components.Bstkd");
					soch.otc274Monitor.components.Bstkd.onGetValue(this, oEvent);
					break;
					
				case "Bstdk":
					jQuery.sap.require("soch.otc274Monitor.components.Bstdk");
					soch.otc274Monitor.components.Bstdk.onGetValue(this, oEvent);
					break;
	
				case "Posex":
					jQuery.sap.require("soch.otc274Monitor.components.Posex");
					soch.otc274Monitor.components.Posex.onGetValue(this, oEvent);
					break;
	
				case "Zzjob":
					jQuery.sap.require("soch.otc274Monitor.components.Zzjob");
					soch.otc274Monitor.components.Zzjob.onGetValue(this, oEvent);
					break;
	
				case "Zzppi":
					jQuery.sap.require("soch.otc274Monitor.components.Zzppi");
					soch.otc274Monitor.components.Zzppi.onGetValue(this, oEvent);
					break;
	
				case "Zzshp":
					jQuery.sap.require("soch.otc274Monitor.components.Zzshp");
					soch.otc274Monitor.components.Zzshp.onGetValue(this, oEvent);
					break;
	
				case "Zzroute":
					jQuery.sap.require("soch.otc274Monitor.components.Zzroute");
					soch.otc274Monitor.components.Zzroute.onGetValue(this, oEvent);
					break;

				case "Bmeng":
					jQuery.sap.require("soch.otc274Monitor.components.Bmeng");
					soch.otc274Monitor.components.Bmeng.onGetValue(this, oEvent);
					break;
	
				case "Kdmat":
					jQuery.sap.require("soch.otc274Monitor.components.Kdmat");
					soch.otc274Monitor.components.Kdmat.onGetValue(this, oEvent);
					break;
	
				case "PlThickness":
					jQuery.sap.require("soch.otc274Monitor.components.PlThickness");
					soch.otc274Monitor.components.PlThickness.onGetValue(this, oEvent);
					break;
	
				case "PlWidth":
					jQuery.sap.require("soch.otc274Monitor.components.PlWidth");
					soch.otc274Monitor.components.PlWidth.onGetValue(this, oEvent);
					break;
	
				case "PlLength":
					jQuery.sap.require("soch.otc274Monitor.components.PlLength");
					soch.otc274Monitor.components.PlLength.onGetValue(this, oEvent);
					break;
	
				case "Edatu":
					jQuery.sap.require("soch.otc274Monitor.components.Edatu");
					soch.otc274Monitor.components.Edatu.onGetValue(this, oEvent);
					break;	
					
				case "Zzbnd":
					jQuery.sap.require("soch.otc274Monitor.components.Zzbnd");
					soch.otc274Monitor.components.Zzbnd.onGetValue(this, oEvent);
					break;						
					
				case "Kunnr":
					jQuery.sap.require("soch.otc274Monitor.components.Kunnr");
					soch.otc274Monitor.components.Kunnr.onGetValue(this, oEvent);
					break;		
				
				case "Kunwe":
					jQuery.sap.require("soch.otc274Monitor.components.Kunwe");
					soch.otc274Monitor.components.Kunwe.onGetValue(this, oEvent);
					break;
				
				case "ZzfreightTerms":
					jQuery.sap.require("soch.otc274Monitor.components.ZzfreightTerms");
					soch.otc274Monitor.components.ZzfreightTerms.onGetValue(this, oEvent);
					break;

				case "ZzshipCode":
					jQuery.sap.require("soch.otc274Monitor.components.ZzshipCode");
					soch.otc274Monitor.components.ZzshipCode.onGetValue(this, oEvent);
					break;

				case "Zzsdc":
					jQuery.sap.require("soch.otc274Monitor.components.Zzsdc");
					soch.otc274Monitor.components.Zzsdc.onGetValue(this, oEvent);
					break;
								
				case "Zzpwt":
					jQuery.sap.require("soch.otc274Monitor.components.Zzpwt");
					soch.otc274Monitor.components.Zzpwt.onGetValue(this, oEvent);
					break;
									
				case "Lifsp":
					jQuery.sap.require("soch.otc274Monitor.components.Lifsp");
					soch.otc274Monitor.components.Lifsp.onGetValue(this, oEvent);
					break;
									
				case "Matnr":
					jQuery.sap.require("soch.otc274Monitor.components.Matnr");
					soch.otc274Monitor.components.Matnr.onGetValue(this, oEvent);
					break;
									
				case "Abgru":
					jQuery.sap.require("soch.otc274Monitor.components.Abgru");
					soch.otc274Monitor.components.Abgru.onGetValue(this, oEvent);
					break;
															
				case "Zzapp":
					jQuery.sap.require("soch.otc274Monitor.components.Zzapp");
					soch.otc274Monitor.components.Zzapp.onGetValue(this, oEvent);
					break;
									
				case "Vrkme":
					jQuery.sap.require("soch.otc274Monitor.components.Vrkme");
					soch.otc274Monitor.components.Vrkme.onGetValue(this, oEvent);
					break;
					
				case "Zzssf":
					jQuery.sap.require("soch.otc274Monitor.components.Zzssf");
					soch.otc274Monitor.components.Zzssf.onGetValue(this, oEvent);
					break;
														
				case "Zzaft":
					jQuery.sap.require("soch.otc274Monitor.components.Zzaft");
					soch.otc274Monitor.components.Zzaft.onGetValue(this, oEvent);
					break;

				case "Reason":
					jQuery.sap.require("soch.otc274Monitor.components.Reason");
					soch.otc274Monitor.components.Reason.onGetValue(this, oEvent);
					break;
					
				case "Comment":
					jQuery.sap.require("soch.otc274Monitor.components.Comment");
					soch.otc274Monitor.components.Comment.onGetValue(this, oEvent);
					break;
					
				default:
				}
			}
			// ========= Abstraction layer of functions - Dialog Change :: End

		// ========= Functions for Create/update :: End

	});
});