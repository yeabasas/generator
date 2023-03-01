import React, { useState } from 'react'
import InputField from '../../component/inputField';
import Button from '../../component/button';
import { routeName, REGEX, ENABLE_FIREBASE } from '../../constant';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, set } from "firebase/database";
const Application = () => {
        const [btnDetails, setBtnDetails] = useState({
          loader: false,
          message: ''
        })
        const navigate = useNavigate();
        const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm();

        function writeUserData({userId, name, imageUrl}:any) {
          const db = getDatabase();
            set(ref(db, 'users/' + userId), {
            name: name,
            icon : imageUrl
          })
        }
        const onSubmit = (values: any) => {
            if (!ENABLE_FIREBASE) return
            setBtnDetails((pre) => ({
              ...pre,
              loader: true
            }))
            writeUserData(values);
        }
  return (
    <div className="h-screen flex justify-center bg-blue-200">
        <div className='m-auto w-1/2'>
            <div className='flex flex-col gap-2 justify-center rounded-2xl text-white bg-blue-900/50 p-9' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='m-auto text-2xl font-semibold pb-9'>Create a Web App </h1>
                <InputField
                    type='text'
                    name='name'
                    placeholder='App Name'
                    pattern={REGEX.EMAIL}
                        isRequired={true}
                    register={register}
                        errors={errors}
                    />
                <InputField
                    name='icon'
                    type='file'
                    placeholder='Icon/Logo'
                    isRequired={false}
                    register={register}
                    errors={errors}
                    />
                <Button
                    name="create"
                    type='submit'
                    isLoading={btnDetails.loader}
                    message={btnDetails.message}
                />
            </div>
        </div>
    </div>
  );
}


export default Application