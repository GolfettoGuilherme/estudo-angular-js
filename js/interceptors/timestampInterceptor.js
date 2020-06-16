angular.module("listaTelefonica").factory("timestampInterceptor", function() {
    return {
        request: function(config) {
            var url = config.url;
            if(url.indexOf('view') > -1 ) return config;
            var time = new Date().getTime()
            config.url = url + "?timestamp="+ time;
            console.log(config.url);
            return config;
        }
    };
});