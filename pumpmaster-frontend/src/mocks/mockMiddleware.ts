import mockData from '../assets/mockData.json';

export async function mockFetch(url: string, method: string, data?: any) {
  console.log(`[MockMiddleware] request ${method} ${url}`);

  const response = (mockData as Record<string, any>)[url];
  const getPumps = (mockData as Record<string, any>)['/pumps/get'];

  if (method === 'POST' && url === '/pumps/add') {
    if (getPumps && Array.isArray(getPumps.data)) {
      getPumps.data.push({
        id: data.id,
        info: data.info,
      });
      console.log(`[MockMiddleware] Added pump ${data.id} with info "${data.info}"`);
    }
  }

  if (method === 'PUT' && url === '/pumps/edit') {
    
    if (getPumps && Array.isArray(getPumps.data)) {
      const targetPump = getPumps.data.find((pump: any) => pump.id === data.id);
      if (targetPump) {
        targetPump.info = data.info;
        console.log(`[MockMiddleware] Updated pump ${data.id} info to "${data.info}"`);
      }
    }
  }

  if (method === 'DELETE' && url === '/pumps/delete') {
    if (getPumps && Array.isArray(getPumps.data)) {
      const index = getPumps.data.findIndex((pump: any) => pump.id === data.id);
      if (index !== -1) {
        const deleted = getPumps.data.splice(index, 1);
        console.log(`[MockMiddleware] Deleted pump ${data.id}`, deleted[0]);
      } else {
        console.log(`[MockMiddleware] Pump ${data.id} not found`);
        return Promise.reject({ status: 404, message: 'Pump not found' });
      }
    }
  }

  if (!response) {
    return Promise.reject({ status: response.status, message: `Mock API not found: ${url}` })
  }

  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject({ status: response.status, message: response.message });
  }

}