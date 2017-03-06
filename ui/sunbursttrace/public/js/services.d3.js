zsApp.factory('d3Service', function() {

    //Dimensions of sunburst.
    var width = 960,
        height = 600,
        radius = Math.min(width, height) / 2;

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.sqrt()
        .range([0, radius]);

    var color = d3.scale.category20c();

    var svg;

    var partition = d3.layout.partition()
        .sort(null)
        .value(function(d) { return 1; });

    var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

    //Keep track of the node that is currently being displayed as the root.
    var node;

    d3.select(self.frameElement).style("height", height + "px");
    
    var executionFlowStack = [];
    
    var d3Api = {
            mouseoverCallback: function() {},
            mouseleavePreCallback: function() {},
            mouseleavePostCallback: function() {},
            clickPreCallback: function() {},
            clickPostCallback: function() {},
    };
    
    d3Api.setGraphData = function(root) {
        if (root.ID <= 0) return;
        
        d3.selectAll('svg').remove();
        svg = d3.select("#chart").append("svg:svg")
            .attr("width", width)
            .attr("height", height)
            .append("svg:g")
            .attr("id", "container")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
        node = root;
        d3Api.createVisualization(root);
        d3.select("#loading").style("visibility", "hidden");
    }
    
    d3Api.createVisualization = function (json) {
        var nodes = partition.value(function(d) { 
            return d.INCLUSIVE; 
        }).nodes(json);

        var path = svg.data([json]).selectAll("path")
            .data(nodes)
            .enter().append("svg:path")
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style("opacity", 1)
            .style("fill", function(d) { 
                if (node == d && !d.children) return color(executionFlowStack[executionFlowStack.length - 1].text); 
                else return color(((d.children || d.CHILDREN_COUNT > 0) ? d : d.parent).TEXT_PREVIEW);
            })
            .on("click", d3Api.click)
            .on("mouseover", d3Api.mouseover)
            .each(d3Api.stash);
          
        d3.select("#container").on("mouseleave", d3Api.mouseleave);
        
        d3.select("path").on('click', function(d) {
            getDataNew(executionFlowStack.pop())
        });
          
        d3.selectAll("input").on("change", function change() {
            var value;
            switch (this.value) {
                case 'memory':
                    value = function(d) { return d.MEMORY_USAGE; };
                    break;
                default:    
                    value = function(d) { return d.INCLUSIVE; }
            }

            nodes = partition.value(value).nodes(json);
            path
                .data(nodes)
                .transition()
                .duration(1000)
                .attrTween("d", d3Api.arcTweenData);
        });
    }
    
    d3Api.allNodesLoaded = function(d) {
        executionFlowStack.push({'id': d.ID, 'parent': 0, 'text': d.TEXT_PREVIEW});

        d3Api.setGraphData(d);
    }

    d3Api.click = function(d) {
        if (!d3Api.clickPreCallback(d)) return;
    
        var lastItem = executionFlowStack[executionFlowStack.length - 1];
        var currNode = d;
        var tmpStack = [];
        do {
            if (tmpStack.length > 0) currNode = currNode.parent;
            
            tmpStack.push({
            'id' : currNode.ID,
            'parent' : currNode.PARENT_ID,
            'text' : currNode.TEXT_PREVIEW
            })
        } while (lastItem.id != currNode.PARENT_ID);
    
        executionFlowStack = executionFlowStack.concat(tmpStack.reverse());
    
        d3Api.clickPostCallback(d);
    }
        
    d3Api.mouseover = function(d) {
        d3Api.mouseoverCallback(d);
        
        var sequenceArrayId = d3Api.getAncestorsId(d);
        // Fade all the segments.
        d3.selectAll("path")
            .style("opacity", 0.3);
    
        // Then highlight only those that are an ancestor of the current segment.
        svg.selectAll("path")
            .filter(function(node) {
                return (sequenceArrayId.indexOf(node.ID) >= 0 || (typeof node.ID == 'undefined'));
            })
            .style("opacity", 1);
    }
    
    d3Api.mouseleave = function (d) {
        d3Api.mouseleavePreCallback(d);

        // Deactivate all segments during transition.
        d3.selectAll("path").on("mouseover", null);

        // Transition each segment to full opacity and then reactivate it.
        d3.selectAll("path")
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .each("end", function() {
                d3.select(this).on("mouseover", d3Api.mouseover);
            });
        
        d3Api.mouseleavePostCallback(d);
    }

    // When switching data: interpolate the arcs in data space.
    d3Api.arcTweenData = function (a, i) {
        var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
        function tween(t) {
            var b = oi(t);
            a.x0 = b.x;
            a.dx0 = b.dx;
            return arc(b);
        }
        if (i == 0) {
           // If we are on the first arc, adjust the x domain to match the root node
           // at the current zoom level. (We only need to do this once.)
           var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
           return function(t) {
               x.domain(xd(t));
               return tween(t);
           };
        } else {
            return tween;
        }
    }
    
    // Given a node in a partition layout, return an array of all of its ancestor
    // nodes, highest first, but excluding the root.
    d3Api.getAncestorsId = function (node) {
        var path = [];
        var current = node;
        while (current.parent) {
            path.unshift(current.ID);
            current = current.parent;
        }
        return path;
    }
    
    // Setup for switching data: stash the old values for transition.
    d3Api.stash = function (d) {
        d.x0 = d.x;
        d.dx0 = d.dx;
    }

    return d3Api;
});
