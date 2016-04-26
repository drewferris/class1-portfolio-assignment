(function(module) {
  var newProjectController = {};


  newProjectController.index = function() {
    Project.fetchAll(projectView.initNewProjectPage);

    $('main > section').hide();
    $('#write').show();
  };

  module.newProjectController = newProjectController;
})(window);
