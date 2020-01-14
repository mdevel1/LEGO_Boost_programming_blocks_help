"use strict";

window.onload = setupEvents();


function setupEvents() {
    let inputFile = document.getElementById('inputFile_id');

    function displayFile() {
        let file = inputFile.files[0];
        let reader = new FileReader();

        reader.onload = function () {
            renderData(reader.result);
        }

        reader.readAsText(file);
    };

    inputFile.addEventListener('change', displayFile);
};


function renderData(dataText) {
    let dataJSON;
    let renderedHTML;
    let template = `
        <% for (let i = 0; i < AllBlocks.blocks.length; i++) {
            let block = AllBlocks.blocks[i] %>
            <tr>
                <td><img src="<%= block.Image %>"></td>
                <td><%= block.ID %></td>
                <td><%= block.Name %></td>
                <td><%= block.Description %></td>
            </tr>
        <% }; %>
        `;
    let outputTable = document.getElementsByClassName('help-table')[0];
    let outputTableContents = document.getElementById('outputTableContents_id');

    dataJSON = JSON.parse(dataText);
    renderedHTML = ejs.render(template, dataJSON);
    outputTableContents.innerHTML = unescapePermittedTags(renderedHTML);
    outputTable.style.display = "table";
};


function unescapePermittedTags(html) {
    html = html.replace(/&lt;strong&gt;/g, '<b>');
    html = html.replace(/&lt;\/strong&gt;/g, '</b>');
    return html
};


function hideInstructions() {
    let instructions = document.getElementsByClassName('instructions')[0];
    instructions.style.display = 'none';
};

function showInstructions() {
    let instructions = document.getElementsByClassName('instructions')[0];
    instructions.style.display = 'block';
};
