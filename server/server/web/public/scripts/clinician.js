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
        d.fields = 'name';
      }
    },

    columns: [
      {
        data: 'userID',
        defaultContent: ''
      },
      {
        data: 'Location',
        defaultContent: ''
      },
      {
        data: 'RawData',
        defaultContent: ''
      },
      {
        data: 'Sound',
        defaultContent: ''
      },
      {
        data: 'Describe',
        defaultContent: ''
      },
      {
        data: 'Feel',
        defaultContent: ''
      },
      {
        data: 'Sources',
        defaultContent: ''
      },
      {
        data: 'Comments',
        defaultContent: ''
      }

    ]
  });


});
