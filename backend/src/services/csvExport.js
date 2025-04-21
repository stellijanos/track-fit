const measurementRepository = require('../repositories/measurement');
const activityEntryRepository = require('../repositories/activityEntry');
const mealEntryRepository = require('../repositories/mealEntry');
const caloricTargetRepository = require('../repositories/caloricTarget');
const waterIntakeRepository = require('../repositories/waterIntake');
const NotFoundError = require('../errors/NotFound');
const jsonToCsv = require('../utils/functions/jsonToCsv');
const UnprocessableEntityError = require('../errors/Unauthorized');

/**
 * Define repos and json to csv converters for entities that can be exported
 */
const entities = {
    measurements: {
        name: 'Measurements',
        repoAll: measurementRepository.findAllByUserId,
        repoDates: measurementRepository.findAllByUserIdBetweenDates,
        jsonToCsv: jsonToCsv.measurements,
    },
    activities: {
        name: 'Activities',
        repoAll: activityEntryRepository.findAllByUserId,
        repoDates: activityEntryRepository.findAllByUserIdBetweenDates,
        jsonToCsv: jsonToCsv.activities,
    },
    meals: {
        name: 'Meals',
        repoAll: mealEntryRepository.findAllByUserId,
        repoDates: mealEntryRepository.findAllByUserIdBetweenDates,
        jsonToCsv: jsonToCsv.meals,
    },
    'caloric-targets': {
        name: 'Caloric targets',
        repoAll: caloricTargetRepository.findAllByUserId,
        repoDates: caloricTargetRepository.findAllByUserIdBetweenDates,
        jsonToCsv: jsonToCsv.caloricTargets,
    },
    'water-intake': {
        name: 'Water intake',
        repoAll: waterIntakeRepository.findAllByUserId,
        repoDates: waterIntakeRepository.findAllByUserIdBetweenDates,
        jsonToCsv: jsonToCsv.waterIntake,
    },
};

/**
 *
 * @param {String} userId - Id of the current authenticated user
 * @param {String | undefined} from - Date to get the data from
 * @param {String | undefined} until - Date to get the data until
 * @param {String} subject - Entity as a string that can be exported
 * @returns
 */
module.exports = async (userId, from, until, subject) => {
    /**
     * 1. Retrieve entity from the defined entities
     */
    const entity = entities[subject];

    /**
     * 2. Throw error if the subject is not supported (does not exist)
     */
    if (!entity) throw new UnprocessableEntityError(`Exports for ${subject} not supported.`);

    /**
     * 3. Retrieve data depending on the given from and until dates
     */
    let data;
    if (!from || !until) {
        data = await entity.repoAll(userId);
    } else {
        data = await entity.repoDates(userId, from, until);
    }

    /**
     * Throw error if no data found
     */
    if (!data.length) throw new NotFoundError(entity.name);

    /**
     * Return the data converted into csv
     */
    return entity.jsonToCsv(data);
};
