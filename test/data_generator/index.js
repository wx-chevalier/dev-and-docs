/**
 * Created by apple on 16/5/17.
 */
var argumentParser = require("node-argument-parser");
var csv = require('csv');
var parse = require('csv-parse/lib/sync');

//读入配置文件
var configs = JSON.parse(require('fs').readFileSync('config.hjson', 'utf8'));

//读入输入的index.csv

var input_csv = require('fs').readFileSync('input.csv', 'utf8');

var records = parse(input_csv, {columns: true});

//获取config中的keys
var keys = Object.keys(configs);

var keys_length = keys.length;

//获取每个key对应的可能的取值
var values = {};

//遍历所有的可变的键值
keys.forEach(function (key, index) {

    var config = configs[key];

    switch (config.type) {
        case "integer":
        {

            //如果当前是整型
            //获取最小值
            var min = config.min;
            //获取最大值
            var max = config.max;

            //构造该键对应的可能的值
            values[key] = [];

            for (var i = min; i < max + 1; i++) {
                values[key].push(i);
            }

            break;

        }

        default:
            break;
    }

});

//记录所有的组合值
var mixed_values = [];

//这里用递归来遍历所有的values
function rowGenerator(keys_iteration_index) {

    //临时的一行取值
    value = {};

    //判断当前keys对应的下标值是否有效
    for (i = 0; i < keys_length; i++) {

        if (values[keys[i]][keys_iteration_index[i]] === undefined) {
            //如果某个值已经不存在,则直接返回
            return;
        } else {
            value[keys[i]] = values[keys[i]][keys_iteration_index[i]];
        }
    }


    mixed_values.push(value);

    // console.log(value);

    console.log(mixed_values.length);

    console.log(keys_iteration_index);

    //将每个keys的迭代依次加1
    keys.forEach(function (key, index) {

        //制作一个拷贝,避免引用传值而导致混乱
        keys_iteration_index_copy = [];

        keys_iteration_index.forEach(function (v) {
           keys_iteration_index_copy.push(v);
        });

        keys_iteration_index_copy[index] = keys_iteration_index_copy[index] + 1;

        rowGenerator(keys_iteration_index_copy);

    });

}

var initial_keys_iteration_index = [];

keys.forEach(function () {
   initial_keys_iteration_index.push(0);

});

rowGenerator(initial_keys_iteration_index);

// console.log(mixed_values);

var output = [];

output.push(records[0]);