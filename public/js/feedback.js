
class Feedback {
  constructor() {
    this.formEle = document.getElementById("form");
    this.emailEle = document.getElementById("email");
    this.phoneEle = document.getElementById("phone");
    this.addressEle = document.getElementById("address");
    this.nameEle = document.getElementById("name");
    this.commentsEle = document.getElementById("comments");
    this.statusEle = document.getElementById("status");
    this.loading = document.getElementById("loading");
  }
  setStatus(content) {
    this.removeLoading();
    this.statusEle.classList.add("statusActive");
    this.statusEle.innerHTML = content;
  }
  removeStatus() {
    this.statusEle.classList.remove("statusActive");
    this.statusEle.innerHTML = ``;
  }
  addLoading() {
    this.loading.classList.add("loadingActive");
  }
  removeLoading() {
    this.loading.classList.remove("loadingActive");
  }
  isEmpty(value) {
    return (value.trim().length == 0) ? true : false;
  }
  invalidLength(value, len) {
    return (value.length > len) ? true : false;
  }
  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  initialize() {
    this.formEle.reset();
    this.formEle.onsubmit = (e) => {
      // e.preventDefault();
      this.removeStatus();
      this.addLoading();
      this.validate();
    }
  }

  validate() {
    console.log("validate");
    let email = this.emailEle.value.trim();
    let phone = this.phoneEle.value.trim();
    let address = this.addressEle.value.trim();
    let comments = this.commentsEle.value.trim();
    let name = this.nameEle.value.trim();
    let hasErrors = false;
    let errors = `<h>ERROR</h>`;
    if (this.isEmpty(name)) {
      errors = `${errors} <p>Please fill the name</p>`;
      hasErrors = true;
    }
    if (this.invalidLength(name, 59)) {
      errors = `${errors} <p>Name cant exceed 60 characters</p>`;
      hasErrors = true;
    }
    if (this.isEmpty(phone)) {
      errors = `${errors} <p> Phone cant be empty </p>`;
      hasErrors = true;
    }
    if (this.invalidLength(address, 59)) {
      errors = `${errors} <p>Please fit your address within 10 characters</p>`;
      hasErrors = true;
    }

    if (!this.validateEmail(email)) {
      errors = `${errors} <p> Is that a valid email ? ? </p>`;
      hasErrors = true;
    }
    if (this.isEmpty(email)) {
      errors = `${errors} <p> Email can not be empty </p>`;
      hasErrors = true;
    }
    if (this.invalidLength(email, 319)) {
      errors = `${errors} <p>Email can not exceed 320 characters</p>`;
      hasErrors = true;
    }

    if (this.isEmpty(address)) {
      errors = `${errors} <p> Address cant be empty </p>`;
      hasErrors = true;
    }
    if (this.invalidLength(address, 59)) {
      errors = `${errors} <p>Please fit your address within 360 characters</p>`;
      hasErrors = true;
    }

    if (this.isEmpty(comments)) {
      errors = `${errors} <p>comments will be appreciated</p>`;
      hasErrors = true;
    }
    if (this.invalidLength(comments, 5999)) {
      errors = `${errors} <p>Thats a long comments,sorry comments can not exceed 6000 characters</p>`;
      hasErrors = true;
    }

    if (hasErrors) {
      this.setStatus(errors);
    } else {
      let data = {
          email: email,
          phone: phone,
          address: address,
          name: name,
          comments: comments
      }
      this.sendData(JSON.stringify(data));
    }
  }

  sendData(jsonData) {
    const url = "submit-feedback";
    let xhttp = new XMLHttpRequest();
    let that = this;

    
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText) {
          that.setStatus("Thank you ! We got your feedback, we look forward to hear more from you.");
          that.formEle.reset();
        } else {
          that.setStatus("Are you sure you entered valid data? Dont worry there might also be problem with our server. Why not give it another shot?");
        }
      }
    };
    
    console.log(jsonData);
    xhttp.send(jsonData);
  }

}

const fb = new Feedback();
fb.initialize();
