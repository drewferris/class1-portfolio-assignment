(function(module) {

  function Project (opts) {
    for (key in opts) this[key] = opts[key];
  };

  Project.all = [];

  Project.prototype.toHtml = function(){
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
            Project.getAll(callback);
          } else {
            Project.loadAll(JSON.parse(localStorage.projects));
            callback();
          }
        }
      });
    } else {
      Project.getAll(callback);
    }
  };

  Project.getAll = function(callback) {
    $.getJSON('/data/projects.json', function(responseData) {
      Project.loadAll(responseData);
      localStorage.projects = JSON.stringify(responseData);
      callback();
    });
  };

  Project.numCategoriesAll = function() {
    var categories = Project.all.map(function(project) {
      return project.categories;
    });
    return categories.length;
  };

  Project.allAuthors = function() {
    return Project.all.map(function(project) {
      return project.author;
    }).reduce(function(a,b) {
      if(a.indexOf(b) === -1) {
        a.push(b);
        return a;
      } else {
        return a;
      }
    },[]);
  };

  Project.numProjectsByAuthor = function() {
    return Project.allAuthors().map(function(author) {
      return {
        name: author,
        numProjects: Project.all.filter(function(curProject) {
          return curProject.author === author;
        })
        .map(function(curProject) {
          return curProject.category;
        }).length
      };
    });
  };
  module.Project = Project;
})(window);
