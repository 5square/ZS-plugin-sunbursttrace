<?php
/**
 * Example Module's entry point (standard ZF2 Module.php)
 * The namespace should be the same as the module's folder name
 */
namespace sunbursttrace;

use Zend\Mvc\MvcEvent;

class Module {

	public function getConfig() {
		return include __DIR__ . '/config/module.config.php';
	}
	
}
