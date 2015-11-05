/*
 * deleteChannel
 * ɾ��Ƶ��
 */
function onRequest(request, response, modules) {
    var channelObjectId = request.body.channelObjectId;
    var db = modules.oData;
    var rel = modules.oRelation;
    
    rel.query({
        "table":"ChannelSubscriber",
        "where":{"channel":channelObjectId}
    },function(err,data) {
        var ChannelSubscribers = JSON.parse(data).results;
        for(var i=0; i<ChannelSubscribers.length; i++) {
            var ChannelSubscriber = ChannelSubscribers[i];
            db.remove({
                "table":"ChannelSubscriber",             //����
                "objectId":ChannelSubscriber.objectId        //��¼��objectId
            },function(err,data){         //�ص�����
            });
        }
    });
    
    rel.query({
        "table":"ChannelSigner",
        "where":{"channel":channelObjectId}
    },function(err,data) {
        var ChannelSigners = JSON.parse(data).results;
        for(var i=0; i<ChannelSigners.length; i++) {
            var ChannelSigner = ChannelSigners[i];
            db.remove({
                "table":"ChannelSigner",             //����
                "objectId":ChannelSigner.objectId        //��¼��objectId
            },function(err,data){         //�ص�����
            });
        }
    });
    
    db.remove({
        "table":"Channel",             //����
        "objectId":channelObjectId        //��¼��objectId
    },function(err,data){         //�ص�����
    });
	
	response.send("ok");
}                         