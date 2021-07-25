/* 
 * Tarot Generator
 * Generates random numbers between 0 and 78 
*/

module.exports = () => {

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const pickACard = () => {  
    return randomInteger(0, 78)
  }

  let cards = []

  const addToSpread = () => {
    let card = pickACard()
    if (!cards.includes[card]) { 
      cards.push(card)
    } else {
      addToSpread();
    }
  }

  // const newSpread = numCards => {
  //   let spread = []

  //   for (let i = 0; i < numCards; i++) {
  //     addToSpread()
  //   }
    
  //   return spread;
  // }
  
  const threeCardDraw = () => {
    let cards = []
    addToSpread()
    addToSpread()
    addToSpread()
    return cards
  }

}

/* 
 * Call addToSpread() this as many times as cards you need 
 * Below is an example of a three card draw
*/

// addToSpread()
// addToSpread()
// addToSpread()