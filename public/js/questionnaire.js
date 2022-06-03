"use strict";

async function doFetchIt() {
  const response = await fetch("./json/questionnaire.json");
  const data = await response.json();

  const h2 = document.createElement("h2");
  h2.textContent = data.name;
  h2.setAttribute("class", "heading");
  window.data.appendChild(h2);

for (const i of data.questions) {
    const h3 = document.createElement("h3");
    h3.textContent = i.text;
    window.data.appendChild(h3);


    if(i.type === "text"){
      const x = document.createElement("INPUT");
      x.setAttribute("class", "textBox");
      window.data.appendChild(x);
      if(i.id === "name"){
        x.setAttribute("id", "firstQID");
      }

      else if(i.id === "quest"){
        x.setAttribute("id", "secondQID");
      }

      else if(i.id === "col"){
        x.setAttribute("id", "thirdQID");
      }
    }


    else if(i.type === "number"){
      const y = document.createElement("INPUT");
      y.setAttribute("class", "textBox");
      y.setAttribute("id", "fourthQID");
      window.data.appendChild(y);
    }


    else if (i.type === "single-select"){

      for (const o of i.options){

        const x = document.createElement("INPUT");
        x.setAttribute("type", "radio");
        x.setAttribute("id", "fifthQID");
        x.value = o;

        const y = document.createElement("LABEL");
        const t = document.createTextNode(o);
        y.appendChild(t);

        const div = document.createElement("div");
        div.style.height = "5px";
        div.appendChild(x);
        div.appendChild(y);
        document.getElementById("radioButton").appendChild(div);


        window.data.appendChild(x);
        window.data.appendChild(y);
        window.data.appendChild(div);
      }
    }


    else if (i.type === "multi-select"){
      for (const l of i.options){
        const x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        x.value = l;

        const y = document.createElement("LABEL");
        const t = document.createTextNode(l);
        y.appendChild(t);


        const div = document.createElement("div");
        div.style.height = "5px";
        div.appendChild(x);
        div.appendChild(y);
        document.getElementById("checkbox").appendChild(div);

        window.data.appendChild(x);
        window.data.appendChild(y);
        window.data.appendChild(div);
      }
    }


    /*Checks whether the user has answered the questions.*/
    const validate = event => {

      /*Uses variables from the validate event and submits the form*/
      const handleFormSubmit = event => {
        event.preventDefault();


        /*Sets the date and the time of the submission of the form for easier identification*/
        // For today's date:
        Date.prototype.today = function () {
          return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
        }

        // For the time now:
        Date.prototype.timeNow = function () {
          return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
        }

        const newDate = new Date();


        /*Retrieves information about the submission*/
        let info = {
          date: newDate.today(),
          time: newDate.timeNow()
        }
        /*Retrieves information about each question*/
        let firstQuestion = {
          id: "name",
          value: first
        }

        let secondQuestion = {
          id: "quest",
          value: second
        }

        let thirdQuestion = {
          id: "col",
          value: third
        }

        let fourthQuestion = {
          id: "velo",
          value: fourth
        }

        /*Gets answers from the radio buttons and the checkboxes*/
        let fifthQuestion = {
          id: "lord",
          value: fifth
        }


        let organizeSixthQData = {
          id: "langs",
          value: sixth
        }


        /*Appending the answers to the data*/
        const answers = [];
        answers.push(info);
        answers.push(firstQuestion);
        answers.push(secondQuestion);
        answers.push(thirdQuestion);
        answers.push(fourthQuestion);
        answers.push(fifthQuestion);
        answers.push(organizeSixthQData);

        const data = { answers };

        /*Gets the data and downloads it as a JSON file*/
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const anchorElem = document.getElementById('downloadFile');
        anchorElem.setAttribute("href", dataStr);
        anchorElem.setAttribute("download", "answers.json");


        //Saves the data to localStorage
        localStorage.setItem('Answers', JSON.stringify(data) );

        console.log(data);
      };

      event.preventDefault();

      const first = document.getElementById('firstQID').value;
      const second = document.getElementById('secondQID').value;
      const third = document.getElementById('thirdQID').value;
      const fourth = document.getElementById('fourthQID').value;

      const fifth = []

      document.querySelectorAll("input[type=radio]:checked").forEach((item) => {
        fifth.push(item.value);
      });

      const sixth = []

      document.querySelectorAll("input[type=checkbox]:checked").forEach((item) => {
        sixth.push(item.value);
      });

      if(first === "" || first === undefined || isNaN(first) === false){
        document.getElementById("check").innerHTML="Please answer the first question with letters.";
      }
      else if(second === "" || second === undefined || isNaN(second) === false){
        document.getElementById("check").innerHTML="Please answer the second question with letters.";
      }
      else if(third === "" || third === undefined || isNaN(third) === false){
        document.getElementById("check").innerHTML="Please answer the third question with letters.";
      }
      else if(fourth === "" || fourth === undefined || fourth === null || isNaN(fourth) === true){
        document.getElementById("check").innerHTML="Please answer the fourth question with numbers.";
      }
      else if(fifth == "" || fifth === undefined){
        document.getElementById("check").innerHTML="Please answer the fifth question.";
      }
      else if(sixth == "" || sixth === undefined){
        document.getElementById("check").innerHTML="Please answer the sixth question.";
      }
      else{
        document.getElementById("check").innerHTML="Submit successful. Click on Submit again to confirm that you want to access the download feature. Answers can be accessed through the local storage.";


        /*Make downloadable content visible after clicking the submit button*/
        const submit = document.getElementById("submitBtn");
        const download = document.getElementById("downloadFile");
        const downloadPermission = document.getElementById("permission");

        submit.onclick = function() {
          download.style.visibility = "visible";
          downloadPermission.style.visibility = "visible";
        }


        setTimeout(function(){
          document.getElementById('check').style.display = "none";
        },8000);

        const form = document.getElementsByClassName('submitForm')[0];
        form.addEventListener('submit', handleFormSubmit);

      }

    }


  const form = document.getElementsByClassName('submitForm')[0];
  form.addEventListener('submit', validate);

}

}


window.addEventListener('load', doFetchIt);