import React, { Fragment } from 'react'
import ResetForm from '@/components/register/reset-form';
import Services from '@/components/services/services';


const ResetPasswordPage = () => {
    return (
        <Fragment>
        <div className="grid grid-cols-1 justify-center px-2 py-5">
          <div className={`max-w-screen-sm w-full mx-auto px-2 py-5 xs:p-5 sm:p-10 shadow-[0px_3px_6px_#00000029] rounded-md h-fit`}>
            <ResetForm />
          </div>
        </div>
        <Services />
      </Fragment>
    )
}

export default ResetPasswordPage