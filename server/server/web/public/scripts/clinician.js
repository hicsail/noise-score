'use strict';
let table;
let length;
$(document).ready(function() {
  table = $('#table').DataTable({
    initComplete: function(settings, json){
      let info = this.api().page.info();
      length = parseInt(info.recordsDisplay);
    },
    info: false,
    processing: true,
    serverSide: true,
    scrollX: true,
    paging: true,
    pagingType: "full_numbers",
    lengthMenu: [[10, 25, 50, length], [10, 25, 50, "All"]],
    pageLength: 10,
    scrollCollapse: true,
    dom: 'Blfrtip',
    buttons: [
      { extend: 'csv', exportOptions: { modifier: { search: 'applied', order: 'applied' } } },
      { extend: 'excel', exportOptions: { modifier: { search: 'applied', order: 'applied' } } },
      { extend: 'pdf', exportOptions: { modifier: { search: 'applied', order: 'applied' } } },
      { extend: 'print', exportOptions: { modifier: { search: 'applied', order: 'applied' } } },
      'colvis'
    ],
    ajax: {
      url: '/api/table/measurements',
      data: function (d) {
        d.fields = 'userID Location RawData Sound Describe Feel Place Sources Comments';
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
        data: 'place',
        defaultContent: ''
      },
      {
        data: 'sources',
        defaultContent: ''
      },
      {
        data: 'words',
        defaultContent: ''
      },
      {
        data: 'date',
        defaultContent: ''
      }

    ]
  });


});
