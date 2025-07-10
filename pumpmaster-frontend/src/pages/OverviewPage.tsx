import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.tsx';
import { get } from '../api/axios.ts';


const OverviewPage: React.FC = () => {
    const [pumps, setPumps] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPumps = async () => {
      try {
        const res = await get('/pumps/get');
        console.log('Get Pumps Response:', res);

        if (res.status !== 200) {
          setError('Failed to load pumps');
          return;
        }

        setPumps(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error fetching pumps');
      }
    };

    fetchPumps();
  }, []);

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
          {error && <p style={{ color: 'red' }}>{error}</p>}
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
              {pumps.map((pump: any) => (
                <tr key={pump.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3" style ={{color: "black"}}>{pump['Pump Name']}</td>
                  <td className="py-2 px-3 text-blue-500 cursor-pointer" style ={{color: "black"}}>{pump['Type']}</td>
                  <td className="py-2 px-3 text-blue-500 cursor-pointer" style ={{color: "black"}}>{pump['Area']}</td>
                  <td className="py-2 px-3" style ={{color: "black"}}>{pump['Latitude']}</td>
                  <td className="py-2 px-3" style ={{color: "black"}}>{pump['Longitude']}</td>
                  <td className="py-2 px-3" style ={{color: "black"}}>{pump['Flow Rate']}</td>
                  <td className="py-2 px-3" style ={{color: "black"}}>{pump['Offset']}</td>
                  <td className="py-2 px-3" style ={{color: "black"}}>{pump['Current Pressure']}</td>
                  <td className="py-2 px-3" style ={{color: "black"}}>{pump['Min Pressure']}</td>
                  <td className="py-2 px-3" style ={{color: "black"}}>{pump['Max Pressure']}</td>
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
