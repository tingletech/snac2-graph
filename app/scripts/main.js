/* global vis, sample */
$(function() {
  'use strict';
  var nodes = [];
  var edges = [];

  $.each(sample, function( index, value ) {
    nodes.push({
      id: value.id,
      label: value.name
    });
  });

  $.each(sample, function( index, value ) {
    $.each(value.adjacencies, function( index, neighbor ) {
      edges.push({
        from: value.id,
        to: neighbor,
        style: 'arrow',
        length: 250
      });
    });
  });

  // Create a graph
  // var container = document.getElementById('mygraph');
  var container = $('*[data-snac-graph]')[0];
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
  new vis.Graph(container, data, options);
});
