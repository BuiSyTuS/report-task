const q = require("q")
const { Pool, Client } = require('pg')
const { config } = require('../helper/config');
const pool = new Pool(config)
const client = new Client(config)
client.connect()

const uuid = require('uuid/v1');

const getReports = (userName) => {
    let defer = q.defer()
    let sql = `SELECT * FROM report.report WHERE share LIKE '%${userName}%'`
    client.query(sql, (err, res) => {
        if (err) {
            defer.reject(err)
        } else {
            defer.resolve(res)
        }
    })
    return defer.promise
}

module.exports = {
    getReports
}