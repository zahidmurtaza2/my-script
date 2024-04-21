function isValidUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}

// Function to check if two URLs have the same origin
function isSameOrigin(url1, url2) {
  var origin1 = new URL(url1).origin;
  var origin2 = new URL(url2).origin;
  return origin1 === origin2;
}

// Set to keep track of visited links
var visitedLinks = new Set();
console.log("Link holder loaded")

// Function to open a link through CAPTCHA verification
function openLinkThroughCaptcha(url) {
  // Open the CAPTCHA link with the original URL as the 'next' parameter
  var captchaUrl = 'https://tblink.rf.gd/Recaptcha?next=' + encodeURIComponent(url) + '&version=2';
  window.open(captchaUrl, '_blank');
}

// Function to modify links on the webpage
function modifyLinks() {
  // Get the current page's origin
  var currentPageOrigin = window.location.origin;
  
  // Get all the links on the webpage
  var links = document.getElementsByTagName('a');
  
  // Loop through each link
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var originalUrl = link.href;
    
    // Check if the URL is valid and not visited yet
    if (isValidUrl(originalUrl) && !visitedLinks.has(originalUrl)) {
      // Mark the link as visited
      visitedLinks.add(originalUrl);
      
      // Open in a new tab if the URL has the same origin as the current page
      if (isSameOrigin(originalUrl, currentPageOrigin)) {
        link.setAttribute('target', '_blank');
      }
      
      // Update the href attribute of the link
      link.href = 'javascript:void(0)'; // Prevent immediate redirection
      
      // Attach click event listener to open through CAPTCHA
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        openLinkThroughCaptcha(originalUrl);
      });
    }
  }
}

// Call the function when the page is fully loaded
window.onload = function() {
  modifyLinks();
};
