jQuery.sap.declare("soch.otc274Monitor.components.Action");

soch.otc274Monitor.components.Action = {
	// ========= Functions for Apply Changes :: Begin	

	onRunAction: function (that, oEvent, decision, entity) {
			var fields = {
				vbeln: "",
				posnr: "",
				version: "",
				status: "",
				decision: ""
			};
			that._promiseCont = 0;
			that._processOK = null;
			that._processERR = null;
			that._ActionReturn = [];
			that._Messages = [];
			
			for (var i = 0; i < that._versionKeys.length; i++) {
				fields = {
					Vbeln: that._versionKeys[i].vbeln,
					Posnr: that._versionKeys[i].posnr,
					Version: that._versionKeys[i].version,
					Status: that._versionKeys[i].status,
					Decision: decision
				};

				var process = new Promise(function (success, error) {

					that._oModel.create(entity, fields, null, function (data, result) {
						// sap.m.MessageBox.success("Action executed!");
						var ok = {
							status: "success",
							values: data
						};
						success(ok);

					}, function (err) {
						that._mainBusy.setBusy(false);
						// that._mainBusy.close();
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
								var type;
								switch (that._ActionReturn[a].MsgType) {
								case "S":
									type = "Success";
									break;
								case "W":
									type = "Warning";
									break;
								case "E":
									type = "Error";
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
							
							that._smartTableDisplay.getTable().getModel().refresh(true);
							that._smartTableDisplay.getTable().autoResizeColumn(0);
							that._mainBusy.setBusy(true);
							jQuery.sap.delayedCall(1000, this, function () {
								that._mainBusy.setBusy(false);
							});	
							that._oPopover.openBy(that._oSource);
						}
					}
				});

			}
			
		}
		// ========= Functions for Apply Changes :: End	
};