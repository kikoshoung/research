// Get random array
function getArray(n){
    var res =[];

    for(var i = 0; i < n; i++){
        res.push(i);
    }
   
    res.sort(function(){
        return 0.5 - Math.random(); 
    });

    return res;
}

// Bubble sort
(function(){
	var arr = getArray(100000),
		sDate, eDate;

	function bubbleSort(arr){
		var len = arr.length,
			temp = 0;
		for(var i = 0; i < len; i++){
			for(var j = 0; j < len - 1; j++){
				if(arr[j] > arr[j + 1]){
					temp = arr[j + 1];
					arr[j + 1] = arr[j];
					arr[j] = temp;
				}
			}
		}
	}

	sDate = new Date().getTime();
	bubbleSort(arr);
	eDate = new Date().getTime();
	console.log(arr);
	console.log(eDate - sDate);
})();

// Quick sort
(function(){
	var arr = getArray(100000),
		sDate, eDate;

	function quickSort(arr){
		function sort(l, r){
			if(l >= r) return;
			var mid = arr[l],
				temp = 0,
				scanDir = 1,
				i = l,
				j = r;

			while(i != j){
				if(scanDir == 1){
					if(mid > arr[j]){
						temp = arr[j];
						arr[j] = mid;
						arr[i] = temp;
						i++;
						scanDir = -1;
					} else {
						j--;
					}
				} else {
					if(mid < arr[i]){
						temp = arr[i];
						arr[i] = mid;
						arr[j] = temp;
						j--;
						scanDir = 1
					} else {
						i++;
					}
				}
			}
			
			arguments.callee(l, --i);
			arguments.callee(++j, r);

		}
		sort(0, arr.length - 1);
	}

	sDate = new Date().getTime();
	quickSort(arr);
	eDate = new Date().getTime();
	console.log(arr);
	console.log(eDate - sDate);
})();