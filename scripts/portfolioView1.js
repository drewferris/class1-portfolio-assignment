(function(module) {

  var projectView = {};

  projectView.populateFilters = function() {
    $('article').each(function() {
      if (!$(this).hasClass('template')) {
        var val = $(this).find('address').text();
        var optionTag = '<option value="' + val + '">' + val + '</option>';
        if ($('#author-filter option[value="' + val + '"]').length === 0) {
          $('#author-filter').append(optionTag);
        }

        val = $(this).attr('data-category');
        optionTag = '<option value="' + val + '">' + val + '</option>';
        if ($('#category-filter option[value="' + val + '"]').length === 0) {
          $('#category-filter').append(optionTag);
        }
      }
    });
  };

  projectView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#author-filter').val('');
    });
  };

  projectView.handleAuthorFilter = function() {
    $('#author-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-author="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#category-filter').val('');
    });
  };

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

  projectView.setTeasers = function() {
    var $readMoreParagraphs = $('.project-body *:nth-of-type(n+2)');
    $readMoreParagraphs.hide();
    $('a.read-less').hide();
    $('a.read-on').on('click', function(e) {
      e.preventDefault();
      $(this).prev().children().fadeIn();
      $(this).hide();
      $(this).next().show();
    });
    $('a.read-less').on('click', function(e) {
      e.preventDefault();
      $readMoreParagraphs.fadeOut();
      $(this).prev().show();
      $(this).hide();
    });

  };

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
    $('#projects').empty();
    project = new Project({
      title: $('#project-title').val(),
      author: $('#project-author').val(),
      projectLink: $('#project-link').val(),
      category: $('#project-category').val(),
      body: $('#project-body').val(),
      launchedOn: $('#project-launched:checked').length ? util.today() : null
    });

    $('#projects').append(project.toHtml());

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    $('#export-field').show();
    $('#project-json').val(JSON.stringify(project) + ',');
  };

  projectView.initIndexPage = function() {
    if($('#projects section').length === 0) {
      Project.all.forEach(function(a) {
        $('#projects').append(a.toHtml());
      });
    };
    projectView.populateFilters();
    projectView.handleAuthorFilter();
    projectView.handleCategoryFilter();
    // projectView.handleFilter('author');
    // projectView.handleFilter('category');
    // projectView.handleMainNav();
    projectView.setTeasers();

    var template = Handlebars.compile($('#author-template').text());

    if($('.author-stats section').length === 0) {
      Project.numProjectsByAuthor().forEach(function(stat) {
        $('.author-stats').append(template(stat));
      });
    };

    $('#footer-stats .projects').text(Project.all.length);
    $('#footer-stats .categories').text(Project.numCategoriesAll);
  };

  module.projectView = projectView;
})(window);
