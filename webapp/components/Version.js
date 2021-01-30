jQuery.sap.declare("soch.otc274Monitor.components.Version");

soch.otc274Monitor.components.Version = {
	// ========= Functions for Versioning :: Begin	

	onSetVersion: function (that, oEvent) {
		var fields = {
			Vbeln: "",
			Posnr: "",
			Version: "",
			Status: "",
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
		that._promiseCont = 0;
		that._processOK = null;
		that._processERR = null;
		that._ActionReturn = [];
		that._Messages = [];
		that._oSourcePopup = oEvent.getSource();
		
		for (var i = 0; i < that._versionKeys.length; i++) {
			fields = {
				Vbeln: that._versionKeys[i].vbeln,
				Posnr: that._versionKeys[i].posnr,
				Version: ((that._versionKeys[i].version !== "") ? that._versionKeys[i].version : "0"),
				Status: ((that._versionKeys[i].status !== "") ? that._versionKeys[i].status : "0"),
				Bstkd: that._availableFields[0].Bstkd,
				Posex: that._availableFields[0].Posex,
				Bstdk: that._availableFields[0].Bstdk,
				Kunnr: that._availableFields[0].Kunnr,
				Edatu: that._availableFields[0].Edatu,
				Lifsp: that._availableFields[0].Lifsp,
				Kunwe: that._availableFields[0].Kunwe,
				Zzbnd: that._availableFields[0].Zzbnd,
				Abgru: that._availableFields[0].Abgru,
				Zzjob: that._availableFields[0].Zzjob,
				ZzfreightTerms: that._availableFields[0].ZzfreightTerms,
				Vsart: that._availableFields[0].Vsart,
				ZzshipCode: that._availableFields[0].ZzshipCode,
				Zzsdc: that._availableFields[0].Zzsdc,
				Zzshp: that._availableFields[0].Zzshp,
				Zzroute: that._availableFields[0].Zzroute,
				Zzssf: that._availableFields[0].Zzssf,
				Zzpwt: that._availableFields[0].Zzpwt,
				Zzaft: that._availableFields[0].Zzaft,
				Zzppi: that._availableFields[0].Zzppi,
				Matnr: that._availableFields[0].Matnr,
				Bmeng: that._availableFields[0].Bmeng,
				Vrkme: that._availableFields[0].Vrkme,
				Kdmat: that._availableFields[0].Kdmat,
				Zzapp: that._availableFields[0].Zzapp,
				PlThickness: that._availableFields[0].PlThickness,
				PlWidth: that._availableFields[0].PlWidth,
				PlLength: that._availableFields[0].PlLength,
				Reason: that._availableFields[0].Reason,
				Comment: that._availableFields[0].Comment
			};

			jQuery.sap.require("sap.m.MessageBox");

			var process = new Promise(function (success, error) {

				that._oModel.create("/versionFieldsSet", fields, null, function (data, result) {
					// sap.m.MessageBox.success("Versioning request created!");
					var ok = {
						status: "success",
						values: data
					};
					success(ok);

				}, function (err) {
					that._mainBusy.setBusy(true);
				    jQuery.sap.delayedCall(1500, this, function () {
						that._mainBusy.setBusy(false);
				    });
					sap.m.MessageBox.alert("Conection with Service failed. Please contact Dev. Support Team!");
					error = (err);
				});
			});
			process.then(function (result) {
				that._promiseCont++;
				if (result.status == "success") {
					that._statusOK = "ok";

					var action = {
						Vbeln: result.values.Vbeln,
						Posnr: result.values.Posnr,
						Version: result.values.Version,
						Status: result.values.Status,
						MsgType: result.values.MsgType,
						Message: result.values.Msg
					};
					that._ActionReturn.push(action);
				}

				if (that._promiseCont == that._smartTableDisplay.getTable().getSelectedIndices().length) {
					var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
					if (that._statusOK == "ok") {

						var oMessageTemplate = new sap.m.MessageItem({
							type: "{type}",
							title: "{title}",
							description: "{description}",
							subtitle: "{subtitle}",
							counter: "{counter}",
							markupDescription: "{markupDescription}",
							link: ""
						});

						for (var a = 0; a < that._ActionReturn.length; a++) {
							var type, dialog;
							switch (that._ActionReturn[a].MsgType) {
							case "S":
								type = "Success";
								break;
							case "W":
								type = "Warning";
								break;
							case "E":
								dialog = type = "Error";
								break;
							default:
							}
							var message = {
								type: type,
								title: "Sales Order: " + that._ActionReturn[a].Vbeln,
								description: "Item: " + that._ActionReturn[a].Posnr + "\n\n" + "Version: " + that._ActionReturn[a].Version + "\n\n" + "Status: " + that._ActionReturn[a].Status + "\n\n" + "Message: " + that._ActionReturn[a].Message,
								subtitle: "Item: " + that._ActionReturn[a].Posnr,
								counter: 1
							};
							that._Messages.push(message);
						}

						var oMessages = new sap.ui.model.json.JSONModel();
						oMessages.setData(that._Messages);

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

						that._oPopover = new sap.m.ResponsivePopover({
							placement: "Left",
							customHeader: oPopoverBar,
							contentWidth: "400px",
							contentHeight: "400px",
							verticalScrolling: false,
							modal: true,
							content: [oMessageView],
							endButton: oCloseButton
						});
						
						that._mainBusy.setBusy(true);
						jQuery.sap.delayedCall(1000, this, function () {
							that._mainBusy.setBusy(false);
						});		
						if (dialog === "Error") {
							that._oPopover.openBy(that._oSourcePopup);
						} else {
							that.oMultiEditDialog.close();
							that._smartTableDisplay.getTable().getModel().refresh(true);
							that._smartTableDisplay.getTable().autoResizeColumn(0);
							that._oPopover.openBy(that._oSource);
						}
						
					}
				}
			});
		}
	}

	// ========= Functions for Versioning :: End	
};