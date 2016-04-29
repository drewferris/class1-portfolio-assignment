(function(module) {

  var projectView = {};

  var render = function(project) {
    var template = Handlebars.compile($('#projects-template').text());

    project.daysAgo = parseInt((new Date() - new Date(project.launchedOn)) / 60 / 60 / 24 / 1000);
    project.launchStatus = project.launchedOn ? 'launched ' + project.daysAgo + ' days ago' : '(draft)';
    project.body = marked(project.body);

    return template(project);
  };

  projectView.populateFilters = function() {
    var options,
      template = Handlebars.compile($('#option-template').text());

    options = Project.allAuthors().map(function(author) { return template({val: author}); });
    if ($('#author-filter option').length < 2) {
      $('#author-filter').append(options);
    };

    Project.allCategories(function(rows) {
      if ($('#category-filter option').length < 2) {
        $('#category-filter').append(
          rows.map(function(row) {
            return template({val: row.category});
          })
        );
      };
    });
  };

  projectView.handleFilters = function() {
    $('#filters').one('change', 'select', function() {
      resource = this.id.replace('-filter', '');
      page('/' + resource + '/' + $(this).val().replace(/\W+/g, '+'));
    });
  };

  // projectView.handleCategoryFilter = function() {
  //   $('#category-filter').on('change', function() {
  //     if ($(this).val()) {
  //       $('article').hide();
  //       $('article[data-category="' + $(this).val() + '"]').fadeIn();
  //     } else {
  //       $('article').fadeIn();
  //       $('article.template').hide();
  //     }
  //     $('#author-filter').val('');
  //   });
  // };
  //
  // projectView.handleAuthorFilter = function() {
  //   $('#author-filter').on('change', function() {
  //     if ($(this).val()) {
  //       $('article').hide();
  //       $('article[data-author="' + $(this).val() + '"]').fadeIn();
  //     } else {
  //       $('article').fadeIn();
  //       $('article.template').hide();
  //     }
  //     $('#category-filter').val('');
  //   });
  // };

  // projectView.handleFilter = function(a) {
  //   $('#' + a + '-filter').on('change', function() {
  //     if ($(this).val()) {
  //       $('article').hide();
  //       $('article[data-' + a + '= "' + $(this).val() + '"]').fadeIn();
  //     } else {
  //       $('article').fadeIn();
  //       $('article.template').hide();
  //     }
  //     $('#' + a + '-filter').val('');
  //   });
  // };

  // projectView.handleMainNav = function() {
  //   $('.main-nav').on('click', '.tab', function() {
  //     $('.tab-content').hide();
  //     $('#' + $(this).data('content')).fadeIn();
  //   });
  //   $('.main-nav .tab:first').click();
  // };

  // projectView.setTeasers = function() {
  //   var $readMoreParagraphs = $('.project-body *:nth-of-type(n+2)');
  //   $readMoreParagraphs.hide();
  //   $('a.read-less').hide();
  //   $('a.read-on').on('click', function(e) {
  //     e.preventDefault();
  //     $(this).prev().children().fadeIn();
  //     $(this).hide();
  //     $(this).next().show();
  //   });
  //   $('a.read-less').on('click', function(e) {
  //     e.preventDefault();
  //     $readMoreParagraphs.fadeOut();
  //     $(this).prev().show();
  //     $(this).hide();
  //   });
  //
  // };

  projectView.initNewProjectPage = function() {
    $('.tab-content-again').show();
    $('#export-field').hide();
    $('#project-json').on('focus', function() {
      this.select();
    });

    $('#new-form').on('change', 'input, textarea', projectView.create);
  };

  projectView.create = function() {
    var project;
    $('#new-projects').empty();
    project = new Project({
      title: $('#project-title').val(),
      author: $('#project-author').val(),
      projectLink: $('#project-link').val(),
      category: $('#project-category').val(),
      body: $('#project-body').val(),
      launchedOn: $('#project-launched:checked').length ? util.today() : null
    });

    $('#new-projects').append(project.toHtml());

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    $('#export-field').show();
    $('#project-json').val(JSON.stringify(project) + ',');
  };

  projectView.index = function(projects) {
    $('#projects').show().siblings().hide();

    $('#projects article').remove();
    projects.forEach(function(a) {
      $('#projects').append(render(a));
    });

    projectView.populateFilters();
    projectView.handleFilters();

    if ($('#projects article').length > 1) {
      $('.project-body *:nth-of-type(n+2)').hide();
    }
  };

  projectView.initStatsPage = function() {

    var template = Handlebars.compile($('#author-template').text());

    if($('#author-stats li').length === 0) {

      Project.numProjectsByAuthor().forEach(function(stat) {
        $('#author-stats').append(template(stat));
      });
    };

    $('#footer-stats .projects').text(Project.all.length);
    $('#footer-stats .categories').text(Project.numCategoriesAll);
  };

  module.projectView = projectView;
})(window);
