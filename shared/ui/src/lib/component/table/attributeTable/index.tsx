import { QuerySnapshot, collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { dbfire } from '../../../config/firebase';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import _ from 'lodash';

const AttributeTable = () => {
  const [customData, setCustomData] = useState<[]>([]);
  const [attCustomData, setAttCustomData] = useState<[]>([]);
  const colRef = collection(dbfire, 'form');
  const attColRef = collection(dbfire, 'customReceivedData');
  const params = useParams();
  const formId = params['formId'];

  useEffect(() => {
    const display = onSnapshot(colRef, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setCustomData(items);
    });
    return () => {
      display();
    };
  }, []);

  useEffect(() => {
    const display = onSnapshot(attColRef, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAttCustomData(items);
    });
    return () => {
      display();
    };
  }, []);

  //   const columnss = () => [
  //     customData.map((i: any, index) => (
  //       <>
  //         {function dis() {
  //           if (i.id != formId) return;
  //           else {
  //             return i.attribute.map((k: any, id: any) => {
  //               return (
  //                 <tr key={id}>
  //                   <td className="border">{k.inputLabel}</td>
  //                   <td className="border">{k.inputType}</td>
  //                   <td className="border">{k.inputKey}</td>
  //                 </tr>
  //               );
  //             });
  //           }
  //         }}
  //       </>
  //     )),
  //   ];

  return (
    <div>
      <table className="my-9 w-2/3">
        <thead className="bg-gray-100 rounded">
          {customData.map((i: any, index) => (
            <div className="flex justify-around">
              {(() => {
                if (i.id != formId) return;
                else {
                  return i.attribute.map((k: any, id: any) => {
                    return (
                      <tr key={id}>
                        <th>{k.inputLabel}</th>
                      </tr>
                    );
                  });
                }
              })()}
            </div>
          ))}
        </thead>
        <tbody>
          {attCustomData.map((p: any, index) => (
            <>
              {customData.map((i: any, index) => (
                <div className="flex justify-around">
                  {(() => {
                    if (i.id != formId) return;
                    else {
                      return i.attribute.map((k: any, id: any) => {
                        return (() => {
                          if (i.inputLabel != p[`${i.inputLabel}`]) return;
                          else
                            return (
                              <tr className="flex justify-around">
                                <td>{p[`name`]}</td>
                              </tr>
                            );
                        })();
                      });
                    }
                  })()}
                </div>
              ))}
              {/* {(() => {
                if (i.formId != formId) return;
                else return (
                    <tr className='flex justify-around'>
                        <td>{i.name}</td>
                        <td>{i['father name']}</td>
                    </tr>
                )
                })()} */}
            </>
          ))}
        </tbody>
      </table>
      {/* <Table columns={columns} dataSource={customData}></Table> */}
    </div>
  );
};

export default AttributeTable;
