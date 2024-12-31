const fs = require('fs');
const plantumlEncoder = require('plantuml-encoder');
const axios = require('axios');

// PlantUML source code
const plantUmlSource = `
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml
`;

// Function to generate the PlantUML diagram
async function generateDiagram() {
    try {
        // Encode the PlantUML source code
        const encodedSource = plantumlEncoder.encode(plantUmlSource);

        // Create the URL for the PlantUML server
        const url = `http://www.plantuml.com/plantuml/svg/${encodedSource}`;

        // Fetch the SVG from the PlantUML server
        const response = await axios.get(url, { responseType: 'text' });

        // Write the SVG to a file
        fs.writeFileSync('diagram.svg', response.data);
        console.log('Diagram generated successfully and saved as diagram.svg');
    } catch (error) {
        console.error('Error generating diagram:', error);
    }
}

// Generate the diagram
generateDiagram();