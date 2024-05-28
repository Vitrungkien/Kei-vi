function post(data) {
  return {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify(data)};
} 
// <!--===============================================================================================-->
//START HANDLE SEARCH TICKET
handleSearchForm();

function handleSearchForm() {
    var searchKeywordBtn = document.querySelector('#searchBtn');
    var searchFormBtn = document.querySelector('#search-form-btn');
    // console.log(searchKeywordBtn && searchFormBtn);
    if(searchKeywordBtn && searchFormBtn) {
    
      searchKeywordBtn.onclick = function(e) {
          e.preventDefault();
          document.querySelector('input[name="startAddress"]').value = '';
          document.querySelector('input[name="endAddress"]').value = '';
          document.querySelector('input[name="startTime1"]').value = '';
  
          var keyword = document.querySelector('input[name="keyword"]').value;
          // console.log(keyword);
          let dataForm = {
              keyword
          }
  
          // console.log(dataForm);
          searchTicket(dataForm);
        }

        searchFormBtn.onclick = function(e) {
          e.preventDefault();
          document.querySelector('input[name="keyword"]').value = '';
          var startAddress = document.querySelector('input[name="startAddress"]').value;
          var endAddress = document.querySelector('input[name="endAddress"]').value;
          var startTime1 = document.querySelector('input[name="startTime1"]').value;
    
          let dataForm = {startAddress, endAddress, startTime1};
    
          searchTicket(dataForm);
        }
    }

}

function searchTicket(data) {
    fetch('http://localhost:8080/search-by-stop', post(data))
      .then(function(response) {
        return response.json();
      })
      .then(searchResult => {
        // console.log(searchResult.data);
        $('#productList').empty();
        handleRenderAllProducts(searchResult.data);
      })
      .catch(error => {
        console.error('Lỗi trong quá trình tìm kiếm:', error);
      });
}
//END HANDLE SEARCH TICKET
// <!--===============================================================================================-->







// <!--===============================================================================================-->
//HANDLE SIGN UP 
// handleSignUpForm();

function handleSignUpForm() {
    var signUpBtn = $('#signup-btn');
    if (signUpBtn.length) {
      signUpBtn.on("click", e => {
          e.preventDefault();
          let email = $('input[name="email"]').val();
          let password = $('input[name="password"]').val();
          let firstName = $('input[name="firstName"]').val();
          let lastName = $('input[name="lastName"]').val();
          let phoneNumber = $('input[name="phoneNumber"]').val();
  
          var dataForm = {email, password, firstName, lastName, phoneNumber};
          signUpFunc(dataForm);
      })
    }
}

function signUpFunc(data) {       
    fetch('http://localhost:8080/api/v1/auth/signup', post(data))
      .then(function(response) {
        return response.json();
      })
      .then(dataResponse => {	
        console.log(dataResponse);	
        window.location.href = "./signin.html"; 
      })
      .catch(error => {
        console.error('Lỗi trong quá trình đăng ký:', error);
      });
}
//END HANDLE SIGN UP
// <!--===============================================================================================-->









// <!--===============================================================================================-->
//START HANDLE SIGN IN
handleLoginForm();
        
function handleLoginForm() {
    var loginBtn = document.querySelector('#login-btn');
    if (loginBtn) {
      loginBtn.onclick = function(e) {
          e.preventDefault();
          var email = document.querySelector('input[name="email"]').value;
          var password = document.querySelector('input[name="password"]').value;
          var dataForm = {email, password};
  
          loginFunc(dataForm);
          return false;
      }
    }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = `${cname}=${cvalue};path=/;${expires}`;
  // document.cookie = `${cname}=${cvalue};domain=localhost;path=/`;
}

function loginFunc(data) {    
    fetch('http://localhost:8080/api/v1/auth/login', post(data))
      .then(function(response) {
        return response.json();
      })
      .then(dataResponse => {	
        var token = dataResponse.data["token"];
        setCookie('Authorization', token, 3);	
        window.location.href = "./index.html"; 
      })
      .catch(error => {
        console.error('Lỗi trong quá trình đăng nhập:', error);
      });
}
// END HANDLE SIGN IN
// <!--===============================================================================================-->
