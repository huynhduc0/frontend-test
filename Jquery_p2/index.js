var todo = localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
console.log(todo);
renderList();   
function addToList(name){
    if(name){
        const item = {
            "name":name,
            "done":false
        }
        todo.unshift(item);
        localStorage.setItem('list',JSON.stringify(todo));
    }
}
function removeAll(){
    localStorage.clear();
    todo = []
    renderList();
}
function removeItem(id){
    todo.splice(id, 1);
    localStorage.setItem('list',JSON.stringify(todo));
    renderList()
}
function changeStatus(id){
    todo[id].done = !todo[id].done
    localStorage.setItem('list',JSON.stringify(todo));
    renderList()
}
function renderList(){
    $(".main_list").html("")
    todo.map((item,key)=>{
        $(".main_list").append(`
        <div class="item row">
        <div class="name col-md-9"> <h5>${ item.done?`<b><del>${item.name}</del></b>`:item.name} </h5></div>
            <div class="col-md-3 text-right"> 
                ${item.done?`<i style="font-size: 30px;cursor:pointer;padding-right: 20px; color: green;" onclick="changeStatus(${key})" class="bi bi-check-circle"></i>`:`<i style="font-size: 30px;cursor:pointer;padding-right: 20px; color: gray;" onclick="changeStatus(${key})"  class="bi bi-check-circle"></i>`}
                <i style="font-size: 30px;cursor:pointer;padding-right: 20px;color: red;" onclick="removeItem(${key})" class="bi bi-x-circle"></i>
            </div>
        </div>
        `)
    });
    // $("#clear").html("");
    // $("#clear").html(`<div id="clear"><button type="button" onclick="removeAll()" class="btn btn-outline-success">Clear list</button></div>`)
    
}
$("#addToList").click(function(){
    addToList($("#name").val());
    $("#name").val("");
    renderList();
})
