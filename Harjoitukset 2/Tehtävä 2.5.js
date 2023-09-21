class Person {
    constructor(name, age, phone, email) {
      this.name = name;
      this.age = age;
      this.phone = phone;
      this.email = email;
    }
  
    age() {
      this.age += 1;
    }
  }

const person1 = new Person("Adham Naderi", 26, "123 456 7899", "entieda@esim.fi");
const person2 = new Person("Tarja Mäkäläinen", 38, "123 456 7899", "entieda2@esim.com");
const person3 = new Person("Hintsu Pakarinen", 44, "123 456 7899", "entieda3@esim.com");

console.log(person1.name);  // Adham Naderi
console.log(person2.age);   // 
console.log(person3.phone); // 123 456 7899
console.log(person1.email); // entieda@esim.fi