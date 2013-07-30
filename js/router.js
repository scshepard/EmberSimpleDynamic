/*
	Each route will have a controller and a template with the samne day as the route
	When you navigate to /markers, Ember.js will look for:
		App.MarkersRoute
		App.MarkersController
		markers template

	Emberjs will render the markers template into the {{outlet}} in the application template.

	<script type="text/x-handlebars" data-template-name="markers">
	<h4>markers title: {{title}}</h4>
	<ul>
	{{#each marker in controller}}
	<li>{{#linkTo 'marker' marker }}{{marker.Name}}{{/linkTo}}</li>
	{{/each}}
	</ul>
	</script>
	
	When you use a dynamic segment, the route's model will be based on the value of that
	segment provided by the user (marker)
	
	Here the route's name is marker, so Emberjs will look for:
		App.MarkerRoute
		App.MarkerController
		the marker template

	<script type="text/x-handlebars" data-template-name="marker">
	<h4>markers title: {{name}}</h4>
	<ul>
	<h4>{{Name}},{{Region}}</h4>
	</ul>
	</script>
*/

App.Router.map(function() {
		this.route('index',{path: '/'});
		this.resource('markers',{path: '/markers'});
		this.resource('marker',{path: '/markers/:marker_id'});

});

/*
	When your application boots, Emberjs will look for these objects:
	App.ApplicationRoute
	App.ApplicationController
	application template

	<script type="text/x-handlebars" data-template-name="application">
	<div>Application title: {{title}}</div>
	<div>info: {{info}}</div>
	<div>appName: {{appName}}</div>
	
	<h3>Hello, {{firstName}}</h3>
	{{outlet}}
	
	{{#linkTo 'index'}}Index{{/linkTo}}
	{{#linkTo 'markers'}}Markers{{/linkTo}}
	</script>

*/

/*
	Emberjs will invoke the router's hooks (i.e.: model) first, then renders the application template
*/
App.ApplicationRoute = Ember.Route.extend({
		model: function() {
			return ['SF bay', 'Navigation', 'Markers']
		},
		setupController: function(controller, model){
			controller.set('info',model);
		},
		renderTemplate: function(){
			var controller = this.controllerFor('application');
			this.render('application',{
					controller: controller
			});
		}
});

/*
	Controller for the application template (i.e.: template gets its properties from the controller
*/
App.ApplicationController = Ember.Controller.extend({
		firstName: 'steve',
		title: 'Markers Controller',
		appName: 'Markers'
});

/*
	Emberjs will then invoke the App.IndexRoute before rendering the template
*/
App.IndexRoute = Ember.Route.extend({
		model: function() {
			return ['Coed', 'Sat', 'at Park']
		},
		
		setupController: function(controller,model){
			controller.set('info',model);
		},
		
		renderTemplate: function(){
			var controller = this.controllerFor('index');
			this.render('index',{
					controller: controller
			});
		}
});

App.IndexController = Ember.Controller.extend({
		appName: 'index controller'
});

/*
	Emberjs will then invoke the App.MarkersRoute before rendering the template

*/

App.MarkersRoute = Ember.Route.extend({
		model: function() {
			return App.Marker.find();
		},

});

/*
	The route hander's model hook converts the dynamic :marker_id parameter into a model. The
	serialize hook converts a model object back into the URL parameters for this route

	<script type="text/x-handlebars" data-template-name="marker">
	<h4>markers title: {{name}}</h4>
	<ul>
	<h4>{{Name}},{{Region}}</h4>
	</ul>
	</script>
	
	Route: this.resource('marker',{path: '/markers/:marker_id'});

*/
