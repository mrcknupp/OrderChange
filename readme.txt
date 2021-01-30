Aplicação UI5 - ZOTC274MONITOR

Tela Principal:  Worklist.view.xml
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
-  Filtragem de diferentes campos; -> É montado apartir do annotation model ZOTC_SOCH_MONITOR_ANNO_MDL.xml

- Inclusão/remoção de campos no layout(Sales Orders); -> É montado apartir do annotation model ZOTC_SOCH_MONITOR_ANNO_MDL.xml

- Botão de Instruções(GMITSU) navega para tela de Instruções, com 1 .. N Sales Orders selecionadas; -> Chama Tela Instruction.view.xml

- Botão de Create/Update - Cria ou atualiza campos do versionamento; -> Chama o fragmento de Tela EditDialog.fragment.xml

- Botão Cancel Version - Apaga Versionamento e não tem qualquer iteração com a SO; -> O processamento ocorre no FM ZUS_OTC274_SO_VERSION_CANCEL

- Botão Sales Approval  - Aprova versionamento gerando a modificação na SO, Production Order e por seguinte gerando IDOC para IMS; -> O processamento ocorre no FM ZUS_OTC274_SO_SET_ACTION com Decision "Y"

- Botão Sales Rejection - Tem a mesma funcionalidade do Botão Cancel Version, no entanto não apaga o registro da tabela de LOG e deixa o Status do Versionamento em REJECTED;  -> O processamento ocorre no FM ZUS_OTC274_SO_SET_ACTION com Decision "N"

- Release IDOC - É utilizado para reprocessar o envio do IDOC para o IMS E/OU retomar o envio caso haja algum problema de comunicação durante a transmissão para IMS; -> O processamento ocorre no FM ZUS_OTC274_SO_SET_REVIEW
    
Popup com campos para Versionamento e já possui um grande estágio de combinação de preenchimento de campos para versionamento. 
O processamento dessa tela ocorre no FM ZUS_OTC274_SO_SET_VERSION

 


Tela Instructions:  Instruction.view.xml
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 

- Tela de instruções todas as tabelas de GMITSU;
- Botão de "+" adiciona 1..N linhas nas tabelas; -> O processamento ocorre no Controller Instructions.controller.js;

- Botão de "-" remove 1..N linhas nas tabelas; -> O processamento ocorre no Controller Instructions.controller.js;

- Botão de Create/Update - Cria ou atualiza os campos de versionamento do GMITSU; -> O processamento ocorre FM ZUS_OTC274_SO_SET_GMITSU;

- Botão de Delete - Similar ao Cancel Version da tela principal, deleta todos os campos em exibição em tela das tabelas de versionamento; -> O processamento ocorre FM ZUS_OTC274_SO_GMITSU_CANCEL;

-  Ao navegar de volta a tela principal, os registros listados serão atualizados para exibir o status corrente do processo.; -> O processamento ocorre no Controller Instructions.controller.js;


Tela Version History:  Object.view.xml
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 

- Exibe todo o histórico de versionamento da Sales Order + Item; -> O processamento ocorre no Controller Object.controller.js;

 
- Opções de filtragem e ordenação; -> O processamento ocorre no Controller Object.controller.js;


 
- Gera excel, Desfaz a filtragem, Desfaz ordenação. Respectivamente.  -> O processamento ocorre no Controller Object.controller.js;

