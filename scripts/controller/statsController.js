(function(module) {
  var statsController = {};

  statsController.index = function() {

    Project.fetchAll(projectView.initStatsPage);

    $('main > section').hide();
    $('#footer-stats').show();
  };

  module.statsController = statsController;
})(window);
