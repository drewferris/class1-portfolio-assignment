(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.getJSON(
       'https://api.github.com/users/drewferris/repos' +
        '?per_page=10' +
        '&sort=updated',
      // type: 'GET',
      // headers: {'Authorization':'token ' + githubToken},
      // success:
      function(data){
        repos.all = data;
        callback(data);
      }
    );
  };




  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
