const readlineSync = require('readline-sync');
const fs = require('fs/promises');

const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function get8Bits(binArr) {
  return binArr.map(bin => bin.padStart(8, '0'));
}

function get6bitParts(bin) {
  let result = [];

  for (let i = 0; i < bin.length; i += 6) {
    result.push(bin.slice(i, i + 6));
  }
  return result;
}

function getDecimals(binArr) {
  return binArr.map(bin => parseInt(bin, 2));
}

async function getBase64Text() {
  console.clear();
  let filename = readlineSync.question('Enter file name (.png, .jpg) : ');

  try {
    let res = await fs.readFile(filename);
    res = Array.from(res); // convert the iterable Buffer into an array
    let binArr = res.map(ele => ele.toString(2));

    let bin8 = get8Bits(binArr);
    let bin6 = get6bitParts(bin8.join(''));
  
    let zerosToPad = 6 - bin6.at(-1).length;
    bin6.push(bin6.pop().padEnd(6, '0'));
  
    let dec = getDecimals(bin6);
    let equalsToPad = Math.floor(zerosToPad / 2);  
    let result = '';
  
    dec.forEach(num => result += base64chars.charAt(num));  
    result += '='.repeat(equalsToPad);

    await fs.writeFile('img_encoded.txt', result);

  } catch (error) {
    throw error;
  }
}

module.exports = getBase64Text;