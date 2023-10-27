"use strict";

const $ = (selector) => document.querySelector(selector);

/***********************
 *  helper functions  *
 **********************/
const calculateCelsius = (temp) => ((temp - 32) * 5) / 9;
const calculateFahrenheit = (temp) => (temp * 9) / 5 + 32;

const toggleDisplay = (label1Text, label2Text) => {
  // Only clear the "Degrees Fahrenheit" field
  $("#degrees_computed").value = "";
  // Update the first label
  $("#degree_label_1").textContent = label1Text;
  // Update the second label
  $("#degree_label_2").textContent = label2Text;
  // Clear any previous error message
  $("#error-message").textContent = "";
};

/****************************
 *  event handler functions  *
 *****************************/
const convertTemp = () => {
  const inputTemperature = parseFloat($("#degrees_entered").value);
  const isCelsiusSelected = $("#to_celsius").checked;

  const errorMessageElement = $("#error-message");
  const degreesEntered = $("#degrees_entered");

  // Check if the input is not a valid number
  if (isNaN(inputTemperature)) {
    errorMessageElement.textContent =
      "You must enter a valid number for degrees.";
    degreesEntered.select(); // Select the text in the input field
    return; // Exit the function if the input is not valid
  }

  // Clear the error message if the input is valid
  errorMessageElement.textContent = "";

  let resultTemperature;
  if (isCelsiusSelected) {
    resultTemperature = calculateCelsius(inputTemperature);
  } else {
    resultTemperature = calculateFahrenheit(inputTemperature);
  }

  // Display the result with no decimal places
  $("#degrees_computed").value = resultTemperature.toFixed(0);
};

const toCelsius = () => {
  toggleDisplay("Enter F degrees:", "Degrees Celsius:");
  const degreesEntered = $("#degrees_entered");
  degreesEntered.select(); // Select the text in the input field
};

const toFahrenheit = () => {
  toggleDisplay("Enter C degrees:", "Degrees Fahrenheit:");
  const degreesEntered = $("#degrees_entered");
  degreesEntered.select(); // Select the text in the input field
};

document.addEventListener("DOMContentLoaded", () => {
  // add event handlers
  const convertButton = $("#convert");
  const toCelsiusRadio = $("#to_celsius");
  const toFahrenheitRadio = $("#to_fahrenheit");
  const degreesEntered = $("#degrees_entered");
  const resetButton = $("#reset"); // Add this line to select the Reset button

  convertButton.addEventListener("click", convertTemp);
  toCelsiusRadio.addEventListener("change", toCelsius);
  toFahrenheitRadio.addEventListener("change", toFahrenheit);

  // Attach an event listener to the Reset button
  resetButton.addEventListener("click", resetForm);

  // move focus
  degreesEntered.focus();
  degreesEntered.select();
});

// Define a function to reset the form
const resetForm = () => {
  const degreesEntered = $("#degrees_entered");
  const degreesComputed = $("#degrees_computed");
  const errorMessageElement = $("#error-message");

  // Clear input fields, result field, and error message
  degreesEntered.value = "";
  degreesComputed.value = "";
  errorMessageElement.textContent = "";

  // Set focus back to the input box
  degreesEntered.focus();
};
