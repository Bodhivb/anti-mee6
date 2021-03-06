const express = require('express')
const helmet = require("helmet");
const cors = require('cors');
const Stats = require('./stats');
const app = express()

const port = 4466

app.set('view engine', 'ejs');
app.set('trust proxy', 1)
app.use(helmet());
app.use(cors());
app.use('/resources', express.static('resources'));

module.exports = (bot) => {
    const commands = bot.commands.map(command => { if (command.config.enabled) return command.config; });

    app.get('/', async (req, res) => {
        const admin = ('admin' in req.query) ? true : false;
        let cmds = commands.filter(command => !command.admin || admin);
        res.render('index', { commands: cmds, admin });
    })
    app.get('/stats', async (req, res) => {
        const stats = await Stats(bot);
        res.render('stats', { stats });
    })


    app.listen(port, () => {
        console.log(`website was loaded (http://localhost:${port})`)
    })
}