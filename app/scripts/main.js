/* global vis, sample */
$(function() {
  'use strict';
  var nodes = [];
  var edges = [];

  // loop once to set up nodes
  $.each(sample, function( index, value ) {
    nodes.push({
      id: value.id,
      label: value.name
    });
  });

  // loop again for edges
  $.each(sample, function( index, value ) {
    $.each(value.adjacencies, function( index, neighbor ) {
      edges.push({
        from: value.id,
        to: neighbor,
        style: 'arrow-center',
        length: 250
      });
    });
  });

  // Create a graph
  var container = $('*[data-snac-graph]')[0];
  var myname = $(container).data('snacGraph').identity;
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    physics: {barnesHut: {centralGravity: 0, springLength: 225, gravitationalConstant: -10725}},
    // configurePhysics:true,
    stabilize: false,
    navigation: true,
    keyboard: true,
    nodes: {
      shape: 'dot',
      fontSize: 16,
      radius: 20
    },
    edges: {
    }
  };
  var graph = new vis.Graph(container, data, options);

  // jquery ui dialog
  var dialog = $( '#dialog' );
  dialog.dialog({
    title: myname,
    position: { my: 'right top', at: 'right top' }
  });

  // add event listener
  graph.on('select', function(properties) {
    var label = graph.nodes[properties.nodes[0]].label;
    dialog[0].innerHTML += 'selection: ' + JSON.stringify(label) + '<br>';
  });

});
