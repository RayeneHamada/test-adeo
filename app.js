'use strict';
import data from './data.js';
import CountriesRepositoryFactory from './src/factories/countries-repositories.factory.js';
import CountStrategy from './src/strategies/count.strategy.js';
import FilterStrategy from './src/strategies/filter.strategy.js';
import CountFilterStrategy from './src/strategies/count-filter.strategy.js';

// USAGE: node app.js --filter=[PATTERN] OR node app.js filter=[PATTERN]
// USAGE: node app.js --count OR node app.js count

try {
    const countriesRepository = new CountriesRepositoryFactory().create();
    countriesRepository.countries = data;
    let success = false;
    for (const strategy of [new CountFilterStrategy(countriesRepository), new CountStrategy(countriesRepository), new FilterStrategy(countriesRepository)]) {
        if (strategy.supports(process.argv)) {
            strategy.apply();
            console.log(JSON.stringify(countriesRepository.countries));
            success = true;
            break;
        }
    }

    if (!success) {
        throw new Error('Wrong arguments');
    }
} catch (err) {
    throw err
}
