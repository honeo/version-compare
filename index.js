/*
	version比較
	引数
		1: 0-9から始まり、間にdotを挟んでもいい文字列のみ
		2: 有効な比較演算子の文字列のみ
		3: 1と同じ
*/

// Modules
import {is, not} from '@honeo/type-check';

function versionCompare(ver1, op, ver2){
	// validation
	if( !is.str(ver1, op, ver2) ){
		throw new TypeError(`Invalid argument`);
	}
	if( !is.version(ver1, ver2) || not.comparisonoperator(op) ){
		throw new Error(`Invalid argument`);
	}

	// ver1, 2を[...number]化
	const ver1Arr = ver1.split('.').map( (str)=>{
		return str-0;
	});
	const ver2Arr = ver2.split('.').map( (str)=>{
		return str-0;
	});

	for(let i=0, len=Math.max(ver1Arr.length, ver2Arr.length); i<len; i++){
		const v1_value = ver1Arr[i] || 0;
		const v2_value = ver2Arr[i] || 0;
		// 値が違うか、最終周ならこの結果で確定
		if(v1_value!==v2_value || len===i+1){
			return eval(`${v1_value}${op}${v2_value};`);
		}
	}
}

export default versionCompare;
