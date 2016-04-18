var projects= [], categories = [];

function Project (opts) {
  this.title = opts.title;
  this.author = opts.author;
  this.category = opts.category;
  this.launchedOn = opts.launchedOn;
  this.projectLink = opts.projectLink;
  this.body = opts.body;
};

// function Projects(projects) {
//   for (key in projects) {
//     this[key] = projects[key];
//   };
// };

Project.prototype.toAuthors = function () {
  var $source = $('#author-template').html();
  var template = Handlebars.compile($source);
  return template(this);
};

Project.prototype.toCategories = function () {
  var $source = $('#category-template').html();
  var template = Handlebars.compile($source);
  return template(this);
};

Project.prototype.toHtml = function(){
  // var $source = $('#' + templateId + '-template').html();
  var $source = $('#projects-template').html();
  var template = Handlebars.compile($source);
  this.daysAgo = parseInt((new Date() - new Date(this.launchedOn))/60/60/24/1000);
  this.publishStatus = this.launchedOn ? 'launched ' + this.daysAgo + ' days ago' : '(draft)';
  return template(this);
};

rawData.sort(function(a,b) {
  return (new Date(b.launchedOn)) - (new Date(a.launchedOn));
});

rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
//   $('#author-filter').append(a.toHtml('author'));
//   if (categories.indexOf(a.category) === -1) {
//     $('#category-filter').append(a.toHtml('category'));
//     categories.push(a.category);
//   }
// });

projects.forEach(function(a){
  $('#author-filter').append(a.toAuthors());
});

projects.forEach(function(a){
  $('#category-filter').append(a.toCategories());
});
