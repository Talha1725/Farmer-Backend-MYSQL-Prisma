const fs = require('fs');

// Function to read JSON from a file
const readJsonFromFile = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return;
        }
        callback(JSON.parse(data));
    });
};

// Selected fields
const selectedFields = ['id', 'name', 'sub_field','parent_id','user_id','area','tehsil','district','state','country','coordinates','centre_coordinates'];

// Function to map JSON to selected fields and add fixed fields
const mapJsonToSelectedFields = (data, fields) => {
    return data.map(item => {
        let newItem = {
            date_of_purchasing:null
        };
        fields.forEach(field => {
            if (item.hasOwnProperty(field)) {
                newItem[field] = field === 'id' ? Number(item[field]) : item[field];
            } else {
                newItem[field] = null;
            }
        });
        return newItem;
    });
};

// Function to generate SQL insert statements
const generateSqlInserts = (json) => {
    return json.map(item => {
        return `INSERT INTO Fields (farmerSawie_nr, crop_id,crop_variety_id ) VALUES (${item.user_id}, ${item.id},${item.crop_variety}) );`;
    }).join('\n');
};

// Function to export JSON to a file
const exportJsonToFile = (json, filePath) => {
    fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('JSON data has been written to', filePath);
        }
    });
};

// Function to export SQL insert statements to a file
const exportSqlToFile = (sql, filePath) => {
    fs.writeFile(filePath, sql, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('SQL insert statements have been written to', filePath);
        }
    });
};

// Path to the input and output files
const inputFilePath = 'source.json';
const outputFilePath = 'output.json';
const sqlFilePath = 'insert_statements.sql';

// Read the JSON from the source file and process it
readJsonFromFile(inputFilePath, (data) => {
    const originalJson = data['mydatabase.farms'];
    const newJson = mapJsonToSelectedFields(originalJson, selectedFields);
    const sqlInserts = generateSqlInserts(newJson);

    // Export new JSON and SQL insert statements to their respective files
    exportJsonToFile(newJson, outputFilePath);
    exportSqlToFile(sqlInserts, sqlFilePath);
});
