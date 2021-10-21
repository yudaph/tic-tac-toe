var len = 0
var turn = 0

var win = false

var x = []
var o = []
var board = []

$("#start").click(function() {
    len = $("#len").val()
    let table;
    for(var i = 0; i<len*len; i++){
        board[i] = "e"
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
    o = []
    board = []
})

$("#table").on('click','.space', function() {
    const index = $(this).data("id")
    if (win) {
        alert("please reset the game")
        return
    }
    if (board[index]!="e"){
        alert("grid already taken, please choice another place")
        return
    }
    const bool = turn%2 == 0
    const html = (bool)? "X" : "O"
    $(this).html(html)
    add(bool, index)
    check(bool, html)
    $("#pturn").html((!bool)? "X" : "O")
    turn++
    if (turn == len*len && !win){
        alert("DRAW")
        $("#reset").show()
    }
})

function add(bool, int) {
    board[int] = bool? "X" : "O"
    if(bool){
        x.push(int)
        return
    }
    o.push(int)
}

function check(bool, mark) {
    var player = (bool)? x : o
    if (player.length >=len) {
        for(var i = 0; i<player.length; i++){
            if (player[i]%len==0){
                if (checkHorizontal(player[i], mark)){
                        win = true
                        break
                }
            }
            if (player[i]<len){
                if(checkVertical(player[i], mark)){
                        win = true
                        break
                }
            }
            if(player[i]==0){
                if(checkCross(player[i], mark)){
                        win = true
                        break
                }
            }
            if(player[i]==len-1){
                if(checkCross2(player[i], mark)){
                        win = true
                        break
                }
            }
        }
    }
    if (win) {
        alert(`Player ${mark} Win`)
        $("#reset").show()
    }
}

function checkHorizontal(int = -1, mark = ""){
    var success = true
    for(let i = 1; i<len; i++){
        if (board[int+i] != mark) {
            success = false
            break
        }
    }
    return success
}

function checkVertical(int = -1, mark = ""){
    var success = true
    for(let i = 1; i<len; i++){
        if (board[int+(i*len)] != mark){
            success = false
            break
        }
    }
    return success
}

function checkCross(int = -1, mark = ""){
    var success = true
    for(let i = 1; i<len; i++){
        if(board[int+(i*len)+i] != mark){
            success = false
            break
        }
    }
    return success
}

function checkCross2(int = -1, mark = ""){
    var success = true
    for(let i = 1; i<len; i++){
        if(board[int+(i*len)-i] != mark){
            success = false
            break
        }
    }
    return success
}
