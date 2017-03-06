/*
_comments - Bool; [optional];
                Set this flag to true to prevent removing comments from @text ( minxml and mincss functions only. )

   Examples:
        vkbeautify.xml(text); // pretty print XML
        vkbeautify.json(text, 4 ); // pretty print JSON
        vkbeautify.css(text, '. . . .'); // pretty print CSS
        vkbeautify.sql(text, '----'); // pretty print SQL

        vkbeautify.xmlmin(text, true);// minify XML, preserve comments
        vkbeautify.jsonmin(text);// minify JSON
        vkbeautify.cssmin(text);// minify CSS, remove comments ( default )
        vkbeautify.sqlmin(text);// minify SQL

*/
(function(){function m(e){var b="    ";if(isNaN(parseInt(e)))b=e;else switch(e){case 1:b=" ";break;case 2:b="  ";break;case 3:b="   ";break;case 4:b="    ";break;case 5:b="     ";break;case 6:b="      ";break;case 7:b="       ";break;case 8:b="        ";break;case 9:b="         ";break;case 10:b="          ";break;case 11:b="           ";break;case 12:b="            "}e=["\n"];for(ix=0;100>ix;ix++)e.push(e[ix]+b);return e}function k(){this.step="    ";this.shift=m(this.step)}function p(e,b){return e.replace(/\s{1,}/g,
" ").replace(/ AND /ig,"~::~"+b+b+"AND ").replace(/ BETWEEN /ig,"~::~"+b+"BETWEEN ").replace(/ CASE /ig,"~::~"+b+"CASE ").replace(/ ELSE /ig,"~::~"+b+"ELSE ").replace(/ END /ig,"~::~"+b+"END ").replace(/ FROM /ig,"~::~FROM ").replace(/ GROUP\s{1,}BY/ig,"~::~GROUP BY ").replace(/ HAVING /ig,"~::~HAVING ").replace(/ IN /ig," IN ").replace(/ JOIN /ig,"~::~JOIN ").replace(/ CROSS~::~{1,}JOIN /ig,"~::~CROSS JOIN ").replace(/ INNER~::~{1,}JOIN /ig,"~::~INNER JOIN ").replace(/ LEFT~::~{1,}JOIN /ig,"~::~LEFT JOIN ").replace(/ RIGHT~::~{1,}JOIN /ig,
"~::~RIGHT JOIN ").replace(/ ON /ig,"~::~"+b+"ON ").replace(/ OR /ig,"~::~"+b+b+"OR ").replace(/ ORDER\s{1,}BY/ig,"~::~ORDER BY ").replace(/ OVER /ig,"~::~"+b+"OVER ").replace(/\(\s{0,}SELECT /ig,"~::~(SELECT ").replace(/\)\s{0,}SELECT /ig,")~::~SELECT ").replace(/ THEN /ig," THEN~::~"+b+"").replace(/ UNION /ig,"~::~UNION~::~").replace(/ USING /ig,"~::~USING ").replace(/ WHEN /ig,"~::~"+b+"WHEN ").replace(/ WHERE /ig,"~::~WHERE ").replace(/ WITH /ig,"~::~WITH ").replace(/ ALL /ig," ALL ").replace(/ AS /ig,
" AS ").replace(/ ASC /ig," ASC ").replace(/ DESC /ig," DESC ").replace(/ DISTINCT /ig," DISTINCT ").replace(/ EXISTS /ig," EXISTS ").replace(/ NOT /ig," NOT ").replace(/ NULL /ig," NULL ").replace(/ LIKE /ig," LIKE ").replace(/\s{0,}SELECT /ig,"SELECT ").replace(/\s{0,}UPDATE /ig,"UPDATE ").replace(/ SET /ig," SET ").replace(/~::~{1,}/g,"~::~").split("~::~")}k.prototype.xml=function(e,b){var a=e.replace(/>\s{0,}</g,"><").replace(/</g,"~::~<").replace(/\s*xmlns\:/g,"~::~xmlns:").replace(/\s*xmlns\=/g,
"~::~xmlns=").split("~::~"),k=a.length,f=!1,g=0,d="",c,l=b?m(b):this.shift;for(c=0;c<k;c++)if(-1<a[c].search(/<!/)){if(d+=l[g]+a[c],f=!0,-1<a[c].search(/--\x3e/)||-1<a[c].search(/\]>/)||-1<a[c].search(/!DOCTYPE/))f=!1}else-1<a[c].search(/--\x3e/)||-1<a[c].search(/\]>/)?(d+=a[c],f=!1):/^<\w/.exec(a[c-1])&&/^<\/\w/.exec(a[c])&&/^<[\w:\-\.\,]+/.exec(a[c-1])==/^<\/[\w:\-\.\,]+/.exec(a[c])[0].replace("/","")?(d+=a[c],f||g--):d=-1<a[c].search(/<\w/)&&-1==a[c].search(/<\//)&&-1==a[c].search(/\/>/)?f?d+=
a[c]:d+=l[g++]+a[c]:-1<a[c].search(/<\w/)&&-1<a[c].search(/<\//)?f?d+=a[c]:d+=l[g]+a[c]:-1<a[c].search(/<\//)?f?d+=a[c]:d+=l[--g]+a[c]:-1<a[c].search(/\/>/)?f?d+=a[c]:d+=l[g]+a[c]:-1<a[c].search(/<\?/)?d+(l[g]+a[c]):-1<a[c].search(/xmlns\:/)||-1<a[c].search(/xmlns\=/)?d+(l[g]+a[c]):d+a[c];return"\n"==d[0]?d.slice(1):d};k.prototype.json=function(e,b){b=b?b:this.step;return"undefined"===typeof JSON?e:"string"===typeof e?JSON.stringify(JSON.parse(e),null,b):"object"===typeof e?JSON.stringify(e,null,
b):e};k.prototype.css=function(e,b){var a=e.replace(/\s{1,}/g," ").replace(/\{/g,"{~::~").replace(/\}/g,"~::~}~::~").replace(/\;/g,";~::~").replace(/\/\*/g,"~::~/*").replace(/\*\//g,"*/~::~").replace(/~::~\s{0,}~::~/g,"~::~").split("~::~"),k=a.length,f=0,g="",d,c=b?m(b):this.shift;for(d=0;d<k;d++)/\{/.exec(a[d])?g+=c[f++]+a[d]:/\}/.exec(a[d])?g+=c[--f]+a[d]:(/\*\\/.exec(a[d]),g+=c[f]+a[d]);return g.replace(/^\n{1,}/,"")};k.prototype.sql=function(e,b){var a=e.replace(/\s{1,}/g," ").replace(/\'/ig,
"~::~'").split("~::~"),k=a.length,f=[],g=0,d=this.step,c=0,l="",h,n=b?m(b):this.shift;for(h=0;h<k;h++)f=h%2?f.concat(a[h]):f.concat(p(a[h],d));k=f.length;for(h=0;h<k;h++)a=f[h],c-=a.replace(/\(/g,"").length-a.replace(/\)/g,"").length,/\s{0,}\s{0,}SELECT\s{0,}/.exec(f[h])&&(f[h]=f[h].replace(/\,/g,",\n"+d+d+"")),/\s{0,}\s{0,}SET\s{0,}/.exec(f[h])&&(f[h]=f[h].replace(/\,/g,",\n"+d+d+"")),/\s{0,}\(\s{0,}SELECT\s{0,}/.exec(f[h])?(g++,l+=n[g]+f[h]):/\'/.exec(f[h])?(1>c&&g&&g--,l+=f[h]):(l+=n[g]+f[h],1>
c&&g&&g--);return l=l.replace(/^\n{1,}/,"").replace(/\n{1,}/g,"\n")};k.prototype.xmlmin=function(e,b){return(b?e:e.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"").replace(/[ \r\n\t]{1,}xmlns/g," xmlns")).replace(/>\s{0,}</g,"><")};k.prototype.jsonmin=function(e){return"undefined"===typeof JSON?e:JSON.stringify(JSON.parse(e),null,0)};k.prototype.cssmin=function(e,b){return(b?e:e.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"")).replace(/\s{1,}/g," ").replace(/\{\s{1,}/g,
"{").replace(/\}\s{1,}/g,"}").replace(/\;\s{1,}/g,";").replace(/\/\*\s{1,}/g,"/*").replace(/\*\/\s{1,}/g,"*/")};k.prototype.sqlmin=function(e){return e.replace(/\s{1,}/g," ").replace(/\s{1,}\(/,"(").replace(/\s{1,}\)/,")")};window.vkbeautify=new k})();



