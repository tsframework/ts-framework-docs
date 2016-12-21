var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    less = require('metalsmith-less'),
    dev = require("metalsmith-dev"),
    metallic = require('metalsmith-metallic');

var app = Metalsmith(__dirname)
    .use(less({
        pattern: "styles/app.less",
        render: { paths: ['src/styles'] }
    }))
    .use(collections({
        Documentation: {
            pattern: "doc/*.md"
        }
    }))
    .use(permalinks())
    .use(metallic())
    .use(markdown({
        "smartypants": true,
        "gfm": true,
        "tables": true
    }))
    .use(templates({
        engine: 'handlebars',
        partials: {
            header: 'partials/header',
            footer: 'partials/footer',
            docmenu: 'partials/docmenu'
        }
    }))
    .destination('./build');
app.build(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Site build complete!');
        }
});

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV != "production") {
	dev.watch(app, ["templates/**", "src/**"]);
	dev.serve(app);
}
