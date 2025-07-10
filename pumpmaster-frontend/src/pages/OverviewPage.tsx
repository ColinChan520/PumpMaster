import NavBar from '../components/NavBar.tsx';


const OverviewPage: React.FC = () => {

  return (
    <>
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', minWidth: '100vw' }}>
      <NavBar showMenu={true} />
      <div className="p-8">
        <h2 className="text-xl font-bold mb-6" style ={{color: "black", paddingTop: "5%", paddingLeft: "1%"}}>Pumps</h2>

        <div className="flex items-center justify-between mb-4" style ={{color: "black", paddingTop: "1%", paddingLeft: "1%"}}>

          
            <button className="px-4 py-2 bg-gray-200 rounded text-sm font-bold" >New Pump</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded text-sm font-bold">Delete</button>
          
        </div>

        <div className="overflow-x-auto" style ={{padding: "1%", paddingLeft: "1%"}}>
          <table className="min-w-full text-left text-sm border-collapse" >
            <thead >
              <tr className="border-b" >
                <th className="py-2 px-3" style ={{color: "black"}}>Pump Name</th>
                <th className="py-2 px-3" style ={{color: "black"}}>Type</th>
                <th className="py-2 px-3" style ={{color: "black"}}>Area/Block</th>
                <th className="py-2 px-3" style ={{color: "black"}}>Latitude</th>
                <th className="py-2 px-3" style ={{color: "black"}}>Longitude</th>
                <th className="py-2 px-3" style ={{color: "black"}}>Flow Rate</th>
                <th className="py-2 px-3" style ={{color: "black"}}>Offset</th>
                <th className="py-2 px-3" style ={{color: "black"}}>Current Pressure</th>
                <th className="py-2 px-3" style ={{color: "black"}}>Min Pressure</th>
                <th className="py-2 px-3" style ={{color: "black"}}>Max Pressure</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">Pump {index + 1}</td>
                  <td className="py-2 px-3 text-blue-500 cursor-pointer">Centrifugal</td>
                  <td className="py-2 px-3 text-blue-500 cursor-pointer">Area {String.fromCharCode(65 + index)}</td>
                  <td className="py-2 px-3">34.0522</td>
                  <td className="py-2 px-3">-118.2437</td>
                  <td className="py-2 px-3">{1000 - index * 200} GPM</td>
                  <td className="py-2 px-3">{index}s</td>
                  <td className="py-2 px-3">{150 - index * 10} psi</td>
                  <td className="py-2 px-3">{120 - index * 10} psi</td>
                  <td className="py-2 px-3">{180 - index * 10} psi</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default OverviewPage;
