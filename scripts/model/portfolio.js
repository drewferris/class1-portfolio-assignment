(function(module) {

  function Project (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Project.all = [];

  Project.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS projects (' +
        'id INTEGER PRIMARY KEY, ' +
        'title VARCHAR(255) NOT NULL, ' +
        'author VARCHAR(255) NOT NULL, ' +
        'projectLink VARCHAR (255), ' +
        'category VARCHAR(20), ' +
        'launchedOn DATETIME, ' +
        'body TEXT NOT NULL);',
      callback
    );
  };

  Project.truncateTable = function(callback) {
    webDB.execute(
      'DELETE FROM projects;',
      callback
    );
  };

  Project.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO projects (title, author, projectLink, category, launchedOn, body) VALUES (?, ?, ?, ?, ?, ?);',
          'data': [this.title, this.author, this.projectLink, this.category, this.launchedOn, this.body],
        }
      ],
      callback
    );
  };

  Project.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM projects WHERE id = ?;',
          'data': [this.id]
        }
      ],
      callback
    );
  };

  Project.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'UPDATE projects SET title = ?, author = ?, projectLink = ?, category = ?, launchedOn = ?, body = ? WHERE id = ?;',
          'data': [this.title, this.author, this.projectLink, this.category, this.launchedOn, this.body, this.id]
        }
      ],
      callback
    );
  };

  Project.loadAll = function(rows) {
    Project.all = rows.map(function(ele) {
      return new Project(ele);
    });
  };

  Project.fetchAll = function(callback) {
    webDB.execute('SELECT * FROM projects ORDER BY launchedOn DESC', function(rows) {
      if (rows.length) {
        Project.loadAll(rows);
        callback();
      } else {
        $.getJSON('/data/projects.json', function(rawData) {
          rawData.forEach(function(item) {
            var project = new Project(item);
            project.insertRecord();
          });
          webDB.execute('SELECT * FROM projects', function(rows) {
            Project.loadAll(rows);
            callback();
          });
        });
      }
    });
  };

  Project.findWhere = function(field, value, callback) {
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM projects WHERE ' + field + ' = ?;',
          data: [value]
        }
      ],
      callback
    );
  };

  Project.allAuthors = function() {
    return Project.all.map(function(project) {
      return project.author;
    })
    .reduce(function(names, name) {
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  Project.allCategories = function(callback) {
    webDB.execute('SELECT DISTINCT category FROM projects;', callback);
  };

  Project.numCategoriesAll = function() {
    var categories = Project.all.map(function(project) {
      return project.categories;
    });
    return categories.length;
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

  Project.stats = function() {
    return {
      numProjects: Project.all.length,
      Authors: projects-template.allAuthors(),
    };
  };
  
  module.Project = Project;
})(window);
