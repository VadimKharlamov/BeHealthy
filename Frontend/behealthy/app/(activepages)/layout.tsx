'use client'
import React, {useEffect, useState } from 'react';
import '../page.module.css'
import {
  CalendarOutlined,
  HeartOutlined,
  ReconciliationOutlined,
  BookOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, ConfigProvider,Layout, Menu, Space, message, notification, theme } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../images/logo-no-background.png'
import { usePathname, useRouter } from 'next/navigation';
import { getAllMedEvents } from '../services/medEvents';
import dayjs from 'dayjs';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function parseJwt(token: string) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)).userId;
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
	getItem( <Link href={"/dashboard"}> Мое здоровье </Link>, '1', <HeartOutlined />),
	getItem( <Link href={"/calendar"}> Календарь </Link>, '2', <CalendarOutlined />),
	getItem( <Link href={"/meds"}> Лекарства </Link>, '3', <ReconciliationOutlined />),
	getItem( <Link href={"/medevents"}> События </Link>, '4', <BookOutlined />),
	getItem( <Link href={"/history"}> История </Link>, '5', <FieldTimeOutlined />),
	getItem( "Выйти", '6'),
  ];

let titles = new Map<string, string>([
    ['/dashboard', "Мое здоровье"],
    ['/calendar', "Календарь событий"],
    ['/meds', "Мои лекарства"],
    ['/medevents', "Мои события"],
	['/history', "История"],
]);


interface IProps {
	children: React.ReactNode;
}

export default function PageLayout({
	children}: IProps) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  const [api, contextHolder] = notification.useNotification();
  const [meds, setMeds] = useState<Med[]>([]);
  const [medEvents, setMedEvents] = useState<MedEvent[]>([]);
  const router = useRouter()
  const [messageApi, contextMsgHolder] = message.useMessage();

  

  const handleNotiClick = async () => {
	createNotification(meds);
  }
  useEffect(() => {
	const clearSessionStorage = () => {
		sessionStorage.clear();
	};
	window.addEventListener('beforeunload', clearSessionStorage);
	if (sessionStorage.getItem("notiStatus") != "notified") {
		sessionStorage.setItem("notiStatus", "notified")
		const key = `open${Date.now()}`;
		const btn = (
		  <Space>
			<Button type="link" size="small" onClick={() => api.destroy()}>
			  Нет, спасибо
			</Button>
			<Button type="link" size="small" onClick={handleNotiClick}>
			  Подписаться
			</Button>
		  </Space>
		);
		api.open({
		  message: 'Подписаться на уведомления?',
		  description:
			'Мы можем прислать вам уведомления за 3 часа до события!',
		  duration:8,
		  btn,
		  key,
		});
	}
  });

  const createNotification = (data:any) => {
	const getMedEvents = async () => {
		const userId = parseJwt(localStorage.getItem("data") || '{}')
		const medEvents: MedEvent[] = await getAllMedEvents(userId);
		medEvents.forEach(element => {
			Notification.requestPermission().then(perm => {
				if (perm === "granted" && (new Date(element.visitTime).getTime() - dayjs().add(3, 'hour').toDate().getTime()) > 0) {
					let intervalId = setInterval(() => {
						clearInterval(intervalId)
						new Notification(`Напоминание о событии`, {
							body: `Не забудь про ${element.title} через 3 часа!`
						})
					}, new Date(element.visitTime).getTime() - dayjs().add(3, 'hour').toDate().getTime())
				}
			})
		});
	};
	messageApi.open({
		type: 'success',
		content: 'Вы подписались!',
		className: 'custom-class',
		duration: 2,
		style: {
		  marginTop: '2vh',
		},
	  });
	getMedEvents()
	api.destroy()
  }

  const handleClick = (e: { key: any; }) => {
	if (e.key == "6") {
		localStorage.clear()
		router.push("/login")
	}
}

  return (
	<html>
		<body style={{margin:'0 0 0 0'}}>
		<AntdRegistry>
			{contextHolder}
			{contextMsgHolder}
			<ConfigProvider theme={{components:{ Layout: {siderBg:'#042a3b', triggerBg:'#042a3b'}, Menu: {darkItemBg: '#042a3b', itemMarginBlock:17}}}}>
			<Layout style={{ minHeight: '100vh' }}>
			<Sider width={250} collapsible collapsed={collapsed} onCollapse={(value: boolean | ((prevState: boolean) => boolean)) => setCollapsed(value)}>
				<div className="demo-logo-vertical">
					{!collapsed ? <Image alt="myImg" src={Logo}  width={200} height={35} style={{margin:'25px 25px 10px 25px'}}/> : ""}
				</div>
				<Menu theme="dark" mode="inline" items={items} style={{ margin: `${!collapsed ? '0px 0px' : '73px 0 0 0'}`, fontSize: 20}} onClick={handleClick}/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Content style={{padding: '0 0 0 30px', fontSize: "22px"}}>  <h1 style={{margin:"0 0 0 0"}}>{titles.get(usePathname())}</h1> </Content>
				</Header>
				<Content style={{ margin: '26px 26px' }}>
				<div
					style={{
					padding: 24,
					minHeight: 860,
					background: colorBgContainer,
					borderRadius: borderRadiusLG,
					}}
				>
					{children}
				</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
				Курсовая работа made by Вадим Харламов БПИ225
				</Footer>
			</Layout>
			</Layout>
		</ConfigProvider>
		</AntdRegistry>
		</body>
	</html>
  );
};