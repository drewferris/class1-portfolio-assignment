(function(module) {
  var newProjectController = {};


  newProjectController.index = function() {
    Project.fetchAll(projectView.initNewProjectPage);

    $('main > section').hide();
    $('#write #project-export').show();
  };

  module.newProjectController = newProjectController;
})(window);
