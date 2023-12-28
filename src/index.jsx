import React ,{useImperativeHandle,useState,forwardRef} from 'react';
import uuid from 'js-uuid';

const TableFormItem =(props,ref)=> {
  const {Table,form,formItemName,saveLast} = props;
  const getNewId=()=>{
    let ret = uuid.v4();
    return ret;
  }

  const getInitalValue=(initialValue)=>{
    let tempInitValue=[];
    if(initialValue){
      tempInitValue=initialValue.map((item,idx)=>{
        item._rowKey=getNewId();
        return item;
      });
    }
    const {setFieldsValue } = form;
    setFieldsValue({[formItemName]:[]})
    setFieldsValue({[formItemName]:[...tempInitValue]});
    return tempInitValue
  }
  const [value,setValue] = useState(()=>(getInitalValue(props.initialValue)));

  const onChange = (value) => {
    if (props.onChange) {
      props.onChange(value);
    }
    if (props.onRefresh) {
      props.onRefresh(value);
  }
  };

  
  const onCopy=async (record, index, event)=> {
    if (event) event.preventDefault();
    const { getFieldValue } = form;
    const formData = (getFieldValue(formItemName) || []);  

    let newdata = null;
    if(props.onCopy){
      newdata = props.onCopy(record,index);
      if(!newdata)return;
    }else{
      newdata = { ...props.newdata };
    }
    newdata = {...formData[index]};
    newdata._rowKey=getNewId();
    
    let newFormData = onInsert(newdata,index);
    onChange(newFormData);
  }


  const onDel = (record,index,event) => {
    if (event) event.preventDefault();
    const { getFieldValue, setFieldsValue } = form;

    const formData = [...(getFieldValue(formItemName) || [])];
    let isLast = formData.length === 1;
    formData.splice(index,1);
    setValue([]);
    setFieldsValue({[formItemName]:[]});

    setValue(formData);
    setFieldsValue({[formItemName]:formData});

    if (saveLast && isLast) {
      onAdd(record, index, event)
    } else {
      onChange(formData);
    }
  };

  const onReset=(initValue,event)=>{
    if (event) event.preventDefault();
    const {setFieldsValue } = form;
    const {initialValue} = props;
    
    initValue = initValue||initialValue;
    initValue = getInitalValue(initValue);

    setValue([]);
    setFieldsValue({[formItemName]:[]})
    setValue(initValue);
    setFieldsValue({[formItemName]:[...initValue]});
  }

  const onInsert= (newdata,index)=>{
    const { getFieldValue, setFieldsValue } = form;
    const oldData = (getFieldValue(formItemName) || []);
    let formData = [...oldData];
    if(index>=0){
      formData.splice(index+1,0,newdata);
    }else{
      formData.push(newdata);
    }
    setValue([]);
    setFieldsValue({[formItemName]:[]})
    setValue(formData);
    setFieldsValue({[formItemName]:formData})
    return formData;
  }

  const onAdd = (record, index , event) => {
    if (event) event.preventDefault();

    let newdata=null;
    if(props.onAdd){
      newdata = props.onAdd(record,index);
      if(!newdata)return;
    }else{
      newdata = { ...props.newdata };
    }
    newdata._rowKey = getNewId();
    let formData = onInsert(newdata,index);
    onChange(formData);
  };

  useImperativeHandle(ref, () => ({
    onReset,
  }));


  return (
   
    <Table
      {...{rowKey: '_rowKey',...props.antTableOptions}}
      dataSource={value}
      columns={props.columns({formItemName,onDel, onAdd,onReset,onCopy})}
    />
  
  )
}



export default forwardRef(TableFormItem);

