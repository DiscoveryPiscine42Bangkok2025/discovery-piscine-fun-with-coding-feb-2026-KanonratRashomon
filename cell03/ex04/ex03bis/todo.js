
$(document).ready(function() {
    const $listContainer = $('#ft_list');
    function addTaskToDOM(text) {
        const $taskDiv = $('<div></div>').text(text);

        $taskDiv.click(function() {
            const confirmDelete = confirm("Do you want to remove this TO DO?");
            if (confirmDelete) {
                $(this).remove(); 
                saveListToCookie(); 
            }
        });

        $listContainer.prepend($taskDiv);
    }

    window.openPrompt = function() {
        const todoText = prompt("Enter your new TO DO:");
        if (todoText && todoText.trim() !== "") {
            addTaskToDOM(todoText);
            saveListToCookie();
        }
    };


    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) == 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }


    function saveListToCookie() {
        const tasks = [];
        $listContainer.children().each(function() {
            tasks.push($(this).text());
        });
        const jsonString = JSON.stringify(tasks);
        setCookie("todo_list", jsonString, 7);
    }

    function loadListFromCookie() {
        const jsonString = getCookie("todo_list");
        if (jsonString !== "") {
            try {
                const tasks = JSON.parse(jsonString);
                tasks.reverse().forEach(taskText => {
                    addTaskToDOM(taskText);
                });
            } catch (e) {
                console.error("Error parsing cookie data", e);
            }
        }
    }
    loadListFromCookie();
});