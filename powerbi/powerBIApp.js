//----------------------------------------------------------------------
//Class Name   : PowerBIAPP
//Purpose      : PowerBIAPP js use to embedded the power bi report in web app.
//Created By   : Nilesh More
//Created Date : 18/Sep/2018
//Version      : 1.0
//History      :
//Modified By        | CR <CR NO  : NAME>/BUG ID/Interaction No  | Date(dd/MMM/yyyy) | Comments
//<EMP Name(EMP ID)> | <CR <CR NO : NAME>/BUG ID/Interaction No> |  dd/MMM/yyyy      | <Reason For Modifications>
//----------------------------------------------------------------------
var PowerBIAPP = (function(powerbi) {

    'use strict';
    var service;
    PowerBIAPP = function(url, isReport) {
        this.embedUrl = _.isNull(url) || _.isUndefined(url) ? 'https://app.powerbi.com/reportEmbed?reportId=712a0da8-9c45-4792-92f3-57d37b80520c' : url;
        this.id = _.split(_.split(this.embedUrl, '=')[1], '&')[0];
        this.type = isReport === 'true' ? 'report' : 'dashboard',
            this.accessToken = "";
    };

    PowerBIAPP.prototype.embedPowerBIApi = function(filterData) {
        var models = window['powerbi-client'].models;

        $('#divUserBagLst').hide();
        $('#dvPowerBiEmbed').show();

        var menuId = _.isNil(sessionStorage.getItem('URLId')) ? 0 : sessionStorage.getItem('URLId');
        // service = new Service('api/PbiToken?menuId=' + menuId);
        // service.getApi().done(function(resp) {

        // if (_.isEmpty(resp.Id)) {
        //     document.getElementById('embedContainer').innerHTML = '<h4>Comming Soon...</h4>';
        //     return;
        // }


        var config = {
            type: 'report',
            id: 'f6bfd646-b718-44dc-a378-b73e6b528204',
            tokenType: models.TokenType.Embed,
            accessToken: 'H4sIAAAAAAAEAB1Wxa7E2rH9lzt1JGMbImVgamObYdszMzM7ev_-jjKvQdWqRf_9x0qefkryf_79DyimAlo9nm7EK73hX-wkx4DD6JBT4bt2XL5NVD_zq-Y47BidrLu3NwYfsIDCc3cSX4O-ds90cxgCxSr0PxjSd6v1rQY2NUXfpA6cL6LGy0npuBOZ51BqvXNZyjt92uAL854rTXuHOKgGM9qoEOuPRGwuXiPZ-USwfQU7erdXX-_cEMV75_Gal4JjQtsxyspIuw8U3596Dt77rENYeCZnPqtZAxhP2MduuxtkNhTW4t_XaoUZDsghSkJUEqrZL_lAqmy4ILHAaSmdx4POfc6N3HVTzFgfahcq1cmKi5GSdWdrtLkqgQuqSAXscpcch0E9GRqpPYFeSg-PyOHlfz7sUt-I8rKWXcPe7X8wUsuPuLl3mC2zNCgmAG8rFen4HKpGzkXY2PZIanLXnelHjRn765Q0Imkwey5hY8afcAOCxe33z6DgdbRAtyJuBmlXhLpYau3Whl_XvJ7b_SiJjpefTn2uATIpsJSvKt0JUiesx4fe-8RHRnIMe0txp9o0RROP7a4E9GE0VO3SxRmi9Y2iH6JJtb0w7uk--MZ3addUqGJ_0VRhYyCWFFuyFgIU35uyB9dGCc6qhyEz3uIUAVWaFIFtVQ5zot5n_0y3B26w--7x0kpxtGLcjQpCN2F-3PaDf3IuTpoeSTROT8eAtLEL2HQRK4nHpvEHaIn2tKEckqR1HEDJHo2G41eNSrKVf19UsPJV6DJUeKToZN7-Ia_YBJlOMF5PFBAbwt-YyPImWbGGj1lkHoKl3_AqvztOcxnGPBXgmYkBy4F4qFi-5ZD_5b9-eFph3pTB4yO6KV1-OT6qPF6mtDPlMypWlO2HB1BW4ckrgO5xY7dNKOEIeGGIDWHX5BsCuFHevCfJhggm2F0-hyGo2SMJeLqH6GrzvmO1gHeF8VePdEOQhoWG7gjb8A88DC85b5n4OXHGSV_t0r57-CEuRCkuLRGGudcGH5oXiMjiWGfx-jtJ9mle8T7o8UonGpC0QULu91RxWax_ez2DqVch8avwp3DiSFjRRwZdntDlCGcCZyNEHdDtimJq_bIZTuBiqVNo32SrUs34QaxQ5_ClIHc3VYgN2M-actCv8TRM1w6JAlL9gotZLAqVMVi3gPJkXMtNJNFfw7vs-DKkTq7PN_tA7VFcAml46cWHpf-amPQjCC0MOK7Z4h-WIs8B7go6XoiB1LmltfZOx913dJCxgyPBRS2HK1qHbk7FHOL9emYC8ktPlHsZzQcqWhV8naJPwbNeNitWW-TQjCazeFZTd9wT1kTtxbcOl4KhKD8R1uA4NS3OWEUCTcs2F5wnBqXaOd0IkVxzR_IIG9HZ3-PGzzkSHoe-rD1_WGFF2ytKxctPO1LA278LvFmbmsJAcvzcG1wkT4dJpHzSjJY8QgZG0pInKKLUzzrT8_cGZJBx_IelwjhClFGUjsSDwErbJHiskpgeNaozzqMoJceUlU7NV-OdfoJ1GIR3YF8UI5gkXrFrTX58sY3tobAyVY67IaK3P_1vwCN-fWzXdvBqDEkFO0-3fSU_v4Qbuce47g2ymira4ZxQiXYtZaojeWArgxHGjf7QDHn1TWNjn0CU8IhYfG6doMre9sFKVXzehMVfYQjzOZxfs4AWZgZPawRKgSA19ZGytYn1RhMOhd8Oarba1vMSU4-_7_AgYU2PKyjR9HC5-OObrSSLL3YrHg-FRNHzMkFkr64ff-8v06HpeMSNGizDqpMghML_Su5TLF1hMy08YkSEOkFsm-mlanzXiW9sj6BgMpo19A-HTQOSJLZAtlAlNil0bZINbdhVl0aSVXgNlFKcTP_DkvQ-2P5iYpHzAmqV5z99E7Orw6XdY7-ap0FED8YdtV9cP7eYowsll3vEZ95rogRPYf2OjPPpUuvxeH-G4Q-XCIhyt1IKH5KHcjehZ0eYQBZ61ngmoRS_SdLS6BySlinnuZ1Swc06SW5F67yBbnd7NiVvizvLvFJRqOwPrz1UEcUj2fttqqPfCHRAEqvoNCdMvXb-4r96admk28mhYfv2Ija6G6npmc3md1xiCMqSrb9CSxsAWSfbd5sCgvXWQEB7a0U61W9HcCmT4jnsiweo6yVYc8L1AlWU0HzrntuvCihOB7ToMtXgs_tNXvcjk9VZTIUg0trMmzSL2BGULWRYVYgmsWn0y8fYn8aC641gCvFVgTEYEdGgP7d9YwUSnwSZ1kkD-vyNwXcclS69Sx8_5VyKKuXlvgfxn3_-9Q-_PvM-acXzV11k69PGMQUb4yLcExg1Eo4sLx2LiKJSLV034bNKNdpnk7ToI-M2kji44lI0LC8GsPVn2HbMNwDRkGvJ5NjO6rVVDcqmq31sKzO9a0k7kO616N3rQlxuReovKritm_aH6gwGWjIOT4sBNjY6-cU9OFISLdJPhxpp6y0GwuO2tEV_SzZvLUcTNpTEJdPDLO2HX3KjAU9iiFueNz2SLBjaxhqd9a6PAYPij67Jya0ZwFrbHT6L8WuZUbf_Soyb-aIst41ZZNbu1RMoLdzls5V5cnsYG_rGnZxZxxH_CT-uYXbpGPyBre4aaDmB2KLI9MaXqgdTZts_rg4JpvX9Dt8s8uDMp7X_8z-Yn7kuViX4Q7mJ56OK1p8U8L1ajdbOFIl2_W_Kbaox2Y-1-BtTo79OaPSl3wYMB_V1kTd9oxA95KRG4L3VmYulDbSjr5_ix_4C-CPI9WEcYEFeJG9dZjKOO-a7uV8Xd0s9a92wTx6F8cbqKFOelFB6YPFITEXWpqnwZ0W_sBuh091cbcJn-frTRm8RSNGOhxd_wlzizKLpFNu2n0kdBLYbLPf6Fkz60IEKY_h2YHgVv2m6V40cXJnI-DpWyoEfm_ukWPlSiA_7lxJtDDW6UY-1wGajNqGK6HN2o8IMVP5WbR8-CKqOzU-A42JR_pw0VongE9PdOpgmWihgzgw8bzH-ErQqokqnRIB_mR-MWWbqWJxn2TJbpd_Mqd63Ulm1w-nlQyXZXbHVH8z_9_-iNpU7rgsAAA==',
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQifQ%3d%3d',
            //permissions: models.Permissions.All /*gives maximum permissions*/,
            //viewMode: models.ViewMode.Edit,
            //pageView: "FitToWidth",
            ////height: "250px",
            ////width: "250px",
            displayOption: models.DisplayOption.FitToWidth,
            settings: {
                filterPaneEnabled: false,
                navContentPaneEnabled: false,
            }
        };

        sessionStorage.setItem('pbiToken', config.accessToken);

        // Grab the reference to the div HTML element that will host the dashboard.
        var powerBiContainer = document.getElementById('embedContainer');
        powerbi.reset(powerBiContainer);
        var powerBiApi = powerbi.embed(powerBiContainer, config);


        //to apply filter on report load/menu click/ breadcrumbs click\
        if (!_.isNil(filterData))
            PowerBIAPP.prototype.applyFilterToReport.call(this, filterData, true);

        // Start - To get the selected BagTags

        //Report.off removes a given event listener if it exists.
        powerBiApi.off("dataSelected");
        // Report.on will add an event listener. For capturing the selected data records as JSON

        var bagtags;
        var SelectedbagtagsCnt;
        powerBiApi.on("dataSelected",
            function(event) {
                var data = JSON.stringify(event.detail, null, "  ");
                var obj = JSON.parse(data);
                var bagtagcount = obj.dataPoints.length;
                bagtags = '';
                sessionStorage.setItem('SelectedbagtagsCnt', obj.dataPoints.length);
                SelectedbagtagsCnt = obj.dataPoints.length;
                for (var i = 0; i < obj.dataPoints.length; i++) {
                    bagtags += obj.dataPoints[i].identity[0].equals + ",";
                }
                bagtags = bagtags.substr(0, bagtags.length - 1);
                sessionStorage.setItem('SelectedbagtagsList', bagtags);
            });
        //End -To get the selected BagTags

        powerBiApi.on('error',
            function(event) {
                Utility.alertMessage("Error in power bi report.", "errorMsg");
            });

        powerBiApi.off("saved");
        powerBiApi.on("saved",
            function(event) {
                ///console.log(event.detail);
                if (event.detail.saveAs) {
                    alert("Save");
                }
            });
        //});
    };

    return PowerBIAPP;
}(window.powerbi));