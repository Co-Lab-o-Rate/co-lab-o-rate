import logoLeft from '../../assets/logo-components/Colaborate_Logo_Colab.png'
import logoCenter from '../../assets/logo-components/Colaborate_Logo_Hands.png'
import logoRight from '../../assets/logo-components/Colaborate_Logo_Rate.png'

const LogoHeader = () => {
    return (
        <>
            <div className='flex justify-center'>
            <div className='logo-container flex justify-center'>
                <span className='w-1/3'><img className='object-cover h-40' src={logoLeft}/></span>
                <span className='pl-8'>
                <img src={logoCenter} className="object-cover h-52 logo" alt="logo"/>
                </span>
                <span className='w-1/3 h-40'><img className='object-cover h-40' src={logoRight}/></span>
            </div>
            </div>
            <div className={'start-button'}></div>
        </>
    )
}

export default LogoHeader;