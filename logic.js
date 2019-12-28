const libgen = require('libgen');

const options = {
    mirror: 'http://gen.lib.rus.ec',
    query: 'infosec',
    count: 5,
    sort_by: 'year',
    reverse: true
}

async function getList() {
    try {
        const data = await libgen.search(options)
        let n = data.length
        console.log(`${n} results for "${options.query}"`)
        while (n--) {
            console.log('');
            console.log('Title: ' + data[n].title)
            console.log('Author: ' + data[n].author)
            console.log('Download: ' +
                'http://gen.lib.rus.ec/book/index.php?md5=' +
                data[n].md5.toLowerCase())
        }
    } catch (err) {
        console.error(err)
    }
}

getList();