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
  var template = Handlebars.compile($('#projects-template').text());
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
