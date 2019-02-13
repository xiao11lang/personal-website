class Spanner{
    constructor(connection){
        this.connection=connection
    }
    query(options){
        var tableName=options.tableName;
        var fields=options.fields||['*'];
        var pageNum=options.pageNum||''
        var order=options.order||''
        var rules=options.rules||'';
        var pageStr=''
        if(!tableName){
            throw new Error('表名不可为空')
        }
        if(pageNum){
            pageStr=`limit 10 offset ${10*(pageNum-1)} `
        }
        var sql=`select ${fields.join(',')} from ${tableName} ${rules} ${order} ${pageStr}`
        var that=this;
        return new Promise(function(resolve,reject){
            that.connection.query(sql,function(err,res){
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    update(options){
        var tableName=options.tableName;
        var fields=options.fields;
        var values=options.values;
        var rules=options.rules;
        var setStr=''
        if(!tableName){
            throw new Error('表名不可为空')
        }
        fields.forEach(function(field,index){
            setStr+=`${field}='${values[index]}',`
        })
        var sql=`update ${tableName} set ${setStr.slice(0,setStr.length-1)} ${rules}`
        var that=this;
        return new Promise(function(resolve,reject){
            that.connection.query(sql,function(err,res){
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    insert(options){
        var tableName=options.tableName;
        var fields=options.fields;
        var values=options.values;
        var fieldStr=`(${fields.join(',')})`
        var valuesStr=values.map(function(value,index){
            return '?'
        })
        if(!tableName){
            throw new Error('表名不可为空')
        }
        var sql=`insert into ${tableName} ${fieldStr} values(${valuesStr.join(',')})`
        var that=this;
        return new Promise(function(resolve,reject){
            that.connection.query(sql,values,function(err,res){
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    delete(options){
        var tableName=options.tableName;
        var rules=options.rules;
        if(!tableName){
            throw new Error('表名不可为空')
        }
        var sql=`delete from ${tableName} ${rules}`
        var that=this;
        return new Promise(function(resolve,reject){
            that.connection.query(sql,function(err,res){
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    copy(options){
        var src=option.src;
        var target=options.target;
        var rules=options.rules;
        if(!src||!target){
            throw new Error('源表或目标表名不可为空')
        }
        var sql=`insert into ${target} select * from ${src} ${rules}`
        var that=this;
        return new Promise(function(resolve,reject){
            that.connection.query(sql,function(err,res){
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }
}
module.exports=Spanner