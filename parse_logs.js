const fs = require('fs');

const parseLogs = (filePath) => {
  // Read the file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Split into lines and parse each line
  const logs = fileContent
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      try {
        const logEntry = JSON.parse(line);
        // Parse the msg field which contains the actual log data
        if (logEntry.msg) {
          logEntry.msg = JSON.parse(logEntry.msg);
        }
        return logEntry;
      } catch (e) {
        return null;
      }
    })
    .filter(log => log !== null);

  // Write the formatted output
  fs.writeFileSync(
    'formatted_logs.json', 
    JSON.stringify({ logs }, null, 2)
  );
};

// Usage
parseLogs('output.json');