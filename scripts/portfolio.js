var categories = [];



function Project (opts) {
  this.title = opts.title;
  this.author = opts.author;
  this.category = opts.category;
  this.launchedOn = opts.launchedOn;
  this.projectLink = opts.projectLink;
  this.body = opts.body;
};


Project.all = [];

var etag = '';

// Project.prototype.toAuthors = function () {
//   var $source = $('#author-template').html();
//   var template = Handlebars.compile($source);
//   return template(this);
// };

// Project.prototype.toCategories = function () {
//   var $source = $('#category-template').html();
//   var template = Handlebars.compile($source);
//   return template(this);
// };


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

  dataPassedIn.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });

  // projects.forEach(function(a){
  //   $('#projects').append(a.toHtml());
  // });
};
//   $('#author-filter').append(a.toHtml('author'));
//   if (categories.indexOf(a.category) === -1) {
//     $('#category-filter').append(a.toHtml('category'));
//     categories.push(a.category);
//   }
// });

// projects.forEach(function(a){
//   $('#author-filter').append(a.toAuthors());
// });
//
// projects.forEach(function(a){
//   $('#category-filter').append(a.toCategories());
// });
Project.fetchAll = function() {
  if (localStorage.projects) {

    alert('blas');
    $.ajax({
      type: 'HEAD',
      url: 'data/projects.json',
      success: function(data, message, xhr) {
        var etag = (xhr.getResponseHeader('ETag'));
        if (localStorage.etag === etag) {
          Project.loadAll(JSON.parse(localStorage.projects));
          projectView.initIndexPage();
        } else {
          Project.jsonfetch();
        }
      }
    });
  } else {
    Project.jsonfetch();
  }
};

Project.jsonfetch = function() {
  $.ajax ({
    type: 'GET',
    dataType: 'json',
    url: 'data/projects.json',
    success: function(data, message, xhr) {


      Project.loadAll(data);
      localStorage.setItem('projects', JSON.stringify(data));
      projectView.initIndexPage();
      etag = (xhr.getResponseHeader('ETag'));
      localStorage.setItem('etag', etag);
    },
    error: function(data, message, xhr){
      console.log('url');
    }
  });
};
