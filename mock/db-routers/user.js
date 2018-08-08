/* eslint import/no-extraneous-dependencies: 0 */
const express = require('express');

const router = express.Router();

/**
 * @param db: instance of lowdb.
 * db 的使用方式： https://github.com/typicode/lowdb
 * */
module.exports = function (db) {
    router.get('/', (req, res) => {
        res.json(db.get('users').value());
    });
    router.get('/test', (req, res) => {
        res.json({ a: 1234 });
    });
    router.post('/add', (req, res) => {
        const { username } = req.body;
        if (!username) {
            res.status(400).end();
            return;
        }
        db.get('users').push({ id: new Date().getTime(), name: username }).write();
        res.json({ success: true });
    });
    return router;
};
