function initalize() {
    var arr = []
    window.sessionStorage.setItem("arr", JSON.stringify(arr))
    gen()
    gameloop()
}


function gameloop() {
    check()
    setTimeout(function() {gameloop()}, 10) 
}

function check() {
    var el = document.getElementsByClassName("checked")
    if(el.length > 2) {
        for(var i = 0; i < el.length; i++) {
            el[i].classList.remove('checked')
        }
    }
    if(el.length == 2) {
        var el1 = el[0]
        var el2 = el[1]
        var type1
        var type2
        if(el1.id.includes('que')) {
            type1 = "question"
        } else {
            type1 = "answer"
        }
        if(el2.id.includes('que')) {
            type2 = "question"
        } else {
            type2 = "answer"
        }

        if(type1 == type2) {
            el1.classList.add('wrong')
            el2.classList.add('wrong')
            setTimeout(function() {
                el1.classList.remove('wrong')
                el2.classList.remove('wrong')
                el1.classList.remove('checked')
                el2.classList.remove('checked')
                el1.classList.add("hidden")
                el2.classList.add('hidden')
            }, 1000);
            return
        }
        var id1 = el1.id
        var id2 = el2.id
        var num1 
        var num2
        if(type1 == "question") {
            num1 = id1.split('n')
            num1 = num1[1]
        } else {
            num1 = id1.split('r')
            num1 = num1[1]
        }
        if(type2 == 'question') {
            num2 = id2.split('n')
            num2 = num2[1]
        } else {
            num2 = id2.split('r')
            num2 = num2[1]
        }
        if(num1 == num2) {
            el1.classList.remove("checked")
            el2.classList.remove("checked")
            el1.classList.add("complete")
            el2.classList.add("complete")
        } else {
            el1.classList.add('wrong')
            el2.classList.add('wrong')
            setTimeout(function() {
                el1.classList.remove('checked')
                el2.classList.remove('checked')
                el1.classList.add("hidden")
                el2.classList.add('hidden')
                el1.classList.remove('wrong')
                el2.classList.remove('wrong')
            }, 1000);
        }
    }   
}

function gen() {
    var con = document.getElementById("board")
    //gen squares
    for(var i = 0; i < 20; i++) {
        var el = document.createElement("div")
        el.classList.add("box")
        el.id = i
        con.appendChild(el)
    }
    //poputalte squares
    //questions
    for(var i = 0; i < 10; i++) {   
        var check = 0
        var iter = 0
        while(check == 0 && iter < 100) {
            iter++
            var num = Math.floor(Math.random() * (20 - 1) + 1)
            var con = document.getElementById(num)
            if(con.children.length < 1) {
                check = 1
            }
        }
        var el = document.createElement("h3")
        el.style.width = "100%"
        el.style.height = "100%"
        var json = readJ('que')
        var num = json.split("?")
        json = num[0]
        num = num[1]
        if(num[0] == "0") {
            num = num.charAt(1)
        }
        el.innerHTML = json + "?"
        el.classList.add("que")
        el.classList.add("hidden")
        el.style.textAlign = "center"
        el.draggable = true
        el.id = "question" + num
        el.addEventListener("click", (e) => click(e))
        con.appendChild(el)
    }
    //answers
    for(var i = 0; i < 10; i++) {
        var check = 0
        var iter = 0
        while(check == 0 && iter < 100) {
            var num = Math.floor(Math.random() * 20)
            var con = document.getElementById(num)
            if(con.children.length < 1) {
                check = 1
            }
        }
        var el = document.createElement("h3")
        el.style.width = "100%"
        el.style.height = "100%"
        var json = readJ('ans')
        var num = json.split("?")
        json = num[0]
        num = num[1]
        if(num[0] == "0") {
            num = num.charAt(1)
        }
        el.innerHTML = json + "."
        el.style.textAlign = "center"
        el.classList.add('ans')
        el.classList.add("hidden")
        el.draggable = true
        el.id = "answer" + num
        el.addEventListener("click", (e) => click(e))
        con.appendChild(el)
    }
}

function readJ(type) {
    var arr = JSON.parse(window.sessionStorage.getItem("arr"))
    if(type == "que") {
        fetch('QnA.json')
        .then(response => response.json())
        .then(data => window.sessionStorage.setItem("data", JSON.stringify(data)))
        .catch(error => error);
        var data = JSON.parse(window.sessionStorage.getItem("data"))
        var check = 1
        var iter = 0
        var num
        while(check == 1 && iter < 100) {
            iter++
            num = Math.floor(Math.random() * (20 - 0) + 0)
            if(!arr.includes(num)) {   
                arr.push(num)   
                check = 0
            }
        }
        window.sessionStorage.setItem("arr", JSON.stringify(arr))
        return data.questions[num]
    } else if(type == "ans") {
        fetch('QnA.json')
        .then(response => response.json())
        .then(data => window.sessionStorage.setItem("data", JSON.stringify(data)))
        .catch(error => error);
        var arr = JSON.parse(window.sessionStorage.getItem("arr"))
        var data = JSON.parse(window.sessionStorage.getItem("data"))
        var cur = arr[0]
        arr.shift()
        window.sessionStorage.setItem("arr", JSON.stringify(arr))
        return data.answers[cur]
    }
}

function click(ev) {
    var el = ev.target
    if(el.classList.contains("checked")) {
        el.classList.remove('checked')
        el.classList.add('hidden')
    } else {
        el.classList.add('checked')
        el.classList.remove("hidden")
    }
}

function checkForDuplicates(array) {
    let valuesAlreadySeen = []
    for(let i = 0; i < array.length; i++) {
        let value = array[i]
        if (valuesAlreadySeen.indexOf(value) != -1) {
            return true
        }
        valuesAlreadySeen.push(value)
    }
    return false
}