let env = process.env || {};
module.exports = {
    mongo: {
        username: env.MONGOUSER || '',
        password: env.MONGOPASS || '',
        host: env.MONGOHOST || 'localhost',
        port: env.MONGOPORT || 27017,
        db: env.MONGODATABASE || 'api'
    },
    PORT: env.port || 8080,
    logDir: 'logs/',
    secret: "secret"
};
