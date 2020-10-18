var CLIENT_ID = '663693840349-6rn20a0rd5d3infonlsre47rrgrj505l.apps.googleusercontent.com';

// Runs a simple EE analysis and output the results to the web page.
var runAnalysis = function() {
  ee.initialize();
  var image = new ee.Image('srtm90_v4');
  image.getMap({min: 0, max: 1000}, function(map) {
    console.log(map);
  });
  var imageMetadata = ee.Image('srtm90_v4').getInfo();
  $('.output').text(JSON.stringify(imageMetadata), null, ' ');
};

$(document).ready(function() {
  // Shows a button prompting the user to log in.
  var onImmediateFailed = function() {
    $('.g-sign-in').removeClass('hidden');
    $('.output').text('(Log in to see the result.)');
    $('.g-sign-in .button').click(function() {
      ee.data.authenticateViaPopup(function() {
        // If the login succeeds, hide the login button and run the analysis.
        $('.g-sign-in').addClass('hidden');
        runAnalysis();
      });
    });
  };

  // Attempt to authenticate using existing credentials.
  ee.data.authenticate(CLIENT_ID, runAnalysis, null, null, onImmediateFailed);
  runAnalysis();
});

