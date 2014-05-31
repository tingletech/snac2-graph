/* global vis */
$(function() {
  'use strict';
  var nodes = [];
  var edges = [];
  var EDGE_LENGTH = 250;
  var connectionCount = [];

  // randomly create some nodes
  var nodeCount = 20;
  // var cols = parseInt(Math.sqrt(nodeCount));
  for (var i = 0; i < nodeCount; i++) {
    nodes.push({
      id: i,
      label: 'Name Name' + i,
      title: 'This is a title this is a title' + i
    });

    connectionCount[i] = 0;

    // create links in a scale-free-network way
    if (i === 1) {
      var from = i;
      var to = 0;
          edges.push({
            from: from,
            to: to,
            length: EDGE_LENGTH
          });
          connectionCount[from]++;
          connectionCount[to]++;
        }
        else if (i > 1) {
          var conn = edges.length * 2;
          var rand = Math.floor(Math.random() * conn);
          var cum = 0;
          var j = 0;
          while (j < connectionCount.length && cum < rand) {
            cum += connectionCount[j];
            j++;
          }

          var ifrom = i;
          var ito = j;
          edges.push({
            from: ifrom,
            to: ito,
            length: EDGE_LENGTH
          });
          connectionCount[ifrom]++;
          connectionCount[ito]++;
        }
      }

      // Create a graph
      // var container = document.getElementById('mygraph');
      var container = $('*[data-snac-graph]')[0];
      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {
        stabilize: false,
        navigation: true,
        keyboard: true,
        nodes: {
          shape: 'box',
          radius: 24,
          fontSize: 24
        },
        edges: {
          width: 2
        }
      };
      new vis.Graph(container, data, options);
    }
);
