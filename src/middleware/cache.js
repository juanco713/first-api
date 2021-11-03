const redis = require('redis');
const client = redis.createClient();

client.on('error', function(error) {
  console.error(error);
});

function makeKey(req) {
    return `${req.method}_${req.originalUrl}`
}

function putInCache(req, object) {
    const key = makeKey(req)
    client.set(key, JSON.stringify(object));
}


function cache(req,res,next) {
    const key = makeKey(req);
    client.get(key, (error, data) => {
        if(error || !data) {
            next();
        } else {
            res.send(data)
        }
    });
    console.log(key);
};

function resetCache(req) {
    client.DEL(makeKey(req))
};

module.exports = { 
    cache,
    putInCache,
    resetCache
}