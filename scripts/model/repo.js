(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.get('/github/users/drewferris/repos' +
        '?per_page=100' +
        '&sort=updated')
      .done(function(data) {
        repos.all = data;
      })
      .done(callback);
  };


  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
