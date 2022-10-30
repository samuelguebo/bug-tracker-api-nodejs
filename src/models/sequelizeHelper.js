
import { Sequelize } from 'sequelize';
import config from '../utils/config.js';

// Setting up DB connection
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect
});

(async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
})();


export default sequelize;