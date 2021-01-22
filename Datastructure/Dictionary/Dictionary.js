/**
 * @namespace Dictionary
 * @method set(key,value)
 * @method get(key)
 * @method remove(key)
 * @method has(key)
 * @method clear()
 * @method size()
 * @method getAll()
 * @method keys()
 * @method values()
 */

class Dictionary {
  constructor() {
    this.items = {};
  }
  set(key, value) {
    this.items[key] = value;
  }
  get(key) {
    return this.items[key];
  }
  remove(key) {
    delete this.items[key];
  }
  has(key) {
    return this.items.hasOwnProperty(key);
  }
  clear() {
    return (this.items = {});
  }
  size() {
    return Object.keys(this.items).length;
  }
  getAll() {
    return this.items;
  }
  get keys() {
    return Object.keys(this.items);
  }
  get values() {
    // return Object.values(this.items);
    return Object.keys(this.items).reduce((acc, curr, i) => {
      acc.push(this.items[curr]);
      return acc;
    }, []);
  }
}

const dictionary = new Dictionary();
dictionary.set("Gandalf", "gandalf@email.com");
dictionary.set("John", "johnsnow@email.com");
dictionary.set("Tyrion", "tyrion@email.com");
console.log(dictionary.size());
console.log(dictionary.getAll());
console.log(dictionary.has("Gandalf"));
console.log(dictionary.values);

module.exports = { Dictionary };
