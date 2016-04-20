//FROM using this array so that categories filter didnt triple

// var categories = [];

//FROM portfolio.js lines 17-29 BEFORE project constructor
//USE was used when I was trying to use handlebars for putting my filters on to the html instead of using populateFilters in the portfolioView1.js

// var etag = '';

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

// $('#author-filter').append(a.toHtml('author'));
// if (categories.indexOf(a.category) === -1) {
//   $('#category-filter').append(a.toHtml('category'));
//   categories.push(a.category);
// }
// });

// projects.forEach(function(a){
//   $('#author-filter').append(a.toAuthors());
// });
//
// projects.forEach(function(a){
//   $('#category-filter').append(a.toCategories());
// });

//  FROM logic inside fetchALl

//         if (localStorage.etag === etag) {
//           Project.loadAll(JSON.parse(localStorage.projects));
//           projectView.initIndexPage();
//         } else {
//           Project.jsonfetch();
//         }
//       }
//     });
//   } else {
//     Project.jsonfetch();
//   }
// };

//  FROM old get request that was replaced by getAll
// Project.jsonfetch = function() {
//   $.ajax ({
//     type: 'GET',
//     dataType: 'json',
//     url: 'data/projects.json',
//     success: function(data, message, xhr) {
//
//
//       Project.loadAll(data);
//       localStorage.setItem('projects', JSON.stringify(data));
//       projectView.initIndexPage();
//       etag = (xhr.getResponseHeader('ETag'));
//       localStorage.setItem('etag', etag);
//     },
//     error: function(data, message, xhr){
//       console.log('url');
//     }
//   });
// };


//FROM index
//  <script id="author-template" type="text/x-handlebars-template">
//   <option value="{{author}}">{{author}}</option>
// </script>
// <script id="category-template" type="text/x-handlebars-template">
//   <option value="{{category}}">{{category}}</option>
// </script>
