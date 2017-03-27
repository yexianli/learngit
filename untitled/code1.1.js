/**
 * Created by Administrator on 2017/2/27.
 */
function sumArray(array) {
    var b=0
    if(array.length==0){
        return 0;
    }
    else{
        for(var i =0;i<array.length;i++){
            var b=array[i]+b
        }
        var min=array[0];
        for(var i=0;i<array.length;i++){

            if(min>array[i]){
                min=array[i];
            }
        }
        var max=array[0];
        for(var i=0;i<array.length;i++) {

            if (max < array[i]) {
                max = array[i];
            }
        }
            console.log(b, min, max)


            return b - min - max;
        }

    }