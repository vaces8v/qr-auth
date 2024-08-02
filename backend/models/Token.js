import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_LOCAL}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Подключение к базе данных успешно!');
    } catch (error) {
        console.error('Невозможно подключиться к базе данных:', error);
    }
}

connectToDatabase();

const TokenModel = sequelize.define('Token', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    isUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        // истечение через 10 минут
        allowNull: false,
    },
});

sequelize.sync();

export default  TokenModel;
