const readlineSync = require('readline-sync');
const fs = require('fs/promises');

const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function getEachChar6Bits(str) {
  let bas64codes = str.split('')
    .map(ch => base64chars.indexOf(ch)).filter(ele => ele != -1);
  
  return bas64codes.map(num =>     
    num.toString(2).padStart(6, '0')
  );
}

function get8bitParts(bin) {
  let result = [];

  for (let i = 0; i < bin.length; i += 8) {
    result.push(bin.slice(i, i + 8));
  }
  return result;
}

function getDecimals(binArr) {
  return binArr.map(bin => parseInt(bin, 2));
}

async function getAsciiText() {
  console.clear()
  let filename = readlineSync.question('Enter file name (.txt) : ');

  try {
    let res = await fs.readFile(filename);
    let str = res.toString();

    let bin6 = getEachChar6Bits(str);    
    let equalsCount = 0;
    
    for (let i = str.length - 1; i >= 0; i--) {
      if (str[i] == '=') equalsCount++;
      else break;
    }
    
    let zerosToDel = equalsCount * 2;
    let arr = bin6.pop().split('');
  
    while (zerosToDel != 0) {
      arr.pop();
      zerosToDel--;
    }
    bin6.push(arr.join(''));
  
    let bin8 = get8bitParts(bin6.join(''));
    let dec = getDecimals(bin8);
    let result = '';
  
    dec.forEach(num => 
      result += String.fromCharCode(num)
    )

    await fs.writeFile('file_decoded.txt', result);

  } catch (error) {
    throw error;
  }
}

module.exports = getAsciiText;