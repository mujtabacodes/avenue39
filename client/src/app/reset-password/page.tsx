import Container from '@/components/ui/Container'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'
import loginBackground from '@assets/images/login.png';
import { CgCloseO } from 'react-icons/cg'
import logo from '@assets/icons/logo.png';
import ResetForm from '@/components/register/reset-form';


const ResetPasswordPage = () => {
    return (
        <Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className='p-10'>
                    <Link className='flex justify-center md:justify-start' href={"/"}><Image width={250} height={250} src={logo} alt='logo' /></Link>

                    <div className=' mt-10 md:mt-40 max-w-screen-sm mx-auto'>
                        <ResetForm />
                    </div>

                </div>

                <div className="h-screen hidden md:block" style={{
                    backgroundImage: `url(${loginBackground.src})`, backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                    <Container className='mt-10 text-white space-y-5'>
                        <Link href={"/"} className='flex justify-end'>
                            <CgCloseO size={50} />
                        </Link>
                        <div className='text-[40px] font-medium'>
                            <p>Welcome !</p>
                            <p>Enter new password</p>
                        </div>
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default ResetPasswordPage