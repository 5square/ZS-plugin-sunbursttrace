<?php
/**
 * This file is a standard Zend Framework 2 configuration file. All the components 
 * of your plugin like controllers, models, view helpers, routes, etc have to be 
 * described below
 */
return array(
	// By default new controllers aren't accessible. Please define who may access 
	// the resource.
	'acl' => array(
		'route' => array(
			// key name has to be the same as the controller invokable name 
			// (skip the version number in the name for web API controllers names)
			'sunbursttrace' => array(
				// which roles are allowed to access the resource
				'role' => \Application\Module::ACL_ROLE_ADMINISTRATOR,
				// define specific controller actions, OR leave an empty array to allow all the actions
				'allowedMethods' => array(),
			),
		),
	),
	
	// Add an item to the main menu of the UI. 
	// The main menu definition is located at:
	// 	"<Zend Server Install Dir>/gui/config/autoload/navigation.global.config.php"
	// Find the right place in the main menu for your plugin, and add it in the same format.
	'navigation' => array(
		// the default menu (and currently the only one)
		'default' => array(
			// add the item under "administration" section 
			'codetracing' => array(
				// add your item under "pages" - Your plugin item will be displayed as a sub menu
				'pages' => array(
					array(
						'label' => 'Sunburst Trace',
						'route' => 'extensions',
						'url' => '/sunbursttrace',
						
						// define the template URL, where the HTML of the page will be located (Angular's template)
						// URL format:
						// 	/ZendServer/ModuleResource/<module name>/<path to the file in "public" folder" of the module>
						'templateUrl' => '/ZendServer/ModuleResource/sunbursttrace/templates/index.html',
						
						// define the name of the angular controller (on the client side)
						// This controller will be defined in a JavaScript file like:
						// zsApp.controller('exampleAngularModuleController', [..., function(...) {...}]);
						'angularController' => 'sunbursttraceController',
						
						// Define resources that will be loaded when the UI starts
						'resources' => array(
							// Defined javascript sources with all the angular's definitions
							'js' => array(
								'/ZendServer/ModuleResource/sunbursttrace/js/ng-prettyjson.min.js',
							    '/ZendServer/ModuleResource/sunbursttrace/js/d3.js',
								'/ZendServer/ModuleResource/sunbursttrace/js/index.js',
							    '/ZendServer/ModuleResource/sunbursttrace/js/services.codetracing.js',
							    '/ZendServer/ModuleResource/sunbursttrace/js/services.d3.js',
							),
							'css' => array(
								'/ZendServer/ModuleResource/sunbursttrace/css/index.css',
							),
						),
					),
				),
			),
		),
	),
);
