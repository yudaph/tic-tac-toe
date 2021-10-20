var len = 0
var turn = 0

var win = false

var x = []
var xv = []
var o = []
var ov = []

$("#start").click(function() {
    len = $("#len").val()
    let table;
    for(var i = 0; i<len*len; i++){
        xv[i]=false
        ov[i]=false
    }
    var index = 0
    for(var i = 0; i<len; i++){
        table += "<tr>"
        for(var ii = 0; ii<len; ii++){
            table += '<td class="space" data-id="'+index+'" style="width:'+(100/len)+'%">&nbsp;</td>'
            index++
        }
        table += "</tr>"
    }
    $("#table").html(table)
    $("#landing").hide()
    $("#game").show()
})

$("#reset").click(function() {
    $("#landing").show()
    $("#game").hide()
    $("#reset").hide()
    win = false
    turn = 0
    x = []
    xv = []
    o = []
    ov = []
})

$("#table").on('click','.space', function() {
    const index = $(this).data("id")
    if (win) {
        alert("please reset the game")
        return
    }
    if (xv[index] || ov[index]){
        alert("grid already taken, please choice another place")
        return
    }
    const bool = turn%2 == 0
    const html = (bool)? "X" : "O"
    $(this).html(html)
    add(bool, index)
    check(bool)
    $("#pturn").html((!bool)? "X" : "O")
    turn++
    if (turn == len*len){
        alert("DRAW")
        $("#reset").show()
    }
})

function add(bool, int) {
    if(bool){
        x.push(int)
        xv[int] = true
        return
    }
    o.push(int)
    ov[int]=true
}

function check(bool) {
    var player = (bool)? x : o
    var playerValue = (bool)? xv : ov
    if (player.length >=len) {
        for(var i = 0; i<player.length; i++){
            if (player[i]%len==0){
                if (checkHorizontal(player[i], playerValue)){
                        win = true
                        break
                }
            }
            if (player[i]<len){
                if(checkVertical(player[i], playerValue)){
                        win = true
                        break
                }
            }
            if(player[i]==0){
                if(checkCross(player[i], playerValue)){
                        win = true
                        break
                }
            }
            if(player[i]==len-1){
                if(checkCross2(player[i], playerValue)){
                        win = true
                        break
                }
            }
        }
    }
    if (win) {
        alert(`Player ${(bool)? "X" : "O"} Win`)
        $("#reset").show()
    }
}

function checkHorizontal(int = -1, array = []){
    var success = true
    for(let i = 1; i<len; i++){
        if (!array[int+i]) {
            success = false
            break
        }
    }
    return success
}

function checkVertical(int = -1, array = []){
    var success = true
    for(let i = 1; i<len; i++){
        if (!array[int+(i*len)]){
            success = false
            break
        }
    }
    return success
}

function checkCross(int = -1, array = []){
    var success = true
    for(let i = 1; i<len; i++){
        if(!array[int+(i*len)+i]){
            success = false
            break
        }
    }
    return success
}

function checkCross2(int = -1, array = []){
    var success = true
    for(let i = 1; i<len; i++){
        if(!array[int+(i*len)-i]){
            success = false
            break
        }
    }
    return success
}
