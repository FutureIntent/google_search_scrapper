const axios = require('axios');
const cheerio = require('cheerio');


const scrape = () => axios.get('https://www.google.com/search?q=новости+в+латвии')
    .then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);

        const elements = $('a[data-ved]');
        const pattern = /(\/url\?q=).+/i;

        const matches = [];

        elements.each((index, element) => {
            const link = element.attribs.href;
            const matched = link.match(pattern);

            if (matched) {
                const query = matched[0].split('&')[0];
                const has_broken_link = query.includes('google');

                !has_broken_link && matches.push(query.replace("/url?q=", ""));
            }

        })

        console.log(matches);
    })
    .catch((err) => console.log(err))

// /url?q=http://www.miit.lv/&sa=U&ved=2ahUKEwiu9NeT486HAxVrQFUIHUlpOQIQFnoECAYQAg&usg=AOvVaw2CVh_D_2rsQR1WPN589cIs


module.exports = { scrape };