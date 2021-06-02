
![antd](https://img.shields.io/badge/ant--desigin-2.x~3.x-blue)
![node](https://img.shields.io/badge/node-%3E%3D8-green)
![npm](https://img.shields.io/badge/npm-%3E%3D6.14.5-orange)

### 开发者环境
node:10.15.0
npm:6.14.5
### 组件作用  
antd-form-table用于解决在antd4.x下，当使用Form表单处理数据遇上Table时的增删查改操作  
另外如果你需要支持`antd2.x和antd3.x`版本的可以[点击这里获取](https://www.npmjs.com/package/rc-form-table)

### 预览图
![review.jpg](http://img.vuedata.cn/rc-form-table-review.gif)

### install  
`npm install antd-form-table`

### with Antd

```javascript
import React from "react";
import { Form,Table } from "antd";
import FormTable from 'antd-form-table';

const Demo=(props)=>{
  const [form] = Form.useForm();
  const [list,setList] = useState([{name:'1',age:1}])
  const [formData,setFormData] = useState({
    list,
    id:'1121'
  })
  
  const createColumn=({formItemName,onAdd,onDel,onCopy})=> {
    let ret = [
      {
        align: 'center',
        dataIndex: '_rowKey',
        title:'_rowKey',
        width: 60,
        render: (text, record, index) => {
          return (
            <>
            {text}
            <Form.Item name={[formItemName,index,'_rowKey']} noStyle >
              <Input type='hidden' />
            </Form.Item>
            </>
          );
        },
      },
      {
        align: 'center',
        dataIndex: 'name',
        title:'name',
        width: 60,
        render: (text, record, index) => {
          return (
            <Form.Item name={[formItemName,index,'name']} >
              <Input />
            </Form.Item>
          );
        },
      },

      {
        align: 'center',
        dataIndex: 'age',
        title:'age',
        width: 60,
        render: (text, record, index) => {
          return (
            <Form.Item name={[formItemName,index,'age']} >
              <Input />
            </Form.Item>
          );
        },
      },
    ];
    ret.push({
      align: 'center',
      dataIndex: 'oper',
      title: '操作',
      width: 120,
      render: (text, record, index) => {
        return (
          <div>
          <span style={{marginRight:"12px"}} onClick={onDel.bind(this, record, index)} >
            删除
          </span>

          <span style={{marginRight:"12px"}}  onClick={onCopy.bind(this, record, index)}>
            复制
          </span>

          <span onClick={onAdd.bind(this, record, index)}>
            添加
          </span>
          </div>
          
        );
      },
    });
  
    return ret;
  };

  return (
    const {LIST} = this.state
    return (
      <section>       
        <Form form={form} initialValues={{...formData}}>
          <FormTable
            Table={Table}
            initialValue={list}
            form={form}
            formItemName='list'
            antTableOptions={{ bordered: true, pagination: false }}
            newdata={{
              name: '',
              age:''
            }}
            columns={createColumn}
            saveLast
          /> 
        </Form>
      </section>
    );
  )
}

ReactDOM.render(<Demo />, document.getElementById("container"));
```

### API

参数|说明|类型|默认值
:-|:-|:-|:-
Table|antd的Table对象|Table|-
initialValue|初始的表格数据源|Array|-
formItemName|字段名|String|-
form|表单的form对象|Form|-
antTableOptions|antd Table组件的参数，参考antd文档|Object|-
newdata|新增一条数据的数据模板|Object|-
columns|同antd table的columns|Function({onDel,onCopy,onAdd})=>void|-
onChange|当数据发生变化时的回调|(value)=>void|-
onAdd|当触发添加事件时的消息拦截，返回的是被创建的新数据项，如果返回空则不添加数据|(record,index)=>object|-
saveLast|是否在没数据的时候始终保持一条空数据|Boolean|false


### 组件内部可用方法，可以通过ref使用组件内部方法

参数|说明|类型|默认值
:-|:-|:-|:-
onReset|重置表单内数据|(arr?:object[])=>void|-


### 更新日志
