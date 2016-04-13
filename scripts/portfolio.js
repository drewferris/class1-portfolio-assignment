var projects= [];

function Project (opts) {
  this.title = opts.title;
  this.author = opts.author;
  this.category = opts.category;
  this.launchedOn = opts.launchedOn;
  this.projectLink = opts.projectLink;
  this.body = opts.body;
};

Project.prototype.toHtml = function(){
  var $newProject = $('article.template').clone();
  $newProject.removeClass('template');

  $newProject.find('.project-body').html(this.body);
  $newProject.attr('data-category', this.category);
  $newProject.attr('data-author', this.author);
  $newProject.find('address').html(this.author);
  $newProject.find('h1').html(this.title);
  $newProject.find('a').attr('href', this.projectLink);
  $newProject.find('time[pubdate]').attr('datetime', this.launchedOn);
  $newProject.find('time[pubdate]').attr('title', this.launchedOn);

  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.launchedOn))/60/60/24/1000)+ ' days ago');

  $newProject.append('<hr>');

  return $newProject;
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
