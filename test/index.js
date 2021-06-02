import React,{useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import './index.css';
import { Form, Select, Button, Input, Table, Checkbox, Row, Col } from "antd";
import RcFormTable from '../src/index.jsx';

const Demo=(props)=>{

  const [form] = Form.useForm();
  const [list,setList] = useState([{name:'1',age:1}])
  const [formData,setFormData] = useState({
    list,
    id:'1121'
  })
  const [log,setLog] = useState({})
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
  
  const onValidate=()=>{
    let values = form.getFieldsValue();
    let html = prettyPrintJson.toHtml(values)

    setLog(html);
  }

  return (
    <section>
      <div style={{width:'300px',border:'1px solid black',marginRight:'20px'}}>
        <span>当前表单数据:</span>
        <pre dangerouslySetInnerHTML={{__html:log}}></pre>
      </div>

      <Button onClick={onValidate}>获取当前表单值</Button>
      <Form style={{width:'800px'}} form={form} initialValues={{...formData}} >
        <RcFormTable
          Table={Table}
          saveLast
          initialValue={list}
          form={form}
          formItemName='list'
          newdata={{
            name: '',
            age:''
          }}
          columns={createColumn}
        /> 
      </Form>
    </section>
  )
}


ReactDOM.render(<Demo />, document.getElementById("container"));
