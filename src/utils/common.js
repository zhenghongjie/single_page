var Common = {
    apiDomain: 'http://test.miaocang.cc/',
    apiRequest: function(method, url, params, postData, onSuccess, onFail) {
        var self = this;
        var url = Common.apiDomain + url;
        self.ajaxRequest(method, url, params, postData, null, function(data) {
            if (data.code == 200) {
                onSuccess(data)

            }else{
                onFail(data)
            }
            
        }, function(data) {

        }, true);
    },

    ajaxRequest: function(method, url, params, postData, beforeSend, onSuccess, onFail) {
        var self = this;
        if (params) {
            var _type = url.indexOf('?') > -1 ? '&' : '?';
            url += _type + $.param(params)
        }
        $.ajax({
            type: method,
            url: url,
            contentType: 'application/json; charset=UTF-8',
            data: postData == null ? null : JSON.stringify(postData),
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            beforeSend: beforeSend,
            success: function(data) {
                onSuccess(data)
            },
            error: function(data) {
                if (data.status == 500) {
                    alert('服务器内部错误!')
                    history.go(-1);
                }else{
                    onFail(data)
                }

            }
        });
    }
};

exports.Common = Common;
