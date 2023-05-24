var submit = document.getElementById("submit");
var noof = document.getElementById("no");
var approach = document.getElementById("approach");
var board = document.getElementById("board");
submit.addEventListener("click",display);
class fcfs{
    constructor(pid,at,bt){
        this.pid = pid;
        this.at = at;
        this.bt = bt;
        this.wt = 0;
        this.tat = 0;
        this.ct = 0;
    }
}
function display(){
    document.getElementById("first").style.display = "None";
    var n = noof.value;
    var div = document.createElement("div");
    board.appendChild(div); 
    div.classList.add("inp");
    div.id="inp";
    var h = document.createTextNode("Calculate");
    var cal = document.createElement("button");
    cal.appendChild(h)
    cal.addEventListener("click",f);
    for(var i=0;i<n;i++){ 
        var subdiv = document.createElement("div");
        subdiv.classList.add("subdiv");  
        var pid = document.createElement("label").appendChild(document.createTextNode((i+1)+") Process id : "));
        var pidinp = document.createElement("input");
        pidinp.id = "pid"+(i+1);
        var at = document.createElement("label").appendChild(document.createTextNode(" Arrival Time : "));
        var atinp = document.createElement("input");
        atinp.id = "at"+(i+1);
        var bt = document.createElement("label").appendChild(document.createTextNode(" Burst Time : "));
        var btinp = document.createElement("input");
        btinp.id = "bt"+(i+1);
        subdiv.appendChild(pid);
        subdiv.appendChild(pidinp);
        subdiv.appendChild(at);
        subdiv.appendChild(atinp);
        subdiv.appendChild(bt);
        subdiv.appendChild(btinp);
        div.appendChild(subdiv);
    }
    div.appendChild(cal)
}
function f(){
    var lt = []
    var n = Number(noof.value)
    for(var i=0;i<n;i++){
        lt.push(NaN);
    }
    console.log(lt);
    for(var i=0;i<n;i++){
        var pid = Number(document.getElementById("pid"+(i+1)).value);
        var atime = Number(document.getElementById("at"+(i+1)).value);
        var btime = Number(document.getElementById("bt"+(i+1)).value);
        var obj = new fcfs(pid,atime,btime);
        lt[i] = obj;
    }
    displayTheOutput(lt);
}
function avgCompilationTime(lt){
    var tct = 0;
    for(var i=0;i<lt.length;i++){
        tct += lt[i].bt;
        lt[i].ct = tct;
    }
    return tct/lt.length
}
function getTurnAroundTime(lt){
    var tat = 0;
    var avgtat = 0;
    for(var i=0;i<lt.length;i++){
        tat = lt[i].ct-lt[i].at;
        lt[i].tat = tat;
        avgtat += tat;
    }
    return avgtat/lt.length;
}
function avgWaitingTime(lt){
    var twt=0;
    var wtlt = [];
    for(var i=0;i<lt.length-1;i++){
        twt = lt[i].tat - lt[i].bt;
        wtlt.push(twt);
    }
    for(var i = 0;i<lt.length;i++){
        lt[i].wt = wtlt[i];
    }
    const sum = wtlt.reduce((partialSum, a) => partialSum + a, 0);
    return sum/lt.length
}
function displayTheOutput(lt){
    var avgct = avgCompilationTime(lt);
    var avgtat = getTurnAroundTime(lt);
    var avgwt = avgWaitingTime(lt);
    document.getElementById("inp").style.display = "None";
    var table = document.createElement("div");
    table.id = "table";
    board.appendChild(table);
    var tble = document.createElement("table");
    var heading = document.createElement("tr");
    heading.id="heading";
    var sno = document.createElement("th");
    sno.appendChild(document.createTextNode("S.no"))
    var pID = document.createElement("th");
    pID.appendChild(document.createTextNode("Processes ID"));
    var atime = document.createElement("th");
    atime.appendChild(document.createTextNode("Arrival Time"));
    var btime = document.createElement("th");
    btime.appendChild(document.createTextNode("Burst Time"));
    var wtime = document.createElement("th");
    wtime.appendChild(document.createTextNode("Waiting Time"));
    var tatime = document.createElement("th");
    tatime.appendChild(document.createTextNode("Turn Around Time"));
    var ctime = document.createElement("th");
    ctime.appendChild(document.createTextNode("Compilation Time"));
    heading.appendChild(sno)
    heading.appendChild(pID);
    heading.appendChild(atime);
    heading.appendChild(btime);
    heading.appendChild(wtime);
    heading.appendChild(tatime);
    heading.appendChild(ctime);
    tble.appendChild(heading)
    for(var i=0;i<lt.length;i++){
        var tr = document.createElement("tr");
        var s = document.createElement("td");
        s.appendChild(document.createTextNode(String(i+1)));
        tr.appendChild(s);
        var p = document.createElement("td");
        p.appendChild(document.createTextNode(String(lt[i].pid)));
        tr.appendChild(p);
        var a = document.createElement("td");
        a.appendChild(document.createTextNode(String(lt[i].at)));
        tr.appendChild(a);
        var b = document.createElement("td");
        b.appendChild(document.createTextNode(String(lt[i].bt)));
        tr.appendChild(b);
        var w = document.createElement("td");
        w.appendChild(document.createTextNode(String(lt[i].wt)));
        tr.appendChild(w);
        var ta = document.createElement("td");
        ta.appendChild(document.createTextNode(String(lt[i].tat)));
        tr.appendChild(ta);
        var c = document.createElement("td");
        c.appendChild(document.createTextNode(String(lt[i].ct)));
        tr.appendChild(c);
        tble.appendChild(tr);
    }
    table.appendChild(tble)
    var lbl1 = document.createElement("label");
    lbl1.appendChild(document.createTextNode("Average Waiting Time = "+avgwt+"   "));
    var lbl2 = document.createElement("label");
    lbl2.appendChild(document.createTextNode("Average Compilation Time = "+avgct+"   "));
    var lbl3 = document.createElement("label");
    lbl3.appendChild(document.createTextNode("Average Turn Around Time = "+avgtat+"   "));
    table.appendChild(lbl1);
    table.appendChild(lbl2);
    table.appendChild(lbl3);
}