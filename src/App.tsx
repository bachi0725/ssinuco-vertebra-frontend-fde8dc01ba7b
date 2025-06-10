import { Layout } from 'antd';
import EcoEficiencia from './components/EcoEficiencia';
import { EcoTabProvider } from './components/context/EcoTabContext';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#2b9026', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff', margin: 0, fontSize: '24px' }}>Prueba técnica Vertebra</h1>
      </Header>
      <Content style={{ padding: '24px 50px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280, width: '100%', maxWidth: '800px' }}>
          <EcoTabProvider>
            <EcoEficiencia />
          </EcoTabProvider>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Prueba Técnica Vertebra ©2025 Creado por Sergio Alejandro Bachiller
      </Footer>
    </Layout>
  );
}

export default App;