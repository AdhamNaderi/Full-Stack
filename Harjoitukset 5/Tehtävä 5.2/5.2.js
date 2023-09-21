const birthday = "07.10.1996";

const user = {
  name: "Adham Naderi",
  city: "Jyväskylä",
  birthdate: birthday,
  getBirthday: function() {
    return birthday;
  },
  setName: function(getName) {
    this.name = getName;
  },
  setCity: function(getLocation) {
    this.city = getLocation;
  }
};

console.log(`${user.name} lives in ${user.city} and was born on ${user.birthdate}`);