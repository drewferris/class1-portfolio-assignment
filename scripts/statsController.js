(function(module) {
  var statsController = {};

  statsController.index = function() {
    $('main > section').hide();
    $('#footer-stats').show();
  };

  module.statsController = statsController;
})(window);
