handleSearchForm();

function handleSearchForm() {
    var searchKeywordBtn = document.querySelector('#searchBtn');
    searchKeywordBtn.onclick = function(e) {
        e.preventDefault();
        document.querySelector('input[name="startAddress"]').value = '';
        document.querySelector('input[name="endAddress"]').value = '';
        document.querySelector('input[name="startTime1"]').value = '';

        var keyword = document.querySelector('input[name="keyword"]').value;
        console.log(keyword);
        let dataForm = {
            keyword
        }

        console.log(dataForm);
        searchTicket(dataForm);
        return false;
    }

    var searchFormBtn = document.querySelector('#search-form-btn');
    searchFormBtn.onclick = function(e) {
      e.preventDefault();
      document.querySelector('input[name="keyword"]').value = '';
      var startAddress = document.querySelector('input[name="startAddress"]').value;
      var endAddress = document.querySelector('input[name="endAddress"]').value;
      var startTime1 = document.querySelector('input[name="startTime1"]').value;

      let dataForm = {startAddress, endAddress, startTime1};

      console.log(dataForm);
      searchTicket(dataForm);
      return false;
  }    



}

function searchTicket(data) {
    
    var options = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }

    // console.log(data);
    fetch('http://localhost:8080/search-by-stop', options)
      .then(function(response) {
        return response.json();
      })
      .then(dataResponse => {
        console.log(dataResponse);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
}
