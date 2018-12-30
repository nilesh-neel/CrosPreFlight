//----------------------------------------------------------------------
//Class Name   : Service 
//Purpose      : This is Data Service js file use to connect with the server side api/controller call. 
//               Whit this ajax call we can achive promise in javascripts. 
//Created By   : Nilesh More
//Created Date : 18/Sep/2018
//Version      : 1.0
//History      :
//Modified By        | CR <CR NO  : NAME>/BUG ID/Interaction No  | Date(dd/MMM/yyyy) | Comments
//<EMP Name(EMP ID)> | <CR <CR NO : NAME>/BUG ID/Interaction No> |  dd/MMM/yyyy      | <Reason For Modifications>
//----------------------------------------------------------------------


var Service = (function ($) {




    /**
     * Creates a new Service object.
     * @constructor
     * @param {string} url the controller or api url
     * @param {string} contentType the ajax call content Type like(application/json Or application/html) or api url
     * @param {string} dataType the type of data conatin in ajax request.
     * @param {object} data the data to send to serve for the post call
     * @param {Array}  callArray the execute multiple ajax call.
     */
    Service = function (url, contentType, dataType, data, callArray) {
        this.requestURL = url;
        this.requestContentType = _.isNull(contentType) || _.isUndefined(contentType) ? 'application/json; charset=utf-8' : contentType;
        this.requestDataType = _.isNull(dataType) || _.isUndefined(dataType) ? 'json' : dataType;
        this.requestData = _.isNull(data) || _.isUndefined(data) ? null : data;
        this.requestMultipleCall = callArray;

        this.config = {
            url: url,
            contentType: _.isNull(contentType) || _.isUndefined(contentType) ? 'application/json; charset=utf-8' : contentType,
            data: _.isNull(data) || _.isUndefined(data) ? null : JSON.stringify(data),
            type: "",
            dataType: _.isNull(dataType) || _.isUndefined(dataType) ? 'json' : dataType
        };

    };


    Service.prototype.AsyncCall = function (configData) {

        $.ajax(configData).done(function (jqXHR, textStatus, err) {
            deffer.resolve(jqXHR, textStatus, err);
        }).fail(function (jqXHR, textStatus, err) {
            deffer.reject(jqXHR, textStatus, err);
        });
    }


    /**
    // ajax authentication call only.
    * @param {string} authToken
    */

    Service.prototype.authenticate = function (authToken) {
        var deffer = $.Deferred();
        $.ajax({
            url: this.requestURL,
            type: 'POST',
            contentType: this.requestContentType,
            dataType: 'json',
            beforeSend: function (request) {
                request.setRequestHeader('AuthToken', authToken);
            },
            'success': function (data) {
                deffer.resolve(data);
            },
            'error': function (error) {
                deffer.reject(error);
            }
        });

        return deffer.promise();
    };

    /**
    // ajax get call only.
    */

    Service.prototype.getJSONP = function (id) {
        var deffer = $.Deferred();
        $.ajax({
            url: this.requestURL,
            contentType: this.requestContentType,
            data: this.requestData,
            dataType: 'jsonp',
            type: 'GET'
        }).done(function (jqXHR, textStatus, err) {
            deffer.resolve(jqXHR, textStatus, err);
        }).fail(function (jqXHR, textStatus, err) {
            deffer.reject(jqXHR, textStatus, err);
        });


        return deffer.promise();
    };

    /**
    // ajax get call only.
    * @returns {object} return the promise state(Resolve/reject).
    */
    Service.prototype.get = function () {
        var deffer = $.Deferred();
        $.ajax({
            url: this.requestURL,
            contentType: this.requestContentType,
            data: this.requestData,
            type: 'GET'
        }).done(function (jqXHR, textStatus, err) {
            deffer.resolve(jqXHR, textStatus, err);
        }).fail(function (jqXHR, textStatus, err) {
            deffer.reject(jqXHR, textStatus, err);
        });


        return deffer.promise();
    };


    Service.prototype.getApi = function () {
        var deffer = $.Deferred();
        var ajaxOption = this.config;
        Service.prototype.webApiAccessToken().then(
            function (resp) {
                ajaxOption.url = resp.Url + ajaxOption.url;
                ajaxOption.beforeSend = function (request) {
                    request.setRequestHeader('Authorization', 'Bearer ' + resp.token);
                };
                ajaxOption.type = 'GET';
                ajaxOption.dataType='json'
                $.ajax(ajaxOption).done(function (jqXHR, textStatus, err) {
                    deffer.resolve(jqXHR, textStatus, err);
                }).fail(function (jqXHR, textStatus, err) {
                    deffer.reject(jqXHR, textStatus, err);
                });
            });
        return deffer.promise();
    };

    /**
    // ajax save call to save data, make sure send data in the body of the request.
    * @returns {object} return the promise state(Resolve/reject).
    */
    Service.prototype.save = function () {
        var deffer = $.Deferred();
        $.ajax({
            url: this.requestURL,
            contentType: this.requestContentType,
            data: JSON.stringify(this.requestData),
            type: 'POST',
            dataType: this.dataType
        }).done(function (jqXHR, textStatus, err) {
            deffer.resolve(jqXHR, textStatus, err);
        }).fail(function (jqXHR, textStatus, err) {
            deffer.reject(jqXHR, textStatus, err);
        });
        return deffer.promise();
    };


    Service.prototype.postApi = function () {
        var deffer = $.Deferred();
        var ajaxOption = this.config;
        Service.prototype.webApiAccessToken().then(
            function (resp) {
                ajaxOption.url = resp.Url + ajaxOption.url;
                ajaxOption.beforeSend = function (request) {
                    request.setRequestHeader('Authorization', 'Bearer ' + resp.token);
                };
                ajaxOption.type = 'POST';
                ajaxOption.dataType = 'json'
                $.ajax(ajaxOption).done(function (jqXHR, textStatus, err) {
                    deffer.resolve(jqXHR, textStatus, err);
                }).fail(function (jqXHR, textStatus, err) {
                    deffer.reject(jqXHR, textStatus, err);
                });
            });
        return deffer.promise();
    };


    /**
    // ajax put call to update data,  make sure URL contain the id to update the record.
    * @returns {object} return the promise state(Resolve/reject).
    */
    Service.prototype.update = function () {
        var deffer = $.Deferred();

        $.ajax({
            url: this.requestURL,
            contentType: this.requestContentType,
            data: this.requestData,
            type: 'PUT'
        }).done(function (jqXHR, textStatus, err) {
            deffer.resolve(jqXHR, textStatus, err);
        }).fail(function (jqXHR, textStatus, err) {
            deffer.reject(jqXHR, textStatus, err);
        });

        return deffer.promise();
    };

    Service.prototype.putApi = function () {
        var deffer = $.Deferred();
        var ajaxOption = this.config;
        Service.prototype.webApiAccessToken().then(
            function (resp) {
                ajaxOption.url = resp.Url + ajaxOption.url;
                ajaxOption.beforeSend = function (request) {
                    request.setRequestHeader('Authorization', 'Bearer ' + resp.token);
                };
                ajaxOption.type = 'PUT';
                ajaxOption.dataType = 'json'
                $.ajax(ajaxOption).done(function (jqXHR, textStatus, err) {
                    deffer.resolve(jqXHR, textStatus, err);
                }).fail(function (jqXHR, textStatus, err) {
                    deffer.reject(jqXHR, textStatus, err);
                });
            });
        return deffer.promise();
    };

    /**
    // ajax delete call to delete data, make sure URL contain the id to delete the record.
    * @returns {object} return the promise state(Resolve/reject).
    */
    Service.prototype.delete = function () {
        var deffer = $.Deferred();

        $.ajax({
            url: this.requestURL,
            contentType: this.requestContentType,
            data: this.requestData,
            type: 'DELETE',
        }).done(function (jqXHR, textStatus, err) {
            deffer.resolve(jqXHR, textStatus, err);
        }).fail(function (jqXHR, textStatus, err) {
            deffer.reject(jqXHR, textStatus, err);
        });

        return deffer.promise();
    };


    Service.prototype.deleteApi = function () {
        var deffer = $.Deferred();
        var ajaxOption = this.config;
        Service.prototype.webApiAccessToken().then(
            function (resp) {
                ajaxOption.url = resp.Url + ajaxOption.url;
                ajaxOption.beforeSend = function (request) {
                    request.setRequestHeader('Authorization', 'Bearer ' + resp.token);
                };
                ajaxOption.type = 'DELETE';
                ajaxOption.dataType = 'json'
                $.ajax(ajaxOption).done(function (jqXHR, textStatus, err) {
                    deffer.resolve(jqXHR, textStatus, err);
                }).fail(function (jqXHR, textStatus, err) {
                    deffer.reject(jqXHR, textStatus, err);
                });
            });
        return deffer.promise();
    };


    Service.prototype.webApiAccessToken = function () {
        var deffer = $.Deferred();
        $.ajax({
            url: window.location.origin + '/Auth/Token',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
        }).done(function (jqXHR, textStatus, err) {
            deffer.resolve(jqXHR, textStatus, err);
        }).fail(function (jqXHR, textStatus, err) {
            deffer.reject(jqXHR, textStatus, err);
        });

        return deffer.promise();
    };


    // yet to implements this method..
    Service.prototype.getMultipleCall = function () {
        var promises = this.requestMultipleCall;
        return $.when.apply($, promises);
    };

    return Service;
})(jQuery);