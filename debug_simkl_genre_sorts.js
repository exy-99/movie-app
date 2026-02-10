const axios = require('axios');
const fs = require('fs');

const CLIENT_ID = 'bf711694f43a8ce409e5492957b4f3d07ac5eda293f4d14d967c55cac72f6e4e';

async function testSorting(sort) {
    const genre = 'action';
    const url = `https://api.simkl.com/movies/genres/${genre}/all-types/all-countries/all-years/${sort}?limit=20&page=1&extended=overview,metadata,tmdb,genres,poster,fanart&client_id=${CLIENT_ID}`;

    console.log(`Testing sort: ${sort}`);

    try {
        const response = await axios.get(url);
        const data = response.data;
        const withPoster = data.filter(item => !!item.poster).length;
        console.log(`  Total: ${data.length}, With Poster: ${withPoster}`);
        return { sort, total: data.length, withPoster };
    } catch (error) {
        console.error(`  Error: ${error.message}`);
        return { sort, error: error.message };
    }
}

async function run() {
    const sorts = ['popular-today', 'popular-week', 'popular-month', 'all-time', 'rank'];
    for (const sort of sorts) {
        await testSorting(sort);
    }
}

run();
