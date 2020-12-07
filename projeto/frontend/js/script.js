$(function() {


  function indexAnimals() {
      $.ajax({
          url: 'http://localhost:5000/index_animals',
          method: 'GET',
          dataType: 'json',
          success: listAnimals,
          error: function() {
              alert("erro ao ler animais, verifique o backend");
          }
      });
      function listAnimals (animals) {

        $('#tableContentAnimals').empty();
        showContent("animals");
        for (var i in animals) {
            line = `<tr id="line_${animals[i].id}">
            <td> ${animals[i].animal_type} </td>
            <td> ${animals[i].code} </td>
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
      $("#animals").addClass('d-none');
      $("#medicines").addClass('d-none');
      $("#recipes").addClass('d-none');
      $("#initContent").addClass('d-none');
      $("#"+identifier).removeClass('d-none');
  }

  $(document).on("click", "#linkIndexAnimals", function() {
      indexAnimals();
  });

  $(document).on("click", "#linkIndexMedicines", function() {
      indexMedicines();
  });

  $(document).on("click", "#linkIndexRecipes", function() {
      indexRecipes();
  });

  $(document).on("click", "#linkHome", function() {
      showContent("initContent");
  });

  $(document).on("click", "#btnCreateAnimal", function() {
      type = $("#imputType").val();
      code = $("#imputCode").val();
      var data = JSON.stringify({ animal_type: type, code: code });
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

  function indexMedicines() {
    $.ajax({
        url: 'http://localhost:5000/index_medicines',
        method: 'GET',
        dataType: 'json',
        success: listMedicines,
        error: function() {
            alert("erro ao ler medicamentos, verifique o backend");
        }
    });
    function listMedicines(medicines) {

      $('#tableContentMedicines').empty();
      showContent("medicines");
      for (var i in medicines) {
          line = `<tr id="line_${medicines[i].id}">
          <td> ${medicines[i].code} </td>
          <td> ${medicines[i].name_medicine} </td>
          <td> ${medicines[i].producer} </td>
          </tr>`;
          $('#tableContentMedicines').append(line);
        }
    }
  }

  function indexRecipes() {
    $.ajax({
        url: 'http://localhost:5000/index_recipes',
        method: 'GET',
        dataType: 'json',
        success: listRecipes,
        error: function() {
            alert("erro ao ler receitas, verifique o backend");
        }
    });
    function listRecipes(recipes) {
      $('#tableContentRecipes').empty();
      showContent("recipes");
      for (var i in recipes) {
          line = `<tr id="line_${recipes[i].id}">
          <td> ${recipes[i].quantity_medicine} </td>
          <td> ${recipes[i].description} </td>
          <td> ${recipes[i].animal.animal_type} </td>
          <td> ${recipes[i].animal.code} </td>
          <td> ${recipes[i].medicine.code} </td>
          <td> ${recipes[i].medicine.name_medicine} </td>
          <td> ${recipes[i].medicine.producer} </td>
          </tr>`;
          $('#tableContentRecipes').append(line);
        }
    }
  }
});