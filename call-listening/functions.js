//Call Details Section

const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
   let inputText;
   let inputTitle;
   let inputId;
   let selectorText;
   let selectorTitle;
   let selectorId;
   const inputs = document.querySelectorAll('input[data-section="details"]');
   const selectors = document.querySelectorAll('select[data-section="details"]');

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

   const notes = document.querySelector('textarea[name="notes"]');
   let notesText = notes.value;
   let notesId = document.getElementById('subtotal__notes');
   notesId.innerHTML = notesText;
});

window.onload = function() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('change', updateTotals);
    });
}

function updateTotals() {
    //Scripts Section
    const openingScriptScoreElem = document.querySelector('input[name="openingscript"]:checked');
    const closingScriptScoreElem = document.querySelector('input[name="closingscript"]:checked');
    const openingScriptScore = openingScriptScoreElem ? openingScriptScoreElem.value : 0;
    const closingScriptScore = closingScriptScoreElem ? closingScriptScoreElem.value : 0;
    const scriptsTotal = Number(openingScriptScore) + Number(closingScriptScore);
    const subtotalScripts = document.getElementById('subtotal__scripts');
    //Scripts Subtotal
    subtotalScripts.innerHTML = scriptsTotal;

    //Soft Skills Section
    const activeScoreElem = document.querySelector('input[name="activelistening"]:checked');
    const rapportScoreElem = document.querySelector('input[name="rapport"]:checked');
    const toneScoreElem = document.querySelector('input[name="tone"]:checked');
    const summaryScoreElem = document.querySelector('input[name="summary"]:checked');
    const activeScore = activeScoreElem ? activeScoreElem.value : 0;
    const rapportScore = rapportScoreElem ? rapportScoreElem.value : 0;
    const toneScore = toneScoreElem ? toneScoreElem.value : 0;
    const summaryScore = summaryScoreElem ? summaryScoreElem.value : 0;
    const softSkillsTotal = Number(activeScore) + Number(rapportScore) + Number(toneScore) + Number(summaryScore);
    const subtotalSoftSkills = document.getElementById('subtotal__soft-skills');
    //Soft Skills Subtotal
    subtotalSoftSkills.innerHTML = softSkillsTotal;

    //Processes Section
    const noteScoreElem = document.querySelector('input[name="note"]:checked');
    const followUpScoreElem = document.querySelector('input[name="followUp"]:checked');
    const noteScore = noteScoreElem ? noteScoreElem.value : 0;
    const followUpScore = followUpScoreElem ? followUpScoreElem.value : 0;
    const processesTotal = Number(noteScore) + Number(followUpScore);
    const subtotalProcesses = document.getElementById('subtotal__processes');
    //Processes Subtotal
    subtotalProcesses.innerHTML = processesTotal;

    //Compliance Section
    const identityScoreElem = document.querySelector('input[name="identity"]:checked');
    const accessScoreElem = document.querySelector('input[name="access"]:checked');
    const vulnerableScoreElem = document.querySelector('input[name="vulnerable"]:checked');
    const identityScore = identityScoreElem ? identityScoreElem.value : 0;
    const accessScore = accessScoreElem ? accessScoreElem.value : 0;
    const vulnerableScore = vulnerableScoreElem ? vulnerableScoreElem.value : 0;
    const complianceTotal = Number(identityScore) + Number(accessScore) + Number(vulnerableScore);
    const subtotalComplianceElem = document.getElementById('subtotal__compliance');
    //Compliance Subtotal
    subtotalComplianceElem.innerHTML = complianceTotal;
}

function downloadPDF() {
    var pdf = new jsPDF('p', 'pt', 'a4');
    $("#button-pdf").attr('hidden', 'true')
    pdf.addHTML($("#overall"), 0, -20, { allowTaint: true, useCORS: true, pagesplit: false }, function () {
    pdf.save('{{downloaded_file_name}}.pdf');
    $("#button-pdf").removeAttr('hidden', 'true')
  });
}