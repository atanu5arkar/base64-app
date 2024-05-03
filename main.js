const readlineSync = require('readline-sync');
const base64EncodeTxt = require('./encode_txt');
const base64DecodeTxt = require('./decode_txt');
const base64EncodeImg = require('./encode_img');
const base64DecodeImg = require('./decode_img');


function printMenu() {
  console.log(`
  ------------------------------------
  0 : Exit

  1 : Encode Text
  2 : Encode Image

  3 : Decode Base64 Text
  4 : Decode Base64 Image
  ------------------------------------
  `);
}

async function cliLogic() {
  let choice;

  do {
    printMenu();
    choice = readlineSync.questionInt('Choose an option : ');

    switch (choice) {
      case 0:
        console.log('\nSee ya!');
        break;

      case 1:
        await base64EncodeTxt();
        console.log('\nEncoded file generated successfully!');
        break;

      case 2:
        await base64EncodeImg();
        console.log('\nEncoded file generated successfully!');
        break;

      case 3:
        await base64DecodeTxt();
        console.log('\nDecoded file generated successfully!');
        break;

      case 4:
        await base64DecodeImg();
        console.log('\nImage generated successfully!');
        
      default:
        console.log('\nOption not available!');
        break;
    }

  } while (choice);
}

console.clear();
cliLogic();