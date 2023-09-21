displayArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

function displayArray(numbers) {
    console.log("Alkuperäinen array: ", numbers);
    let oddNumbers = numbers.filter(number => number % 2 != 0);  
    console.log("Array jossa on kokonaisluvut: ", oddNumbers);
}