const axios = require('axios');
const fs = require('fs');

const CLIENT_ID = 'bf711694f43a8ce409e5492957b4f3d07ac5eda293f4d14d967c55cac72f6e4e';

async function testGenreApi() {
    const genre = 'action';
    const url = `https://api.simkl.com/movies/genres/${genre}/all-types/all-countries/all-years/popular-today?limit=5&page=1&extended=overview,metadata,tmdb,genres,poster,fanart&client_id=${CLIENT_ID}`;

    console.log('Fetching:', url);

    try {
        const response = await axios.get(url, { headers: { 'Content-Type': 'application/json' } });
        const data = response.data;

        let logContent = `URL: ${url}\n\n`;
        if (data && data.length > 0) {
            data.forEach((item, index) => {
                logContent += `Item ${index}: ${item.title}\n`;
                logContent += `Poster: ${item.poster}\n`;
                logContent += `Fanart: ${item.fanart}\n`;
                logContent += `Full Item Data: ${JSON.stringify(item, null, 2)}\n`;
                logContent += `---\n`;
            });
        } else {
            logContent += 'No data returned.\n';
        }

        fs.writeFileSync('debug_api_output.txt', logContent);
        console.log('Debug output written to debug_api_output.txt');
    } catch (error) {
        console.error('Error fetching data:', error.message);
        if (error.response) {
            fs.writeFileSync('debug_api_output.txt', `Error: ${error.message}\nStatus: ${error.response.status}\nData: ${JSON.stringify(error.response.data, null, 2)}`);
        }
    }
}

testGenreApi();
