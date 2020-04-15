
        const colorArr = ["Red", "Yellow", "Green", "Blue", "Orange", "Purple", "Chocolate", "Grey", "HotPink"];
        var guesses, displayed, numDisplayed;
        var timer, count;

        function onstart() {
            var message = document.getElementById("message");
            var html = "";

            // Restart all variables to empty before starting a game.
            window.clearInterval(timer);
            count = 0;
            guesses = [];
            displayed = [];
            message.innerHTML = "";
            document.getElementById("selected").innerHTML = "";
            numDisplayed = document.getElementById("numToMemorize").value;
            const numOptions = document.getElementById("numOptions").value;

            // Fill displayed[] with the random colors
            for (var i = 0; i < numDisplayed; i++) {
                displayed.push(colorArr[(Math.floor(Math.random() * numOptions))]);
            }
            // Create the Buttons the user can click on via HTML.
            for (i = 0; i < numOptions; i++) {
                html += '<div class="' + colorArr[i].toLowerCase() + '" onclick="select()" style="background-color:' + colorArr[i].toLowerCase() + '">' + colorArr[i] + '</div>';
            }
            document.getElementById("choiceButtons").innerHTML = html;
            timer = setTimeout(flashWhite, 200);
        }

        function select() {
            if (guesses.length < numDisplayed) {
                guesses.push(event.target.innerText.toLowerCase());
                buildSelected();
            }
            if (guesses.length == numDisplayed) {
                if (guesses.toString() == displayed.toString()) {
                    message.innerHTML = "Yes, Zacky Wins!";
                } else {
                    message.innerHTML = "You guessed: " + guesses + "<br>The answer:  " + displayed;
                }
            }
        }

        // Determine how quickly to flash the colors;
        function getSpeed() {
            var speed = 999;
            switch (document.getElementById("speed").value) {
                case "easy":
                    speed = 1500;
                    break;
                case "medium":
                    speed = 1000;
                    break;
                case "hard":
                    speed = 500;
                    break;
                case "crazy":
                    speed = 250;
                    break;
                default:
                    console.log("getSpeed returned invalid value: " + document.getElementById("speed").value);
            }
            return speed;
        }

        function buildSelected() {
            //console.log("Building array with guesses.len " + guesses.length + " and guesses " + guesses + " with e.t.cName " + event.target.className);
            if (guesses.length > numDisplayed) {
                return;
            }
            var newChoice = document.createElement("div");
            newChoice.classList.add("selected");
            newChoice.style.backgroundColor = guesses[guesses.length - 1]; // Give it the correct color style.
            newChoice.dataset.v = guesses.length - 1;
            //console.log("newChoice has IDX " + newChoice.dataset.v + " and bgColor: " + newChoice.style.backgroundColor);

            newChoice.onclick = function () {
                var iRemove = event.target.getAttribute("data-v");
                //console.log("pre-splice guess length: " + guesses.length + " and idx: " + iRemove + " event.target.data-v " + iRemove);
                if (guesses.length >= numDisplayed) {
                    message.innerHTML = "Select Speed";
                }
                guesses.splice(iRemove, 1); // Remove from array
                event.target.parentNode.removeChild(event.target);
                //console.log("post-plice guess length: " + guesses.length);
            }
            document.getElementById("selected").appendChild(newChoice);
        }


        function flashWhite() {
            document.getElementById("output").style.backgroundColor = "white";
            timer = setTimeout(flashColors, 100);
        }
        function flashColors() {
            if (count >= numDisplayed) {
                clearTimeout(timer);
                return;
            }
            document.getElementById("output").style.backgroundColor = displayed[count++];
            timer = setTimeout(flashWhite, getSpeed());
        }
