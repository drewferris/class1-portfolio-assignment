(function(module) {
  var portfolioController = {};

  Project.createTable();
  debugger;
  portfolioController.index = function(ctx, next) {

    projectView.index(ctx.projects);
  };

  portfolioController.loadById = function(ctx, next) {
    var portfolioData =     function(project) {
      ctx.projects = project;
      next();
    };

    Project.findWhere('id', ctx.params.id, projectData);
  };

  portfolioController.loadByAuthor = function(ctx, next) {
    var authorData = function(projectsByAuthor) {
      ctx.projects = projectsByAuthor;
      next();
    };

    Project.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  portfolioController.loadByCategory = function(ctx, next) {
    var categoryData = function(projectsInCategory) {
      ctx.projects = projectsInCategory;
      next();
    };

    Project.findWhere('author', ctx.params.categoryName.replace('+', ' '), categoryData);
  };


  portfolioController.loadAll = function(ctx, next) {
    var portfolioData = function(allProjects) {
      ctx.projects = Project.all;
      next();
    };

    if (Project.all.length) {
      ctx.projects = Project.all;
      next();
    } else {
      Project.fetchAll(portfolioData);
    }
  };

  module.portfolioController = portfolioController;
})(window);
