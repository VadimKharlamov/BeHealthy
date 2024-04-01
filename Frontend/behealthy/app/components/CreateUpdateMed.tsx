import Modal from "antd/es/modal/Modal";
import './../page.module.css';
import { MedsRequest } from "../services/meds";
import Input from "antd/es/input/Input";
import { SetStateAction, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Checkbox, Select, Space, DatePicker, InputNumber, Radio} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import dayjs from "dayjs";
import { MedHistoryRequest } from "../services/medHistory";
const { RangePicker } = DatePicker;

interface Props {
    mode: Mode;
    values: Med;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: MedsRequest, historyRequest: MedHistoryRequest) => void;
    handleUpdate: (id: string, historyId: string, request: MedsRequest, historyRequest: MedHistoryRequest) => void;
}

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

let myMap = new Map<string, number>([
    ['Понедельник', 1],
    ['Вторник', 2],
    ['Среда', 3],
    ['Четверг', 4],
    ['Пятница', 5],
    ['Суббота', 6],
    ['Воскресенье', 0]
]);

const options = [
    {
      value: 1,
      label: 'Таблетка',
    },
    {
      value: 2,
      label: 'Капля',
    },
    {
        value: 3,
        label: 'мг',
    },
    {
        value: 4,
        label: 'гр',
    },
  ];

export enum Mode {
    Create,
    Edit,
}

export const CreateUpdateMed = ({
    mode, values, isModalOpen, handleCancel, handleCreate, handleUpdate
} : Props) => {
    const [userId, setUserId] = useState<string>("")
    const [id, setHistoryId] = useState<string>("")
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [count, setCount] = useState<number>(1);
    const [takeType, setTakeType] = useState<number>(4);
    const [countType, setCountType] = useState<number>(0);
    const [takeTime, setTakeTime] = useState<Date[]>([])
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
    const [takeList, setTakeList] = useState<number[]>();
    const [dateList, setDateList] = useState<any>();

    useEffect(() => {
        setUserId(values.userId);
        setHistoryId(values.historyId)
        setTitle(values.title);
        setDescription(values.description);
        setCount(values.count);
        setTakeType(values.takeType);
        setCountType(values.countType);
        setTakeTime(values.takeTime);
        setDateList([dayjs(values.takeTime[0]), dayjs(values.takeTime[values.takeTime.length - 1])])
    }, [values]);

    const createDateArray = async () => {
        while(takeTime.length != 0){
            takeTime.pop()
        }
        if (dateList) {
            while (dateList[1].diff(dateList[0], 'days') >= 0) {
                let date = dateList[0].toDate()
                if (takeList?.indexOf(dateList[0].$W) != undefined && takeList?.indexOf(dateList[0].$W) > -1) {
                    takeTime.push(date)
                }
                dateList[0] = dateList[0].add(1,'day')
            }
        }
    }
    const onChange = (list: CheckboxValueType[]) => {
        setTakeList(list.map((str) => myMap.get(String(str))!));
        setCheckedList(list);
      };
    const hadleOnOk = async () => {
        createDateArray()
        const medsRequest = { userId, title, description, count, takeType, countType, takeTime};
        const medHistoryRequest = { id, userId, title, description, count, countType, takeTime};
        mode == Mode.Create ? handleCreate(medsRequest, medHistoryRequest) : handleUpdate(values.id, values.historyId, medsRequest, medHistoryRequest);
    }
    const setCountHandler = (value: SetStateAction<number>) => {
        setCount(value)
    }
    const setCountTypeHandler = (value: SetStateAction<number>) => {
        setCountType(value)
    }
    return (
        <Modal 
        title = {
            mode === Mode.Create ? "Добавить препарат" : "Редактировать препарат"
        } 
        width='1000px'
        open ={isModalOpen} 
        onOk={hadleOnOk}
        centered
        onCancel={handleCancel}
        cancelText={"Отмена"}>
            <div className="med__model">
            <Space direction="vertical" size={25}>
                <Input 
                    size='large'
                    value = {title} 
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)}
                    placeholder="Название" />
                <TextArea
                    showCount 
                    maxLength={85} 
                    value = {description} 
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value)}
                    autoSize={{minRows: 3, maxRows:3}}
                    placeholder="Описание" />
                <Space.Compact>
                    <Select defaultValue="Таблетка" 
                    options={options} 
                    style={{ width: '38%' }} 
                    value={countType}
                    onChange = {setCountTypeHandler}
                    />
                    <InputNumber 
                    placeholder="Количество" 
                    min={0} 
                    style={{ width: '45%' }}
                    value={count}
                    onChange={setCountHandler}/>
                </Space.Compact>
                    <Radio.Group onChange={(e: { target: { value: SetStateAction<number>; }; }) => setTakeType(e.target.value)} value={takeType}>
                        <Radio value={1}>До еды</Radio>
                        <Radio value={2}>После еды</Radio>
                        <Radio value={3}>Во время еды</Radio>
                        <Radio value={4}>Неважно</Radio>
                    </Radio.Group>
                <RangePicker onChange={(value: any) => setDateList(value)} value={dateList}/>
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} className="DateCheckbox"/>
            </Space>
            </div>
        </Modal>
    )
};
