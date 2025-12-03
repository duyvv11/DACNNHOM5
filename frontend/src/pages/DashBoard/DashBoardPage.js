import axios from 'axios'
import DashBoard from '../../components/admin/DashBoard/DashBoard';
import { useEffect,useState } from 'react';

const DashBoardPage = () =>{
  const [data,setData]=useState({});
  const loadDataDashBoard =async()=>{
    const res = await axios.get(`http://localhost:5000/api/dashboard`);
    console.log("datadb",res.data);
    setData(res.data);
  }
  useEffect(()=>{
    loadDataDashBoard();
  },[]);
  return(
    <DashBoard data={data}></DashBoard>
  )
}
export default DashBoardPage;