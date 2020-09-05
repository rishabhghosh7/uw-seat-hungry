const axios = require('axios');
const cheerio = require('cheerio');

let props = Object.keys;

function secret_sauce(res) {
  const $ = cheerio.load(res.data)
  const table = $('table table tbody');

  //console.log('This element is the children of table table tbody');
  //console.log('INV : Should have 4 children!');
  //console.log(Object.keys(table.children()));

  let count = table.children().length;

  const out = [];
  for (let i=1; i<count; i++) {
    try {
      let fr = table.children()[`${i}`];
      //console.log('\nThis is the '+ i +' row');
      //console.log(fr.name);

      let cap = fr.children['6'];
      let cp = cap.children['0'];
      let dp = fr.children['7'].children['0'];

      let label = `${dp.data}/${cp.data}`;
      //console.log(`${dp.data}/${cp.data}`);
      out.push(label.trim());
    } catch (e) {
    }
  }
  return out;
}

function run() {

  const ids = ['454', '475', '486', '489'];

  let u = '';
  ids.forEach(function(id) {
    u = `http://www.adm.uwaterloo.ca/cgi-bin/cgiwrap/infocour/salook.pl?level=under&sess=1209&subject=CS&cournum=${id}`;
    axios.get(u)
      .then((res) => secret_sauce(res))
      .then((arr) => {
        console.log(id);
        console.log(arr);
      })
      .catch((err) => console.log(id +' failed!\n'))
  });

}


run();


