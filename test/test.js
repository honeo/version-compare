console.log('version-compare: test');

// babel
require('babel-polyfill');
require("babel-register")({
	ignore: [],
	presets: ['es2015', 'stage-0']
});

// modules
const versionCompare = require('../').default;

/// Cases
const cases = [
// ==, ===
{
	values: ['1.0.0', '==', '1.0.0'],
	result: true
}, {
	values: ['0.0.1', '==', '1.0.0'],
	result: false
}, {
	values: ['1.0.0', '===', '1.0.0'],
	result: true
}, {
	values: ['0.0.1', '===', '1.0.0'],
	result: false
},
// !=, !==
{
	values: ["0.12.0", "!=", "1.0.0"],
	result: true
}, {
	values: ["1.0.0", "!=", "1.0.0"],
	result: false
}, {
	values: ["0.12.0", "!==", "1.0.0"],
	result: true
}, {
	values: ["1.0.0", "!==", "1.0.0"],
	result: false
},
// <, >
{
	values: ['1.0.0', '<', '2.1.0'],
	result: true
}, {
	values: ['1.0.0', '<', '0.0.1'],
	result: false
}, {
	values: ['1.0.0', '<', '1.0.0'],
	result: false
}, {
	values: ["1.2.3", ">", "3.2.1"],
	result: false
}, {
	values: ["1.0.0", ">", "0.0.1"],
	result: true
}, {
	values: ["1.0.0", ">", "1.0.0"],
	result: false
},
// <=, >=
{
	values: ['1.0.1', '<=', '1.0.10'],
	result: true
}, {
	values: ['1.0.1', '<=', '1.0.1'],
	result: true
}, {
	values: ['1.0.1', '<=', '1.0.0'],
	result: false
}, {
	values: ['1.0.1', '>=', '1.0.0'],
	result: true
}, {
	values: ['1.0.1', '>=', '1.0.1'],
	result: true
}, {
	values: ['1.0.1', '>=', '1.0.2'],
	result: false
},
// 4つ以上
{
	values: ['1.0.0.0', '===', '1.0.0.0'],
	result: true
}, {
	values: ['1.0.0.0', '!==', '1.0.0.1'],
	result: true
}, {
	values: ['1.0.0.0', '<', '1.0.0.1'],
	result: true
}, {// GC like
	values: ['52', '<', '53.0.2785.116'],
	result: true
}, {
	values: ['1.0.0.0.0', '>', '1.0.0.0.1'],
	result: false
}, {
	values: ['1.2.3.4.5.6', '<=', '1.2.3.4.5.6'],
	result: true
}, {
	values: ['1.2.3.4.5.6.7', '>=', '1.2.3.4.5.6.6'],
	result: true
}];

// 本体
cases.forEach( ({values, result})=>{
	if( versionCompare(...values)===result ){
		console.log(`success: ${values}`);
	}else{
		throw new Error(`failed: ${values}`);
	}
});

// validation
let validationCount = 0;
try{
	versionCompare(1, '===', '1.0.0');
}catch(e){
	validationCount++;
}
try{
	versionCompare('1.0.0', '===', 1);
}catch(e){
	validationCount++;
}
try{
	versionCompare(2.0, '===', 2.0);
}catch(e){
	validationCount++;
}
try{
	versionCompare('1.0.0', '<>!=', '1.0.0');
}catch(e){
	validationCount++;
}
if( validationCount===4 ){
	console.log(`success: validation`);
}else{
	throw new Error(`failed: validation`);
}
