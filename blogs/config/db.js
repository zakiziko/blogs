module.exports = {
    database:'mongodb://localhost:27017/authentification',
    secret : 'secret',
    options : {
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
    }
}