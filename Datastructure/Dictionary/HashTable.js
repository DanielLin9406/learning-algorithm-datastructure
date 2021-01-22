/**
 * @namespace HashTable
 * @method put(key,value)
 * @method get(key)
 * @method remove(key)
 * @method djb2HashCode(key)
 * @method keys()
 * @method values()
 */

class HashTable {
  constructor() {
    this.table = {};
  }
  static djb2HashCode(key) {
    let hash = 5381;
    for (let codePoint of key) {
      hash = hash * 33 + codePoint.charCodeAt();
    }
    return hash % 1013;
  }
  put(key, value) {
    const position = HashTable.djb2HashCode(key);
    this.table[position] = value;
  }
  get(key) {
    return this.table[HashTable.djb2HashCode(key)];
  }
  remove(key) {
    return (this.table[HashTable.djb2HashCode(key)] = undefined);
  }
  get keys() {
    return Object.keys(this.table);
  }
  get values() {
    // return Object.values(this.items);
    return Object.keys(this.table).reduce((acc, curr, i) => {
      acc.push(this.table[curr]);
      return acc;
    }, []);
  }
}

const hash = new HashTable();
hash.put("Surmon", "surmon.me@email.com"); // 19 - Surmon
hash.put("John", "johnsnow@email.com"); // 29 - John
hash.put("Tyrion", "tyrion@email.com"); // 16 - Tyrion
hash.put("Jonathan", "jonathan@email.com");
hash.put("Jamie", "jamie@email.com");
hash.put("Sue", "sueOemail.com");
hash.put("Sue", "sueOemail.com2");

console.log(hash.values);
// console.log(hash);
module.exports = { HashTable };
