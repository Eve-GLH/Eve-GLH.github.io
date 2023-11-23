//Call Details Section

    

const submit = document.getElementById("submit");
const inputs = document.querySelectorAll('input[data-section="details"]');
const selectors = document.querySelectorAll('select[data-section="details"]');

submit.addEventListener("click", () => {
   let inputText;
   let inputTitle;
   let inputId;
   let selectorText;
   let selectorTitle;
   let selectorId;

   for (const input of inputs) {
    if (input.value) {
        inputText = input.value;
        inputTitle = input.name;
        inputId = document.getElementById(`${inputTitle}Output`);
        inputId.innerHTML = inputText;
    }
   }

   for (const selector of selectors) {
    if (selector.value){
        selectorText = selector.value;
        selectorTitle = selector.name;
        selectorId = document.getElementById(`${selectorTitle}Output`);
        selectorId.innerHTML = selectorText;
    }
   }
});