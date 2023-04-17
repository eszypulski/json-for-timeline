function doGet() {
    var url = "https://docs.google.com/spreadsheets/d/1otKePZShoZySq4gYq-YeQwV3M9K3KdeVMUYOzHca3gA/edit#gid=717796126";
    var sheet = SpreadsheetApp.openByUrl(url).getActiveSheet(); // Replace "Sheet1" with the name of your sheet
    var startRow = 4;
    var endRow = 15;
    var rows = sheet.getRange(startRow, 1, endRow - startRow + 1, sheet.getLastColumn()).getValues();
    var headers = rows[0];
    var json = [];
    for (var i = 1; i < rows.length; i++) {
      var data = rows[i];
      var obj = {};
      /* media */
      obj["media"] = {
        "url": data[19],
        "caption": data[21],
        "credit": data[22]
      };
  
      /* start date */
      if (data[4]) {
        obj["start_date"] = {
          "month": new Date(data[4]).toLocaleDateString('en-US', { month: '2-digit' }),
          "day": new Date(data[4]).toLocaleDateString('en-US', { day: '2-digit' }),
          "year": new Date(data[4]).toLocaleDateString('en-US', { year: 'numeric' })
        };
      }
  
      /* end date */
      if (data[6]) {
        obj["end_date"] = {
          "month": new Date(data[6]).toLocaleDateString('en-US', { month: '2-digit' }),
          "day": new Date(data[6]).toLocaleDateString('en-US', { day: '2-digit' }),
          "year": new Date(data[6]).toLocaleDateString('en-US', { year: 'numeric' })
        };
      }
  
      /* text */
      obj["text"] = {
        "headline": data[2],
        "text": "<h5>" + data[16] + "</h5><p>" + data[9] + "</p>"
      };
      json.push(obj);
    }
    return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(ContentService.MimeType.JSON);
  }
  