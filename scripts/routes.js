page('/', portfolioController.loadAll, portfolioController.index);
page('/about', aboutController.index);
page('/stats', statsController.index);
page('/newProject', newProjectController.index);

page('/project/:id', portfolioController.loadById, portfolioController.index);

page('/category', '/');
page('/author', '/');

page('/author/:authorName', portfolioController.loadByAuthor, portfolioController.index);

page('/category/:categoryName', portfolioController.loadByCategory, portfolioController.index);

page();
