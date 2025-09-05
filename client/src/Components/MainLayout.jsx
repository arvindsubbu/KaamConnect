import { Layout, Typography } from "antd";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function MainLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Title style={{ color: "white", margin: 0 }} level={3}>
          KaamConnect
        </Title>
      </Header>
      <Content style={{ padding: "24px" }}>
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        &copy; {new Date().getFullYear()} KaamConnect
      </Footer>
    </Layout>
  );
}

export default MainLayout;