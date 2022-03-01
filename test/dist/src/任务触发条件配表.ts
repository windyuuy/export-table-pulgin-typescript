
import 所需道具, { 所需道具Row } from "./所需道具"

import 所需等级, { 所需等级Row } from "./所需等级"

import 所需时段, { 所需时段Row } from "./所需时段"

type uid=number;
type key=string;
type fk=number;
type bool=boolean;

var fields =[
	"id",
	"taskId",
	"cond1",
	"para1",
	"cond2",
	"para2",
	"cond3",
	"para3",
]

export class 任务触发条件配表Row{
	
        /**
         * id
         **/
        id:number = 0



        /**
         * 任务ID
         **/
        taskId:number = 0



        /**
         * 条件1
wilwin wilwin:
q3wrjhqihruq
]qwklhqwlkqw
qweklq
         **/
        cond1:string = ""



        /**
         * 条件1参数
         **/
        para1:number = 0

        protected _fkpara1?:所需道具Row=undefined
        /**
         * 条件1参数
         **/
        get para1Data(){
            if(this._fkpara1===undefined){
                this._fkpara1=所需道具.find(a=>a.id==this.para1);
            }
            return this._fkpara1;
        }

        /**
         * 条件2
         **/
        cond2:string = ""



        /**
         * 条件2参数
         **/
        para2:number = 0

        protected _fkpara2?:所需等级Row=undefined
        /**
         * 条件2参数
         **/
        get para2Data(){
            if(this._fkpara2===undefined){
                this._fkpara2=所需等级.find(a=>a.id==this.para2);
            }
            return this._fkpara2;
        }

        /**
         * 条件3
         **/
        cond3:string = ""



        /**
         * 条件3参数
         **/
        para3:number = 0

        protected _fkpara3?:所需时段Row=undefined
        /**
         * 条件3参数
         **/
        get para3Data(){
            if(this._fkpara3===undefined){
                this._fkpara3=所需时段.find(a=>a.id==this.para3);
            }
            return this._fkpara3;
        }

}

let 任务触发条件配表:任务触发条件配表Row []=[];

var rowData=
[
	[1,1001,"道具",1001,"等级",1001,"时段",1001],
	[2,1002,"道具",1001,"时段",1002,"等级",1002],
]

let tableData: any[] = []
for (let record of rowData) {
    let obj = new 任务触发条件配表Row () as any
    for(let i = 0;i<fields.length;i++) {
        let key = fields[i]
        obj[key] = record[i]
    }
    tableData.push(obj)
}



for(let r of tableData){
    任务触发条件配表 .push(r);
	
}

export default 任务触发条件配表
