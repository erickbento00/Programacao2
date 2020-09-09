$(function () {

    $.ajax({
      url: 'http://localhost:5000/index_veterinario',
      method: 'GET',
      dataType: 'json',
      success: listAnimals,
      error: function () {
        alert("Error: Search on back-end!");
      }
    });
  
    function listAnimals(animals) {
      for (var i in animals) {
        newLine = '<tr>' +
          '<td>' + animals[i].animal_type + '</td>' +
          '<td>' + animals[i].code + '</td>' +
          '<td>' + animals[i].medicine + '</td>' +
          '</tr>'
  
        $('#animalsTable').append(newLine);
      }
    }
  });