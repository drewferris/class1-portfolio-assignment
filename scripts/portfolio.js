(function(module) {

  function Project (opts) {
    this.title = opts.title;
    this.author = opts.author;
    this.category = opts.category;
    this.launchedOn = opts.launchedOn;
    this.projectLink = opts.projectLink;
    this.body = opts.body;
  };

  Project.all = [];

  Project.prototype.toHtml = function(){
    // var $source = $('#' + templateId + '-template').html();
    var template = Handlebars.compile($('#projects-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.launchedOn))/60/60/24/1000);
    this.publishStatus = this.launchedOn ? 'launched ' + this.daysAgo + ' days ago' : '(draft)';
    return template(this);
  };

  Project.loadAll = function(dataPassedIn) {

    dataPassedIn.sort(function(a, b) {
      console.log('here');
      return (new Date(b.launchedOn)) - (new Date(a.launchedOn));
    });

    Project.all = dataPassedIn.map(function(ele) {
      return new Project(ele);
    });
  };

  Project.fetchAll = function(callback) {
    if (localStorage.projects) {
      $.ajax({
        type: 'HEAD',
        url: '/data/projects.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('ETag');
          if(!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Project.getAll();
          } else {
            Project.loadAll(JSON.parse(localStorage.projects));
            callback();
          }
        }
      });
    } else {
      Project.getAll();
    }
  };

  Project.getAll = function() {
    $.getJSON('/data/projects.json', function(responseData) {
      Project.loadAll(responseData);
      localStorage.projects = JSON.stringify(responseData);
      projectView.initIndexPage();
    });
  };

  

  module.Project = Project;
})(window);
