import React, {useEffect} from "react";
import './index.css'
import {useParams} from "react-router-dom";
import {message} from "antd";
declare var WMKS: any;

const Console: React.FC = () => {
  const {ticket} = useParams<string>();
  console.log('ticket: ', ticket);
  const query = new URLSearchParams(window.location.search)
  const host = query.get('host')
  console.log('host: ', host);
  if (host === '') {
    message?.error('host为空，请联系管理员')
  }

  useEffect(() => {
    const newWmks = WMKS.createWMKS('wmksContainer', {})
      .register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE, (event:any, data:any) => {
        if (data.state === WMKS.CONST.ConnectionState.CONNECTED) {
          console.log('Connection state change: connected');
        }
      });

    const consoleUrl = 'wss://vc.rsq.cn/ticket/' + ticket + '?ip=' + host
    newWmks.connect(consoleUrl);
  }, [ticket]);

  return (
    <div className={'test'}>
      <div id="wmksContainer" style={{marginTop: '20px', width: '100%', height: '800px'}}></div>
    </div>
  )
};

export default Console;