zsApp.controller('sunbursttraceController', ['$scope', 'WebAPI', 'codetracingService', 'd3Service', function($scope, WebAPI, codetracingService, d3Service) {

    // add the ng-json-prettify module to the app
    var app = angular.module('zsApp');

    var nodeIds = [];
    var tree = {};
    
    $scope.traceId = false; 
    
    $scope.loadedNodes = 0;
    $scope.expectedNodes = 0;
    
    $scope.selectionMode = true;
    
    $scope.maxLevel = 3;
    
    $scope.codeTracingList = [];
    
    $scope.total_time = "-/-";
    $scope.total_memory = "-/-";
    
    $scope.$watch('selectionMode', function() {
        if ($scope.selectionMode) $scope.loading1=false;
    });
    
    var updateCodeTracingList = function(codeTracingList) {
        $scope.codeTracingList = codeTracingList;
    }
    
    $scope.switchToSelectionMode = function() {
        $scope.selectionMode = true;
    }
    
    $scope.selectTrace = function(traceId) {
        $scope.selectionMode = false;
        nodeIds = [];
        tree = {};
        $scope.traceId = traceId;
        loadNodeChildren(tree, nodeIds, traceId, 0, -1, 0);
    }
    
    var resetBarValues = function() {
        $scope.line_nr = '-/-';
        $scope.time_incl = '-/-';
        $scope.time_excl = '-/-';
        $scope.detail_memory = '-/-';
    }
    
    var setBarValues = function(d) {
        $scope.line_nr = d.LINE_NUMBER;
        $scope.time_incl = Math.round(d.INCLUSIVE / 1000) + " ms";
        if ($scope.time_incl == '0 ms') $scope.time_incl = '<1 ms';
        $scope.time_excl = Math.round(d.EXCLUSIVE / 1000) + " ms";
        if ($scope.time_excl == '0 ms') $scope.time_excl = '<1 ms';
        $scope.detail_memory = Math.round(d.MEMORY_USAGE / 1024) + " KB";
    }
    
    var resetHeaderValues = function() {
        $scope.phpfunction = false;
        $scope.phpfile = false;
        $scope.phpobject = false;
    }
    
    var setHeaderValues = function(d) {
        $scope.phpfunction = d.TEXT_PREVIEW;
        $scope.phpfile = d.FILE_NAME;
        $scope.phpobject = d.THIS_OBJ_STR;
    }
    
    var preclick = function (d) {
        if (parseInt(d.CHILDREN_COUNT) == 0) {
            console.log("Node", d.ID, "is leaf!");
            return false;;
        }
        
        var alreadyLoadedChildren = false;
        nodeIds.some(function(nodeItem) {
            if (nodeItem.parentId == parseInt(d.ID)) {
                alreadyLoadedChildren = true;
                console.log("children of node", d.ID, "already loaded! Currently no reloading.");
                return true;
            }
            return false;
        });
        
        return !alreadyLoadedChildren;
    }
    
    var postclick = function (d) {
        
        d3.select("#loading").style("visibility", "");
        
        nodeId = parseInt(d.ID);
        var path = [];
        while (nodeId != -1) {
            nodeIds.some(function(nodeItem) {
                if (nodeItem.nodeId == nodeId) {
                    path.push(nodeItem.nodeId);
                    nodeId = nodeItem.parentId;
                    return true;
                }
                return false;
            });
        }
        
        childrentree = tree;
        path.pop();
        
        nodeId = parseInt(d.ID);
        var branchId;
        
        do {
            pathNodeId = path.pop();
            childrentree.children.some(function(nodeItem, index) {
                if (parseInt(nodeItem.ID) == pathNodeId) {
                    childrentree = childrentree.children[index];
                    branchId = parseInt(nodeItem.ID); 
                    return true;
                }
                return false
            });
        } while (nodeId != branchId);
       
        resetBarValues();
        loadNodeChildren(childrentree, nodeIds, $scope.traceId, d.ID, d.PARENT_ID, 3);
    }
    
    var mouseover = function(d) {
        setHeaderValues(d);
          
        if (typeof d.ID != 'undefined') {
            setBarValues(d);
        }
          else {
              d3.selectAll("path")
                  .transition()
                  .style("opacity", 1)
          }
    }
      
    var mouseleavePre = function (d) {
        resetBarValues();
        resetHeaderValues();
    }
      
    var mouseleavePost = function (d) {
    }
    
    var parseChildren = function (children, childrentree, traceId, nodeId, level) {
        nodeIds.forEach(function(nodeItem, index) {
            if (nodeItem.nodeId == nodeId) nodeItem.loaded = true; 
        });
        
        if (nodeId == 0) {
            $scope.request = children[0].TEXT_PREVIEW.replace('REQUEST STARTUP:', '').replace('REQUEST:', '').trim();
        }
        
        for (var i = 0; i < children.length; i++) {
            var childrenCount = parseInt(children[i].CHILDREN_COUNT);
            if (childrenCount > 0) {
                loadNodeChildren(children[i], nodeIds, traceId, children[i].ID, nodeId, level);
            }
            
            childrentree.children.push(children[i]);
        }

        var loadedCnt = 0;
        nodeIds.forEach(function(nodeItem, index) {
            if (nodeItem.loaded) loadedCnt++;
        });
        
        $scope.loadedNodes = loadedCnt;
        if (loadedCnt == nodeIds.length) {
            $scope.total_time = Math.round(tree.children[0].INCLUSIVE / 1000) + " ms";
            $scope.total_memory = Math.round(tree.children[0].MEMORY_USAGE / 1024) + " KB";
            
            d3Service.allNodesLoaded(tree.children[0]);
            $scope.loading1 = false;
        }
    }
    
    var setNodeAsLoaded = function (nodeId) {
        nodeIds.some(function(nodeItem, index) {
            if (nodeItem.nodeId != nodeId) return false;
            
            nodeItem.loaded = true;
            return true;
        });
    }
    
    var loadNodeChildren = function(childrentree, nodeIds, traceId, nodeId, parentId, level) {
        $scope.loading1 = true;

        nodeId = parseInt(nodeId);
        parentId = parseInt(parentId);
        
        var item = {
                "nodeId": nodeId,
                "parentId": parentId,
                "level": level,
                "loaded": false
        }
        nodeIds.push(item);
        $scope.expectedNodes = nodeIds.length;
        
        if (level > $scope.maxLevel) {
            setNodeAsLoaded(nodeId);
            return;
        }
        
        level++;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        
        childrentree.children = [];
        
        codetracingService.loadNodeChildren(traceId, nodeId, level, childrentree, parseChildren);
    }
    
    d3Service.clickPreCallback = preclick;
    d3Service.clickPostCallback = postclick;
    d3Service.mouseoverCallback = mouseover;
    d3Service.mouseleavePreCallback = mouseleavePre;
    d3Service.mouseleavePostCallback = mouseleavePost;
    
    resetBarValues();
    resetHeaderValues();
    
    codetracingService.getAllTraces(updateCodeTracingList);
}]);
