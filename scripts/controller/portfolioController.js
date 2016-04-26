(function(module) {
  var portfolioController = {};

  portfolioController.index = function() {
    Project.fetchAll(projectView.initIndexPage);

    $('main > section').hide();
    $('#projects').show();
  };

  module.portfolioController = portfolioController;
})(window);
