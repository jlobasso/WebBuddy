const sitesAvailibles = [{
    site: ['https://www.instagram.com', 'http://www.instagram.com'],
    script: 'instagram'
},
{
    site: ['https://stackoverflow.com'],
    script: 'stackoverflow'
},
{
    site: ['https://www.mercadolibre.com/', 'https://www.mercadolivre.com'],
    script: 'mercadolibre'
}];



const match = sitesAvailibles
    .find(avs => avs.site
        .find(s => "https://stackoverflow.co/pepe".includes(s)));

console.log(match)