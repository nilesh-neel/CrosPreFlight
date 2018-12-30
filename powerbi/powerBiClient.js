var PowerBiClient = (function (powerbi) {

    'use strict';
    PowerBiClient = function (url, isReport) {
        this.embedUrl = (_.isNull(url) || _.isUndefined(url))
            ? 'https://app.powerbi.com/reportEmbed?reportId=712a0da8-9c45-4792-92f3-57d37b80520c'
            : url;
        this.id = _.split(_.split(this.embedUrl, '=')[1], '&')[0];
        this.type = (isReport === 'true') ? 'report' : 'dashboard',
            this.accessToken;
    };



    PowerBiClient.prototype.embedPowerBIApi = function (objRpt) {
        debugger;
        var accessToken = objRpt.embedToken.Token;

        // Read embed URL from Model
        var embedUrl = objRpt.embedUrl";

        // Read dashboard Id from Model
        var embedDashboardId = objRpt.id;

        // Get models. models contains enums that can be used.
        var models = window['powerbi-client'].models;

        if (this.embedUrl === '')
            return;

        //var config = {
        //	type: this.type,
        //	id: this.id,
        //	tokenType: models.TokenType.Aad,
        //	accessToken: sessionStorage.getItem('pbiToken'),
        //	embedUrl: this.embedUrl,
        //	settings: {
        //		filterPaneEnabled: false,
        //		navContentPaneEnabled: false
        //	}
        //};


        var config = {
            type: 'report',
            tokenType: models.TokenType.Aad,
            accessToken: accessToken,
            embedUrl: embedUrl,
            id: embedDashboardId,
            //settings: {
            //    filterPaneEnabled: false,
            //    navContentPaneEnabled: false
            //}
        };

        // Grab the reference to the div HTML element that will host the dashboard.
        var powerBiContainer = document.getElementById('embedContainer');
        powerbi.reset(powerBiContainer);
        var powerBiApi = powerbi.embed(powerBiContainer, config);
    };




    return PowerBiClient;
})();