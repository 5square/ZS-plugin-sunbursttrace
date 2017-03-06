zsApp.factory('codetracingService', function(WebAPI) {

    var codetracingApi = {};

    codetracingApi.getAllTraces = function(update) {
        WebAPI({
			url: '/ZendServer/Api/codetracingList',
		}).then(function(res) {
			console.log('codeTracingList', res.data.responseData.codeTracingList);
			update (res.data.responseData.codeTracingList) ;
		});
        return;
    };
    
    codetracingApi.loadNodeChildren = function (traceId, nodeId, level, childrenTree, callback) {
        WebAPI({
            url: '/ZendServer/Api/codetracingGetNodeChildren',
            params: {
                "traceId": traceId,
                "nodeId": nodeId
            }
        }).then(function(res) {
            callback(res.data.responseData.children, childrenTree, traceId, nodeId, level);
        });
    };

    return codetracingApi;
});