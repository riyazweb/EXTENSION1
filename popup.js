document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("extract-btn").addEventListener("click", extractImageURL);
  });
  
  function extractImageURL() {
    chrome.tabs.executeScript({
      code: 'var previewDiv = document.querySelector("div.preview_l, div.preview"); previewDiv.style.backgroundImage.match(/url\\((.*?)\\)/)[1];'
    }, function(results) {
      var imageURL = results[0];
      if (imageURL) {
        imageURL = imageURL.replace(/['"]/g, "");
        imageURL = imageURL.replace(/amp;/g, "");
        if (imageURL.startsWith("//")) {
          imageURL = "http:" + imageURL;
        }
        copyToClipboard(imageURL);
        chrome.tabs.create({ url: imageURL });
      } else {
        alert("No image URL found.");
      }
    });
  }
  
  function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
  