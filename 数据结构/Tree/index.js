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

var array = [];
for(var i = 0; i < 10000; i ++) {
    array.push(i);
}

array = shuffle(array);

console.log(array.join(","));