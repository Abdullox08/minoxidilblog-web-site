const translate = require('translate')
async function translateString(str,translateTo){
    translate.engine = 'libre'
    const foo = await translate(str,translateTo)
    console.log(foo);
}
translateString('Hello','es')
