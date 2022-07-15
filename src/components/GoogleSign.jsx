import { Button, Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import google from '../images/google-icon.png'

export default function GoogleSign() {
    return (
        <>
            <Divider plain>or</Divider>
            <Button block className='buttons'>
                <div className='google-sign'>
                    <div className='google-image'><img src={google} alt="not found" /></div>
                    <div>Continue with Google</div>
                </div>
            </Button>
            <div className='terms'>
                By clicking Sign in or Continue with Google you agree to DrinkItAll's <Link to='/'>Terms of Use and Privacy Policy</Link>. DrinkItAllmay send you communications; you may change your preferences in your account settings. We’ll never post without your permission.
            </div>
        </>
    )
}
