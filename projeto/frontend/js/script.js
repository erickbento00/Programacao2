$(function() { 
    

  function indexAnimals() {
      $.ajax({
          url: 'http://localhost:5000/index_animals',
          method: 'GET',
          dataType: 'json', 
          success: listAnimals, 
          error: function() {
              alert("erro ao ler dados, verifique o backend");
          }
      });
      function listAnimals (animals) {
    
        $('#tableContentAnimals').empty();
        showContent("tableAnimals");     
        for (var i in animals) { 
            line = `<tr id="line_${animals[i].id}">  
            <td> ${animals[i].animal_type} </td>
            <td> ${animals[i].code} </td>
            <td> ${animals[i].medicine} </td>
            <td>
            <a href=# id="${animals[i].id}" class ="delete_animal">
                <p class="badge badge-danger">excluir</p>
            </a>
            </td>
            </tr>`;
            $('#tableContentAnimals').append(line);
          }
      }
  }

  function showContent(identifier) {
      $("#tableAnimals").addClass('invisible');
      $("#initContent").addClass('invisible');
      $("#"+identifier).removeClass('invisible');      
  }

  $(document).on("click", "#linkIndexAnimals", function() {
      indexAnimals();
  });
  
  $(document).on("click", "#linkHome", function() {
      showContent("initContent");
  });

  $(document).on("click", "#btnCreateAnimal", function() {
      type = $("#imputType").val();
      code = $("#imputCode").val();
      medicine = $("#imputMedicine").val();
      var data = JSON.stringify({ animal_type: type, code: code, medicine: medicine });
      $.ajax({
          url: 'http://localhost:5000/create_animal',
          type: 'POST',
          dataType: 'json', 
          contentType: 'application/json', 
          data: data, 
          success: animalCreated, 
          error: createError
      });
      function animalCreated (dataReturned) {
          if (dataReturned.result == "ok") { 
              alert("Animal incluída com sucesso!");
              $("#campoType").val("");
              $("#campoCode").val("");
              $("#campoMedicine").val("");
          } else {
              alert(dataReturned.result + ":" + dataReturned.details);
          }            
      }
      function createError (dataReturned) {
          alert("ERROR: "+dataReturned.result + ":" + dataReturned.details);
      }
  });

  $('#modalCreateAnimal').on('hide.bs.modal', function (e) {
      if (! $("#tableAnimals").hasClass('invisible')) {
          indexAnimals();
      }
  });

  $(document).on("click", ".delete_animal", function() {
    var idAnimal = $(this).attr("id");
    $.ajax({
      url: `http://localhost:5000/delete_animal/${idAnimal}`,
      type: "DELETE",
      dataType: 'json',
      success: deleteAnimal,
      error: deleteError
    });

    function deleteAnimal(returnedData) {
      if (returnedData.result === "ok") {
        $(`#line_${idAnimal}`).fadeOut(0, () => {
        alert("Animal excluido com sucesso")
        });
      } else {
        alert(`ERROR: ${returnedData.result}: ${returnedData.datails}`);
      }
    }

    function deleteError(returnedData) {
      alert("Error: Search on back-end");
    }
  });

  showContent("initContent");
});

