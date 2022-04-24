

class Mac {
  constructor(div) {
    this.div = div
    this.address = ''
  }

  isD(char) {
    if (('0' <= char && char <= '9') || 
        ('A' <= char && char <= 'F') || 
        ('a' <= char && char <= 'f')) {
      return true
    }
    return false
  }

  validate(address) {
    const addrArray = address.split(this.div)
    if (addrArray.length !== 6) return false

    let isValidated = false
    for(let i = 0; i < addrArray.length; i++) {
      if (addrArray[i].length !== 2) {
        break;
      } 
      return this.isD(addrArray[i][0]) && this.isD(addrArray[i][1])
    }
    return isValidated
  }

  set(address) {
    return this.validate(address) && (this.address = address)
  }

  toString() {
    return this.address
  }
}


const addr = '11-22-33-44-55-66'
const addr1 = '00-0f-0F-09-0a-0A'
const addr2 = 'f0-F0-90-a0-A0-00'
const addr3 = 'f0-F0-90-a0-A0-01-11'
const addr4 = 'f0-F0-90-a0-A0'
const addr5 = '12345'
const addr6 = '12345-11-11-11-11-11'
const addr7 = '11.22.33.44.55.66'

let mac = new Mac('-')
// mac.set(addr)
// console.log(mac == addr) 
mac.set(addr6)
console.log(mac)
console.log(mac == addr6) 
// mac.set(addr)
// console.log(mac == addr) 