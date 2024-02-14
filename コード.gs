function scrapeWebsite() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var urls = sheet.getRange("A1:A" + sheet.getLastRow()).getValues();
  var results = [];

  urls.forEach(function(url) {
    if (url[0] !== "" && url[0].startsWith("http")) {
      try {
        var response = UrlFetchApp.fetch(url[0]);
        var content = response.getContentText();
        var pattern = /<a[^>]+id="([^"]+)"[^>]+class="[^"]*styles_image-container__TPw91[^"]*"[^>]*>/g;
        var match = pattern.exec(content);
        var id = match ? match[1] : "ID not found";
        results.push([id]);
      } catch (e) {
        results.push(["Error fetching URL"]);
      }
    } else {
      results.push(["Invalid URL"]);
    }
  });

  sheet.getRange(1, 3, results.length, 1).setValues(results);
}
