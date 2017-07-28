'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'WAI Website Assets');

fractal.components.engine('@frctl/nunjucks');
fractal.components.set('default.preview', '@preview');
fractal.components.set('default.status', null);
fractal.components.set('ext', '.html');
/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'documentation'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));

/* Set the static HTML build destination */
fractal.web.set('builder.dest', path.join(__dirname, 'docs'));

fractal.cli.command('check-errors', function(opts, done){
    process.on('unhandledRejection', () => {}); // workaround for poor error catching in the views!
    fractal.load().then(src => {
        for (let comp of fractal.components.flatten()) {
            comp.render().then(html => {
                this.console.success(`@${comp.handle}`);
            }).catch(err => {
                this.console.error(`@${comp.handle} - ${err.message} (${comp.viewPath})`);
            });
        }
    });
    done();
});