(function(module) {
  var repoView = {};

  var ui = function() {
    var $about = $('#about');

    $about.find('section ul').empty();
    $about.show().siblings().hide();
  };

  var render = Handlebars.compile($('#repo-template').text());

  repoView.index = function() {
    ui();

    $('#about section ul').append(repos.with('name').map(render));
  };

  module.repoView = repoView;
})(window);
