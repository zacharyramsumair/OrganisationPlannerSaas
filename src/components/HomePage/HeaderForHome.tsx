import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function HeaderForHome({currentUser}:any) {
    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
             <Link href={'/dashboard'}>
            <img src='/next.svg' className='cursor-pointer' width={100} height={100} />
            </Link>
            {currentUser ?
                <div className='flex gap-2 items-center'>
                    <Link href={'/dashboard'}>
                        <Button variant="outline">Dashboard</Button>
                    </Link>
                    <Button>NOTSURE</Button>
                </div> :
                <Link href={'/login'}>
                    <Button>Get Started</Button>
                </Link>
            }

        </div>
    )
}

export default HeaderForHome