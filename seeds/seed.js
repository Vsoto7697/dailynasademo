const sequelize = require('../config/connection');
const { User, Favorite } = require('../models');

const userSeedData = require('./userSeedData.json');
const favoriteSeedData = require('./favoriteSeedData.json');

const seedDatabase = async () => {
    // will drop the DB and restart/create the DB
    await sequelize.sync({ force: true });

    // creates the users with the user seed data
    const users = await User.bulkCreate(userSeedData, {
        // used for hashing for each user
        individualHooks: true,
        returning: true,
    });

    const favorite = await Favorite.bulkCreate(favoriteSeedData, {
        // used for hashing for each favorite
        individualHooks: true,
        returning: true,
    });

    //   for (const { id } of users) {
    //     const newFavorite = await LibraryCard.create({
    //       reader_id: id,
    //     });
    //   }

    // change this to a regular for loop:
    // for (const Favorites of favoriteSeedData) {
    //     const newFavorite = await Favorites.create({
    //         ...Favorites,
    //         // Attach seed data to a random user
    //         user_id: users[Math.floor(Math.random() * users.length)].id,
    //     });
    // }

    process.exit(0);
};

seedDatabase();
