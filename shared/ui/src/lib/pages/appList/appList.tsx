import Sidebar from '../../component/sidebar'
import {
  onSnapshot,
  collection,} from "firebase/firestore";
import { Layout, theme } from 'antd';
import Footer from '../../component/footer';
import { useState,useEffect, useContext } from 'react';
import { dbfire } from "../../config/firebase";
import Table from '../../component/table/formTable'
import {AuthContext} from '../../config/AuthContex'
import React from 'react';
const AppList = () => {
  const [data,setData]=useState<[]>([])
  const { Content } = Layout;
  const { token: { colorBgContainer }} = theme.useToken();
  const colRef = collection(dbfire,'application form')
  const {currentUser} = useContext(AuthContext)
  useEffect(()=>{
    const display = onSnapshot(colRef,(querySnapshot)=>{
      const items: any=[] ;
      querySnapshot.forEach((doc)=>{
        items.push(doc.data())
      });
      setData(items)
    })
    return ()=>{
      display()
    }
  },[])
  return (
    <div className='flex'>
      <Layout>
        <div className='flex flex-col w-full'>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className='flex' style={{ padding: 24, background: colorBgContainer }}>
              <h1 className='mx-auto font-bold text-2xl'>Created Apps</h1>
              <h1 className='mx-auto font-bold text-2xl'>{currentUser?.email}</h1>
            </div>
            <div style={{ padding: 24,paddingTop: 0, minHeight: 360, background: colorBgContainer }}>
              <Table/>
            </div>
          </Content>
          <Footer/>
        </div>
        </Layout>
    </div>
  )
}

export default AppList