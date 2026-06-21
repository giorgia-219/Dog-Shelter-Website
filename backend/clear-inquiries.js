// CAREFUL!!! just for dev purposes elimina brutalmente tutte le inquiries dal db
const sequelize = require('./sequelize');

async function clearInquiries() {
    try {
        await sequelize.authenticate();
        console.log('pippo');

        const countBefore = await sequelize.models.inquiries.count();

        if (countBefore === 0) {
            console.log('Database vuoto :)');
            return;
        }

        console.log(`Trovate ${countBefore} inquiries da eliminare`);

        await sequelize.models.inquiries.destroy({
            where: {},
            truncate: false
        });

        console.log('Database pulito come nuovo!');
    } catch (error) {
        console.error('errore', error);
    } finally {
        await sequelize.close();
    }
}

clearInquiries();