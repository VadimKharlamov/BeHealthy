import Modal from "antd/es/modal/Modal";
import './../page.module.css';
import {directionOptions} from './directionOptionsData'
import Input from "antd/es/input/Input";
import { SetStateAction, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Checkbox, Select, Space, DatePicker, InputNumber, Radio, RadioChangeEvent, Button, SelectProps } from "antd";
import { MedEventRequest } from "../services/medEvents";
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import dayjs from "dayjs";
import { EventHistoryRequest } from "../services/eventHistory";
interface Props {
    mode: Mode;
    values: MedEvent;
    isModalOpen: boolean;
    medEvents: MedEvent[];
    handleCancel: () => void;
    handleCreate: (eventRequest: MedEventRequest, historyRequest: EventHistoryRequest) => void;
    handleUpdate: (id: string, historyId:string, eventRequest: MedEventRequest, historyRequest: EventHistoryRequest) => void;
}
const CheckboxGroup = Checkbox.Group;

export enum Mode {
    Create,
    Edit,
}

function isHere(data: any, obj : string) : boolean {
    for (let i = 0; i < data.length; i++) {
        if (data[i].value == obj) {
            return true;
        }
    }
    return false
}

export const CreateUpdateMedEvent = ({
    mode, values, isModalOpen, medEvents, handleCancel, handleCreate, handleUpdate
} : Props) => {
    const [id, setHistoryId] = useState<string>("");
    const [userId, setUserId] = useState<string>("")
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [visitTime, setVisitTime] = useState<Date>(new Date());
    const [direction, setDirection] = useState<string>("");
    const [doctorName, setDoctorName] = useState<string>("");
    const [doctorPhone, setDoctorPhone] = useState<string>("")
    const [clinicName, setClinicName] = useState<string>("");
    const [clinicPhone, setClinicPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const docNameOptions: SelectProps['options'] = [];
    const docPhoneOptions: SelectProps['options'] = [];
    const clinicNameOptions: SelectProps['options'] = [];
    const clinicPhoneOptions: SelectProps['options'] = [];
    const adressOptions: SelectProps['options'] = [];
    medEvents.forEach(function (obj) {
        obj.doctorName && !isHere(docNameOptions,obj.doctorName) ? docNameOptions.push({value: obj.doctorName, label: obj.doctorName}) : null
        obj.doctorPhone && !isHere(docPhoneOptions,obj.doctorPhone) ? docPhoneOptions.push({value: obj.doctorPhone, label: obj.doctorPhone}) : null
        obj.clinicName && !isHere(clinicNameOptions,obj.clinicName) ? clinicNameOptions.push({value: obj.clinicName, label: obj.clinicName}) : null
        obj.clinicPhone && !isHere(clinicPhoneOptions,obj.clinicPhone) ? clinicPhoneOptions.push({value: obj.clinicPhone, label: obj.clinicPhone}) : null
        obj.address && !isHere(adressOptions,obj.address) ? adressOptions.push({value: obj.address, label: obj.address}) : null
    })
    useEffect(() => {
        setUserId(values.userId);
        setHistoryId(values.historyId)
        setTitle(values.title);
        setDescription(values.description);
        setVisitTime(values.visitTime);
        setDirection(values.direction);
        setDoctorName(values.doctorName);
        setDoctorPhone(values.doctorPhone);
        setClinicName(values.clinicName);
        setClinicPhone(values.clinicPhone);
        setAddress(values.address);
    }, [values]);

    const datePickerHandler = async (value : any) => {
        if (value) {
            setVisitTime(value.toDate())
        }
    }
    
    const hadleOnOk = async () => {
        const medEventRequest = { userId, title, description, visitTime, direction, doctorName, doctorPhone, clinicName, clinicPhone, address};
        const eventHistoryRequest = { id, userId, title, description, visitTime, direction, doctorName, doctorPhone, clinicName, clinicPhone, address};
        mode == Mode.Create ? handleCreate(medEventRequest, eventHistoryRequest) : handleUpdate(values.id, values.historyId, medEventRequest, eventHistoryRequest);
    }
    return (
        <Modal 
        title = {
            mode === Mode.Create ? "Добавить событие" : "Редактировать событие"
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
                    style={{ width: '200%' }}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)}
                    placeholder="Название" />
                <TextArea
                    showCount 
                    maxLength={85} 
                    value = {description} 
                    style={{ width: '200%' }}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value)}
                    autoSize={{minRows: 3, maxRows:3}}
                    placeholder="Описание" />
                <DatePicker
                    locale={locale}
                    showTime={{format: 'HH:mm'}}
                    style={{ width: '200%' }} 
                    value={dayjs(visitTime)}
                    needConfirm = {false}
                    onChange={datePickerHandler}
                    maxTagCount="responsive"
                    size="large"
                />
                <Select
                    size="large"
                    maxCount={1}
                    mode="tags"
                    value={direction != "" ? direction : null}
                    onChange={(value: any) => setDirection(value[0])}
                    style={{ width: '200%' }}
                    placeholder="Введите направление"
                    options={directionOptions}
                />
                <Select
                    size="large"
                    maxCount={1}
                    mode="tags"
                    value={doctorName != "" ? doctorName : null}
                    onChange={(value: any) => setDoctorName(value[0])}
                    style={{ width: '200%'}}
                    placeholder="Введите имя специалиста"
                    options={docNameOptions}
                />
                <Select
                    size="large"
                    maxCount={1}
                    mode="tags"
                    value={doctorPhone != "" ? doctorPhone : null}
                    onChange={(value: any) => setDoctorPhone(value[0])}
                    style={{ width: '200%' }}
                    placeholder="Введите номер специалиста"
                    options={docPhoneOptions}
                />
                <Select
                    size="large"
                    maxCount={1}
                    mode="tags"
                    value={clinicName != "" ? clinicName : null}
                    onChange={(value: any) => setClinicName(value[0])}
                    style={{ width: '200%' }}
                    placeholder="Введите название клиники"
                    options={clinicNameOptions}
                />
                <Select
                    size="large"
                    maxCount={1}
                    mode="tags"
                    value={clinicPhone != "" ? clinicPhone : null}
                    onChange={(value: any) => setClinicPhone(value[0])}
                    style={{ width: '200%' }}
                    placeholder="Введите номер клиники"
                    options={clinicPhoneOptions}
                />
                <Select
                    size="large"
                    maxCount={1}
                    mode="tags"
                    value={address != "" ? address : null}
                    onChange={(value: any) => setAddress(value[0])}
                    style={{ width: '200%' }}
                    placeholder="Введите адресс"
                    options={adressOptions}
                />               
                </Space>
            </div>
        </Modal>
    )
};
