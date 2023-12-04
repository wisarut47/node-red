document.addEventListener('DOMContentLoaded', function () {
  // Fetch JSON data from the server
  fetch('food.json')
    .then(response => response.json())
    .then(data => {
      // Display all JSON data in the HTML
      displayJSON(data);
    })
    .catch(error => console.error('Error fetching JSON:', error));
});

function displayJSON(data) {
  const jsonDisplay = document.getElementById('jsonDisplay');
  const keys = Object.keys(data);

  keys.forEach(key => {
    const value = data[key];
    const paragraph = document.createElement('p');
    paragraph.textContent = `${key}: ${JSON.stringify(value)}`;
    jsonDisplay.appendChild(paragraph);
  });
}

function calculateAndDisplay() {
  // Get the selected food name and weight entered by the user
  const selectedFood = document.getElementById('foodName').value;
  const weightInGrams = document.getElementById('foodWeight').value;

  // Validate the input
  if (!weightInGrams || weightInGrams <= 0) {
    return;
  }

  // Fetch JSON data from the server
  fetch('food.json')
    .then(response => response.json())
    .then(data => {
      // Check if the selected food exists in the JSON data
      if (!data[selectedFood]) {
        return;
      }

      // Calculate the nutritional values for the given weight
      const foodData = data[selectedFood];
      const ratio = weightInGrams / 100;
      const calculatedValues = {};

      // Calculate values for each key in the foodData
      Object.keys(foodData).forEach(key => {
        calculatedValues[key] = foodData[key] * ratio;
      });

      // Display the calculated values
      displayCalculatedValues(calculatedValues);
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

function displayCalculatedValues(calculatedValues) {
  const calculatedDisplay = document.getElementById('calculatedDisplay');
  calculatedDisplay.innerHTML = '<h2>Calculated Nutritional Values</h2>';

  // Display calculated values in the HTML
  const keys = Object.keys(calculatedValues);
  keys.forEach(key => {
    const value = calculatedValues[key];
    const paragraph = document.createElement('p');
    paragraph.textContent = `${key}: ${value.toFixed(2)}`;
    calculatedDisplay.appendChild(paragraph);
  });
}