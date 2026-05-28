
        var cont = document.querySelector(".cont")
        var addbut = document.querySelector("#addbut")
        var tasks = document.querySelector(".tasks")
        var textspace = document.querySelector("#textspace")
        var emojies = document.querySelectorAll(".em")
        var sortbut = document.querySelector("#sortbut")
        var high = document.querySelector(".high")
        var mod = document.querySelector(".mod")
        var low = document.querySelector(".low")
        var priorities = document.querySelector(".priority")
        var colors = document.querySelectorAll(".colors p")
        var editval = null;
        var selectedPriority = null;
        var selectedEmoji = "";
        let editTarget = {};

        colors.forEach(color => {
            color.addEventListener("click", () => {
                if (color.classList.contains("red")) {
                    selectedPriority = "high";
                } else if (color.classList.contains("yellow")) {
                    selectedPriority = "mod";
                } else if (color.classList.contains("blue")) {
                    selectedPriority = "low";
                }
            });
        });
        var styles = ["#FFF8DC", "#DDEEFF", "#FFD6D6", "#E4F9E4", "#E0E0E0", "#ECE5F6"];

        emojies.forEach((emo, index) => {
            emo.addEventListener("click", () => {
                selectedEmoji = emo.innerHTML;
                cont.style.backgroundColor = styles[index];
                setTimeout(() => {
                    cont.style.backgroundColor = "transparent";
                }, 1000);
            });
        });



        const addmood = () => {
            var text = textspace.value.trim();

            if (text <= 0) {
                alert("pls enter some thing ....")
                return;
            }

            if (addbut.value === "Edit") {
                editval.target.previousElementSibling.previousElementSibling.innerHTML = text;
                editloc(text);
                addbut.value = "ADD"
                textspace.value = ""
                return;
            }
            if (!selectedPriority) {
                alert("Please select a priority!");
                return;
            }


            var taskbox = document.createElement("li")
            var tasktext = document.createElement("p")
            var textemoji = document.createElement("p")
            var textedit = document.createElement("button")
            var textdlt = document.createElement("button")



            tasktext.classList.add("task")
            textemoji.classList.add("emoji")
            textedit.classList.add("edit", "but")
            textdlt.classList.add("delete", "but")
            taskbox.classList.add("priority");

            tasktext.innerHTML = text;
            textedit.innerHTML = "edit";
            textdlt.innerHTML = "delete"
            textemoji.innerHTML = selectedEmoji

            //    tasks.appendChild(taskbox)
            taskbox.appendChild(tasktext)
            taskbox.appendChild(textemoji)
            taskbox.appendChild(textedit)
            taskbox.appendChild(textdlt)

            if (selectedPriority === "high") {
                high.appendChild(taskbox);
            } else if (selectedPriority === "mod") {
                mod.appendChild(taskbox);
            } else {
                low.appendChild(taskbox);
            }

            setloc(text)


            textspace.value = ""

        }

        const updatemood = (e) => {
            if (e.target.innerHTML === "delete") {
                e.target.parentElement.remove();
                delteloc(e.target.parentElement)
                textspace.value = ""
                return;

            }
            if (e.target.innerHTML === "edit") {
                textspace.value = e.target.previousElementSibling.previousElementSibling.innerHTML;
                addbut.value = "Edit";
                textspace.focus();
                editval = e;
                editval = e;
                editTarget = {
                    mood: e.target.previousElementSibling.previousElementSibling.innerHTML,
                    emoji: e.target.previousElementSibling.innerHTML,
                    priority: e.target.closest(".high") ? "high" :
                        e.target.closest(".mod") ? "mod" :
                            e.target.closest(".low") ? "low" : ""
                };

            }
        }

        const sortmood = () => {
            var sorttext = textspace.value.trim();
            var alltask = document.querySelectorAll(".tasks li")
            alltask.forEach((task) => {
                const tasktext = task.querySelector(".task").innerHTML;
                if (sorttext === "") {
                    task.style.opacity = "1";
                    task.style.pointerEvents = "auto";
                }
                else if (tasktext.startsWith(sorttext)) {
                    //   task.style.display = "flex"; 
                    task.style.opacity = "1";
                    task.style.pointerEvents = "auto";
                    task.style.filter = "none";


                }
                else {
                    task.style.opacity = "0.3";  // blurred feel
                    task.style.pointerEvents = "none"; // unclickable
                    task.style.filter = "grayscale(1)";

                }
            })



            // var filterdtask =  tasks.filter(task => task.startsWith(sorttext))
            // console.log(filterdtask);

        }

        textspace.addEventListener("input", () => {
            if (textspace.value.trim() === "") {
                const alltask = document.querySelectorAll(".tasks li");
                alltask.forEach((task) => {
                    task.style.opacity = "1";
                    task.style.pointerEvents = "auto";
                    task.style.filter = "none";
                });
            }
        });

        const setloc = (mood) => {
            var moods;
            if (localStorage.getItem("moods") === null) {
                moods = [];
            }
            else {
                moods = JSON.parse(localStorage.getItem("moods"))

            }
            moods.push({
                mood: mood,
                priority: selectedPriority,
                emoji: selectedEmoji
            });

            localStorage.setItem("moods", JSON.stringify(moods))

        }

        const getloc = () => {
            var moods;
            if (localStorage.getItem("moods") === null) {
                moods = [];
            }
            else {
                moods = JSON.parse(localStorage.getItem("moods"))
                moods.forEach((item) => {

                    const { mood, priority, emoji } = item;
                    var taskbox = document.createElement("li")
                    var tasktext = document.createElement("p")
                    var textemoji = document.createElement("p")
                    var textedit = document.createElement("button")
                    var textdlt = document.createElement("button")



                    tasktext.classList.add("task")
                    textemoji.classList.add("emoji")
                    textedit.classList.add("edit", "but")
                    textdlt.classList.add("delete", "but")
                    taskbox.classList.add(priority);

                    tasktext.innerHTML = mood;
                    textedit.innerHTML = "edit";
                    textdlt.innerHTML = "delete"
                    textemoji.innerHTML = emoji

                    //    tasks.appendChild(taskbox)
                    taskbox.appendChild(tasktext)
                    taskbox.appendChild(textemoji)
                    taskbox.appendChild(textedit)
                    taskbox.appendChild(textdlt)

                    if (priority === "high") {
                        high.appendChild(taskbox);
                    } else if (priority === "mod") {
                        mod.appendChild(taskbox);
                    } else {
                        low.appendChild(taskbox);
                    }
                })

            }


        }

        const delteloc = (mood) => {
            let moods;

            if (localStorage.getItem("moods") === null) {
                moods = [];
            } else {
                moods = JSON.parse(localStorage.getItem("moods"));
            }

            // Getting data from DOM card
            const motext = mood.children[0].innerHTML;
            const emoji = mood.children[1].innerHTML;

            let priority = "";
            if (mood.classList.contains("high")) priority = "high";
            else if (mood.classList.contains("mod")) priority = "mod";
            else if (mood.classList.contains("low")) priority = "low";

            // Find the matching object in moods array
            const index = moods.findIndex(item =>
                item.mood === motext &&
                item.emoji === emoji &&
                item.priority === priority
            );

            // Delete from array and update localStorage
            if (index !== -1) {
                moods.splice(index, 1);
                localStorage.setItem("moods", JSON.stringify(moods));
            }
        };


        const editloc = (newval) => {
            let moods = [];
            if (localStorage.getItem("moods") !== null) {
                moods = JSON.parse(localStorage.getItem("moods"));
            }

            const index = moods.findIndex(item =>
                item.mood === editTarget.mood &&
                item.emoji === editTarget.emoji &&
                item.priority === editTarget.priority
            );

            if (index !== -1) {
                moods[index].mood = newval;
                localStorage.setItem("moods", JSON.stringify(moods));
            } else {
                console.log("Item not found for editing");
            }
        };



        document.addEventListener("DOMContentLoaded", getloc)
        sortbut.addEventListener("click", sortmood);
        tasks.addEventListener("click", updatemood)
        addbut.addEventListener("click", addmood);

