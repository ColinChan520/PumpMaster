import NavBar from '../components/NavBar.tsx';


const OverviewPage: React.FC = () => {

  return (
    <>
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', minWidth: '100vw' }}>
      <NavBar showMenu={true} />
    </div>
      
    </>
  );
};

export default OverviewPage;
