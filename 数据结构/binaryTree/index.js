function shuffle(aArr){
    var iLength = aArr.length,
        i = iLength,
        mTemp,
        iRandom;
 
    while(i--){
        if(i !== (iRandom = Math.floor(Math.random() * iLength))){
            mTemp = aArr[i];
            aArr[i] = aArr[iRandom];
            aArr[iRandom] = mTemp;
        }
    }
 
    return aArr;
}

// ����
var data = [];
for(var i = 0; i < 10000; i ++) {
    data.push(i);
}

data = shuffle(data);

// ��ͨ��add + sort
var timer = (new Date()).valueOf();
var array = [];
for(var d in data) {
  array.push(d);
}
array = array.sort();
var time = (new Date()).valueOf() - timer;
$(".shuffle .add td:eq(0)").html(time + "ms");

// BT��add + sort
timer = (new Date()).valueOf();
var tree = new BinarySearchTree();
for(var d in data) {
  tree.add(d);
}
var treeArray = [];
tree.traverse(function(node){
  treeArray.push(node.value);
});
time = (new Date()).valueOf() - timer;
$(".shuffle .add td:eq(1)").html(time + "ms");

// ��ͨ�Ĳ���
timer = (new Date()).valueOf();
for(var i = 0; i < 10000; i ++) {
  index = array.indexOf(i);
}
time = (new Date()).valueOf() - timer;
$(".shuffle .search td:eq(0)").html(time + "ms");

// BT�Ĳ���
timer = (new Date()).valueOf();
for(var i = 0; i < 10000; i ++) {
  tree.contains(i);
}
time = (new Date()).valueOf() - timer;
$(".shuffle .search td:eq(1)").html(time + "ms");

// ��ͨ��ɾ��
timer = (new Date()).valueOf();
for(var i = 0; i < 10000; i ++) {
  array.splice(array.indexOf(i), 1);
}
time = (new Date()).valueOf() - timer;
$(".shuffle .delete td:eq(0)").html(time + "ms");

// BT��ɾ��
timer = (new Date()).valueOf();
for(var i = 0; i < 10000; i ++) {
  tree.remove(i);
}
time = (new Date()).valueOf() - timer;
$(".shuffle .delete td:eq(1)").html(time + "ms");




// ��������
var ordered = [];
for(var i = 0; i < 10000; i ++) {
    ordered.push(i);
}

// ��ͨ��add + sort
var timer = (new Date()).valueOf();
var array = [];
for(var d in ordered) {
  array.push(d);
}
array = array.sort();
var time = (new Date()).valueOf() - timer;
$(".order .add td:eq(0)").html(time + "ms");

// BT��add + sort
timer = (new Date()).valueOf();
var tree = new BinarySearchTree();
for(var d in ordered) {
  tree.add(d);
}
var treeArray = [];
tree.traverse(function(node){
  treeArray.push(node.value);
});
time = (new Date()).valueOf() - timer;
$(".order .add td:eq(1)").html(time + "ms");

// ��ͨ�Ĳ���
timer = (new Date()).valueOf();
for(var i = 0; i < 10000; i ++) {
  index = array.indexOf(i);
}
time = (new Date()).valueOf() - timer;
$(".order .search td:eq(0)").html(time + "ms");

// BT�Ĳ���
timer = (new Date()).valueOf();
for(var i = 0; i < 10000; i ++) {
  tree.contains(i);
}
time = (new Date()).valueOf() - timer;
$(".order .search td:eq(1)").html(time + "ms");

// ��ͨ��ɾ��
timer = (new Date()).valueOf();
for(var i = 0; i < 10000; i ++) {
  array.splice(array.indexOf(i), 1);
}
time = (new Date()).valueOf() - timer;
$(".order .delete td:eq(0)").html(time + "ms");

// BT��ɾ��
timer = (new Date()).valueOf();
for(var i = 0; i < 10000; i ++) {
  tree.remove(i);
}
time = (new Date()).valueOf() - timer;
$(".order .delete td:eq(1)").html(time + "ms");