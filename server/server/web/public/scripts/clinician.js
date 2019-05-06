'use strict';
let table;
$(document).ready(function() {
  table = $('#table').DataTable({
    processing: true,
    serverSide: true,
    scrollX: true,
    scrollY: '500px',
    scrollCollapse: true,
    lengthChange: false,
    dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print', 'colvis'
    ],
    ajax: {
      url: '/api/table/measurements',
      data: function (d) {
        d.fields = 'userID Location RawData Sound Describe Feel Sources Comments';
      }
    },

    columns: [
      {
        data: 'userID',
        defaultContent: ''
      },
      {
        data: 'rawData',
        defaultContent: '',
        render: function (data, type, row) {
          return '<span>Min:'+ data['min'] + '\n' +
            'Max:'+ data['max'] + '\n' +
            'Avg:'+ data['average'] + '\n' +
            'Median' + data['median'] + '</span>';
        }
      },
      {
        data: 'location',
        defaultContent: '',
        render: function (data, type, row) {
          return '<span>Longitude:'+ data['lang'] + '\n' +
            'Latitude'+ data['lat'] + '</span>';
        }

      },
      {
        data: 'loud',
        defaultContent: ''
      },
      {
        data: 'describe',
        defaultContent: ''
      },
      {
        data: 'feel',
        defaultContent: ''
      },
      {
        data: 'sources',
        defaultContent: ''
      },
      {
        data: 'words',
        defaultContent: ''
      }

    ]
  });


});
