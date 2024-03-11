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
        var data = questions()
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
        return data[num]
    } else if(type == "ans") {
        var arr = JSON.parse(window.sessionStorage.getItem("arr"))
        var data = answers()
        var cur = arr[0]
        arr.shift()
        window.sessionStorage.setItem("arr", JSON.stringify(arr))
        return data[cur]
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

function questions() {
    var questions = [
        "fascism?01",
        "totalitarian?02",
        "corporatism?03", 
        "coup d'etat?04",
        "republican?05",
        "British Raj?06", 
        "Salt March?07", 
        "Nanjing Decade?08", 
        "Indian National Congress?09", 
        "Long March?10",  
        "Amritsar Massacre?11", 
        "millet?12",
        "plebiscite?13", 
        "hajj?14",
        "autocrat?15", 
        "surname?16",
        "veto?17", 
        "Zionism?18",
        "martial law?19", 
        "oligarchy?20"
    ]
    return questions
}

function answers() {
    var answers = [
        "The nazis?01",   
        "relating to a system of government that is centralized and dictatorial and requires complete subservience to the state.?02", 
        "Corporatism is a political system of interest representation and policymaking whereby corporate groups, such as agricultural, labour, military, business, scientific, or guild associations, come together on and negotiate contracts or policy on the basis of their common interests.?03", 
        "a sudden, violent, and unlawful seizure of power from a government; a coup.?04", 
        "conservative?05", 
        "period of direct British rule over the Indian subcontinent from 1858 until the independence of India and Pakistan in 1947.?06", 
        "When Gandhi broke the British Raj salt laws at 8:30 am on 6th April 1930, it sparked large-scale acts of civil disobedience against the salt laws by millions of Indians. Salt March. Gandhi leading his followers on the famous Salt March to abolish the British salt laws. Date. 12 March 1930 – 5 April 1930.?07", 
        "The Nanjing decade is an informal name for the decade from 1927 to 1937 in the Republic of China. It began when Nationalist Generalissimo Chiang Kai-shek took Nanjing from Zhili clique warlord Sun Chuanfang halfway through the Northern Expedition in 1927.?08", 
        "The Indian National Congress, colloquially the Congress Party or simply the Congress, is a political party in India with widespread roots. Founded in 1885, it was the first modern nationalist movement to emerge in the British Empire in Asia and Africa?09", 
        "The Long March was a military retreat by the Chinese Red Army from advancing Nationalist forces during the Chinese Civil War in 1934 through 1936. Several Red Army forces took various routes from Chinese Communist Party strongholds being encircled by the Kuomintang National Revolutionary Army. ?10", 
        "Jallianwala Bagh Massacre, incident on April 13, 1919, in which British troops fired on a large crowd of unarmed Indians in an open space known as the Jallianwala Bagh in Amritsar in the Punjab region (now in Punjab state) of India, killing several hundred people and wounding many hundreds more.?11", 
        "A millet is an autonomous self-governing religious community, each organized under its own laws and headed by a religious leader,?12", 
        "The direct vote of all the members of an electorate on an important public question such as a change in the constitution.?13", 
        "Hajj is an annual Islamic pilgrimage to Mecca, Saudi Arabia, the holiest city for Muslims. Hajj is a mandatory religious duty for Muslims that must be carried out at least once in their lifetime?14", 
        "a ruler who has absolute power.?15", 
        "a hereditary name common to all members of a family, as distinct from a given name.?16", 
        "a constitutional right to reject a decision or proposal made by a law-making body.?17", 
        "a movement for (originally) the re-establishment and (now) the development and protection of a Jewish nation in what is now Israel. It was established as a political organization in 1897 under Theodor Herzl, and was later led by Chaim Weizmann.?18", 
        "involves the temporary substitution of military authority for civilian rule ?19", 
        "a small group of people having control of a country, organization, or institution.?20"
    ]
    return answers
}