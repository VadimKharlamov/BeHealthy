import { Layout} from "antd";
import "./../globals.css";
import { Content} from "antd/es/layout/layout";
import { AntdRegistry } from '@ant-design/nextjs-registry';

interface IProps {
	children: React.ReactNode;
}

export default function RootLayout({
	children}: IProps) {
	return (
			<html lang="en" suppressHydrationWarning={true}>
				<body>
				<AntdRegistry>
					<Layout>
						<Content> {children} </Content>
					</Layout>
				</AntdRegistry>
				</body>
			</html>
	);
}
