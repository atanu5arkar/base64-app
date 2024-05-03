const readlineSync = require('readline-sync');
const fs = require('fs/promises');

const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function getEachChar8Bits(str) {
  let asciiCodes = str.split('').map(ch => ch.charCodeAt());
  
  return asciiCodes.map(num =>     
    num.toString(2).padStart(8, '0')
  );
}

function get6BitParts(bin) {
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
  let filename = readlineSync.question('Enter file name (.txt) : ');

  try {
    let res = await fs.readFile(filename);
    let str = res.toString();

    let bin8 = getEachChar8Bits(str);
    let bin6 = get6BitParts(bin8.join(''));
  
    let zerosToPad = 6 - bin6.at(-1).length;
    bin6.push(bin6.pop().padEnd(6, '0'));
  
    let dec = getDecimals(bin6);
    let equalsToPad = Math.floor(zerosToPad / 2);  
    let result = '';
  
    dec.forEach(num => result += base64chars.charAt(num));  
    result += '='.repeat(equalsToPad);

    await fs.writeFile('file_encoded.txt', result);

  } catch (error) {
    throw error;
  }
}

module.exports = getBase64Text;