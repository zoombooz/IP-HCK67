const bcryptjs = require('bcryptjs');

module.exports = {
    hash: (password) => bcryptjs.hashSync(password),
    compare: (password, dbPassword) => bcryptjs.compareSync(password, dbPassword)
}